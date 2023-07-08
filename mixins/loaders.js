import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default {
  data() {
    return {
      dracoLoader: new DRACOLoader(),
      gltfLoader: new GLTFLoader()
    }
  },
  methods: {
    loadModels() {
      this.dracoLoader.setDecoderPath('/draco/')
      this.gltfLoader.setDRACOLoader(this.dracoLoader)

      this.loadBox()
    },
    loadBox() {

    }
  },
}
