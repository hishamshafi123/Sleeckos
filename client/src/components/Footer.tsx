import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@sleeckos.com", label: "Email" }
  ]

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "Courses", href: "#courses" },
        { label: "Pricing", href: "#pricing" },
        { label: "Community", href: "#community" },
        { label: "Documentation", href: "#docs" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Blog", href: "#blog" },
        { label: "Careers", href: "#careers" },
        { label: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#help" },
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Status", href: "#status" }
      ]
    }
  ]

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-foreground mb-4" data-testid="text-footer-brand">
                SleeckOS
              </h3>
              <p className="text-muted-foreground mb-6 max-w-sm" data-testid="text-footer-description">
                Empowering developers to master modern operating system development through comprehensive education and hands-on experience.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="icon"
                    className="hover-elevate"
                    asChild
                    data-testid={`button-social-${social.label.toLowerCase()}`}
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (sectionIndex + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-foreground font-semibold mb-4" data-testid={`text-footer-section-${section.title.toLowerCase()}`}>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-muted-foreground text-sm mb-4 md:mb-0" data-testid="text-copyright">
            © {currentYear} SleeckOS. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a
              href="#privacy"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
              data-testid="link-privacy"
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
              data-testid="link-terms"
            >
              Terms
            </a>
            <a
              href="#cookies"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
              data-testid="link-cookies"
            >
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}