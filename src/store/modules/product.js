import VuexPersistence from 'vuex-persist'

const state =
    {
        Images: [],
        isFavorite: [],
        products: [],
        searchQuery: "",
        fav:[],
      }
     const mutations = {
      SET_SEARCH_QUERY(state, searchQuery) {
        state.searchQuery = searchQuery;
      },
      RESET_SEARCH_QUERY(state) {
        state.searchQuery = "";
      },
      setProduct(state, { data }) {
        state.products = data.products;
        state.Images = {};
        if (state.isFavorite.length === 0) {
            state.isFavorite = [];
            state.products.forEach((product) => {
                state.fav[product.id] = true
                state.isFavorite[product.id] = false;
            });
        } else {
            state.products.forEach((product) => {
                if (!state.fav.hasOwnProperty(product.id)) {
                    state.fav[product.id] = true;
                }
            });
        }
    },    
          toggleFavorite(state, productId) {
            state.isFavorite[productId] = !state.isFavorite[productId];
            if (state.isFavorite[productId]) {
              state.fav[productId] = false;
            } else {
              state.fav[productId] = true;
            }
          },
        }
      const actions= {
        setSearchQuery({ commit }, searchQuery) {
          commit("SET_SEARCH_QUERY", searchQuery);
        },
        resetSearchQuery({ commit }) {
          commit("RESET_SEARCH_QUERY");
        },
        async fetchProduct({ commit }) {
            const skip = 0;
            const limit = 100;
            const url = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
        
            try {
                const response = await fetch(url);
                const data = await response.json();
                commit('setProduct', { data });
              } catch (error) {
                console.error("Error fetching data:", error);
              }
          },
          toggleProductFavorite({ commit }, productId) {
            commit('toggleFavorite', productId);
          },
      }

   const getters= {
    favoriteProducts: (state) => {
      return state.products.filter((product) => state.isFavorite[product.id]);
    },
  
    favoriteProductsArray: (state) => {
      return state.products.filter((product) => state.isFavorite[product.id]);
    },
        search: (state) => state.searchQuery,
        products: state => state.products,
        isFavorite: state => state.isFavorite,
        Images: state => state.Images,
        selectedCategory: state => state.selectedCategory,
        favoriteProducts: (state) => {
          return state.products.filter((product) => state.isFavorite[product.id]);
        },
      }
      const vuexPersist = new VuexPersistence({
        key: 'my-app-key',
        storage: window.localStorage,
        paths: ['isFavorite'],
      });
      export default {
        namespaced: true,
        state,
        mutations,
        actions,
        getters,
        plugins: [vuexPersist.plugin],
      };