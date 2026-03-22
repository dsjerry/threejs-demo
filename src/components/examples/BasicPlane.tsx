import { useRef } from 'react'
import { Mesh } from 'three'

export default function BasicPlane() {
  const meshRef = useRef<Mesh>(null!)

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial color="#10b981" />
    </mesh>
  )
}
