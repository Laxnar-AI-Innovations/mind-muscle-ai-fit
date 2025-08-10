import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion-3d";

function useThemeColors() {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return {
        primary: "hsl(217.2 91.2% 59.8%)",
        accent: "hsl(199 89% 48%)"
      };
    }
    const styles = getComputedStyle(document.documentElement);
    const p = styles.getPropertyValue("--primary").trim();
    const nb = styles.getPropertyValue("--neon-blue").trim();
    const primary = p ? `hsl(${p})` : "hsl(217.2 91.2% 59.8%)";
    const accent = nb ? `hsl(${nb})` : "hsl(199 89% 48%)";
    return { primary, accent };
  }, []);
}

const Animated3DBackground: React.FC = () => {
  const { primary, accent } = useThemeColors();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas
        className="[&>canvas]:!pointer-events-none"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 12], fov: 55 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />

        <motion.mesh
          position={[-3.5, 1.5, -2]}
          animate={{
            rotation: [0, Math.PI * 2, 0],
            y: [1.5, 2.2, 1.2, 1.5],
          }}
          transition={{ duration: 28, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <icosahedronGeometry args={[2.0, 1]} />
          {/* @ts-expect-error three material props */}
          <meshStandardMaterial color={primary as any} transparent opacity={0.18} roughness={0.4} metalness={0.1} />
        </motion.mesh>

        <motion.mesh
          position={[3.8, -1.2, -3]}
          animate={{
            rotation: [Math.PI / 4, 0, Math.PI],
            x: [-1.2, -0.6, -1.5, -1.2],
          }}
          transition={{ duration: 32, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <dodecahedronGeometry args={[1.6, 0]} />
          {/* @ts-expect-error three material props */}
          <meshStandardMaterial color={accent as any} transparent opacity={0.16} roughness={0.5} metalness={0.05} />
        </motion.mesh>

        <motion.mesh
          position={[0, 0, -6]}
          animate={{
            rotation: [0, Math.PI, Math.PI * 2],
            scale: [1.1, 1.25, 1.1],
          }}
          transition={{ duration: 24, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <torusGeometry args={[3.2, 0.08, 32, 128]} />
          {/* @ts-expect-error three material props */}
          <meshStandardMaterial color={primary as any} transparent opacity={0.08} roughness={0.2} metalness={0.2} />
        </motion.mesh>
      </Canvas>
    </div>
  );
};

export default Animated3DBackground;
