import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export default function GlassMaterial() {
  const groupRef = useRef<Group>(null!)
  const sphere1Ref = useRef<any>(null!)
  const sphere2Ref = useRef<any>(null!)
  const sphere3Ref = useRef<any>(null!)

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }

    if (sphere1Ref.current) {
      sphere1Ref.current.rotation.y += delta * 0.5
      sphere1Ref.current.rotation.x += delta * 0.3
    }

    if (sphere2Ref.current) {
      sphere2Ref.current.position.y = 1 + Math.sin(time * 1.2) * 0.3
      sphere2Ref.current.rotation.y -= delta * 0.4
    }

    if (sphere3Ref.current) {
      sphere3Ref.current.rotation.z += delta * 0.6
      sphere3Ref.current.rotation.x -= delta * 0.4
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#ff6b6b" />
      <pointLight position={[5, -5, 5]} intensity={0.8} color="#4ecdc4" />

      {/* 高透明玻璃球 */}
      <mesh ref={sphere1Ref} position={[-2.5, 0, 0]} castShadow>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0}
          transmission={0.95}
          thickness={1.5}
          ior={1.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* 有色玻璃球 */}
      <mesh ref={sphere2Ref} position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhysicalMaterial
          color="#4ecdc4"
          metalness={0}
          roughness={0}
          transmission={0.9}
          thickness={2}
          ior={1.4}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 彩色玻璃球 */}
      <mesh ref={sphere3Ref} position={[2.5, 0, 0]} castShadow>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshPhysicalMaterial
          color="#ff6b6b"
          metalness={0}
          roughness={0}
          transmission={0.92}
          thickness={1.8}
          ior={1.6}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* 地面 */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#2d3748" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* 反射球 */}
      <mesh position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial
          color="#4a5568"
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  )
}
