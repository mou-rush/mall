"use client";
import { motion } from "framer-motion";

interface SceneImpactProps {
  readonly isActive: boolean;
}

export default function SceneImpact({ isActive }: SceneImpactProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/Partner/Partner_Cover.jpg)",
        }}
        initial={{ scale: 1.05, y: 0 }}
        animate={
          isActive
            ? {
                scale: 1.15,
                y: -20,
              }
            : {}
        }
        transition={{
          scale: { duration: 12, ease: "easeOut" },
          y: { duration: 12, ease: "easeOut" },
        }}
      />

      <div className="absolute inset-0 bg-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,black_90%)]" />

      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 0.3 } : {}}
        transition={{ duration: 2, delay: 1.5 }}
      >
        <motion.div
          className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#FFC72C]/40 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scaleY: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scaleY: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scaleY: [1, 0.9, 1],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_600px_at_center,rgba(255,199,44,0.12)_0%,transparent_70%)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isActive ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 text-center px-6 max-w-7xl">
        <div>
          <div className="mb-20">
            <motion.div
              className="overflow-hidden inline-block"
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              animate={
                isActive
                  ? { opacity: 1, y: 0, rotateX: 0 }
                  : { opacity: 0, y: 80, rotateX: 45 }
              }
              transition={{
                duration: 1.4,
                delay: 1.2,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <motion.h1
                className="text-8xl md:text-[12rem] lg:text-[16rem] font-black uppercase text-white leading-none tracking-[-0.02em]"
                style={{
                  textShadow: "0 0 100px rgba(0,0,0,0.8)",
                }}
                animate={
                  isActive
                    ? {
                        textShadow: [
                          "0 0 100px rgba(0,0,0,0.8)",
                          "0 0 120px rgba(255,199,44,0.3)",
                          "0 0 100px rgba(0,0,0,0.8)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3,
                }}
              >
                Your
              </motion.h1>
            </motion.div>

            <motion.div
              className="overflow-hidden inline-block"
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              animate={
                isActive
                  ? { opacity: 1, y: 0, rotateX: 0 }
                  : { opacity: 0, y: 80, rotateX: 45 }
              }
              transition={{
                duration: 1.4,
                delay: 2,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <motion.h1
                className="text-8xl md:text-[12rem] lg:text-[16rem] font-black uppercase text-white leading-none tracking-[-0.02em] ml-6 md:ml-12"
                style={{
                  textShadow: "0 0 100px rgba(0,0,0,0.8)",
                }}
              >
                Brand
              </motion.h1>
            </motion.div>

            <motion.div
              className="mt-4 md:mt-8 overflow-hidden inline-block"
              initial={{ opacity: 0, scale: 0.7, y: 100 }}
              animate={
                isActive
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.7, y: 100 }
              }
              transition={{
                duration: 1.8,
                delay: 2.8,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <motion.h1
                className="text-9xl md:text-[14rem] lg:text-[20rem] font-black uppercase text-[#FFC72C] leading-none tracking-[-0.03em]"
                style={{
                  textShadow:
                    "0 0 80px rgba(255,199,44,0.6), 0 0 150px rgba(255,199,44,0.4)",
                }}
                animate={
                  isActive
                    ? {
                        textShadow: [
                          "0 0 80px rgba(255,199,44,0.6), 0 0 150px rgba(255,199,44,0.4)",
                          "0 0 120px rgba(255,199,44,0.8), 0 0 200px rgba(255,199,44,0.5)",
                          "0 0 80px rgba(255,199,44,0.6), 0 0 150px rgba(255,199,44,0.4)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4.5,
                }}
              >
                Here
              </motion.h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.5,
              delay: 4.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="inline-block relative"
              animate={
                isActive
                  ? {
                      y: [0, -8, 0],
                    }
                  : {}
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 5,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-[#FFC72C]/20 blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <p
                className="relative text-2xl md:text-4xl lg:text-5xl font-light text-white/70 tracking-[0.15em] uppercase"
                style={{
                  fontVariant: "small-caps",
                  letterSpacing: "0.2em",
                }}
              >
                Mall of America
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 3 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FFC72C] rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
