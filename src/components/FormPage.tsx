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

    // Cleanup function when component unmounts
    return () => {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      
      // Remove any Typeform overlays that might be blocking (but keep the form container)
      const typeformOverlays = document.querySelectorAll('[class*="tf-overlay"], [class*="tf-popup"]');
      typeformOverlays.forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      
      // Ensure pointer events are enabled
      document.body.style.pointerEvents = '';
      document.documentElement.style.pointerEvents = '';
      
      // Force a reflow to ensure styles are applied
      void document.body.offsetHeight;
    };
  }, []);

  const handleBackClick = () => {
    // Clean up before navigating
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.documentElement.style.overflow = '';
    document.documentElement.style.paddingRight = '';
    
    // Small delay to ensure cleanup completes
    setTimeout(() => {
      navigate('/');
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={handleBackClick}
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

