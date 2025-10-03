import { motion } from "motion/react";
import { X, Check, ArrowRight, AlertTriangle, Clock, Users, Zap, Shield, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const problems = [
  {
    title: "Manual Internship Hunt",
    description: "Students struggle to find genuine internships and opportunities",
    icon: Clock,
  },
  {
    title: "Zero Mentorship",
    description: "Lack of proper mentorship and progress monitoring systems",
    icon: Users,
  },
  {
    title: "Fake Certificates",
    description: "Unverified programs and low-quality fake certificates in market",
    icon: AlertTriangle,
  },
  {
    title: "Limited Opportunities",
    description: "Limited industry tie-ups and collaboration opportunities",
    icon: X,
  },
  {
    title: "No Credit System",
    description: "No NEP-compliant credit integration with academic curriculum",
    icon: AlertTriangle,
  },
];

const solutions = [
  {
    title: "Verified Companies",
    description: "Direct access to verified companies and genuine industry internships",
    icon: Shield,
  },
  {
    title: "Faculty Dashboard",
    description: "Complete faculty dashboards for real-time mentorship and tracking",
    icon: CheckCircle,
  },
  {
    title: "Auto Reports",
    description: "Automated logbook generation and NEP-compliant reports",
    icon: Zap,
  },
  {
    title: "Industry Collaboration",
    description: "Strong college-industry collaboration and networking opportunities",
    icon: Check,
  },
  {
    title: "Credit Integration",
    description: "Seamless internship credits integrated with academic structure",
    icon: CheckCircle,
  },
];

export const ComparisonSection = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 heading-primary">
            From Manual Chaos to Smart Automation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We've eliminated the traditional pain points and built a seamless,
            automated ecosystem for career development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto relative">
          {/* Problems Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-semibold">Traditional Problems</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-destructive">The Problems</h3>
            </motion.div>

            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="animate-fade-in"
                >
                  <Card className="p-6 flex items-start gap-5 border-0 shadow-lg hover:shadow-xl transition-smooth bg-card">
                    <div className="flex-shrink-0 p-4 bg-destructive/10 rounded-2xl">
                      <Icon className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-card-foreground font-bold text-lg mb-1">{problem.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{problem.description}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
                <Check className="w-4 h-4" />
                <span className="text-sm font-semibold">Our Solutions</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary">Smart Automation</h3>
            </motion.div>

            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="animate-fade-in"
                >
                  <Card className="p-6 flex items-start gap-5 border-0 shadow-lg hover:shadow-xl transition-smooth bg-card">
                    <div className="flex-shrink-0 p-4 bg-primary/10 rounded-2xl">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-card-foreground font-bold text-lg mb-1">{solution.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{solution.description}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
