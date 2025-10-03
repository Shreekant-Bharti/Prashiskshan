import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Building2, Users, TrendingUp, Zap, Network, Shield, Award, Sparkles } from "lucide-react";
import { EmailDialog } from "./EmailDialog";
import { useState } from "react";

const stats = [
  { value: "500+", label: "Partner Companies", icon: Building2 },
  { value: "50K+", label: "Active Students", icon: Users },
  { value: "99.2%", label: "Success Rate", icon: TrendingUp },
  { value: "15min", label: "Quick Setup", icon: Zap },
];

const highlights = [
  {
    icon: Network,
    title: "Smart Matching Algorithm",
    description: "AI-powered system matches students with perfect opportunities based on skills and interests",
  },
  {
    icon: Sparkles,
    title: "Real-time Collaboration",
    description: "Seamless communication between students, faculty, and industry partners",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Verified companies and rigorous screening ensure only genuine opportunities",
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "NEP-compliant certifications and credits recognized by top institutions",
  },
];

export const EcosystemSection = () => {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-dark" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [360, 180, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 heading-dark">
            Complete Ecosystem Features
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Everything you need to build a thriving career development platform,
            all in one integrated solution
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-dark rounded-3xl p-6 text-center group cursor-pointer"
            >
              <div className="inline-flex p-3 rounded-2xl gradient-primary mb-4 group-hover:shadow-glow transition-smooth">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-7xl mx-auto">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-dark rounded-3xl p-6 group cursor-pointer"
            >
              <div className="inline-flex p-3 rounded-2xl gradient-accent mb-4 group-hover:shadow-elegant transition-smooth">
                <highlight.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {highlight.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center glass-dark rounded-3xl p-12 max-w-4xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join the Ecosystem?
          </h3>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Start your journey today and experience the future of career development.
            No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="glass" 
              size="xl" 
              className="text-lg"
              onClick={() => setEmailDialogOpen(true)}
            >
              Get Started Free
            </Button>
            <Button variant="ghost" size="xl" className="text-white hover:bg-white/10 text-lg">
              Schedule Demo
            </Button>
          </div>
        </motion.div>

        <EmailDialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen} />
      </div>
    </section>
  );
};
