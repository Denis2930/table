import {data} from '../../server/index'

export const storeCounter = {
    state: () => ({
      enterprises: JSON.parse(localStorage.getItem('enterprises')) || data
    }),
    mutations: {
      setEnterprises(state, data) {
        state.enterprises = data
      }
    },
    actions: {

    }
}