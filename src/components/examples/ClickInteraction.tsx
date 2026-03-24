import { useRef, useState } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { Group } from 'three'

export default function ClickInteraction() {
  const groupRef = useRef<Group>(null!)
  const [clickedCubes, setClickedCubes] = useState<Set<number>>(new Set())
  const [hoveredCube, setHoveredCube] = useState<number | null>(null)

  const cubeColors = [
    { base: '#ef4444', hover: '#fca5a5', clicked: '#7f1d1d' },
    { base: '#3b82f6', hover: '#93c5fd', clicked: '#1e3a8a' },
    { base: '#10b981', hover: '#6ee7b7', clicked: '#064e3b' },
    { base: '#f59e0b', hover: '#fcd34d', clicked: '#78350f' },
    { base: '#8b5cf6', hover: '#c4b5fd', clicked: '#4c1d95' },
    { base: '#ec4899', hover: '#f9a8d4', clicked: '#831843' },
  ]

  const handleCubeClick = (index: number) => {
    setClickedCubes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6b6b" />

      {/* 可点击的立方体网格 */}
      {[...Array(6)].map((_, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const x = (col - 1) * 2.5
        const z = (row - 0.5) * 2.5
        const isClicked = clickedCubes.has(i)
        const isHovered = hoveredCube === i
        const color = cubeColors[i]

        return (
          <mesh
            key={i}
            position={[x, 0.8, z]}
            castShadow
            receiveShadow
            onClick={(e: ThreeEvent<MouseEvent>) => {
              e.stopPropagation()
              handleCubeClick(i)
            }}
            onPointerOver={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation()
              setHoveredCube(i)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              setHoveredCube(null)
              document.body.style.cursor = 'auto'
            }}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={isClicked ? color.clicked : isHovered ? color.hover : color.base}
              roughness={0.4}
              metalness={0.6}
              emissive={isClicked ? color.base : isHovered ? color.base : '#000000'}
              emissiveIntensity={isClicked ? 0.3 : isHovered ? 0.15 : 0}
            />
          </mesh>
        )
      })}

      {/* 中心指示球 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* 地面 */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#374151" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  )
}
