import VuexPersistence from 'vuex-persist'

const state =
    {
        Images: [],
        isFavorite: [],
        products: [],
        searchQuery: "",
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
            state.isFavorite = [];
            state.products.forEach((product) => {
              state.Images[product.id] ="../../assets/favorite2.svg";
              state.isFavorite[product.id] = false;
            })
          },
          toggleFavorite(state, productId) {
            state.isFavorite[productId] = !state.isFavorite[productId];
            if (state.isFavorite[productId]) {
              state.Images[productId] = "../../assets/favorite1.svg";
            } else {
              state.Images[productId] = "../../assets/favorite2.svg";
            }
            console.log('Updated isFavorite:', state.isFavorite);
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
            console.log(`Dispatching toggleProductFavorite for product ${productId}`);
            commit('toggleFavorite', productId);
          },
      }

   const getters= {
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