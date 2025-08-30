// This component has been removed in the frontend-only version
// If you need lead management, consider using a third-party service like:
// - Google Forms + Google Sheets
// - Typeform
// - HubSpot
// - Mailchimp

export default function LeadsDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard Removed</h1>
        <p className="text-muted-foreground">
          The admin dashboard has been removed in this frontend-only version.
        </p>
        <p className="text-muted-foreground">
          Contact forms will show success messages locally without backend storage.
        </p>
      </div>
    </div>
  );
}