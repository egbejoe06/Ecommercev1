<template>
  <div class="header">
    <div>
      <router-link to="/">
        <img class="logo" src="../assets/Logo.svg" alt="logo" />
        <span class="luminae">Luminae</span>
      </router-link>
    </div>
    <div class="search">
      <input v-model="searched" type="text" placeholder="search products" />
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
      <div style="cursor: pointer" @click="searchCategory()">
        <img src="../assets/Search.svg" alt="" />
      </div>
    </div>
    <div class="nav">
      <div>About us</div>
      <div>Blog</div>
      <div>Contact us</div>
      <div>Help & support</div>
    </div>
    <div class="socials">
      <span><img src="../assets/instagram.svg" alt="" /></span>
      <span><img src="../assets/FB.svg" alt="" /></span>
      <span><img src="../assets/telegram.svg" alt="" /></span>
    </div>
    <div></div>
  </div>
  <div class="header2">
    <div class="cate">
      <div class="categories" @click="showHeader3">
        <div><img src="../assets/categories.svg" alt="" /></div>
        <div class="category">Categories</div>
      </div>
      <div class="lang">
        <div class="usd">
          <select>
            <option value="">USD</option>
            <Option>NGN</Option>
          </select>
        </div>
        <div class="langg">
          <select>
            <option>English</option>
          </select>
        </div>
      </div>
    </div>
    <div class="cate3"></div>
    <div>
      <div class="cate1">
        <div><img src="../assets/Mencosmetic.png" alt="" /></div>
        <div>
          <span class="cate11">Weekly Men's Toiletries Coupons.</span><br />
          <span class="cate12">We extend exclusive discounts to our male clientele</span>
        </div>
      </div>
    </div>
    <div class="cate3"></div>
    <div class="cate2">
      <Router-Link v-if="User === ''" :to="{ name: 'Signin' }">
        <div class="cate21">
          <div><img src="../assets/Signin.svg" alt="" /></div>
          <div class="cate22">Sign in</div>
        </div></Router-Link
      >
      <div v-else class="cate21 cate25">
        <div class="cate26">
          <div><img src="../assets/Signin.svg" alt="" /></div>
          <div class="cate22">{{ User }}</div>
        </div>
        <div class="cate22 cate24" @click="logout()">Sign out</div>
      </div>
      <div class="cate42">
        <div class="cate21">
          <div><img src="../assets/Favorides.svg" alt="" /></div>
          <div class="cate22">Favorities</div>
          <div class="cate4">
            <div v-for="fav in favoriteProductsArray">
              <router-link :to="{ name: 'Productdetails', params: { id: fav.id } }">
                <div class="cate41">
                  <div>
                    <img class="cate43" :src="fav.thumbnail" alt="" />
                  </div>
                  <div class="cate44">
                    <span class="cate45">{{ fav.title }}</span
                    ><span class="cate46">${{ fav.price }}</span>
                  </div>
                </div></router-link
              >
              <div class="cate5"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="cate42">
        <div class="cate21">
          <div>
            <router-link to="/Cart">
              <div class="cate211">
                <div><img src="../assets/Card.svg" alt="" /></div>
                <div class="cate22">Card</div>
              </div></router-link
            >
          </div>
          <div class="cate23">{{ carts.length }}</div>
        </div>
        <div class="cate4">
          <div v-for="fav in carts">
            <router-link :to="{ name: 'Productdetails', params: { id: fav.id } }">
              <div class="cate41">
                <div>
                  <img class="cate43" :src="fav.thumbnail" alt="" />
                </div>
                <div class="cate44">
                  <span class="cate45">{{ fav.title }}</span
                  ><span class="cate46">${{ fav.price }}</span>
                </div>
              </div></router-link
            >
            <div class="cate5"></div>
          </div>
          <div class="cate51">
            <span class="cate52">Total</span
            ><span class="cate53">${{ Total1.toFixed(2) }}</span>
          </div>
          <router-link to="/Cart" style="width: 100%">
            <div class="cate54">View Bag</div></router-link
          >
        </div>
      </div>
    </div>
  </div>
  <div class="header3" v-show="header3"><Menu /></div>
</template>
<script>
import { supabase } from "../clients/supabase";
import { mapGetters, mapActions } from "vuex";
import Menu from "../components/Menu.vue";
export default {
  created() {
    const favoriteProductsArray = this.$store.getters["product/favoriteProductsArray"];
  },
  async mounted() {
    await this.host();
  },
  components: { Menu },
  data() {
    return {
      header3: false,
      searchCategories: "All categories",
      searched: "",
      User: "",
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
    async host() {
      const user = await supabase.auth.getUser();
      this.User = user.data.user.email;
      location.reload(true);
    },
    async logout() {
      const user = await supabase.auth.signOut();
    },
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
<style>
.cate21 {
  flex: unset !important;
}
.cate26 {
  display: flex;
}
.cate24 {
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 14px !important;
  color: #262626 !important;
  background: #e9e9e9 !important;
}
.cate25:hover .cate24 {
  display: flex;
}
.cate25:hover .cate26 {
  display: flex;
  flex-direction: column;
}
.cate25 {
  justify-content: center;
  align-items: center !important;
}
.home1 {
  width: 100%;
}
select {
  background-color: transparent;
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
