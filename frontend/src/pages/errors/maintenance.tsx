import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Maintenance() {
  const { t } = useTranslation();

  const handleCheckAgain = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000g'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23eab308' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              x: [-10, 10],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-sm" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-lg w-full text-center relative z-10">
        {/* Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Badge
            variant="outline"
            className="border-yellow-200 text-yellow-600 bg-yellow-50/50 backdrop-blur-sm px-4 py-2 text-sm font-medium"
          >
            ⚡ wleci-core Platform
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          {/* Maintenance Icon with Glow Effect */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="mx-auto w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-yellow-500/20 border border-yellow-200/50 backdrop-blur-sm relative"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-3xl blur-xl" />

            <motion.svg
              className="w-16 h-16 text-yellow-600 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </motion.svg>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            {t("maintenance.heading")}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            {t("maintenance.description")}
          </motion.p>

          {/* Estimated Time Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-yellow-50/80 backdrop-blur-sm border border-yellow-200 rounded-2xl p-6 mb-8 shadow-lg"
          >
            <div className="flex items-center justify-center space-x-2 text-yellow-800">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold">
                {t("maintenance.estimated_time")}
              </span>
            </div>
            <p className="text-yellow-700 font-medium mt-2">
              {t("maintenance.duration")}
            </p>
          </motion.div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-8"
        >
          <Button
            onClick={handleCheckAgain}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-500/25 text-lg"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>{t("maintenance.check_again")}</span>
            </div>
          </Button>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-4"
        >
          <p className="text-gray-500 font-medium">
            {t("maintenance.apology")}
          </p>

          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-lg">
            <p className="text-sm text-gray-600 mb-2">
              {t("maintenance.contact_text")}
            </p>
            <a
              href={`mailto:${t("maintenance.contact_email")}`}
              className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200 group"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="border-b border-yellow-600/30 group-hover:border-yellow-600 transition-colors duration-200">
                {t("maintenance.contact_email")}
              </span>
            </a>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8"
        >
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "65%" }}
              transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Postęp prac: ~65%</p>
        </motion.div>
      </div>
    </div>
  );
}
