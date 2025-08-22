import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-red-50 shadow-sm"
    >
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                wleci-core
              </span>
              <div className="text-xs text-red-600 font-medium -mt-1">BETA</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {[
              { key: "features", href: "#features" },
              { key: "pricing", href: "#pricing" },
              { key: "docs", href: "#docs" },
              { key: "community", href: "#community" },
            ].map((item, index) => (
              <motion.a
                key={item.key}
                href={item.href}
                className="relative text-gray-600 hover:text-red-600 transition-all duration-300 font-medium"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
              >
                {t(`navbar.${item.key}`)}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-red-600 hover:bg-red-50 font-medium"
            >
              {t("navbar.sign_in")}
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium px-6 shadow-lg">
                {t("navbar.get_started")}
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-6 space-y-4 border-t border-red-50 mt-4">
            {[
              { key: "features", href: "#features" },
              { key: "pricing", href: "#pricing" },
              { key: "docs", href: "#docs" },
              { key: "community", href: "#community" },
            ].map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="block text-gray-600 hover:text-red-600 transition-colors font-medium"
              >
                {t(`navbar.${item.key}`)}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              <Button
                variant="ghost"
                className="w-full text-gray-600 hover:text-red-600"
              >
                {t("navbar.sign_in")}
              </Button>
              <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white">
                {t("navbar.get_started")}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
