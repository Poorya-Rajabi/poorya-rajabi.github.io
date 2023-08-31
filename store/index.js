export const state = () => ({
  isLoading: true,
  loadingProgressRatio: 0,
  firstAnimationIsDone: false,
  secondAnimationIsDone: false
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
  },
  setFirstAnimationStatus(state) {
    state.firstAnimationIsDone = true
  },
  setSecondAnimationStatus(state) {
    state.secondAnimationIsDone = true
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
