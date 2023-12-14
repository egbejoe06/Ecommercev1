import { createStore } from 'vuex';
import productdetails from './modules/productdetails'
import product from './modules/product'
import VuexPersistence from 'vuex-persist';

const vuexPersist = new VuexPersistence({
  key: 'my-app-key',
  storage: window.localStorage,
});

const store = createStore({
  modules:{
    productdetails,
    product,
  },
  plugins: [vuexPersist.plugin],
});

export default store;
