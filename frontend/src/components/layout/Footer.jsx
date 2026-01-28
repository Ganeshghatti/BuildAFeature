// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const footerLinks = {
    Navigation: [
      { name: "Benefits", action: () => scrollToSection("benefits") },
      { name: "How It Works", action: () => scrollToSection("how-it-works") },
      { name: "Tech Stack", action: () => scrollToSection("tech-stack") },
      { name: "Challenges", action: () => scrollToSection("challenges") },
    ],
    Contact: [
      { name: "ganesh@thesquirrel.tech", href: "#" },
      { name: "+91 94496 10077", href: "#" },
      { name: "Bangalore, Karnataka", href: "#" },
    ],
  };

  return (
    <footer className="bg-[#302630] text-gray-400 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-12 md:mb-20 gap-8 md:gap-12">
          {/* Logo Section */}
          <div className="w-full md:w-1/3">
            <Link
              to="/"
              className="flex items-center gap-2 mb-6 md:mb-8 relative"
            >
              <img
                src="/logo.png"
                alt="Buildafeature"
                className="h-8 md:h-12 w-auto object-contain brightness-0 invert absolute -top-2 md:-top-4"
              />
            </Link>
          </div>

          {/* Navigation Columns */}
          <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="font-medium text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
                  {category}
                </h3>
                <ul className="space-y-3 md:space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      {link.action ? (
                        <button
                          onClick={link.action}
                          className="text-gray-300 hover:text-white transition-colors text-left text-sm md:text-base"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-gray-300 hover:text-white transition-colors text-sm md:text-base"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, borderTopWidth: 0 }}
          whileInView={{ opacity: 1, borderTopWidth: "1px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-6 md:pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <span className="text-white font-medium text-sm md:text-base">
              A product of TheSquirrel
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-8 text-white font-medium text-sm md:text-base">
            <a
              href="mailto:hello@buildafeature.com"
              className="hover:text-[#f75d31] transition-colors"
            >
              Delivering Clients with Quality Features
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
