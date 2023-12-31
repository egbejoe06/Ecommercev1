<template>
  <div class="header">
    <div @click="showHeader3">
      <img src="../assets/Menueicon.svg" alt="" />
    </div>
    <div>
      <router-link to="/">
        <img class="logo" src="../assets/Logo.svg" alt="logo" />
        <span class="luminae">Luminae</span>
      </router-link>
    </div>
    <div class="cate21">
      <div>
        <router-link to="/Cart">
          <div class="cate211">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M9 6.46924L9 7.46924C9 9.12609 10.3431 10.4692 12 10.4692C13.6569 10.4692 15 9.12609 15 7.46924V6.46924"
                  stroke="#434343"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.6113 3.46924H8.38836C6.433 3.46924 4.76424 4.88289 4.44278 6.81164L2.77612 16.8116C2.36976 19.2498 4.24994 21.4692 6.72169 21.4692H17.278C19.7498 21.4692 21.6299 19.2498 21.2236 16.8116L19.5569 6.81164C19.2355 4.88289 17.5667 3.46924 15.6113 3.46924Z"
                  stroke="#434343"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </svg>
            </div></div
        ></router-link>
      </div>
      <div class="cate23">{{ carts.length }}</div>
    </div>
  </div>
  <div class="search">
    <div class="search1">
      <div>
        <input v-model="searched" type="text" placeholder="search products" />
      </div>
      <div class="options">
        <select v-model="searchCategories">
          <option value="All categories">All categories</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Home & Furniture">Home & Furniture</option>
          <option value="Supermarket">Supermarkets</option>
          <option value="Cosmetics">Cosmetics</option>
          <option value="Shoe & Bag">Shoe & Bag</option>
          <option value="Electronics">Electronics</option>
          <option value="Sports and Outdoors">Sports and Outdoors</option>
          <option value="Best sellers">Best Sellers</option>
        </select>
      </div>
    </div>
    <div style="cursor: pointer" @click="searchCategory()">
      <img src="../assets/Search.svg" alt="" />
    </div>
  </div>
  <div class="header3" v-show="header3"><Menu /></div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Menu from "../components/Menu.vue";
