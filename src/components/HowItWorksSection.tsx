import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MessageSquare, Search, UserCheck, Handshake } from "lucide-react";
import { motion } from "motion/react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: MessageSquare,
      number: "01",
      title: "Real Estate Market Analysis",
      description: "We analyze your local real estate market, target demographics, and competition to create a customized lead generation strategy for maximum ROI."
    },
    {
      icon: Search,
      number: "02", 
      title: "Digital Marketing Campaign Setup",
      description: "Launch targeted Google Ads, Facebook campaigns, and SEO-optimized landing pages to capture buyers, sellers, and real estate investors in your area."
    },
    {
      icon: UserCheck,
      number: "03",
      title: "Lead Qualification & Verification",
      description: "Every real estate lead is verified for genuine interest, budget qualification, and timeline - ensuring only serious prospects reach your pipeline."
    },
    {
      icon: Handshake,
      number: "04",
      title: "Instant Lead Delivery & CRM Integration",
      description: "Qualified real estate leads delivered instantly to your preferred CRM with complete contact details, property interests, and buying/selling timeline."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 lg:py-32 bg-card/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-6 sm:mb-8">
            How Our Real Estate Lead 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Generation Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
            Our proven 4-step real estate marketing process delivers high-quality buyer and seller leads that convert into closed transactions. Remember: NO RISK - You pay nothing upfront, only after successful lead delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
          <div className="space-y-8 sm:space-y-12 lg:space-y-16 order-2 lg:order-1">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group flex items-start space-x-4 sm:space-x-6 lg:space-x-8 relative"
                >
                  {/* Connecting line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 sm:left-8 top-16 sm:top-20 w-px h-8 sm:h-12 lg:h-16 bg-gradient-to-b from-primary/50 to-transparent"></div>
                  )}
                  
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex-shrink-0 relative"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-accent rounded-2xl sm:rounded-3xl flex items-center justify-center text-primary-foreground shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <span className="text-sm sm:text-lg font-bold tracking-tight">{step.number}</span>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                  </motion.div>
                  
                  <div className="flex-grow space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </motion.div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            {/* Background decoration */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-primary/20 via-primary/5 to-accent/10 rounded-2xl sm:rounded-3xl blur-xl"></div>
            
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative z-10"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwZGlnaXRhbCUyMG1hcmtldGluZyUyMHRlY2hub2xvZ3klMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU2NTg4NjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Real estate digital marketing analytics and technology dashboard"
                className="rounded-2xl sm:rounded-3xl w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover shadow-2xl border border-border/20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10 rounded-2xl sm:rounded-3xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}