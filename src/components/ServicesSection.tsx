import { Target, Users, TrendingUp, Shield, Zap, BarChart3 } from "lucide-react";
import { motion } from "motion/react";

export default function ServicesSection() {
  const services = [
    {
      icon: Target,
      title: "Premium Real Estate Lead Generation",
      description: "Advanced digital marketing targeting to capture high-intent buyers, sellers, and investors actively searching for properties in your local market area."
    },
    {
      icon: Shield,
      title: "Pre-Qualified Buyer & Seller Leads",
      description: "Verified prospects with confirmed interest, budget qualification, and timeline - delivered exclusively to your real estate business for maximum conversion potential."
    },
    {
      icon: Zap,
      title: "Real-Time Lead Delivery System",
      description: "Instant notifications and lead routing through our automated CRM integration - connect with prospects within minutes for optimal conversion rates."
    },
    {
      icon: BarChart3,
      title: "Real Estate Marketing Analytics",
      description: "Comprehensive campaign tracking, lead source attribution, and ROI reporting specifically designed for real estate professionals and brokerages."
    },
    {
      icon: Users,
      title: "Property Marketing Solutions",
      description: "Custom real estate landing pages, property listing promotion, social media campaigns, and Google Ads management for maximum market exposure."
    },
    {
      icon: TrendingUp,
      title: "Real Estate Business Growth Strategy",
      description: "Expert consultation on lead nurturing, sales funnel optimization, and market positioning to scale your real estate practice and increase commission income."
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-background to-card/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 sm:top-40 left-4 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 sm:bottom-40 right-4 sm:right-20 w-48 h-48 sm:w-80 sm:h-80 bg-accent/5 rounded-full blur-3xl"></div>
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
            Complete Real Estate Lead
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Generation Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
            Comprehensive real estate marketing and lead generation services designed for agents, brokers, and real estate professionals. Pay only for qualified leads that convert into closed transactions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-border/50 hover:border-primary/30 transition-all duration-500 bg-card/50 backdrop-blur-sm hover:bg-card/80 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>
                
                <div className="relative z-10 space-y-4 sm:space-y-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300"
                  >
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </motion.div>
                  
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                    {service.description}
                  </p>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}