import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/middleware';
import * as kv from './kv_store.tsx';
import { GoogleSheetsService } from './google-sheets.tsx';

const app = new Hono();

// Initialize Google Sheets service
let googleSheetsService: GoogleSheetsService | null = null;

// Initialize Google Sheets service on startup
try {
  googleSheetsService = new GoogleSheetsService();
  
  // Verify access and set up headers on startup
  googleSheetsService.verifySheetAccess().then(async (hasAccess) => {
    if (hasAccess) {
      console.log('Google Sheets integration is ready');
      try {
        await googleSheetsService.setupSheetHeaders();
      } catch (error) {
        console.log('Warning: Could not set up Google Sheets headers:', error.message);
      }
    } else {
      console.log('Warning: Google Sheets access verification failed');
    }
  });
} catch (error) {
  console.log('Warning: Google Sheets service not available:', error.message);
}

// Middleware
app.use('*', logger(console.log));
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint
app.get('/make-server-396a4785/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Submit lead endpoint
app.post('/make-server-396a4785/leads', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, company } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return c.json({ 
        error: 'Missing required fields: name, email, and phone are required' 
      }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email format' }, 400);
    }

    // Create lead object
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const lead = {
      id: leadId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company ? company.trim() : '',
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    // Store lead in database
    await kv.set(leadId, lead);

    let sheetsSuccess = false;

    // Also add to Google Sheets if service is available
    if (googleSheetsService) {
      try {
        await googleSheetsService.addLeadToSheet(lead);
        sheetsSuccess = true;
        console.log(`Lead added to both database and Google Sheets: ${leadId} - ${name} (${email})`);
      } catch (sheetsError) {
        console.log(`Lead saved to database but failed to add to Google Sheets: ${sheetsError.message}`);
        // Continue with success response even if Google Sheets fails
      }
    } else {
      console.log(`New lead submitted to database only: ${leadId} - ${name} (${email})`);
    }

    return c.json({ 
      success: true, 
      message: sheetsSuccess 
        ? 'Lead submitted successfully and added to Google Sheets'
        : 'Lead submitted successfully to database',
      leadId: leadId,
      addedToSheets: sheetsSuccess
    });

  } catch (error) {
    console.log(`Error submitting lead: ${error}`);
    return c.json({ 
      error: 'Failed to submit lead. Please try again.' 
    }, 500);
  }
});

// Get all leads endpoint (for admin/dashboard use)
app.get('/make-server-396a4785/leads', async (c) => {
  try {
    const leads = await kv.getByPrefix('lead_');
    
    // Sort leads by submission date (newest first)
    const sortedLeads = leads.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    return c.json({ 
      success: true, 
      leads: sortedLeads,
      count: sortedLeads.length 
    });

  } catch (error) {
    console.log(`Error fetching leads: ${error}`);
    return c.json({ 
      error: 'Failed to fetch leads' 
    }, 500);
  }
});

// Get lead by ID endpoint
app.get('/make-server-396a4785/leads/:id', async (c) => {
  try {
    const leadId = c.req.param('id');
    const lead = await kv.get(leadId);

    if (!lead) {
      return c.json({ error: 'Lead not found' }, 404);
    }

    return c.json({ success: true, lead });

  } catch (error) {
    console.log(`Error fetching lead ${c.req.param('id')}: ${error}`);
    return c.json({ 
      error: 'Failed to fetch lead' 
    }, 500);
  }
});

// Update lead status endpoint
app.put('/make-server-396a4785/leads/:id/status', async (c) => {
  try {
    const leadId = c.req.param('id');
    const { status } = await c.req.json();

    if (!status || !['new', 'contacted', 'qualified', 'converted', 'closed'].includes(status)) {
      return c.json({ 
        error: 'Invalid status. Must be one of: new, contacted, qualified, converted, closed' 
      }, 400);
    }

    const lead = await kv.get(leadId);
    if (!lead) {
      return c.json({ error: 'Lead not found' }, 404);
    }

    // Update lead status
    const updatedLead = {
      ...lead,
      status,
      updatedAt: new Date().toISOString()
    };

    await kv.set(leadId, updatedLead);

    console.log(`Lead status updated: ${leadId} - ${status}`);

    return c.json({ 
      success: true, 
      message: 'Lead status updated successfully',
      lead: updatedLead 
    });

  } catch (error) {
    console.log(`Error updating lead status ${c.req.param('id')}: ${error}`);
    return c.json({ 
      error: 'Failed to update lead status' 
    }, 500);
  }
});

