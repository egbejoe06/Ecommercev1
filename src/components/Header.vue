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
      <Router-Link :to="{ name: 'Signin' }">
        <div class="cate21">
          <div><img src="../assets/Signin.svg" alt="" /></div>
          <div class="cate22">Sign in</div>
        </div></Router-Link
      >
      <div class="cate21">
        <div><img src="../assets/Favorides.svg" alt="" /></div>
        <div class="cate22">Favorities</div>
      </div>
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
    </div>
  </div>
  <div class="header3" v-show="header3"><Menu /></div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Menu from "../components/Menu.vue";
export default {
  components: { Menu },
  data() {
    return {
      header3: false,
      searchCategories: "All categories",
      searched: "",
    };
  },
  computed: {
    ...mapGetters("productdetails", [
      "total",
      "normalPrice",
      "number",
      "productDetails",
      "carts",
    ]),
    ...mapGetters("product", ["products"]),
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
          //this.resetSearchQuery();
        } else {
          this.$router.push({ name: "Notfound", params: { catchAll: this.searched } });
        }
      }
    },
  },
};
</script>
<style>
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
