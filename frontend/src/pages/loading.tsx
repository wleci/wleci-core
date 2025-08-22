import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n";

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50/50 via-white to-red-50/30">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-2xl">W</span>
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              wleci-core
            </span>
            <div className="text-sm text-red-600 font-medium -mt-1">BETA</div>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <div className="relative">
          {/* Main Spinner */}
          <motion.div
            className="w-16 h-16 border-4 border-red-200 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-red-600 rounded-full"></div>
          </motion.div>

          {/* Inner Spinner */}
          <motion.div
            className="absolute top-2 left-2 w-12 h-12 border-2 border-red-100 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent border-t-red-500 rounded-full"></div>
          </motion.div>

          {/* Pulsing Dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-400 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: `${20 + i * 8}px 0px`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.5, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, delay: i * 0.2 },
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-700 text-lg font-medium">
            {t("loading.title")}
          </p>
          <p className="text-gray-500 text-sm">{t("loading.subtitle")}</p>
        </motion.div>

        {/* Progress Dots */}
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-red-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
