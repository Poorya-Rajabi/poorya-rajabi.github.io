import * as THREE from 'three'
import { mapState } from 'vuex'
import gsap from 'gsap'

export default {
  computed: {
    ...mapState(['boxTextures'])
  },
  methods: {
    createFirstSection() {
      this.createTheEarth()

      this.createGlasses()
    },
    createTheEarth() {
      const earthGeometry = new THREE.SphereBufferGeometry(5, 32, 32)
      const earthMaterial = new THREE.MeshStandardMaterial({
        map: this.earthTextures.map
      })
      const earth = new THREE.Mesh(earthGeometry, earthMaterial)
      earth.position.z = -20
      this.scene.add(earth)

      gsap.to(
        earth.rotation,
        { y: Math.PI * 2, repeat: -1, duration: 60, ease: 'none' })
      gsap.to(
        earth.position,
        { z: -100, duration: 120, ease: 'none' })
    },
    createGlasses() {
      const glassesGeometry = new THREE.PlaneBufferGeometry(14.5, 2.5)
      const glassesMaterial = new THREE.MeshPhysicalMaterial({
        roughness: 0.15,
        metalness: 0.5,
        transmission: 1,
        thickness: 0, // Add refraction!
      })
      const glasses = new THREE.Mesh(glassesGeometry, glassesMaterial)
      glasses.position.set(-2, 0, 9.13)
      this.scene.add(glasses)
    }
  },
}
