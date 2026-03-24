import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, DepthOfField, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing'
import { Group } from 'three'

export default function DepthOfFieldEffect() {
  const groupRef = useRef<Group>(null!)
  const sphere1Ref = useRef<any>(null!)
  const sphere2Ref = useRef<any>(null!)
  const sphere3Ref = useRef<any>(null!)
  const sphere4Ref = useRef<any>(null!)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.1 * 0.1
    }

    if (sphere1Ref.current) {
      sphere1Ref.current.position.x = Math.cos(time * 0.5) * 5
      sphere1Ref.current.position.z = Math.sin(time * 0.5) * 5
    }

    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.cos(time * 0.5 + Math.PI) * 5
      sphere2Ref.current.position.z = Math.sin(time * 0.5 + Math.PI) * 5
    }

    if (sphere3Ref.current) {
      sphere3Ref.current.position.y = Math.sin(time) * 0.5
      sphere3Ref.current.position.x = Math.cos(time * 1.5) * 2
      sphere3Ref.current.position.z = Math.sin(time * 1.5) * 2
    }

    if (sphere4Ref.current) {
      sphere4Ref.current.position.y = 1.5
      sphere4Ref.current.rotation.y += 0.2
    }
  })

  return (
    <group>
      <group ref={groupRef}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />

        {/* 焦点物体 - 中心的发光球 */}
        <mesh ref={sphere4Ref} position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshBasicMaterial color="#ffffff" />
          <pointLight intensity={1.5} color="#ffffff" />
        </mesh>

        {/* 轨道上的物体 */}
        <mesh ref={sphere1Ref} position={[5, 0, 0]} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ff6b6b" roughness={0.3} metalness={0.7} />
        </mesh>

        <mesh ref={sphere2Ref} position={[-5, 0, 0]} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#4ecdc4" roughness={0.3} metalness={0.7} />
        </mesh>

        <mesh ref={sphere3Ref} position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#ffe66d" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* 周围的小圆柱 */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const x = Math.cos(angle) * 7
          const z = Math.sin(angle) * 7
          return (
            <mesh key={i} position={[x, -1, z]} castShadow>
              <cylinderGeometry args={[0.2, 0.2, 3]} />
              <meshStandardMaterial color="#8b5cf6" roughness={0.4} metalness={0.6} />
            </mesh>
          )
        })}

        {/* 周围的光环 */}
        {[...Array(5)].map((_, i) => {
          const angle = (i / 5) * Math.PI * 2
          const x = Math.cos(angle) * 10
          const z = Math.sin(angle) * 10
          return (
            <mesh key={`ring-${i}`} position={[x, 1.5, z]} castShadow>
              <torusGeometry args={[0.3, 0.1, 16, 32]} />
              <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.7} />
            </mesh>
          )
        })}

        {/* 地面 */}
        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.2} />
        </mesh>
      </group>

      {/* 后处理效果 */}
      <EffectComposer>
        <DepthOfField
          focusDistance={0.02}
          focalLength={0.05}
          bokehScale={8}
        />
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
        />
        <Vignette darkness={0.5} offset={0.3} />
        <ToneMapping adaptive={false} />
      </EffectComposer>
    </group>
  )
}
