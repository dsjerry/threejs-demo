import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points } from 'three'

interface RainParticlesProps {
  particleCount?: number
  speed?: number
  area?: number
  color?: string
  size?: number
}

export default function RainParticles({
  particleCount = 1000,
  speed = 2,
  area = 20,
  color = '#87ceeb',
  size = 0.1
}: RainParticlesProps) {
  const pointsRef = useRef<Points>(null!)
  
  // 创建粒子位置和速度
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      // 随机分布在区域内
      positions[i3] = (Math.random() - 0.5) * area
      positions[i3 + 1] = Math.random() * area
      positions[i3 + 2] = (Math.random() - 0.5) * area
      
      // 随机下落速度
      velocities[i] = Math.random() * 0.5 + 0.5
    }
    
    return { positions, velocities }
  }, [particleCount, area])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        // 向下移动
        positions[i3 + 1] -= velocities[i] * speed * delta
        
        // 重置到顶部
        if (positions[i3 + 1] < -area / 2) {
          positions[i3 + 1] = area / 2
          positions[i3] = (Math.random() - 0.5) * area
          positions[i3 + 2] = (Math.random() - 0.5) * area
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      {/* 环境光 */}
      <ambientLight intensity={0.3} />
      
      {/* 方向光模拟阴天 */}
      <directionalLight position={[0, 10, 5]} intensity={0.5} color="#b0c4de" />
      
      {/* 雨滴粒子 */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          color={color}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      
      {/* 地面 */}
      <mesh position={[0, -area / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[area, area]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>
      
      {/* 一些建筑物作为背景 */}
      <mesh position={[-5, 0, -5]} castShadow>
        <boxGeometry args={[2, 4, 2]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>
      
      <mesh position={[5, 0, -3]} castShadow>
        <boxGeometry args={[1.5, 6, 1.5]} />
        <meshStandardMaterial color="#696969" />
      </mesh>
      
      <mesh position={[0, 0, -8]} castShadow>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#a0522d" />
      </mesh>
    </group>
  )
}
