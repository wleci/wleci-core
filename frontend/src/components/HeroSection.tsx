import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Zap, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50/50 via-white to-red-50/30 pt-24 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(239 68 68) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-10 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-gradient-to-r from-red-100 to-red-50 text-red-700 border-red-200 px-4 py-2 text-sm font-medium">
                    {t("public_index.badge")}
                  </Badge>
                  <motion.a
                    href="https://github.com/your-username/wleci-core"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    {t("public_index.github_stars")}
                  </motion.a>
                </div>
              </motion.div>

              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">
                  {t("public_index.title_the")}
                </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-600 animate-gradient">
                  {t("public_index.title_future")}
                </span>{" "}
                <br />
                <span className="text-gray-900">
                  {t("public_index.title_of_backend")}
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl font-light">
                {t("public_index.description")}
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white group px-8 py-4 text-lg font-medium shadow-xl"
                >
                  {t("public_index.start_building")}
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-red-200 text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-medium"
                >
                  {t("public_index.view_docs")}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-8 pt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { icon: Database, key: "postgresql" },
                { icon: Zap, key: "realtime" },
                { icon: Shield, key: "secure" },
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-all">
                    <item.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {t(`public_index.features.${item.key}.label`)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t(`public_index.features.${item.key}.desc`)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right side - Abstract Rocket */}
          <motion.div
            className="relative h-[600px] lg:h-[700px]"
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 15 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            {/* Main Rocket Body */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                y: [0, -20, 0],
                rotate: [15, 18, 15],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Rocket Structure */}
              <div className="relative">
                {/* Main Body */}
                <div className="w-16 h-80 bg-gradient-to-b from-red-500 via-red-600 to-red-700 rounded-t-full rounded-b-lg shadow-2xl relative overflow-hidden">
                  {/* Body Details */}
                  <div className="absolute inset-2 bg-gradient-to-b from-red-400/30 to-transparent rounded-t-full"></div>
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/20 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white/30 rounded-full"></div>

                  {/* Vertical Lines */}
                  <div className="absolute top-0 left-1/4 w-0.5 h-full bg-white/20"></div>
                  <div className="absolute top-0 right-1/4 w-0.5 h-full bg-white/20"></div>
                </div>

                {/* Rocket Fins */}
                <div className="absolute bottom-0 -left-6 w-12 h-20 bg-gradient-to-br from-red-600 to-red-800 transform rotate-12 rounded-bl-lg"></div>
                <div className="absolute bottom-0 -right-6 w-12 h-20 bg-gradient-to-bl from-red-600 to-red-800 transform -rotate-12 rounded-br-lg"></div>

                {/* Engine Flames */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                  animate={{
                    scaleY: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-8 h-16 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 rounded-b-full"></div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                  animate={{
                    scaleY: [1, 1.5, 1],
                    opacity: [0.6, 0.9, 0.6],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.1,
                  }}
                >
                  <div className="w-6 h-20 bg-gradient-to-b from-yellow-300 via-orange-400 to-red-500 rounded-b-full"></div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Abstract Elements */}
            <motion.div
              className="absolute top-20 right-16 w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl transform rotate-45"
              animate={{
                rotate: [45, 225, 45],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute bottom-32 left-8 w-16 h-16 bg-gradient-to-br from-red-300 to-red-500 rounded-full"
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            <motion.div
              className="absolute top-1/2 left-4 w-12 h-12 border-4 border-red-400 rounded-full"
              animate={{
                rotate: 360,
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Particle Trail */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-red-400 rounded-full"
                style={{
                  bottom: `${100 + i * 20}px`,
                  left: `${50 + Math.sin(i) * 30}%`,
                }}
                animate={{
                  y: [0, -40, -80],
                  opacity: [1, 0.5, 0],
                  scale: [1, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Orbital Rings */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-96 h-96 border border-red-200 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute top-1/2 left-1/2 w-80 h-80 border border-red-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Cosmic Background Elements */}
            <div className="absolute inset-0 -z-10">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-red-300 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Floating Emojis */}
            <motion.div
              className="absolute top-16 left-12 text-4xl"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              ⚡
            </motion.div>

            <motion.div
              className="absolute bottom-20 right-20 text-3xl"
              animate={{
                y: [0, -12, 0],
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            >
              💫
            </motion.div>

            <motion.div
              className="absolute top-1/3 right-8 text-2xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              🔥
            </motion.div>

            <motion.div
              className="absolute bottom-1/3 left-6 text-3xl"
              animate={{
                x: [0, 10, 0],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            >
              ✨
            </motion.div>

            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-red-500/20 via-red-600/10 to-transparent rounded-full blur-3xl -z-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
