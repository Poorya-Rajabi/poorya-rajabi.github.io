export const state = () => ({
  isLoading: true,
  loadingProgressRatio: 0
})

export const getters = {
  // getCounter(state) {
  //   return state.counter
  // }
}

export const mutations = {
  setProgressRatio(state, progressRatio) {
    state.loadingProgressRatio = progressRatio
  },
  setLoadingStatus(state, status) {
    state.isLoading = status
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
