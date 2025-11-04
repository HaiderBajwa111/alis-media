import React, { useEffect, useState } from "react";
import ResponsiveDialog from "./ResponsiveDialog";

interface ClickUpFormProps {
  trigger: React.ReactNode;
  title?: string;
}

export default function ClickUpForm({ trigger, title = "Get Started Today" }: ClickUpFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (isOpen && !scriptLoaded) {
      // Load Typeform embed script
      const script = document.createElement('script');
      script.src = 'https://embed.typeform.com/next/embed.js';
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);

      return () => {
        // Cleanup script when component unmounts
        const existingScript = document.querySelector('script[src="https://embed.typeform.com/next/embed.js"]');
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    }
  }, [isOpen, scriptLoaded]);

  // Ensure body scrolling is restored when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Use a small timeout to ensure DOM updates are complete
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        // Also remove any inline styles that might be blocking scroll
        const html = document.documentElement;
        html.style.overflow = '';
        html.style.paddingRight = '';
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Immediately restore scroll when closing
      setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.paddingRight = '';
      }, 0);
    }
  };

  return (
    <ResponsiveDialog
      trigger={trigger}
      title={title}
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <div 
        data-tf-live="01K95RH44R7BZAMTYBMN5E177X"
        className="w-full h-full -mx-6"
        style={{ width: 'calc(100% + 3rem)', minHeight: '500px' }}
      />
    </ResponsiveDialog>
  );
}
