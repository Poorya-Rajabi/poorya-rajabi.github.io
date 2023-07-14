import * as THREE from 'three'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

export default {
  data() {
    return {
      dracoLoader: new DRACOLoader(),
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
      earthTextures: {},
      tarsEnv: null
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
      this.tarsEnv = this.cubeTextureLoader.load([
        '/textures/envMap/2/px.png',
        '/textures/envMap/2/nx.png',
        '/textures/envMap/2/py.png',
        '/textures/envMap/2/ny.png',
        '/textures/envMap/2/pz.png',
        '/textures/envMap/2/nz.png'
      ])
      this.tarsEnv.encoding = THREE.sRGBEncoding
    },
    loadSpaceshipInside() {
      this.gltfLoader.load(
        '/models/Spaceship-inside.gltf',
        (gltf) => {
          this.scene.add(gltf.scene)
          gltf.scene.rotation.y = Math.PI * 0.5
          gltf.scene.position.z = 10

          // gsap.to(
          //   gltf.scene.rotation,
          //   { y: Math.PI * 0.3, duration: 3, delay: 1.5 })

          // this.gui.add(gltf.scene.rotation, 'y').min(-Math.PI * 2).max(Math.PI * 2).step(0.1).name('Spaceship.r.y')
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

          // this.gui.add(x1.rotation, 'z').min(-20).max(20).step(0.01).name('x1')
          // this.gui.add(x2.rotation, 'z').min(-20).max(20).step(0.01).name('x2')
          // this.gui.add(x3.rotation, 'z').min(-20).max(20).step(0.01).name('x3')
          // this.gui.add(x4.rotation, 'z').min(-20).max(20).step(0.01).name('x4')

          const tars = new THREE.Group()
          tars.add(x1, x2, x3, x4)
          tars.scale.set(0.5, 0.5, 0.5)
          tars.position.set(-1.93, -0.78, 9.15)

          gsap.to(
            x1.rotation,
            { z: -Math.PI * 0.5, duration: 0.8, delay: 3 })
          gsap.to(
            x3.rotation,
            { z: -Math.PI * 0.2, duration: 0.8, delay: 3 })
          gsap.to(
            x4.rotation,
            { z: -Math.PI * 0.8, duration: 0.8, delay: 3 })


          gsap.to(
            tars.position,
            { x: 5, duration: 3, delay: 3.8 })
          gsap.to(
            tars.rotation,
            { z: -Math.PI * 4, duration: 3, delay: 3.8 })
          // this.gui.add(tars.position, 'x').min(-20).max(20).step(0.01)
          // this.gui.add(tars.position, 'y').min(-20).max(20).step(0.01)
          // this.gui.add(tars.position, 'z').min(-20).max(20).step(0.01)

          this.scene.add(tars)
          this.tars = tars

          this.updateTarsEnvMaterials(tars)
        }
      )
    },
    updateTarsEnvMaterials(tars) {
      tars.traverse((child) => {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
          child.material.envMap = this.tarsEnv
          child.material.envMapIntensity = 2.5
          child.material.needsUpdate = true
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  },
}
