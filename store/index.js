export const state = () => ({
  isLoading: true,
  loadingProgressRatio: 0,
  firstAnimationIsDone: false,
  secondAnimationIsDone: false,
  selectedCompany: null,
  spaceCraftNeedUpdate: false,
  spaceCraftDefaults: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      x: Math.PI * 6,
      y: Math.PI,
      z: 0,
    }
  },
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
  },
  setSelectedCompany(state, company) {
    state.selectedCompany = company
  },
  setSpaceCraftUpdateStatus(state, status) {
    state.spaceCraftNeedUpdate = status
  },
  setSpaceCraftNewValues(state, values) {
    state.spaceCraftDefaults = values
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
