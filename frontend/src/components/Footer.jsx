import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const ecoLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Case Studies", "Updates"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Blog", "Press"],
    },
    {
      title: "Resources",
      links: ["Help Center", "Tutorials", "Community", "API Status"],
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black pt-20 pb-10 overflow-hidden">
      {/* Floating eco elements */}
      <div className="absolute -top-20 left-0 w-full h-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Branding Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center">
                <span className="text-2xl">🌎</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                EcoPulse
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Making sustainability measurable, rewarding, and fun for everyone.
            </p>
            <div className="flex gap-4">
              {["twitter", "instagram", "linkedin", "github"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600/20 border border-gray-700 hover:border-emerald-400/30 flex items-center justify-center transition-all"
                >
                  <span className="sr-only">{social}</span>
                  <span className="text-xl">
                    {social === "twitter" && "🐦"}
                    {social === "instagram" && "📸"}
                    {social === "linkedin" && "💼"}
                    {social === "github" && "💻"}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {ecoLinks.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-emerald-300 mb-6">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-emerald-300 mb-6">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe for eco-tips and product updates
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-gray-500"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium shadow-lg hover:shadow-emerald-500/30 transition-all"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} EcoPulse. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-gray-500 hover:text-emerald-300 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-emerald-300 text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-emerald-300 text-sm transition-colors"
            >
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating eco elements at bottom */}
      <div className="absolute -bottom-20 left-0 w-full h-20 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />
    </footer>
  );
}