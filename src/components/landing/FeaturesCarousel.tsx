import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import studentPortal from "@/assets/student-portal.jpg";
import facultyDashboard from "@/assets/faculty-dashboard.jpg";
import industryCollab from "@/assets/industry-collab.jpg";
import adminPanel from "@/assets/admin-panel.jpg";
import skillHub from "@/assets/skill-hub.jpg";
import autoReports from "@/assets/auto-reports.jpg";
import notifications from "@/assets/notifications.jpg";


const features = [
  {
    title: "Student Portal",
    description: "Comprehensive dashboard for discovering internships, tracking applications, and managing your career development journey with AI-powered recommendations",
    image: studentPortal,
  },
  {
    title: "Faculty Dashboard",
    description: "Monitor student progress, provide mentorship, approve internships, and track outcomes with real-time analytics and communication tools",
    image: facultyDashboard,
  },
  {
    title: "Industry Collaboration",
    description: "Connect with top educational institutions, post opportunities, recruit talented students, and build lasting partnerships with colleges",
    image: industryCollab,
  },
  {
    title: "Admin Panel",
    description: "Complete system administration with user management, analytics, reporting, and configuration controls for seamless ecosystem management",
    image: adminPanel,
  },
  {
    title: "Skill Hub",
    description: "Access curated learning resources, skill development programs, certifications, and training materials to enhance career readiness",
    image: skillHub,
  },
  {
    title: "Auto Reports",
    description: "Generate NEP-compliant reports, logbooks, and certificates automatically with built-in templates and customizable formats",
    image: autoReports,
  },
  {
    title: "Notifications",
    description: "Stay updated with real-time alerts for applications, approvals, deadlines, and important updates across all devices",
    image: notifications,
  },
];

export const FeaturesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 heading-features">
            Features Showcase
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive suite of tools designed to streamline career development
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Carousel Container */}
          <div className="relative rounded-3xl overflow-hidden glass p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-elegant group">
                  <img
                    src={features[currentIndex].image}
                    alt={features[currentIndex].title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Feature {currentIndex + 1} of {features.length}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                    {features[currentIndex].title}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {features[currentIndex].description}
                  </p>

                  <Button variant="hero" size="lg" className="group">
                    Learn More
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <Button
                variant="glass"
                size="icon"
                onClick={goToPrevious}
                className="pointer-events-auto rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="glass"
                size="icon"
                onClick={goToNext}
                className="pointer-events-auto rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-12 gradient-primary"
                    : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
