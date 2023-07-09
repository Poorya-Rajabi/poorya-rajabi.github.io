export const state = () => ({
  boxTextures: {}
})

export const getters = {
  // getCounter(state) {
  //   return state.counter
  // }
}

export const mutations = {
  setBoxTextures(state, textures) {
    state.boxTextures = textures
  }
}

export const actions = {
  // async fetchCounter({ state }) {
  //   // make request
  //   const res = { data: 10 };
  //   state.counter = res.data;
  //   return res.data;
  // }
}
