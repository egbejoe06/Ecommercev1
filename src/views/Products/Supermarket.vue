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
        <span class="sh11">Supermarket</span>
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
                <span class="sm35" @click="selectCategory('groceries')">Groceries</span>
              </div>
            </div>
          </div>
        </div>
        <div class="smenu2">
          <div class="sm31"></div>
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
                  <svg
                    v-if="fav[product.id]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                  >
                    <path
                      d="M11.6851 2.73538L11 3.47924L10.315 2.73539C8.18404 0.421557 4.72912 0.421554 2.5982 2.73539C0.5245 4.98709 0.460783 8.6159 2.45393 10.9518L8.18026 17.6628C9.70154 19.4457 12.2984 19.4457 13.8197 17.6628L19.5461 10.9518C21.5392 8.61587 21.4755 4.98707 19.4018 2.73537C17.2709 0.42154 13.816 0.421543 11.6851 2.73538Z"
                      stroke="#28303F"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                  >
                    <path
                      d="M11.6851 2.73538L11 3.47924L10.315 2.73539C8.18404 0.421557 4.72912 0.421554 2.5982 2.73539C0.5245 4.98709 0.460783 8.6159 2.45393 10.9518L8.18026 17.6628C9.70154 19.4457 12.2984 19.4457 13.8197 17.6628L19.5461 10.9518C21.5392 8.61587 21.4755 4.98707 19.4018 2.73537C17.2709 0.42154 13.816 0.421543 11.6851 2.73538Z"
                      fill="#FF2E00"
                      stroke="#FF2E00"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
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
import { mapGetters, mapState } from "vuex";
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
  created() {
    this.$store.dispatch("product/fetchProduct");
    if (this.windowWidth < 767) {
      this.sidemenu = false;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
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
    ...mapState("product", ["fav"]),
    filteredProducts() {
      return this.products.filter((product) => {
        const productPrice = parseFloat(product.price);
        const titleMatches = product.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase() || this.search.toLowerCase());
        const category = product.category.toLowerCase();

        const isGroceries = category.includes("groceries");
        const isMatchingCategory =
          !this.selectedCategory || category.includes(this.selectedCategory);

        if (category.includes(this.selectedCategory) || category.includes("groceries")) {
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
            isGroceries
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
