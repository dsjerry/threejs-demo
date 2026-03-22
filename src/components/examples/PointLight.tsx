import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export default function PointLight() {
  const lightRef = useRef<Group>(null!)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (lightRef.current) {
      lightRef.current.position.x = Math.cos(time) * 3
      lightRef.current.position.z = Math.sin(time) * 3
      lightRef.current.position.y = 2 + Math.sin(time * 2) * 0.5
    }
  })

  return (
    <group>
      {/* 移动的点光源 */}
      <group ref={lightRef}>
        <pointLight
          intensity={1}
          distance={10}
          decay={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* 光源可视化 */}
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#ffff00" />
        </mesh>
      </group>
      
      {/* 环境光 */}
      <ambientLight intensity={0.1} />
      
      {/* 场景物体 */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      <mesh position={[2, 0.5, 2]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      <mesh position={[-2, 0.5, -2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      
      <mesh position={[2, 0.5, -2]} castShadow receiveShadow>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      
      {/* 地面 */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
    </group>
  )
}
