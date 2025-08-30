// Google Sheets integration service
import { JWT } from 'npm:google-auth-library';

interface Lead {
  name: string;
  email: string;
  phone: string;
  company: string;
  submittedAt: string;
}

export class GoogleSheetsService {
  private spreadsheetId: string;
  private auth: JWT;
  private isAuthenticated: boolean = false;
  private authExpiresAt: number = 0;

  constructor() {
    // Extract spreadsheet ID from the URL
    this.spreadsheetId = '1pxJIN7pFlwrZmsmcjwkfSK5dljfcWdN2qPD6H6cZ_F0';
    
    // Initialize Google Auth
    const serviceAccountKey = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_KEY');
    if (!serviceAccountKey) {
      throw new Error('Google Service Account Key not found');
    }

    const credentials = JSON.parse(serviceAccountKey);
    this.auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }

  private async ensureAuthenticated(): Promise<void> {
    const now = Date.now();
    
    // Check if we need to refresh authentication (refresh 5 minutes before expiry)
    if (!this.isAuthenticated || now >= (this.authExpiresAt - 5 * 60 * 1000)) {
      try {
        await this.auth.authorize();
        this.isAuthenticated = true;
        
        // Google JWT tokens typically expire in 1 hour
        this.authExpiresAt = now + (60 * 60 * 1000); // 1 hour from now
        
        console.log('Google Sheets authentication refreshed');
      } catch (error) {
        this.isAuthenticated = false;
        throw new Error(`Failed to authenticate with Google Sheets: ${error.message}`);
      }
    }
  }

  async addLeadToSheet(lead: Lead): Promise<void> {
    try {
      // Ensure we have valid authentication
      await this.ensureAuthenticated();

      // Prepare the row data with better formatting
      const timestamp = new Date(lead.submittedAt);
      const rowData = [
        timestamp.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'America/New_York' // Adjust timezone as needed
        }),
        lead.name,
        lead.email,
        lead.phone,
        lead.company || 'Not specified',
        'New' // Status
      ];

      // Google Sheets API endpoint with better parameters
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Sheet1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

      // Make the API request with retry logic
      let retries = 3;
      while (retries > 0) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.auth.credentials.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              values: [rowData],
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            
            // If it's an auth error, try to re-authenticate once
            if (response.status === 401 && retries === 3) {
              console.log('Authentication error, attempting to re-authenticate...');
              this.isAuthenticated = false;
              await this.ensureAuthenticated();
              retries--;
              continue;
            }
            
            throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`);
          }

          const result = await response.json();
          console.log(`Successfully added lead to Google Sheets: ${lead.name} (${lead.email}) - Row ${result.updates?.updatedRows || 'unknown'}`);
          break;

        } catch (fetchError) {
          retries--;
          if (retries === 0) {
            throw fetchError;
          }
          
          console.log(`Retrying Google Sheets API call (${3 - retries}/3)...`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
        }
      }

    } catch (error) {
      console.error('Error adding lead to Google Sheets:', error);
      throw new Error(`Failed to add lead to Google Sheets: ${error.message}`);
    }
  }

  async setupSheetHeaders(): Promise<void> {
    try {
      // Ensure we have valid authentication
      await this.ensureAuthenticated();

      // Check if headers already exist
      const checkUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Sheet1!A1:F1`;
      const checkResponse = await fetch(checkUrl, {
        headers: {
          'Authorization': `Bearer ${this.auth.credentials.access_token}`,
        },
      });

      if (checkResponse.ok) {
        const checkData = await checkResponse.json();
        if (checkData.values && checkData.values.length > 0 && checkData.values[0].length > 0) {
          console.log('Headers already exist in the sheet');
          return;
        }
      }

      // Add headers if they don't exist
      const headers = [
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Company/Brokerage',
        'Status'
      ];

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Sheet1!A1:F1?valueInputOption=USER_ENTERED`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.auth.credentials.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [headers],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to set up headers: ${response.status} - ${errorText}`);
      }

      console.log('Successfully set up Google Sheets headers');
    } catch (error) {
      console.error('Error setting up sheet headers:', error);
      throw error;
    }
  }

  // Method to verify sheet permissions and setup
  async verifySheetAccess(): Promise<boolean> {
    try {
      await this.ensureAuthenticated();

      // Try to read sheet metadata to verify access
      const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}?fields=properties.title,sheets.properties`;
      
      const response = await fetch(metadataUrl, {
        headers: {
          'Authorization': `Bearer ${this.auth.credentials.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Cannot access spreadsheet: ${response.status} - ${await response.text()}`);
      }

      const metadata = await response.json();
      console.log(`Successfully verified access to Google Sheet: "${metadata.properties?.title || 'Unknown'}"`);
      
      return true;
    } catch (error) {
      console.error('Failed to verify Google Sheets access:', error);
      return false;
    }
  }
}