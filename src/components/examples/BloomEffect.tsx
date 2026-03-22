import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

interface BloomEffectProps {
  bloomIntensity?: number
  bloomRadius?: number
  rotationSpeed?: number
  lightIntensity?: number
  enableBloom?: boolean
}

export default function BloomEffect({
  rotationSpeed = 0.5,
  lightIntensity = 2
}: BloomEffectProps) {
  const groupRef = useRef<Group>(null!)
  const sphere1Ref = useRef<Mesh>(null!)
  const sphere2Ref = useRef<Mesh>(null!)
  const sphere3Ref = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed * 0.2
    }

    if (sphere1Ref.current) {
      sphere1Ref.current.position.x = Math.cos(time) * 3
      sphere1Ref.current.position.z = Math.sin(time) * 3
      sphere1Ref.current.rotation.y += delta * rotationSpeed
    }

    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.cos(time + Math.PI * 2/3) * 3
      sphere2Ref.current.position.z = Math.sin(time + Math.PI * 2/3) * 3
      sphere2Ref.current.rotation.x += delta * rotationSpeed
    }

    if (sphere3Ref.current) {
      sphere3Ref.current.position.x = Math.cos(time + Math.PI * 4/3) * 3
      sphere3Ref.current.position.z = Math.sin(time + Math.PI * 4/3) * 3
      sphere3Ref.current.rotation.z += delta * rotationSpeed
    }
  })

  return (
    <group>
      {/* 场景内容 */}
      <group ref={groupRef}>
        {/* 环境光 */}
        <ambientLight intensity={0.1} />
        
        {/* 中心发光球体 */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#ffffff" />
          <pointLight position={[0, 0, 0]} intensity={lightIntensity} color="#ffffff" />
        </mesh>

        {/* 轨道发光球体 */}
        <mesh ref={sphere1Ref}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#ff6b6b" />
          <pointLight position={[0, 0, 0]} intensity={lightIntensity * 0.8} color="#ff6b6b" />
        </mesh>

        <mesh ref={sphere2Ref}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#4ecdc4" />
          <pointLight position={[0, 0, 0]} intensity={lightIntensity * 0.8} color="#4ecdc4" />
        </mesh>

        <mesh ref={sphere3Ref}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#ffe66d" />
          <pointLight position={[0, 0, 0]} intensity={lightIntensity * 0.8} color="#ffe66d" />
        </mesh>

        {/* 背景几何体 */}
        <mesh position={[0, 0, -8]}>
          <torusGeometry args={[4, 0.1, 16, 100]} />
          <meshStandardMaterial color="#333333" />
        </mesh>

        <mesh position={[0, 0, -8]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4, 0.1, 16, 100]} />
          <meshStandardMaterial color="#333333" />
        </mesh>

        <mesh position={[0, 0, -8]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[4, 0.1, 16, 100]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>

    </group>
  )
}
