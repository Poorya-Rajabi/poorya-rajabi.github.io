import * as THREE from 'three'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { mapMutations } from 'vuex'
import scene from "three/examples/jsm/offscreen/scene";

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

      this.loadSpaceshipInside()

      this.loadTars()
    },
    loadSpaceshipInside() {
      this.gltfLoader.load(
        '/models/Spaceship-inside.gltf',
        (gltf) => {
          this.scene.add(gltf.scene)
          gltf.scene.rotation.y = Math.PI * 0.5
          gltf.scene.position.z = 10
        }
      )
    },
    loadTars() {
      this.gltfLoader.load(
        '/models/Spaceship-inside.gltf',
        (gltf) => {
          this.scene.add(gltf.scene)
          gltf.scene.rotation.y = Math.PI * 0.5
          gltf.scene.position.z = 10
        }
      )
    }
  },
}
