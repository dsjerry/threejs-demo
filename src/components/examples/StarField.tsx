import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points } from 'three'

interface StarFieldProps {
  starCount?: number
  radius?: number
  twinkleSpeed?: number
  starSize?: number
  color?: string
}

export default function StarField({
  starCount = 2000,
  radius = 50,
  twinkleSpeed = 1,
  starSize = 0.5,
  color = '#ffffff'
}: StarFieldProps) {
  const pointsRef = useRef<Points>(null!)
  
  // 创建星星位置
  const positions = useMemo(() => {
    const positions = new Float32Array(starCount * 3)
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      
      // 在球体内随机分布
      const r = Math.random() * radius
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = r * Math.cos(phi)
    }
    
    return positions
  }, [starCount, radius])

  // 创建闪烁效果的透明度数组
  const opacities = useMemo(() => {
    const opacities = new Float32Array(starCount)
    for (let i = 0; i < starCount; i++) {
      opacities[i] = Math.random()
    }
    return opacities
  }, [starCount])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime * twinkleSpeed
      
      // 更新透明度实现闪烁效果
      const material = pointsRef.current.material as any
      if (material.uniforms && material.uniforms.time) {
        material.uniforms.time.value = time
      }
      
      // 缓慢旋转整个星空
      pointsRef.current.rotation.y = time * 0.05
      pointsRef.current.rotation.x = time * 0.02
    }
  })

  return (
    <group>
      {/* 深空背景色 */}
      <color attach="background" args={['#000011']} />
      
      {/* 微弱的环境光 */}
      <ambientLight intensity={0.1} />
      
      {/* 星星粒子 */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-opacity"
            count={starCount}
            array={opacities}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={starSize}
          color={color}
          transparent
          opacity={0.8}
          sizeAttenuation={false}
          vertexColors={false}
        />
      </points>
      
      {/* 添加一些星云效果 */}
      <mesh position={[20, 10, -30]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial 
          color="#4a0e4e" 
          transparent 
          opacity={0.1}
        />
      </mesh>
      
      <mesh position={[-25, -15, 20]}>
        <sphereGeometry args={[12, 32, 32]} />
        <meshBasicMaterial 
          color="#0e2a4a" 
          transparent 
          opacity={0.08}
        />
      </mesh>
      
      <mesh position={[0, 30, -40]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial 
          color="#4a2a0e" 
          transparent 
          opacity={0.06}
        />
      </mesh>
    </group>
  )
}
