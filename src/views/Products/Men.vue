<template>
  <div class="goods">
    <div class="home1">
      <Header v-if="windowWidth >= 767" />
      <MobileHeader v-else />
    </div>
    <div class="subheader1">
      <span>Homepage ></span>
      <span>{{ selectedCategory }}</span>
    </div>
    <div class="subheader">
      <div class="sm11" v-if="windowWidth < 767" @click="togglemenu()">
        <div><img src="../../assets/Vector1.svg" alt="" /></div>
      </div>
      <div class="sh1">
        <span class="sh11">Men</span>
        <span class="sh12">{{ filteredProducts.length }} items</span>
      </div>
      <div class="sh2">
        <div class="sh21">
          <select v-model="sortOption" @change="sortProducts">
            <option value="default">Sort by order</option>
            <option value="price">Sort by price</option>
            <option value="rating">Sort by rating</option>
          </select>
        </div>
      </div>
    </div>
    <div class="products">
      <div class="sideMenu" v-show="sidemenu">
        <div class="smenu1">
          <div class="sm11">
            <div><img src="../../assets/Vector1.svg" alt="" /></div>
            <div class="sm12">All Categories</div>
          </div>
          <div class="sm2">
            <div class="sm21">Brand</div>
            <div class="sm22">
              <div>
                <input
                  class="sm23"
                  type="text"
                  placeholder="search"
                  v-model="searchQuery"
                />
              </div>
              <div><img src="../../assets/search1.svg" alt="" /></div>
            </div>
          </div>
          <div class="sm3">
            <div class="sm31"></div>
            <div class="sm32">
              <div class="sm33">MODEL</div>
              <div class="sm34">
                <span class="sm35" @click="selectCategory('mens-shirts')">Shirts</span>
                <span class="sm35" @click="selectCategory('mens-shoes')">Shoes</span>
                <span class="sm35" @click="selectCategory('mens-watches')">Watch</span>
              </div>
            </div>
          </div>
        </div>
        <div class="smenu2">
          <div class="sm31"></div>
          <div class="sm44">
            <div class="sm31"></div>
            <div class="sm21">size</div>
            <div class="checkbox-container">
              <div class="row">
                <span class="size-name">2XS</span>
                <span class="size-name">XS</span>
                <span class="size-name">S</span>
                <span class="size-name">M</span>
              </div>
              <div class="row">
                <span class="size-name">L</span>
                <span class="size-name">XL</span>
                <span class="size-name">2XL</span>
                <span class="size-name">3XL</span>
              </div>
            </div>
          </div>
          <div class="sm44">
            <div class="sm31"></div>
            <div class="sm21">Price</div>
            <div class="track-container">
              <div class="track-container1">
                <span class="range-value min">${{ minValue }} </span>
                <span class="range-value max">${{ maxValue }}</span>
              </div>
              <div class="track-container2">
                <div class="track" ref="_vpcTrack"></div>
                <div class="track-highlight" ref="trackHighlight"></div>
                <button class="track-btn track1" ref="track1"></button>
                <button class="track-btn track2" ref="track2"></button>
              </div>
              <div class="track-container3">
                <div class="trackmini">
                  <span class="trackmini1">Minimum ${{ minValue }}</span>
                  <span class="trackmini1">Maximum ${{ maxValue }}</span>
                </div>
                <div class="trackmini2">{{ filteredProducts.length }} products found</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mainmenu" v-show="mainmenu">
        <div class="mm" v-for="product in sortedProducts.slice(0, 12)" :key="product.id">
          <div class="mm-1">
            <router-link :to="{ name: 'Productdetails', params: { id: product.id } }">
              <div>
                <img class="mm-img" :src="product.thumbnail" alt="" />
              </div>
            </router-link>
            <div class="mm1">
              <div class="isFavorite">
                <router-link :to="{ name: 'Productdetails', params: { id: product.id } }">
                  <span class="mm2">{{ product.title }}</span>
                </router-link>
                <div @click="toggleFavorite(product.id)" class="isFavorite1">
                  <img :src="Images[product.id]" alt="" />
                </div>
              </div>
              <div class="isFavorite2">
                <span class="mm3">{{ product.description }}</span>
              </div>
            </div>
            <div>
              <div class="stars">
                <span v-for="n in Math.round(product.rating)" class="star">&#9733;</span>
                <span v-for="n in 5 - Math.round(product.rating)" class="star"
                  >&#9734;</span
                >
              </div>
            </div>
            <div class="mm4">
              <div class="mm5">${{ product.price }}</div>
              <div class="mm7">
                ${{ calculateNormalPrice(product.discountPercentage, product.price) }}
              </div>
              <div class="mm6">-{{ product.discountPercentage }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div><Footer /></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import MobileHeader from "../../components/MobileHeader.vue";
export default {
  components: { Header, Footer, MobileHeader },
  data() {
    return {
      sidemenu: true,
      mainmenu: true,
      windowWidth: window.innerWidth,
      sortOption: "default",
      selectedCategory: null,
      searchQuery: "",
      min: 10,
      max: 2100,
      minValue: 10,
      maxValue: 1000,
      step: 5,
      totalSteps: 0,
      percentPerStep: 1,
      trackWidth: null,
      isDragging: false,
      pos: {
        curTrack: null,
      },
    };
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  created() {
    this.$store.dispatch("product/fetchProduct");
    if (this.windowWidth < 767) {
      this.sidemenu = false;
    }
  },
  watch: {
    sortOption() {
      this.$forceUpdate();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("product/resetSearchQuery");
    console.log(this.search);
    next();
  },
  computed: {
    sortedProducts() {
      switch (this.sortOption) {
        case "price":
          return this.filteredProducts.slice().sort((a, b) => a.price - b.price);
        case "rating":
          return this.filteredProducts.slice().sort((a, b) => b.rating - a.rating);
        default:
          return this.filteredProducts.slice();
      }
    },
    ...mapGetters("product", [
      "products",
      "isFavorite",
      "Images",
      "filteredProducts",
      "favoriteProducts",
      "search",
    ]),
    filteredProducts() {
      return this.products.filter((product) => {
        const productPrice = parseFloat(product.price);
        const titleMatches = product.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase() || this.search.toLowerCase());
        const category = product.category.toLowerCase();

        const isMenDress = category.includes("mens-shirts");
        const isMenShoes = category.includes("mens-shoes");
        const isMensWatches = category.includes("mens-watches");
        const isMatchingCategory =
          !this.selectedCategory || category.includes(this.selectedCategory);

        if (
          category.includes(this.selectedCategory) ||
          category.includes("mens-shoes") ||
          category.includes("mens-watches") ||
          category.includes("mens-shirts")
        ) {
          return (
            titleMatches &&
            productPrice >= this.minValue &&
            productPrice <= this.maxValue &&
            isMatchingCategory
          );
        } else {
          return (
            titleMatches &&
            productPrice >= this.minValue &&
            productPrice <= this.maxValue &&
            (isMenDress || isMenShoes || isMensWatches)
          );
        }
      });
    },
  },

  methods: {
    togglemenu() {
      this.sidemenu = !this.sidemenu;
      this.mainmenu = !this.mainmenu;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    toggleFavorite(productId) {
      this.$store.dispatch("product/toggleProductFavorite", productId);
    },
    selectCategory(category) {
      this.selectedCategory = category;
      console.log(this.selectedCategory);
    },
    calculateNormalPrice(discountPercentage, discountPrice) {
      if (typeof discountPercentage === "number" && discountPercentage !== 0) {
        const normalPrice = discountPrice / (1 - discountPercentage / 100);
        return normalPrice.toFixed(2);
      } else {
        return discountPrice.toFixed(2);
      }
    },
    moveTrack(track, ev) {
      let percentInPx = this.getPercentInPx();

      let trackX = Math.round(this.$refs._vpcTrack.getBoundingClientRect().left);
      let clientX = ev.clientX;
      let moveDiff = clientX - trackX;

      let moveInPct = moveDiff / percentInPx;
      // console.log(moveInPct)

      if (moveInPct < 1 || moveInPct > 100) return;
      let value = Math.round(moveInPct / this.percentPerStep) * this.step + this.min;
      if (track === "track1") {
        if (value >= this.maxValue - this.step) return;
        this.minValue = value;
      }

      if (track === "track2") {
        if (value <= this.minValue + this.step) return;
        this.maxValue = value;
      }

      this.$refs[track].style.left = moveInPct + "%";
      this.setTrackHightlight();
    },
    mousedown(ev, track) {
      if (this.isDragging) return;
      this.isDragging = true;
      this.pos.curTrack = track;
    },

    touchstart(ev, track) {
      this.mousedown(ev, track);
    },

    mouseup(ev, track) {
      if (!this.isDragging) return;
      this.isDragging = false;
    },

    touchend(ev, track) {
      this.mouseup(ev, track);
    },

    mousemove(ev, track) {
      if (!this.isDragging) return;
      this.moveTrack(track, ev);
    },

    touchmove(ev, track) {
      this.mousemove(ev.changedTouches[0], track);
    },

    valueToPercent(value) {
      return ((value - this.min) / this.step) * this.percentPerStep;
    },

    setTrackHightlight() {
      this.$refs.trackHighlight.style.left = this.valueToPercent(this.minValue) + "%";
      this.$refs.trackHighlight.style.width =
        this.valueToPercent(this.maxValue) - this.valueToPercent(this.minValue) + "%";
    },

    getPercentInPx() {
      let trackWidth = this.$refs._vpcTrack.offsetWidth;
      let oneStepInPx = trackWidth / this.totalSteps;
      // 1 percent in px
      let percentInPx = oneStepInPx / this.percentPerStep;

      return percentInPx;
    },

    setClickMove(ev) {
      let track1Left = this.$refs.track1.getBoundingClientRect().left;
      let track2Left = this.$refs.track2.getBoundingClientRect().left;
      // console.log('track1Left', track1Left)
      if (ev.clientX < track1Left) {
        this.moveTrack("track1", ev);
      } else if (ev.clientX - track1Left < track2Left - ev.clientX) {
        this.moveTrack("track1", ev);
      } else {
        this.moveTrack("track2", ev);
      }
    },
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
    // calc per step value
    this.totalSteps = (this.max - this.min) / this.step;

    // percent the track button to be moved on each step
    this.percentPerStep = 100 / this.totalSteps;
    // console.log('percentPerStep', this.percentPerStep)

    // set track1 initilal
    document.querySelector(".track1").style.left =
      this.valueToPercent(this.minValue) + "%";
    // track2 initial position
    document.querySelector(".track2").style.left =
      this.valueToPercent(this.maxValue) + "%";
    // set initila track highlight
    this.setTrackHightlight();

    var self = this;

    ["mouseup", "mousemove"].forEach((type) => {
      document.body.addEventListener(type, (ev) => {
        // ev.preventDefault();
        if (self.isDragging && self.pos.curTrack) {
          self[type](ev, self.pos.curTrack);
        }
      });
    });

    ["mousedown", "mouseup", "mousemove", "touchstart", "touchmove", "touchend"].forEach(
      (type) => {
        document.querySelector(".track1").addEventListener(type, (ev) => {
          ev.stopPropagation();
          self[type](ev, "track1");
        });

        document.querySelector(".track2").addEventListener(type, (ev) => {
          ev.stopPropagation();
          self[type](ev, "track2");
        });
      }
    );

    // on track clik
    // determine direction based on click proximity
    // determine percent to move based on track.clientX - click.clientX
    document.querySelector(".track").addEventListener("click", function (ev) {
      ev.stopPropagation();
      self.setClickMove(ev);
    });

    document.querySelector(".track-highlight").addEventListener("click", function (ev) {
      ev.stopPropagation();
      self.setClickMove(ev);
    });
  },
};
</script>
<style>
.size-name {
  width: 50px;
  flex-shrink: 0;
  stroke-width: 1px;
  stroke: var(--button-stroke-stroke, #d9d9d9);
  color: var(--text-color-light-secondary-text, #555);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  border: 1px solid gray;
  border-radius: 5px;
  padding: 2px;
  cursor: pointer;
}
.sm46 {
  color: var(--text-color-light-secondary-text, #555);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}
.sm45 {
  display: flex;
  padding: var(--spacing-0, 0px);
  align-items: flex-start;
  gap: 10px;
}
.sm44 {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-6, 24px);
}
.sm43 {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  gap: var(--spacing-7, 28px);
}
.smenu2 {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-7, 28px);
}
.sideMenu {
  display: flex;
  width: 320px;
  height: 1659px;
  padding: var(--spacing-9, 36px) var(--spacing-9, 36px) 132px 64px;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  background: var(--background-color-white, #fff);
  overflow-y: auto;
  height: 100%;
  overflow-x: hidden;
}
.smenu1 {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  gap: var(--spacing-5, 20px);
}
.sm11 {
  display: flex;
  gap: 10px;
}
.sm12 {
  color: var(--text-color-light-primary-text, #262626);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 20px; /* 125% */
}
.sm2 {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-3, 12px);
}
.sm21 {
  color: var(--text-color-light-primary-text, #262626);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.sm22 {
  display: flex;
  padding: var(--spacing-2, 8px) var(--spacing-4, 16px);
  align-items: center;
  gap: 20px;
  border-radius: var(--spacing-1, 4px);
  border: 1px solid var(--button-stroke-stroke, #d9d9d9);
}
.sm23 {
  color: var(--text-color-light-tritary-text, #9d9d9d);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  outline: none;
  border: none;
}
.sm31 {
  width: 220px;
  height: 1px;
  flex-shrink: 0;
  border-radius: var(--spacing-0, 0px);
  background: var(--button-stroke-stroke, #d9d9d9);
}
.sm3 {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  gap: var(--spacing-7, 28px);
}
.sm32 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-6, 24px);
}
.sm33 {
  color: var(--text-color-light-primary-text, #262626);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.sm34 {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-5, 20px);
}
.sm35 {
  color: var(--text-color-light-secondary-text, #555);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  cursor: pointer;
}
.checkbox-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.row {
  display: flex;
  gap: 5px;
}

.checkbox-label {
  position: relative;
  cursor: pointer;
}

.color-checkbox {
  display: none;
}

.checkmark {
  width: 30px;
  height: 30px;
  border: 2px solid #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.color-name {
  display: none;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
}

.checkbox-label:hover .color-name {
  display: block;
}

.color-checkbox:checked + .checkmark::before {
  content: "\2713"; /* Unicode checkmark character */
  font-size: 20px;
  color: #fff;
}
</style>
