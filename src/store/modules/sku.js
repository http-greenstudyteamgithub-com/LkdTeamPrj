const state = {
  classList: []
}
const mutations = {
  SET_CLASS(state, list) {
    state.classList = list
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
