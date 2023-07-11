import * as THREE from 'three'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['boxTextures'])
  },
  methods: {
    createFirstSection() {
      // const boxGeometry = new THREE.PlaneBufferGeometry( 3, 3 )
      // const boxMaterial = new THREE.MeshStandardMaterial({
      //   map: this.boxTextures.color,
      //   aoMap: this.boxTextures.ambientOcclusion,
      //   roughnessMap: this.boxTextures.roughness,
      //   normalMap: this.boxTextures.normal,
      //   side: THREE.DoubleSide,
      //   alphaMap: this.boxTextures.alpha,
      //   transparent: true,
      //   metalness: 0,
      //   roughness: 1.2,
      //   aoMapIntensity: 1
      // })
      // // boxMaterial.normalScale.set(0.5, 0.5)
      // const box = new THREE.Mesh(boxGeometry, boxMaterial)
      // this.scene.add(box)
      // // TODO
      // // box.visible = false
    }
  },
}
