import { motion } from "motion/react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
} from "lucide-react";

const footerLinks = {
  Company: ["About Us", "Careers", "Press", "Blog"],
  Product: ["Features", "Pricing", "Security", "Roadmap"],
  Resources: ["Documentation", "Help Center", "Community", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border-t border-border/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-smooth group-hover:rotate-12">
                  <GraduationCap className="w-8 h-8 text-primary group-hover:scale-110 transition-smooth" />
                </div>
                <h3 className="text-2xl font-bold heading-primary group-hover:scale-105 transition-smooth">
                  Campus2Career
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Bridging the gap between education and industry through verified
                internships and career development programs.
              </p>
            </motion.div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <a
                href="mailto:contact@campus2career.com"
                className="flex items-center gap-2 hover:text-primary transition-smooth group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
                  <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-smooth" />
                </div>
                <span className="group-hover:translate-x-1 transition-smooth">
                  contact@campus2career.com
                </span>
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-2 hover:text-primary transition-smooth group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
                  <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-smooth" />
                </div>
                <span className="group-hover:translate-x-1 transition-smooth">
                  +91 123 456 7890
                </span>
              </a>
              <div className="flex items-center gap-2 group cursor-pointer hover:text-primary transition-smooth">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
                  <MapPin className="w-4 h-4 text-primary group-hover:scale-110 transition-smooth" />
                </div>
                <span className="group-hover:translate-x-1 transition-smooth">
                  Bangalore, India
                </span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-semibold text-foreground mb-4 relative inline-block">
                {category}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link} className="group">
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-smooth text-sm flex items-center gap-2 hover:translate-x-1"
                    >
                      <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all duration-300"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-border/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-card border border-border hover:border-primary shadow-md hover:shadow-glow transition-smooth group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-10 transition-smooth"></div>
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth relative z-10" />
                </motion.a>
              ))}
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-muted-foreground text-center md:text-right"
            >
              <p className="font-medium">
                © {new Date().getFullYear()} Campus2Career. All rights reserved.
              </p>
              <p className="mt-1 flex items-center justify-center md:justify-end gap-1">
                Campus2Career is presented by{" "}
                <span className="font-semibold text-primary">OptimusEd</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};