// Delete lead endpoint
app.delete('/make-server-396a4785/leads/:id', async (c) => {
  try {
    const leadId = c.req.param('id');
    const lead = await kv.get(leadId);

    if (!lead) {
      return c.json({ error: 'Lead not found' }, 404);
    }

    await kv.del(leadId);

    console.log(`Lead deleted: ${leadId}`);

    return c.json({ 
      success: true, 
      message: 'Lead deleted successfully' 
    });

  } catch (error) {
    console.log(`Error deleting lead ${c.req.param('id')}: ${error}`);
    return c.json({ 
      error: 'Failed to delete lead' 
    }, 500);
  }
});

// Sync all leads to Google Sheets endpoint
app.post('/make-server-396a4785/sync-to-sheets', async (c) => {
  try {
    if (!googleSheetsService) {
      return c.json({ 
        error: 'Google Sheets service not available. Please check your service account configuration.' 
      }, 503);
    }

    const leads = await kv.getByPrefix('lead_');
    
    if (leads.length === 0) {
      return c.json({ 
        success: true, 
        message: 'No leads to sync',
        synced: 0 
      });
    }

    let syncedCount = 0;
    const errors = [];

    for (const lead of leads) {
      try {
        await googleSheetsService.addLeadToSheet(lead);
        syncedCount++;
      } catch (error) {
        errors.push(`Failed to sync lead ${lead.id}: ${error.message}`);
      }
    }

    console.log(`Synced ${syncedCount} out of ${leads.length} leads to Google Sheets`);

    return c.json({ 
      success: true, 
      message: `Successfully synced ${syncedCount} out of ${leads.length} leads`,
      synced: syncedCount,
      total: leads.length,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.log(`Error syncing leads to Google Sheets: ${error}`);
    return c.json({ 
      error: 'Failed to sync leads to Google Sheets' 
    }, 500);
  }
});

// Test Google Sheets connection endpoint
app.get('/make-server-396a4785/test-sheets', async (c) => {
  try {
    if (!googleSheetsService) {
      return c.json({ 
        success: false,
        error: 'Google Sheets service not available. Please check your service account configuration.' 
      });
    }

    // Test verification and setup
    const hasAccess = await googleSheetsService.verifySheetAccess();
    if (!hasAccess) {
      throw new Error('Cannot access the Google Sheet. Please check permissions.');
    }

    await googleSheetsService.setupSheetHeaders();

    return c.json({ 
      success: true, 
      message: 'Google Sheets connection is working correctly',
      spreadsheetId: '1pxJIN7pFlwrZmsmcjwkfSK5dljfcWdN2qPD6H6cZ_F0',
      status: 'ready'
    });

  } catch (error) {
    console.log(`Google Sheets connection test failed: ${error}`);
    return c.json({ 
      success: false,
      error: `Google Sheets connection failed: ${error.message}`,
      status: 'error'
    });
  }
});

// Get Google Sheets status endpoint
app.get('/make-server-396a4785/sheets-status', async (c) => {
  try {
    if (!googleSheetsService) {
      return c.json({ 
        status: 'unavailable',
        message: 'Google Sheets service not configured' 
      });
    }

    const hasAccess = await googleSheetsService.verifySheetAccess();
    
    return c.json({ 
      status: hasAccess ? 'connected' : 'error',
      message: hasAccess ? 'Google Sheets is connected and ready' : 'Cannot access Google Sheets',
      spreadsheetId: '1pxJIN7pFlwrZmsmcjwkfSK5dljfcWdN2qPD6H6cZ_F0',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.log(`Google Sheets status check failed: ${error}`);
    return c.json({ 
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Start server
Deno.serve(app.fetch);