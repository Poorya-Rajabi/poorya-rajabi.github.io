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
    },
    createTheEarth() {
      const earthGeometry = new THREE.SphereBufferGeometry(1, 32, 16)
      const earthMaterial = new THREE.MeshStandardMaterial({
        map: this.earthTextures.map
      })
      const earth = new THREE.Mesh(earthGeometry, earthMaterial)
      earth.position.z = -20
      this.scene.add(earth)

      gsap.to(
        earth.rotation,
        { y: Math.PI * 2, repeat: -1, duration: 60, ease: 'none' })
    }
  },
}
