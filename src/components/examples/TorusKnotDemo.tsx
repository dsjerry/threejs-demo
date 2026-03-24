import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export default function TorusKnotDemo() {
  const groupRef = useRef<Group>(null!)
  const knot1Ref = useRef<any>(null!)
  const knot2Ref = useRef<any>(null!)
  const knot3Ref = useRef<any>(null!)

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }

    if (knot1Ref.current) {
      knot1Ref.current.rotation.x += delta * 0.3
      knot1Ref.current.rotation.z += delta * 0.2
    }

    if (knot2Ref.current) {
      knot2Ref.current.position.y = Math.sin(time * 1.5) * 0.5
      knot2Ref.current.rotation.x = time * 0.8
      knot2Ref.current.rotation.z = time * 0.6
    }

    if (knot3Ref.current) {
      knot3Ref.current.rotation.y -= delta * 0.5
      knot3Ref.current.rotation.x -= delta * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4ecdc4" />

      {/* 基础环面结 */}
      <mesh ref={knot1Ref} position={[-4, 0, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
        <meshStandardMaterial
          color="#e74c3c"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* 扁平环面结 */}
      <mesh ref={knot2Ref} position={[0, 0, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[0.8, 0.15, 128, 16, 2, 3]} />
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 细小环面结 */}
      <mesh ref={knot3Ref} position={[4, 0, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[0.6, 0.08, 200, 32, 3, 5]} />
        <meshStandardMaterial
          color="#10b981"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* 地面 */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </mesh>
    </group>
  )
}
