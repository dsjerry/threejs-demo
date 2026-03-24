import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export default function FireParticles() {
  const pointsRef = useRef<any>(null!)
  const lightRef = useRef<any>(null!)

  const particleCount = 500

  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 0.5
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = Math.random() * 3
      positions[i3 + 2] = Math.sin(angle) * radius

      const heightFactor = Math.random()
      if (heightFactor < 0.3) {
        colors[i3] = 1.0
        colors[i3 + 1] = 0.1
        colors[i3 + 2] = 0.0
      } else if (heightFactor < 0.6) {
        colors[i3] = 1.0
        colors[i3 + 1] = 0.4 + Math.random() * 0.3
        colors[i3 + 2] = 0.0
      } else if (heightFactor < 0.9) {
        colors[i3] = 1.0
        colors[i3 + 1] = 0.7 + Math.random() * 0.3
        colors[i3 + 2] = 0.0
      } else {
        colors[i3] = 1.0
        colors[i3 + 1] = 1.0
        colors[i3 + 2] = 0.8 + Math.random() * 0.2
      }

      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = 0.02 + Math.random() * 0.03
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
    }

    return { positions, colors, velocities }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array
      const colors = pointsRef.current.geometry.attributes.color.array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        positions[i3] += velocities[i3] + Math.sin(state.clock.elapsedTime * 5 + i) * 0.002
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2] + Math.cos(state.clock.elapsedTime * 5 + i) * 0.002

        if (positions[i3 + 1] > 3.5) {
          const angle = Math.random() * Math.PI * 2
          const radius = Math.random() * 0.5
          positions[i3] = Math.cos(angle) * radius
          positions[i3 + 1] = 0
          positions[i3 + 2] = Math.sin(angle) * radius

          const heightFactor = Math.random()
          if (heightFactor < 0.3) {
            colors[i3] = 1.0
            colors[i3 + 1] = 0.1
            colors[i3 + 2] = 0.0
          } else if (heightFactor < 0.6) {
            colors[i3] = 1.0
            colors[i3 + 1] = 0.4 + Math.random() * 0.3
            colors[i3 + 2] = 0.0
          } else if (heightFactor < 0.9) {
            colors[i3] = 1.0
            colors[i3 + 1] = 0.7 + Math.random() * 0.3
            colors[i3 + 2] = 0.0
          } else {
            colors[i3] = 1.0
            colors[i3 + 1] = 1.0
            colors[i3 + 2] = 0.8 + Math.random() * 0.2
          }
        }

        const fadeOut = 1.0 - (positions[i3 + 1] / 3.5)
        colors[i3] = colors[i3] * fadeOut + 0.5 * (1 - fadeOut)
        colors[i3 + 1] = colors[i3 + 1] * fadeOut + 0.5 * (1 - fadeOut)
        colors[i3 + 2] = colors[i3 + 2] * fadeOut + 0.3 * (1 - fadeOut)
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.geometry.attributes.color.needsUpdate = true
    }

    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 10) * 0.5
    }
  })

  return (
    <group>
      <ambientLight intensity={0.1} />
      <pointLight ref={lightRef} position={[0, 1, 0]} intensity={2} color="#ff6b00" distance={10} decay={2} />

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} blending={2} depthWrite={false} />
      </points>

      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.8, 0.6, 32]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ffaa00" />
        <pointLight intensity={1.5} color="#ff6600" distance={5} />
      </mesh>

      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>
    </group>
  )
}
