import { ReactNode, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface ResponsiveDialogProps {
  children: ReactNode;
  trigger: ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ResponsiveDialog({ 
  children, 
  trigger, 
  title, 
  description, 
  open, 
  onOpenChange 
}: ResponsiveDialogProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          {trigger}
        </SheetTrigger>
        <SheetContent 
          side="bottom" 
          className="h-[90vh] rounded-t-xl border-t border-border/50 bg-card/95 backdrop-blur-xl"
        >
          <SheetHeader className="space-y-4 text-left">
            {title && <SheetTitle className="text-2xl font-bold">{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
          <div className="mt-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md lg:max-w-lg bg-card border-border/50 backdrop-blur-xl">
        {(title || description) && (
          <DialogHeader className="space-y-4">
            {title && <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <div className="mt-6">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}