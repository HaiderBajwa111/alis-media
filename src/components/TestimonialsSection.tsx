import { Avatar, AvatarFallback } from "./ui/avatar";
import { Star } from "lucide-react";
import { motion } from "motion/react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Real Estate Agent",
      company: "Century 21",
      content: "Aliase Media's real estate lead generation system completely transformed my business. I went from cold calling to having qualified buyers and sellers calling me. My commission income tripled in 8 months!",
      rating: 5,
      initials: "SM"
    },
    {
      name: "Michael Rodriguez",
      role: "Broker", 
      company: "RE/MAX Elite",
      content: "The quality of real estate leads is outstanding. These aren't tire-kickers - they're pre-qualified buyers and sellers with verified budgets and serious intent. Best lead generation investment I've made.",
      rating: 5,
      initials: "MR"
    },
    {
      name: "Jessica Thompson",
      role: "Real Estate Agent",
      company: "Keller Williams",
      content: "Best real estate marketing investment ever! The ROI is incredible - every lead pays for itself 10x over. Now I focus on showing properties and closing deals instead of prospecting.",
      rating: 5,
      initials: "JT"
    },
    {
      name: "David Chen",
      role: "Team Leader",
      company: "Coldwell Banker",
      content: "Our entire real estate team uses Aliase Media for lead generation. The consistent flow of qualified buyer and seller leads helped us become the #1 performing team in our local market.",
      rating: 5,
      initials: "DC"
    },
    {
      name: "Lisa Parker",
      role: "Real Estate Agent",
      company: "Better Homes Realty",
      content: "Skeptical about real estate lead generation services, but the results are undeniable. 3 closings in my first month from their leads - that's more than I closed in 6 months of cold calling!",
      rating: 5,
      initials: "LP"
    },
    {
      name: "Robert Johnson",
      role: "Independent Agent",
      company: "Johnson Properties",
      content: "Finally found a real estate lead generation service that actually delivers results. The pre-qualification saves hours of unproductive calls, and the conversion rate beats any other lead source.",
      rating: 5,
      initials: "RJ"
    }
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-background to-card/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            Real Estate Professionals
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Love Our Results</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
            Join 500+ real estate agents, brokers, and teams who have increased their commission income with our proven lead generation system. NO RISK - Pay only for results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
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
              
              <div className="relative z-10 space-y-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-1"
                >
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
                      viewport={{ once: true }}
                    >
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>
                
                <p className="text-muted-foreground leading-relaxed text-lg">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-4 pt-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-base font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div>
                    <div className="text-foreground font-semibold tracking-tight text-lg">{testimonial.name}</div>
                    <div className="text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}