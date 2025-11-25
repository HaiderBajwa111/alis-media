import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

export default function FormPage() {
  const navigate = useNavigate();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://embed.typeform.com/next/embed.js"]');
    
    if (existingScript) {
      setScriptLoaded(true);
      // Force Typeform to reinitialize
      setTimeout(() => {
        if ((window as any).tf && (window as any).tf.load) {
          (window as any).tf.load();
        }
      }, 200);
    } else {
      // Load Typeform embed script
      const script = document.createElement('script');
      script.src = 'https://embed.typeform.com/next/embed.js';
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Typeform script');
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Full screen form container */}
      <div className="w-full h-[calc(100vh-73px)]">
        <div 
          data-tf-live="01K95RH44R7BZAMTYBMN5E177X"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

