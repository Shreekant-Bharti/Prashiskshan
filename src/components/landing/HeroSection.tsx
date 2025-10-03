import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { EmailDialog } from "./EmailDialog";

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loopCount, setLoopCount] = useState(0);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const handleVideoEnded = () => {
    if (loopCount < 3 && videoRef.current) {
      setLoopCount(prev => prev + 1);
      videoRef.current.play();
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Glassmorphism overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/70 backdrop-blur-[2px]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-20 h-20 rounded-2xl gradient-primary opacity-20 blur-xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full gradient-accent opacity-20 blur-xl"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Transforming Career Journeys</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 leading-tight"
          >
            <span className="font-black bg-gradient-to-br from-purple-300 via-purple-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(196,181,253,0.8)]">
              Campus
            </span>
            <span className="font-bold italic bg-gradient-to-br from-purple-200 via-pink-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(221,214,254,0.8)]">
              2
            </span>
            <span className="font-extrabold bg-gradient-to-br from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(153,246,228,0.8)]">
              Career
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] animate-fade-in"
          >
            Bridging Skills with Opportunities
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto drop-shadow-md"
          >
            One-stop internship and career readiness platform for students, colleges, and industries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              variant="glass" 
              size="xl" 
              className="group hover:scale-105 transition-smooth shadow-glow"
              onClick={() => setEmailDialogOpen(true)}
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
            <Button variant="glass" size="xl" className="hover:scale-105 transition-smooth">
              Explore Features
            </Button>
          </motion.div>

          <EmailDialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen} />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "500+", label: "Partner Companies" },
              { value: "50K+", label: "Active Students" },
              { value: "99.2%", label: "Success Rate" },
              { value: "15min", label: "Quick Setup" },
            ].map((stat, index) => (
              <div key={index} className="glass-dark rounded-2xl p-6 text-white">
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