export default {
  created() {
    const favoriteProductsArray = this.$store.getters["product/favoriteProductsArray"];
  },
  components: { Menu },
  data() {
    return {
      header3: false,
      searchCategories: "All categories",
      searched: "",
    };
  },
  computed: {
    Total1() {
      const baseTotal = this.calculatedTotals.reduce((acc, total) => acc + total, 0);
      return baseTotal;
    },
    calculatedTotals() {
      return this.carts.map((cart) => cart.Price * cart.Quantity);
    },
    ...mapGetters("productdetails", [
      "total",
      "normalPrice",
      "number",
      "productDetails",
      "carts",
    ]),
    ...mapGetters("product", ["products", "favoriteProductsArray"]),
  },
  beforeDestroy() {
    this.setSearchQuery("");
  },
  methods: {
    ...mapActions("product", ["setSearchQuery", "resetSearchQuery"]),
    showHeader3() {
      this.header3 = !this.header3;
    },
    searchCategory() {
      if (this.searchCategories && this.searched) {
        const isSearchInProducts = this.products.some((product) =>
          product.title.toLowerCase().includes(this.searched.toLowerCase())
        );
        if (isSearchInProducts) {
          this.$store.dispatch("product/setSearchQuery", this.searched);
          this.$router.push({
            name: this.searchCategories,
            query: { search: this.searched },
          });
        } else {
          this.$router.push({ name: "Notfound", params: { catchAll: this.searched } });
        }
      }
    },
  },
};
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  .search1 {
    display: flex;
    align-items: center;
    gap: var(--Spacing-4, 16px);
    flex: 1 0 0;
    align-self: stretch;
  }
  .search {
    display: flex;
    height: 54px;
    padding: var(--Spacing-2, 8px) var(--Spacing-3, 12px);
    justify-content: center;
    align-items: center;
    gap: 12px;
    align-self: stretch;
  }
  .search input {
    width: 150px;
    color: var(--text-color-Light-tritary-text, #9d9d9d);
    font-feature-settings: "clig" off, "liga" off;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    appearance: none; /* Remove default styles on some browsers */
    border: none; /* Remove borders */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margin */
    outline: none; /* Remove default focus outline */
    font-family: inherit; /* Use the parent element's font */
    font-size: inherit; /* Use the parent element's font size */
    color: inherit; /* Use the parent element's text color */
    background: transparent; /* Use a transparent background */
    box-sizing: border-box;
  }
  .cate21 {
    justify-content: flex-end;
    gap: 0;
    flex: none;
  }
  .header {
    padding: 0px 10px 20px 10px;
  }
  .luminae {
    color: var(--Color-Base-Black, #000);
    text-align: center;
    font-feature-settings: "clig" off, "liga" off;
    font-family: Lato;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 90.909% */
  }
}
.header {
  justify-content: space-between;
}
.cate54 {
  color: var(--base-white, #fff);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  display: flex;
  padding: var(--spacing-2, 8px) var(--spacing-8, 32px);
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--spacing-1, 4px);
  background: var(--button-default, #4172dc);
  width: 100%;
}
.cate51 {
  display: flex;
  align-items: center;
  gap: var(--spacing-8, 32px);
}
.cate52 {
  color: var(--text-color-light-secondary-text, #555);
  text-align: right;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
}
.cate53 {
  color: var(--text-color-light-primary-text, #262626);
  text-align: right;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 20px; /* 125% */
}
.cate5 {
  margin-top: 5px;
  width: 237px;
  height: var(--spacing-0, 1px);
  background: var(--button-stroke-stroke, #d9d9d9);
}
.cate21 {
  cursor: pointer;
}
.cate42 {
  position: relative;
  z-index: 1;
}
.cate42:hover .cate4 {
  display: inline-flex;
}
.cate4 {
  top: 30px;
  left: -65px;
  position: absolute;
  display: none;
  padding: var(--spacing-6, 24px) var(--spacing-5, 20px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-8, 32px);
  border-radius: var(--spacing-2, 8px);
  background: #fff;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
}
.cate41 {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-6, 24px);
}
.cate43 {
  width: 38px;
  height: 54px;
}
.cate44 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2, 8px);
}
.cate45 {
  width: 175px;
  color: var(--text-color-light-primary-text, #262626);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
}
.cate46 {
  color: var(--text-color-light-secondary-text, #555);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.header3 {
  position: relative;
  z-index: 1;
  left: 50px;
}
.header3 .menu {
  background: #f5f5f5;
  flex-direction: column;
  position: absolute;
  z-index: 1;
  align-items: flex-start;
  gap: 20px;
  padding: 40px;
  width: 212px;
  left: -49px;
  transform-origin: top center;
  animation: rotateZ 300ms ease-in-out forwards;
}
.header3 .menu .div {
  transform-origin: top center;
  animation: rotateZ 300ms ease-in-out forwards;
}
@keyframes rotateZ {
  0% {
    transform: rotateY(90deg);
  }
  80% {
    transform: rotateY(-10deg);
  }
  100% {
    transform: rotateY(0);
  }
}
.header3 .menu .dropdown {
  animation: growOut 300ms ease-in-out forwards;
  transform-origin: top center;
}
@keyframes growOut {
  0% {
    transform: rotateX(-90deg);
  }
  70% {
    transform: rotateX(20deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}
.header3 .menu .dp1:hover .dropdown {
  top: 10px;
  background: #e9e9e9;
  z-index: 2;
}
.header3 .menu .dp2:hover .dropdown {
  top: 10px;
  left: 150px;
  background: #e9e9e9;
}
.header3 .menu .dp4:hover .dropdown {
  top: 10px;
  left: 150px;
  background: #e9e9e9;
}
.header3 .menu .dp5:hover .dropdown {
  top: 10px;
  left: 150px;
  background: #e9e9e9;
}
.header3 .menu .dp6:hover .dropdown {
  top: 10px;
  left: 150px;
  background: #e9e9e9;
}
.header3 .menu .dp7:hover .dropdown {
  top: 10px;
  left: 150px;
  background: #e9e9e9;
}
.header3 .menu .dp8:hover .dropdown {
  top: 10px;
  left: 150px;
  background: #e9e9e9;
}
.header3 .menu .dp9:hover .dropdown {
  top: 10px;
  left: 150px;
  background: #e9e9e9;
}
</style>
