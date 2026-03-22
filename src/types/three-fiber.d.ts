import { extend } from '@react-three/fiber'
import * as THREE from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any
      boxGeometry: any
      sphereGeometry: any
      planeGeometry: any
      meshStandardMaterial: any
      meshBasicMaterial: any
      ambientLight: any
      directionalLight: any
      pointLight: any
      spotLight: any
      group: any
    }
  }
}

export {}
