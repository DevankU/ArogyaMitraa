"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, MeshDistortMaterial, Float } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three";


// Animated floating orbs
function FloatingOrbs() {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial color="#8b5cf6" distort={0.4} speed={2} transparent opacity={0.7} />
      </mesh>

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[2, 1, -1]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <MeshDistortMaterial color="#a78bfa" distort={0.4} speed={2} transparent opacity={0.7} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.7} floatIntensity={0.7}>
        <mesh position={[-2, -1, -1]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <MeshDistortMaterial color="#c4b5fd" distort={0.4} speed={1.5} transparent opacity={0.7} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.9} floatIntensity={0.8}>
        <mesh position={[1.5, -1.5, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <MeshDistortMaterial color="#818cf8" distort={0.4} speed={1.8} transparent opacity={0.7} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.6}>
        <mesh position={[-1.5, 1.5, 0]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <MeshDistortMaterial color="#6366f1" distort={0.4} speed={1.2} transparent opacity={0.7} />
        </mesh>
      </Float>
    </group>
  )
}

// Main 3D scene
export default function ThreeAnimation() {
  return (
    <div className="three-animation">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={["#170b38"]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c4b5fd" />

        {/* Main elements */}
        <FloatingOrbs />

        {/* Controls */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

