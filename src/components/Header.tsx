import { useState } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ClickUpForm from "./ClickUpForm";


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/20 z-50"
    >
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center"
          >
            <Logo size="sm" className="sm:hidden" />
            <Logo size="md" className="hidden sm:block" />
          </motion.div>
          
          {/* Desktop Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden lg:flex space-x-8 xl:space-x-12"
          >
            <a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 relative group">
              Process
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 relative group">
              Plans
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 relative group">
              Testimonials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          </motion.nav>

          {/* Desktop Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="hidden sm:flex items-center"
          >
            <ClickUpForm
              trigger={
                <Button className="text-sm px-4 lg:px-6 bg-primary hover:bg-primary/90 relative overflow-hidden group">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 gradient-red-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              }
            />
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2 h-10 w-10 touch-manipulation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden bg-background/98 backdrop-blur-xl border-b border-border/20 relative z-50"
            >
                <div className="px-4 py-6 space-y-4">
                  <nav className="space-y-2">
                    <a 
                      href="#services" 
                      onClick={closeMobileMenu}
                      className="block text-lg text-muted-foreground hover:text-primary transition-colors duration-300 py-3 px-2 rounded-lg hover:bg-muted/50 touch-manipulation"
                    >
                      Services
                    </a>
                    <a 
                      href="#how-it-works" 
                      onClick={closeMobileMenu}
                      className="block text-lg text-muted-foreground hover:text-primary transition-colors duration-300 py-3 px-2 rounded-lg hover:bg-muted/50 touch-manipulation"
                    >
                      Process
                    </a>
                    <a 
                      href="#pricing" 
                      onClick={closeMobileMenu}
                      className="block text-lg text-muted-foreground hover:text-primary transition-colors duration-300 py-3 px-2 rounded-lg hover:bg-muted/50 touch-manipulation"
                    >
                      Plans
                    </a>
                    <a 
                      href="#testimonials" 
                      onClick={closeMobileMenu}
                      className="block text-lg text-muted-foreground hover:text-primary transition-colors duration-300 py-3 px-2 rounded-lg hover:bg-muted/50 touch-manipulation"
                    >
                      Testimonials
                    </a>
                  </nav>
                  
                  <div className="flex flex-col pt-6 border-t border-border/20">
                    <ClickUpForm
                      trigger={
                        <Button className="w-full justify-center h-12 text-base bg-primary hover:bg-primary/90 touch-manipulation">
                          Get Started
                        </Button>
                      }
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
    </motion.header>
  );
}