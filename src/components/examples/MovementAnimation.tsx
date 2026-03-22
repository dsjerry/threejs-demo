import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

export default function MovementAnimation() {
  const groupRef = useRef<Group>(null!)
  const cube1Ref = useRef<Mesh>(null!)
  const cube2Ref = useRef<Mesh>(null!)
  const cube3Ref = useRef<Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // 线性移动
    if (cube1Ref.current) {
      cube1Ref.current.position.x = Math.sin(time) * 3
    }

    // 圆形轨道
    if (cube2Ref.current) {
      cube2Ref.current.position.x = Math.cos(time * 0.8) * 2
      cube2Ref.current.position.z = Math.sin(time * 0.8) * 2
      cube2Ref.current.position.y = 1 + Math.sin(time * 2) * 0.5
    }

    // 8字形轨道
    if (cube3Ref.current) {
      cube3Ref.current.position.x = Math.sin(time * 0.6) * 2.5
      cube3Ref.current.position.z = Math.sin(time * 1.2) * 1.5
      cube3Ref.current.rotation.y = time * 2
    }
  })

  return (
    <group ref={groupRef}>
      {/* 环境光 */}
      <ambientLight intensity={0.4} />
      
      {/* 方向光 */}
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      
      {/* 线性移动的立方体 */}
      <mesh ref={cube1Ref} position={[0, 1, 2]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* 圆形轨道的球体 */}
      <mesh ref={cube2Ref} position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* 8字形轨道的圆锥 */}
      <mesh ref={cube3Ref} position={[0, 0.5, -2]} castShadow>
        <coneGeometry args={[0.4, 1, 32]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      
      {/* 轨道可视化 */}
      {/* 线性轨道 */}
      <mesh position={[0, 0.9, 2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 6]} />
        <meshBasicMaterial color="#94a3b8" />
      </mesh>
      
      {/* 圆形轨道 */}
      <mesh position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#94a3b8" />
      </mesh>
      
      {/* 地面 */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
    </group>
  )
}
