import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { motion } from "motion/react";
import { Phone, Mail, Building, Loader2, CheckCircle, Heart } from "lucide-react";
import ResponsiveDialog from "./ResponsiveDialog";

interface ContactFormProps {
  trigger: React.ReactNode;
  title?: string;
}
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
}

export default function ContactForm({ trigger, title = "Get Started Today" }: ContactFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.company.trim()) {
      errors.company = "Company/Brokerage is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Build URL-encoded body (no explicit headers -> no CORS preflight)
      const params = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => params.append(k, String(v)));

      const res = await fetch(
        `https://script.google.com/macros/s/${import.meta.env.VITE_SCRIPT_ID}/exec`,
        { method: "POST", body: params }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // try to read JSON { ok: true } if your Apps Script returns JSON
      let ok = true;
      try {
        const json = await res.json();
        ok = json?.ok ?? true;
      } catch {
        // if it wasn't JSON, treat 200 as success
        ok = true;
      }

      if (ok) {
        setSubmitStatus("success");
        console.log("Form submitted successfully:", formData);
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    });
    setFormErrors({});
    setSubmitStatus('idle');
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Clear error for the field being edited
    if (formErrors[e.target.name as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: undefined
      });
    }
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={submitStatus === 'success' ? handleClose : setIsOpen}
      trigger={trigger}
      title={submitStatus === 'success' ? "" : title}
      description={submitStatus === 'success' ? "" : "Fill out the form below and we'll get in touch within 24 hours to discuss your lead generation needs."}
    >
      {submitStatus === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center py-8 px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", bounce: 0.6 }}
            className="mx-auto w-20 h-20 mb-6 gradient-red-black rounded-full flex items-center justify-center"
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl text-gradient-red font-medium">Thank You!</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
              Thank you for contacting our team, we will reach out to you soon!
            </p>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Your message has been received</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8"
          >
            <Button onClick={handleClose} className="h-12 px-8 bg-primary hover:bg-primary/90 text-base relative overflow-hidden group">
              <span className="relative z-10">Continue</span>
              <div className="absolute inset-0 gradient-red-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Smith"
                  required
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                  className={`pl-4 bg-input border-border focus:border-primary h-12 text-base ${formErrors.name ? "border-red-500" : ""}`}
                />
                {formErrors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1">
                    {formErrors.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  required
                  aria-invalid={!!formErrors.phone}
                  aria-describedby={formErrors.phone ? "phone-error" : undefined}
                  className={`pl-10 bg-input border-border focus:border-primary h-12 text-base ${formErrors.phone ? "border-red-500" : ""}`}
                />
                {formErrors.phone && (
                  <p id="phone-error" className="text-red-500 text-sm mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "email-error" : undefined}
                className={`pl-10 bg-input border-border focus:border-primary h-12 text-base ${formErrors.email ? "border-red-500" : ""}`}
              />
              {formErrors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {formErrors.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-foreground">Company/Brokerage</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="RE/MAX, Keller Williams, Independent, etc."
                required
                aria-invalid={!!formErrors.company}
                aria-describedby={formErrors.company ? "company-error" : undefined}
                className={`pl-10 bg-input border-border focus:border-primary h-12 text-base ${formErrors.company ? "border-red-500" : ""}`}
              />
              {formErrors.company && (
                <p id="company-error" className="text-red-500 text-sm mt-1">
                  {formErrors.company}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">Message (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your lead generation goals or any specific questions..."
              rows={4}
              aria-describedby="message-help"
              className="bg-input border-border focus:border-primary resize-none text-base min-h-[100px]"
            />
            <p id="message-help" className="text-muted-foreground text-sm">
              Tell us about your lead generation goals or any specific questions
            </p>
          </div>

          {submitStatus === 'error' && (
            <div className="text-red-500 text-center py-2">
              Failed to submit form. Please try again.
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 h-12 bg-primary hover:bg-primary/90 disabled:opacity-50 text-base"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
              className="w-full sm:w-auto h-12 border-border hover:border-primary/50 disabled:opacity-50 text-base"
            >
              Cancel
            </Button>
          </div>
        </motion.form>
      )}
    </ResponsiveDialog>
  );
}
