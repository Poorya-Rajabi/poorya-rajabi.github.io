import * as THREE from 'three'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      dracoLoader: new DRACOLoader(),
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      boxTextures1: {}
    }
  },
  methods: {
    ...mapMutations(['setBoxTextures']),
    loadModels() {
      this.dracoLoader.setDecoderPath('/draco/')
      this.gltfLoader.setDRACOLoader(this.dracoLoader)

      this.loadBox()
    },
    loadBox() {
      this.boxTextures1.color = this.textureLoader.load('/textures/box/color.jpg')
      this.boxTextures1.ambientOcclusion = this.textureLoader.load('/textures/box/ambientOcclusion.jpg')
      this.boxTextures1.displacement = this.textureLoader.load('/textures/box/displacement.jpg')
      this.boxTextures1.normal = this.textureLoader.load('/textures/box/normal.jpg')
      this.boxTextures1.roughness = this.textureLoader.load('/textures/box/roughness.jpg')

      for(let _ of Object.keys(this.boxTextures1)) {
        this.boxTextures1[_].repeat.set( 4, 4 )
        this.boxTextures1[_].wrapS = THREE.RepeatWrapping
        this.boxTextures1[_].wrapT = THREE.RepeatWrapping
      }

      this.setBoxTextures(this.boxTextures1)
    }
  },
}
