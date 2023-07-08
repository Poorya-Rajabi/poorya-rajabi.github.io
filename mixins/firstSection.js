import * as THREE from 'three'

export default {
  methods: {
    createFirstSection() {
      const boxGeometry = new THREE.BoxBufferGeometry(2, 2, 2)
      const boxMaterial = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        metalness: 0,
        roughness: 1,
        aoMapIntensity: 1,
        // map: color,
        // aoMap: ambientOcclusion,
        // displacementMap: height,
        // displacementScale: 0.05,
        // metalnessMap: metalness,
        // roughnessMap: roughness,
        // normalMap: normal,
        // // normalScale.set(0.5, 0.5)
      })
      const box = new THREE.Mesh(boxGeometry, boxMaterial)
      this.scene.add(box)
    }
  },
}
