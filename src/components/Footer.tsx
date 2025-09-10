import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { motion } from "motion/react";
import Logo from "./Logo";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, url: "https://www.facebook.com/share/19a5hXq2ET/?mibextid=wwXIfr" },
    { icon: Instagram, url: "https://www.instagram.com/aliasemedia?igsh=MXZicHU5MW81MG55bQ==" },
    { icon: Linkedin, url: "https://www.linkedin.com/company/aliase-media" },
    { icon: Twitter, url: "#" },
  ];

  return (
    <footer className="bg-background border-t border-border/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-48 h-48 sm:w-80 sm:h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* About Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8 col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <div>
              <Logo size="md" className="sm:hidden mb-4" />
              <Logo size="lg" className="hidden sm:block mb-6" />
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                Helping real estate professionals grow their business through targeted lead generation and digital marketing.
              </p>
            </div>
            
            <div className="flex space-x-4 sm:space-x-6">
              {socialLinks.map(({ icon: Icon, url }, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-card border border-border rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer group hover:border-primary/50 transition-all duration-300"
                >
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg sm:text-xl font-semibold tracking-tight mb-6 sm:mb-8 text-foreground">Services</h4>
            <ul className="space-y-3 sm:space-y-4 text-muted-foreground">
              {[
                "Lead Generation",
                "Social Media Marketing", 
                "Google Ads Management",
                "Lead Qualification",
                "Performance Analytics"
              ].map((service, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="hover:text-primary transition-colors duration-300 text-base sm:text-lg">
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg sm:text-xl font-semibold tracking-tight mb-6 sm:mb-8 text-foreground">Company</h4>
            <ul className="space-y-3 sm:space-y-4 text-muted-foreground">
              {[
                {key: "About Us", link: "#ctaSection"},
                {key: "Services", link: "#services"},
                {key: "Plans", link: "#pricing"}
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href={item.link} className="hover:text-primary transition-colors duration-300 text-base sm:text-lg">
                    {item.key}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg sm:text-xl font-semibold tracking-tight mb-6 sm:mb-8 text-foreground">Contact Info</h4>
            <div className="space-y-4 sm:space-y-6 text-muted-foreground">
              {[
                { icon: Phone, text: "+1 (914) 415-1058" },
                { icon: Mail, text: "hello@aliasemedia.com" },
                { icon: MapPin, text: "Upstate NewYork, NY 12834", multiline: true }
              ].map((contact, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-start space-x-3 sm:space-x-4 group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-card border border-border rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 transition-all duration-300">
                    <contact.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <span className="text-base sm:text-lg leading-relaxed whitespace-pre-line">
                    {contact.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-border/50 mt-12 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 lg:pt-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-base sm:text-lg text-center md:text-left">
              © 2025 Aliase Media. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-8">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  whileHover={{ y: -2 }}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-base sm:text-lg"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
