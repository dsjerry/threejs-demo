import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

export default function AnimationDemo() {
  const groupRef = useRef<Group>(null!)
  const cubeRef = useRef<Mesh>(null!)
  const sphereRef = useRef<Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.5
    }

    if (cubeRef.current) {
      cubeRef.current.position.y = Math.sin(time * 2) * 0.5
      cubeRef.current.rotation.x = time
      cubeRef.current.rotation.z = time * 0.5
    }

    if (sphereRef.current) {
      sphereRef.current.position.x = Math.cos(time * 1.5) * 2
      sphereRef.current.position.z = Math.sin(time * 1.5) * 2
      sphereRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.2)
    }
  })

  return (
    <group ref={groupRef}>
      {/* 中心旋转立方体 */}
      <mesh ref={cubeRef} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* 轨道运动球体 */}
      <mesh ref={sphereRef} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {/* 静态环形 */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <mesh key={i} position={[x, 0, z]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.5]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
        )
      })}

      {/* 地面 */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
    </group>
  )
}
