import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import ContactForm from "./ContactForm";

export default function PricingSection() {
  const plans = [
    {
      name: "Basic Real Estate Lead Package",
      description: "Essential lead generation for new agents",
      features: [
        "10-15 qualified real estate leads per month",
        "Pre-screened buyer & seller prospects",
        "Local market targeting in your area",
        "Basic CRM integration & lead delivery",
        "Email & phone lead notifications",
        "Monthly performance analytics reports"
      ],
      popular: false
    },
    {
      name: "Professional Real Estate Growth Package",
      description: "Advanced lead generation for established agents",
      features: [
        "25-35 high-quality real estate leads monthly",
        "Priority buyer, seller & investor leads",
        "Advanced demographic targeting & scoring",
        "Dedicated real estate marketing specialist",
        "Weekly lead performance optimization",
        "Custom landing pages & lead magnets"
      ],
      popular: true
    },
    {
      name: "Enterprise Real Estate Team Solution",
      description: "Scalable lead generation for teams & brokerages",
      features: [
        "50+ premium real estate leads per month",
        "Multi-agent lead distribution system",
        "Custom brokerage-branded materials",
        "Team performance dashboards & analytics",
        "API integration with existing CRM systems",
        "24/7 dedicated real estate support team"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 lg:py-32 bg-card/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute top-16 sm:top-32 left-4 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 sm:bottom-32 right-4 sm:right-20 w-48 h-48 sm:w-80 sm:h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-6 sm:mb-8">
            Real Estate Lead Generation
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Service Plans</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
            Choose the perfect real estate lead generation package for your business. 🔥 NO RISK - Pay nothing upfront, only after receiving qualified leads that convert to clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.02 }}
              className={`group relative p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border transition-all duration-500 bg-card/50 backdrop-blur-sm hover:bg-card/80 overflow-hidden ${
                plan.popular 
                  ? 'border-primary/50 shadow-2xl shadow-primary/10' 
                  : 'border-border/50 hover:border-primary/30'
              }`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl ${
                plan.popular 
                  ? 'from-primary/10 via-transparent to-brand-red-light/10' 
                  : 'from-primary/5 via-transparent to-brand-red-light/5'
              }`}></div>

              {plan.popular && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2"
                >
                  <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm tracking-wide shadow-lg">
                    Most Popular
                  </Badge>
                </motion.div>
              )}
              
              <div className="relative z-10 space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-base sm:text-lg">{plan.description}</p>
                </div>

                <ul className="space-y-3 sm:space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + featureIndex * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3 sm:space-x-4"
                    >
                      <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground text-base sm:text-lg leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <ContactForm
                  trigger={
                    <Button 
                      className={`w-full h-12 sm:h-14 text-sm sm:text-base relative overflow-hidden group/btn hover:scale-[1.02] active:scale-[0.98] transition-transform ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90' 
                          : 'border-2 border-border hover:border-primary/50'
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      <span className="relative z-10">Contact Sales</span>
                      {!plan.popular && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </Button>
                  }
                  title={`Learn More About ${plan.name}`}
                />
              </div>

              {/* Subtle glow effect */}
              <div className={`absolute -inset-1 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 ${
                plan.popular 
                  ? 'bg-gradient-to-r from-primary/30 to-brand-red-light/30' 
                  : 'bg-gradient-to-r from-primary/20 to-brand-red-light/20'
              }`}></div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16 lg:mt-20"
        >
          <p className="text-muted-foreground mb-6 sm:mb-8 text-base sm:text-xl leading-relaxed px-4">
            <strong>Additional Real Estate Marketing Services:</strong> Custom property listing websites, social media marketing for real estate agents, Google Ads management, and Facebook lead generation campaigns available with any package.
          </p>
          <ContactForm
            trigger={
              <Button variant="outline" className="h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base border-2 border-border hover:border-primary/50 hover:bg-primary/5 hover:scale-105 active:scale-95 transition-transform">
                Contact Sales
              </Button>
            }
            title="Contact Our Sales Team"
          />
        </motion.div>
      </div>
    </section>
  );
}