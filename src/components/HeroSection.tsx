import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Phone, Play } from "lucide-react";
import { motion } from "motion/react";
import ClickUpForm from "./ClickUpForm";
import heroOfficeImage from 'figma:asset/17b0986c40e45febb2cfe97cfad53fe6667462a2.png';

export default function HeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-card">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-brand-black/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-primary/12 via-brand-red-light/8 to-brand-black/6 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center min-h-[calc(100vh-10rem)]">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8 sm:space-y-12 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Badge variant="secondary" className="w-fit text-xs tracking-wide bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors whitespace-normal">
                🔥 NO RISK - You Pay Nothing Before, Only After Getting The Lease
              </Badge>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground leading-[0.9] sm:leading-[0.85]">
                Premium Real Estate
                <br />
                <span className="text-gradient-red">
                  Lead Generation 
                </span>
                <br />
                <span className="text-muted-foreground font-light">That Converts.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Get high-quality real estate leads that turn into closed deals. Our proven lead generation system delivers qualified prospects directly to your inbox - no upfront costs, pay only when you get results.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <ClickUpForm
                trigger={
                  <Button size="lg" className="group h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base bg-primary hover:bg-primary/90 relative overflow-hidden w-full sm:w-auto">
                    <span className="relative z-10 flex items-center justify-center">
                      Get Quality Real Estate Leads
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 gradient-red-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                }
              />
              {/* <ContactForm
                trigger={ */}
                  <Button variant="outline" size="lg" className="group h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base border-border hover:border-primary/50 hover:bg-primary/5 w-full sm:w-auto">
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
                {/* } */}
              {/* /> */}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8"
            >
              <div className="space-y-2 group text-center sm:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">2000+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Real Estate Leads Generated</div>
              </div>
              <div className="space-y-2 group text-center sm:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">97%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Qualified Lead Quality</div>
              </div>
              <div className="space-y-2 group text-center sm:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">5x</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Sales Conversion ROI</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-brand-red-light/10 to-brand-black/5 rounded-2xl sm:rounded-3xl blur-xl"></div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="relative z-10 h-full"
            >
              <ImageWithFallback
                src={heroOfficeImage}
                alt="Modern professional office workspace with computers and business setup for real estate lead generation"
                className="rounded-2xl sm:rounded-3xl w-full h-full object-cover shadow-2xl border border-border/20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10 rounded-2xl sm:rounded-3xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}