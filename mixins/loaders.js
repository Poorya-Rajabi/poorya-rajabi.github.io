import * as THREE from 'three'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default {
  data() {
    return {
      dracoLoader: new DRACOLoader(),
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
      earthTextures: {},
      environmentMap: null
    }
  },
  methods: {
    loadModels() {
      this.dracoLoader.setDecoderPath('/draco/')
      this.gltfLoader.setDRACOLoader(this.dracoLoader)

      this.loadEarthTexture()

      this.loadCubeTexture()

      this.loadSpaceshipInside()

      this.loadTars()
    },
    loadEarthTexture() {
      this.earthTextures.map = this.textureLoader.load('/textures/earth/earth-map.jpg')
    },
    loadCubeTexture() {
      this.environmentMap = this.cubeTextureLoader.load([
        '/textures/envMap/1/px.png',
        '/textures/envMap/1/nx.png',
        '/textures/envMap/1/py.png',
        '/textures/envMap/1/ny.png',
        '/textures/envMap/1/pz.png',
        '/textures/envMap/1/nz.png'
      ])
      this.environmentMap.encoding = THREE.sRGBEncoding
      // this.scene.background = this.environmentMap
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
        '/models/tars.gltf',
        (gltf) =>
        {
          const model = gltf.scene

          const x1 = model.children.find(mesh => {
            return mesh.name === 'Tars001'
          })
          const x2 = model.children.find(mesh => {
            return mesh.name === 'Tars002'
          })
          const x3 = model.children.find(mesh => {
            return mesh.name === 'Tars003'
          })
          const x4 = model.children.find(mesh => {
            return mesh.name === 'Tars004'
          })

          const tars = new THREE.Group()
          tars.add(x1, x2, x3, x4)
          tars.scale.set(0.5, 0.5, 0.5)
          tars.position.set(-2.12, -0.68, 9.16)

          this.gui.add(tars.position, 'x').min(-20).max(20).step(0.01)
          this.gui.add(tars.position, 'y').min(-20).max(20).step(0.01)
          this.gui.add(tars.position, 'z').min(-20).max(20).step(0.01)

          this.scene.add(tars)
          this.tars = tars

          this.updateAllMaterials()
        }
      )
    },
    updateAllMaterials() {
      this.scene.traverse((child) =>
      {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
          child.material.envMap = this.environmentMap
          child.material.envMapIntensity = 2.5
          child.material.needsUpdate = true
          child.castShadow = true
          child.receiveShadow = true
        }
      })

    }
  },
}
