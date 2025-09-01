import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "motion/react";
import ContactForm from "./ContactForm";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-primary via-brand-red-light to-accent text-primary-foreground relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-48 h-48 sm:w-80 sm:h-80 bg-brand-red-light/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 sm:space-y-10 order-2 lg:order-1"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight"
            >
              Ready to Transform Your Real Estate Business?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl text-primary-foreground/90 leading-relaxed"
            >
              Join hundreds of successful agents who trust Aliase Media for their lead generation. 
              Start getting quality leads today and watch your income grow.
            </motion.p>
            
            {/* Benefits List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6"
            >
              {[
                "30-day money-back guarantee",
                "No setup fees or hidden costs", 
                "Cancel anytime, no contracts"
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 sm:space-x-4"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs sm:text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base sm:text-lg">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4"
            >
              {/* Get Started Form Button */}
              <ContactForm
                trigger={
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="group h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base bg-white text-primary hover:bg-white/90 relative overflow-hidden hover:scale-105 active:scale-95 transition-transform w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Get Started Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                }
              />

              {/* Calendly Link in New Tab */}
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/60 text-white hover:bg-white/20 hover:border-white/80 hover:text-white h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base backdrop-blur-sm hover:scale-105 active:scale-95 transition-transform w-full sm:w-auto shadow-lg"
              >
                <a
                  href="https://calendly.com/aliasemedia/meeting-with-team-aliase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule Call
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            {/* Background decoration */}
            <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-2xl sm:rounded-3xl blur-2xl"></div>
            
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative z-10"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1585862435569-8a0ac1b32921?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBzdWNjZXNzJTIwYnVzaW5lc3MlMjBncm93dGh8ZW58MXx8fHwxNzU2NTg4NTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Real estate agent success and business growth with professional achievements"
                className="rounded-2xl sm:rounded-3xl w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover shadow-2xl border border-primary-foreground/20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary-foreground/10 rounded-2xl sm:rounded-3xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
