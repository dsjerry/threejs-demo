import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface BasicCubeProps {
  rotationSpeed?: number
  scale?: number
  color?: string
  wireframe?: boolean
  enableAnimation?: boolean
}

export default function BasicCube({ 
  rotationSpeed = 0.5, 
  scale = 1, 
  color = '#3b82f6', 
  wireframe = false,
  enableAnimation = true 
}: BasicCubeProps) {
  const meshRef = useRef<Mesh>(null!)

  useFrame((_, delta) => {
    if (meshRef.current && enableAnimation) {
      meshRef.current.rotation.x += delta * rotationSpeed
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow scale={[scale, scale, scale]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  )
}
