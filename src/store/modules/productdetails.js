import VuexPersistence from 'vuex-persist'
const state =
    {
        quantities: {},
        productDetails: null,
        comments:[],
        carts:[],
        countries: [],
        cities: [],
        selectedCountry: '',
        selectedCity: '',
        flagImageUrl: "",
        selectedCountryDialCode: '',
      }
     const mutations = {
      resetCart(state) {
        state.carts = [];
      },
      setDialCode(state, dialCode) {
        state.selectedCountryDialCode = dialCode;
      },
      setFlagImageUrl(state, flagImageUrl) {
        state.flagImageUrl = flagImageUrl;
      },
      setCountries(state, countries) {
        state.countries = countries;    
      },
      setCities(state, cities) {
       state.cities = cities;
      },
      setSelectedCountry(state, selectedCountry) {
        state.selectedCountry = selectedCountry;
      },
        increase(state,productId) {
            state.quantities[productId] = (state.quantities[productId] || 0) + 1;
          },
          decrease(state,productId) {
            if (state.quantities[productId] && state.quantities[productId] > 1) {
                state.quantities[productId]--;
            }
          },
          setProductDetails(state, { productId, data }) {
            state.productDetails = data;
            state.quantities[productId] = 1;
          },
          setComment(state,{data}){
            state.comments =data
          },
        }
      const actions= {
        async fetchDialCode({ commit, state }) {
          try {
            const response = await fetch(`https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode`);
            const data = await response.json();
            if (!data.error) {
              const countryData = data.data.find((item) => item.name === state.selectedCountry);
              if (countryData) {
                const dialCode = countryData.dialCode;
                commit("setDialCode", dialCode);
              } else {
                console.error("Country not found in data:", state.selectedCountry);
              }
            } else {
              console.error("Error fetching dial code:", data.msg);
            }
          } catch (error) {
            console.error("Error fetching dial code:", error);
          }
        },
        async fetchFlagImageUrl({ commit }, country) {
          try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images/');
            const data = await response.json();
        
            if (!data.error) {
              const countryData = data.data.find((item) => item.name === country);
        
              if (countryData) {
                const flagImageUrl = countryData.flag;
                commit("setFlagImageUrl", flagImageUrl);
              } else {
                console.error("Country not found in data:", country);
              }
            } else {
              console.error("Error fetching flag image URL:", data.msg);
            }
          } catch (error) {
            console.error("Error fetching flag image URL:", error);
          }
        },        
        async fetchCountries({ commit }) {
          try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries');
            const data = await response.json();
      
            if (!data.error) {
              commit('setCountries', data.data);
              commit('setCities', data.data[0].cities);
            } else {
              console.error('Error fetching data:', data.msg);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        },
        updateCities({ commit, state }) {
          const selectedCountry = state.selectedCountry;
          const country = state.countries.find(c => c.country === selectedCountry);
      
          if (country) {
            commit('setCities', country.cities);
          } else {
            console.error('Selected country not found:', selectedCountry);
          }
        },
      
        async fetchProductDetails({ commit }, productId) {
            try {
              const response = await fetch(`https://dummyjson.com/products/${productId}`);
              if (response.ok) {
                const productData = await response.json();
                commit('setProductDetails', { productId, data: productData });
              } else {
                console.error('API request failed');
              }
            } catch (error) {
              console.error('Error fetching product details:', error);
            }
          },
          async fetchComment({ commit }) {
            const url = 'https://dummyjson.com/comments';
            try {
              const response = await fetch(url);
              const data = await response.json();
          
              let commentsWithRating;
          
              if (data.comments && Array.isArray(data.comments)) {
                // Add a random rating (between 1 and 5) to each comment
                commentsWithRating = data.comments.map(comment => ({
                  ...comment,
                  rating: Math.floor(Math.random() * 5) + 1,
                }));
          
                // Commit the data to the store mutation
                commit('setComment', { data: commentsWithRating });
              } else {
                console.error('Invalid or missing data.comments array.');
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          },
          
          increase({ commit, state }) {
            commit('increase', state.productDetails.id);
          },
          decrease({ commit, state }) {
            commit('decrease', state.productDetails.id);
          },
      }
   const getters= {
        flagImageUrl: state => state.flagImageUrl,
        countries: (state) => state.countries,
        cities: (state) => state.cities,
        selectedCountry: (state) => state.selectedCountry,
        selectedCity:(state) =>state.selectedCity,
        carts: state => state.carts,
        productDetails: state => state.productDetails,
        comments: state => state.comments,
        total: (state, getters) => {
            const normalPrice = parseFloat(getters.normalPrice);
            const quantity = state.quantities[state.productDetails.id] || 0;
    
            if (!isNaN(normalPrice) && !isNaN(quantity)) {
              const result = (normalPrice * quantity).toFixed(2);
              return result;
            } else {
              console.error('Invalid normalPrice or quantity:', normalPrice, quantity);
              return 0;
            }
          },
        normalPrice: state => {
          const discountPercentage = state.productDetails.discountPercentage;
          const price = state.productDetails.price;
      
          if (typeof discountPercentage === 'number' && discountPercentage !== 0) {
            const discountedPrice = price - (price * discountPercentage) / 100;
            return discountedPrice.toFixed(2);
          } else {
            return price?.toFixed(2) || 0;
          }
        },
        number: state => state.quantities[state.productDetails.id] || 0,
      }
      const vuexPersist = new VuexPersistence({
        key: 'my-app-key', 
        storage: window.localStorage,
      });
      export default {
        namespaced: true,
        state,
        mutations,
        actions,
        getters,
        plugins: [vuexPersist.plugin],
      };