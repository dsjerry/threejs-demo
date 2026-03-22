import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

export default function ScaleAnimation() {
  const groupRef = useRef<Group>(null!)
  const cube1Ref = useRef<Mesh>(null!)
  const cube2Ref = useRef<Mesh>(null!)
  const cube3Ref = useRef<Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // 均匀缩放
    if (cube1Ref.current) {
      const scale = 1 + Math.sin(time * 2) * 0.5
      cube1Ref.current.scale.setScalar(scale)
    }

    // 非均匀缩放
    if (cube2Ref.current) {
      cube2Ref.current.scale.x = 1 + Math.sin(time * 1.5) * 0.8
      cube2Ref.current.scale.y = 1 + Math.cos(time * 2) * 0.6
      cube2Ref.current.scale.z = 1 + Math.sin(time * 1.2) * 0.4
    }

    // 脉冲效果
    if (cube3Ref.current) {
      const pulse = Math.abs(Math.sin(time * 4))
      cube3Ref.current.scale.setScalar(0.5 + pulse * 1.5)
      cube3Ref.current.rotation.y = time * 2
    }
  })

  return (
    <group ref={groupRef}>
      {/* 环境光 */}
      <ambientLight intensity={0.4} />
      
      {/* 方向光 */}
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      
      {/* 均匀缩放的立方体 */}
      <mesh ref={cube1Ref} position={[-3, 1, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* 非均匀缩放的立方体 */}
      <mesh ref={cube2Ref} position={[0, 1, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* 脉冲效果的球体 */}
      <mesh ref={cube3Ref} position={[3, 1, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      
      {/* 参考物体 - 不缩放 */}
      <mesh position={[-3, 1, 2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6b7280" wireframe />
      </mesh>
      
      <mesh position={[0, 1, 2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6b7280" wireframe />
      </mesh>
      
      <mesh position={[3, 1, 2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#6b7280" wireframe />
      </mesh>
      
      {/* 地面 */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
    </group>
  )
}
