import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

export default function FogEffect() {
  const groupRef = useRef<Group>(null!)
  const cube1Ref = useRef<Mesh>(null!)
  const cube2Ref = useRef<Mesh>(null!)
  const cube3Ref = useRef<Mesh>(null!)
  const cube4Ref = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }

    if (cube1Ref.current) {
      cube1Ref.current.position.y = 0.5 + Math.sin(time * 0.8) * 0.3
      cube1Ref.current.rotation.y += delta * 0.3
    }

    if (cube2Ref.current) {
      cube2Ref.current.position.y = 0.5 + Math.sin(time * 1.2 + 1) * 0.4
      cube2Ref.current.rotation.x += delta * 0.4
    }

    if (cube3Ref.current) {
      cube3Ref.current.position.y = 0.5 + Math.sin(time * 1.5 + 2) * 0.35
      cube3Ref.current.rotation.z += delta * 0.35
    }

    if (cube4Ref.current) {
      cube4Ref.current.position.y = 0.5 + Math.sin(time * 1 + 3) * 0.25
      cube4Ref.current.rotation.y -= delta * 0.25
    }
  })

  return (
    <group>
      {/* 指数雾效 */}
      <fog attach="fog" args={['#1a1a2e', 5, 25]} />

      <group ref={groupRef}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ff6b6b" />

        {/* 近处的红色立方体 */}
        <mesh ref={cube1Ref} position={[-2, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ff6b6b" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* 中间的绿色立方体 */}
        <mesh ref={cube2Ref} position={[0, 0.5, -2]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#10b981" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* 中间的蓝色立方体 */}
        <mesh ref={cube3Ref} position={[2, 0.5, -1]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.35} metalness={0.65} />
        </mesh>

        {/* 远处的黄色立方体 */}
        <mesh ref={cube4Ref} position={[0, 0.5, -6]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.45} metalness={0.55} />
        </mesh>

        {/* 更远的物体 */}
        {[...Array(6)].map((_, i) => (
          <mesh
            key={`far-${i}`}
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 8,
              0.5,
              Math.sin((i / 6) * Math.PI * 2) * 8 - 5
            ]}
            castShadow
          >
            <cylinderGeometry args={[0.3, 0.3, 1.5]} />
            <meshStandardMaterial color="#8b5cf6" roughness={0.4} metalness={0.6} />
          </mesh>
        ))}

        {/* 地面 */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#1e1e2e" roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}
