<template>
  <div>
    <div class="home1">
      <Header v-if="windowWidth >= 767" />
      <MobileHeader v-else />
    </div>
    <div><Menu /></div>
    <div class="main">
      <div class="main1">
        <div class="main11">
          <div class="mn11"><img class="mn25" src="../assets/left.png" alt="" /></div>
          <div class="mn12">
            <div class="mn21">Kimonos, Caftans & Pareos</div>
            <div class="mn22">Poolside glam included From $4.99</div>
            <router-link to="/Products"
              ><div class="mn23">
                <div><img src="../assets/Icon.svg" alt="" /></div>
                <div class="mn24">Shop now</div>
              </div></router-link
            >
          </div>
          <div class="main13">
            <div class="mn28">
              <div class="mn26">Summer Essentials</div>
              <div class="mn27">20% off</div>
            </div>
            <div class="mn29">19 Jul-30 Jul</div>
          </div>
        </div>
      </div>
      <div class="main2">
        <div class="flashsale">
          <div class="flashsale1">Flash Sales</div>
          <router-link to="/Products"
            ><div class="flashsale2">View all ></div></router-link
          >
        </div>
        <div class="fsales">
          <div v-for="fsale in flashsales.slice(0, 4)" class="fsales1">
            <div class="fs1">
              <div class="dotd">{{ fsale.text }}</div>
              <div class="timer">{{ formatCountdown(fsale.countdown) }}</div>
              <div class="fs11">{{ fsale.hour }}:{{ fsale.min }}:{{ fsale.sec }}</div>
            </div>
            <router-link :to="{ name: 'Productdetails', params: { id: fsale.id } }">
              <div class="fs41">
                <img class="fs4" :src="fsale.thumbnail" alt="" /></div
            ></router-link>
            <div class="fs2">
              <router-link :to="{ name: 'Productdetails', params: { id: fsale.id } }">
                <div class="fs21">{{ fsale.title }}</div></router-link
              >
              <div class="fs22">{{ fsale.description }}</div>
              <div>
                <div>
                  <img src="../assets/star.svg" alt="" /><img
                    src="../assets/star.svg"
                    alt=""
                  /><img src="../assets/star.svg" alt="" /><img
                    src="../assets/star.svg"
                    alt=""
                  />
                  ({{ fsale.stock }})
                </div>
              </div>
              <div class="fs3">
                <div class="fs31">
                  ${{ calculateNormalPrice(fsale.discountPercentage, fsale.price) }}
                </div>
                <div class="fs32">${{ fsale.price }}</div>
                <div class="fs33">-{{ fsale.discountPercentage }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main3">
        <div class="flashsale">
          <div class="flashsale1">Trending must-haves</div>
          <router-link to="/Products"
            ><div class="flashsale2">View all ></div></router-link
          >
        </div>
        <div class="main31">
          <div class="mn31">
            <div class="mn32">
              <div><img src="../assets/Newarivals.svg" alt="" /></div>
              <div class="mn33">New Arivals</div>
            </div>
            <div class="mn39">
              <div><img src="../assets/4_org_zoom1.png" alt="" /></div>
              <div class="mn34">
                <div class="mn35">
                  <div class="mn36">Cool & Sexy Calvin Klein</div>
                  <div class="mn37">Dotted dress-Casual</div>
                </div>
                <div class="mn38">
                  <div>$89</div>
                  <div>Shop Now</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mn31">
            <div class="mn32" style="visibility: hidden">
              <div><img src="../assets/Newarivals.svg" alt="" /></div>
              <div class="mn33">New Arivals</div>
            </div>
            <div class="mn39">
              <div><img src="../assets/4_org_zoom2.png" alt="" /></div>
              <div class="mn34">
                <div class="mn35">
                  <div class="mn36">Cool & Sexy Calvin Klein</div>
                  <div class="mn37">Dotted dress-Casual</div>
                </div>
                <div class="mn38">
                  <div>$89</div>
                  <div>Shop Now</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mn31">
            <div class="mn32">
              <div><img src="../assets/Newarivals.svg" alt="" /></div>
              <div class="mn33">New Arivals</div>
            </div>
            <div class="mn39">
              <div><img src="../assets/4_org_zoom3.png" alt="" /></div>
              <div class="mn34">
                <div class="mn35">
                  <div class="mn36">beige coat Zara</div>
                  <div class="mn37">Cream-Brown-Formal</div>
                </div>
                <div class="mn38">
                  <div>$102</div>
                  <div>Shop Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main4">
        <div class="flashsale">
          <div class="flashsale1">Top100</div>
          <router-link to="/Products"
            ><div class="flashsale2">View all ></div></router-link
          >
        </div>
        <div class="fsales">
          <div v-for="top in products.slice(33, 37)" class="fsales1">
            <router-link :to="{ name: 'Productdetails', params: { id: top.id } }"
              ><div><img class="mn41" :src="top.thumbnail" alt="" /></div
            ></router-link>
            <div class="fs2">
              <router-link :to="{ name: 'Productdetails', params: { id: top.id } }">
                <div class="fs21">{{ top.title }}</div></router-link
              >
              <div class="fs22">{{ top.description }}</div>
              <div>
                <div>
                  <img src="../assets/star.svg" alt="" /><img
                    src="../assets/star.svg"
                    alt=""
                  /><img src="../assets/star.svg" alt="" /><img
                    src="../assets/star.svg"
                    alt=""
                  />
                  ({{ top.stock }})
                </div>
              </div>
              <div class="fs3">
                <div class="fs31">
                  ${{ calculateNormalPrice(top.discountPercentage, top.price) }}
                </div>
                <div class="fs32">${{ top.price }}</div>
                <div class="fs33">-{{ top.discountPercentage }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main5">
        <div class="mn51">
          <div class="mn52">
            <div class="mn53">The most famous sport brands</div>
            <div class="mn54">Get in gym essentials</div>
            <div class="mn55">Exlopre all category</div>
          </div>
          <div><img class="mn56" src="../assets/Rectangle1078.png" alt="" /></div>
        </div>
        <div class="mn51">
          <div class="mn52 mn58">
            <div class="mn53">Never-Ending Summer</div>
            <div class="mn54">Throwback Shirts & all-day dressed</div>
            <div class="mn55">Exlopre all category</div>
          </div>
          <div><img class="mn56 mn57" src="../assets/Rectangle1079.png" alt="" /></div>
        </div>
      </div>
      <div class="main6">
        <div class="mn61">
          <span class="mn62"> MagSafe </span>
          <span class="mn63"
            >Snap on a magnetic case, wallet, or both. And get faster wireless
            charging.</span
          >
        </div>
        <div class="mn64">
          <img src="../assets/Iphone.png" alt="" />
        </div>
      </div>
      <div class="main5 main7">
        <div class="mn51">
          <div class="mn52 mn71">
            <div class="mn53">The Pinky Barbie Edition</div>
            <div class="mn54">Lets play dress up</div>
            <div class="mn55">Exlopre all category</div>
          </div>
          <div><img class="mn56 mn72" src="../assets/Rectangle1080.png" alt="" /></div>
        </div>
        <div class="mn51">
          <div class="mn52 mn73">
            <div class="mn53">Best Sellers Everyone Love</div>
            <div class="mn54">poolside glam include</div>
            <div class="mn55">Exlopre all category</div>
          </div>
          <div>
            <img class="mn74" src="../assets/Rectangle1081.png" alt="" />
          </div>
        </div>
      </div>
      <div class="main8">
        <div class="mn81">Luminae <span class="mn86">Store</span></div>
        <div class="mn82">
          Register your email not to miss the last minutes off+ Free delivery
        </div>
        <div class="mn83">
          <div class="mn87">
            <input class="mn84" type="email" placeholder="Enter your email" />
          </div>
          <div class="mn85"><img src="../assets/send.svg" alt="" /></div>
        </div>
      </div>
    </div>
    <div><Footer /></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Menu from "../components/Menu.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import MobileHeader from "../components/MobileHeader.vue";
export default {
  components: { Header, Footer, Menu, MobileHeader },
  data() {
    return {
      windowWidth: window.innerWidth,
      tops: [
        {
          img: "../src/assets/photo1.png",
          text1: "Mango",
          text2: "Kimono & Caftan - Black - Regular fit",
          price: "$228",
          price1: "$290",
          discount: "-10%",
        },
        {
          img: "../src/assets/photo2.png",
          text1: "Zara",
          text2: "Midi top- Daily fit",
          price: "$95",
          price1: "$145",
          discount: "-7%",
        },
        {
          img: "../src/assets/photo3.png",
          text1: "Uniqlo",
          text2: "Midi atlas Slim fit - bohemian",
          price: "$125",
          price1: "$156",
          discount: "-8%",
        },
        {
          img: "../src/assets/photo4.png",
          text1: "Mango dress",
          text2: "Kimono & Caftan - Colorful - Night club fit",
          price: "$365",
          price1: "$487",
          discount: "-15%",
        },
      ],
      fsales: [
        {
          text: "Deal of the day",
          timer: "12:43:12",
          hour: "hour",
          min: "min",
          sec: "sec",
          countdown: 80020,
          initialCountdown: 45232,
        },
        {
          text: "Deal of the day",
          timer: "12:43:12",
          hour: "hour",
          min: "min",
          sec: "sec",
          countdown: 78392,
          initialCountdown: 45232,
        },
        {
          text: "Deal of the day",
          timer: "12:43:12",
          hour: "hour",
          min: "min",
          sec: "sec",
          countdown: 35232,
          initialCountdown: 45232,
        },
        {
          text: "Deal of the day",
          timer: "12:43:12",
          hour: "hour",
          min: "min",
          sec: "sec",
          discount: "-40%",
          countdown: 45232,
          initialCountdown: 45232,
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("product/fetchProduct");
  },
  computed: {
    Dresses() {
      return this.products.filter((product) => {
        const category = product.category.toLowerCase();
        const isWomenDress = category.includes("women-dress");

        return isWomenDress;
      });
    },
    flashsales() {
      const minLength = Math.min(this.shuffledProducts.length, this.fsales.length);

      return Array.from({ length: minLength }, (_, index) => ({
        ...this.shuffledProducts[index],
        ...this.fsales[index],
      }));
    },
    ...mapGetters("product", [
      "products",
      "isFavorite",
      "Images",
      "favoriteProducts",
      "search",
    ]),
    shuffledProducts() {
      const shuffledArray = this.shuffleArray([...this.products]);

      return shuffledArray;
    },
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    calculateNormalPrice(discountPercentage, discountPrice) {
      if (typeof discountPercentage === "number" && discountPercentage !== 0) {
        const normalPrice = discountPrice - (discountPercentage / 100) * discountPrice;
        return normalPrice.toFixed(2);
      } else {
        return discountPrice.toFixed(2);
      }
    },
    shuffleArray(array) {
      let currentIndex = array.length;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
    formatCountdown(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(remainingSeconds).padStart(2, "0")}`;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.fsales.forEach((fsale) => {
      setInterval(() => {
        if (fsale.countdown > 0) {
          fsale.countdown -= 1;
        } else {
          fsale.countdown = fsale.initialCountdown;
        }
      }, 1000);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
<style>
.mn84 {
  color: var(--text-color-light-tritary-text, #9d9d9d);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  width: 150px;
  border: none;
}
.mn83 {
  display: flex;
  width: 268px;
  padding: var(--spacing-2, 8px) var(--spacing-3, 12px);
  align-items: center;
  gap: 80px;
  border-radius: var(--spacing-1, 4px);
  background: #fff;
}
.mn82 {
  color: var(--text-color-dark-text-primary, #fff);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 125% */
}
.mn86 {
  color: var(--background-color-footer, #d1e2eb);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
}
.mn81 {
  color: var(--text-color-dark-text-primary, #fff);
  text-align: right;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 62.5% */
}
.main8 {
  display: flex;
  width: 571px;
  padding: var(--spacing-8, 32px) var(--spacing-13, 56px);
  flex-direction: column;
  align-items: center;
  gap: 24px;
  border-radius: 8px;
  background: var(--background-color-send-email-frm, #7296ab);
  position: relative;
  top: 70px;
  left: 300px;
  margin-top: -70px;
}
.mn74 {
  width: 236.75px !important;
}
.mn71 {
  height: 265px !important;
  background: #d11fb5 !important;
}
.mn73 {
  background: #0186c4 !important;
  height: 265px !important;
}
.mn63 {
  color: var(--text-color-light-secondary-text, #555);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 140% */
}
.mn62 {
  color: var(--text-color-light-blue-400, #465d6b);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 83.333% */
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.main6 {
  display: flex;
  padding: 0px 90px;
  align-items: center;
  gap: 70px;
  align-self: stretch;
  background: var(--background-color-card-5, #f7ddd0);
}
.mn61 {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-4, 16px);
  flex: 1 0 0;
}
.mn58 {
  height: 288.5px;
  background: #1d5159 !important;
}
.mn57 {
  height: 293px;
}
.mn56 {
  width: 236.75px;
}
.mn55 {
  color: var(--text-color-light-text-white-color, #fff);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  text-decoration-line: underline;
}
.mn54 {
  color: var(--text-color-light-text-white-color, #fff);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
}
.mn53 {
  color: var(--text-color-light-text-white-color, #fff);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 26px;
  font-style: normal;
  font-weight: 800;
}
.mn52 {
  display: flex;
  padding: var(--spacing-16, 50px) var(--spacing-5, 20px);
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  border-radius: var(--spacing-0, 0px);
  background: #bf2e3b;
  width: 250px;
  height: 292px;
}
.mn51 {
  display: flex;
  min-width: 320px;
  align-items: center;
}
.main5 {
  display: flex;
  padding: var(--spacing-0, 0px) 90px;
  align-items: center;
  align-content: center;
  gap: 20px var(--spacing-5, 20px);
  align-self: stretch;
  flex-wrap: wrap;
}
.fs4 {
  width: 241px;
  height: 129px;
}
.fs41 {
  display: flex;
  height: 162px;
  padding: var(--spacing-0, 17px) 30px var(--spacing-0, 16px) -5px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
}
.main4 .fs33 {
  color: var(--text-color-light-text-off-proces, #ff2e00);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  background: unset;
}
.main4 .fs3 {
  gap: 11px;
  justify-content: unset;
}
.main4 .fsales {
  gap: 50px;
}
.mn41 {
  height: 215px;
  width: 218px;
}
.main4 .fsales1 {
  height: 360px;
  width: 220px;
  box-shadow: 1px 2px 6px 1px gray;
}
.main4 .fs2 {
  flex-wrap: unset;
}
.main4 {
  display: flex;
  padding: var(--spacing-0, 0px) 90px;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
  align-self: stretch;
}
.mn39 img {
  width: 300px;
}
.main31 {
  display: flex;
  gap: 65px;
  align-self: stretch;
  align-items: center;
  align-content: center;
}
.mn38 {
  display: flex;
  padding: 9px 9px;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  color: #fff;
  text-align: right;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  border-radius: var(--spacing-2, 8px);
  border: 1px solid var(--button-stroke-stroke, #d9d9d9);
}
.mn37 {
  color: var(--text-color-dark-text-secondary, #c4c4c4);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  opacity: 0.85;
}
.mn36 {
  color: var(--text-color-dark-text-primary, #fff);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px; /* 156.25% */
}
.mn35 {
  display: flex;
  height: 58px;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
}
.mn34 {
  display: flex;
  height: 93px;
  width: 300px;
  padding: var(--spacing-5, 20px);
  justify-content: space-between;
  align-items: center;
  align-content: center;
  row-gap: var(--spacing-3, 12px);
  align-self: stretch;
  flex-wrap: wrap;
  border-radius: var(--spacing-0, 0px) var(--spacing-0, 0px) var(--spacing-2, 8px)
    var(--spacing-2, 8px);
  background: var(--background-color-gray, #262626);
  gap: 3px;
}
.mn33 {
  color: var(--text-color-inside-inside, #fff);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 200% */
}
.mn32 {
  display: flex;
  padding: 3px 6px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: relative;
  border-radius: 4px;
  background: var(--tag-notif-tag, #00a95d);
  top: 33px;
  left: -111px;
}
.mn31 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main3 {
  display: flex;
  padding: var(--spacing-0, 0px) 90px;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  align-self: stretch;
}
.main3 .flashsale1 {
  width: 260px;
}
.main3 .flashsale {
  gap: 698px;
}
.main {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.fsales1 {
  box-shadow: -1px -1px 20px 1px gray;
}
.fs33 {
  border-radius: 2.057px;
  background: var(--tag-notif-off-tag, #ff2e00);
  display: flex;
  width: 33px;
  padding: 3px 6px;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-1, 4px);
  flex-shrink: 0;
  color: var(--text-color-inside-inside, #fff);
  font-family: Inter;
  font-size: 8px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.fs32 {
  color: var(--text-color-light-secondary-text, #555);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
}
.fs31 {
  color: var(--text-color-light-text-off-proces, #ff2e00);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
}
.fs3 {
  display: flex;
  width: 151px;
  padding: var(--spacing-0, 0px);
  justify-content: space-between;
  align-items: center;
  align-content: center;
  row-gap: 9px;
  flex-wrap: wrap;
}
.fs21 {
  color: var(--text-color-light-primary-text, #262626);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 20px; /* 125% */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
.fs22 {
  color: var(--text-color-light-secondary-text, #555);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
.fs2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 6px var(--spacing-0, 0px);
  flex: 1 0 0;
  align-self: stretch;
  flex-wrap: wrap;
  border-radius: var(--spacing-0, 0px);
  background: var(--background-color-white, #fff);
  padding: 10px;
}
.fs11 {
  color: var(--color-gray-gray-400, #9d9d9d);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
}
.dotd {
  color: var(--text-color-light-tritary-text, #9d9d9d);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
}
.timer {
  color: var(--text-color-light-primary-text, #262626);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
}
.fs1 {
  display: flex;
  height: 77px;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 5px;
  flex-shrink: 0;
  align-self: stretch;
  flex-wrap: wrap;
  border-radius: var(--spacing-2, 8px) var(--spacing-2, 8px) var(--spacing-0, 0px)
    var(--spacing-0, 0px);
  background: var(--background-color-white, #fff);
  flex-direction: column;
}
.fsales {
  display: flex;
  padding: var(--spacing-0, 0px);
  align-items: center;
  align-content: center;
  gap: 20px var(--spacing-5, 20px);
  align-self: stretch;
  justify-content: center;
  flex-wrap: wrap;
}
.flashsale2 {
  color: var(--text-color-light-primary-text, #262626);
  text-align: right;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
}
.flashsale1 {
  width: 150px;
  color: var(--color-base-black, #000);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 71.429% */
}
.flashsale {
  display: flex;
  gap: 820px;
}
.main2 {
  display: flex;
  padding: var(--spacing-0, 0px) 90px;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-12, 38px);
  align-self: stretch;
}
.main11 {
  position: relative;
  display: flex;
  height: 320px;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
}
.mn12 {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-8, 32px);
  flex: 1 0 0;
  align-self: stretch;
  border-radius: var(--spacing-0, 0px);
  background: #628de9;
  height: 316px;
}
.mn21 {
  color: var(--text-color-light-text-white-color, #fff);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: 50px; /* 156.25% */
  text-transform: uppercase;
}
.mn22 {
  color: var(--text-color-light-text-white-color, #fff);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 21px;
  font-style: normal;
  font-weight: 500;
  line-height: 50px; /* 178.571% */
}
.mn23 {
  display: flex;
  width: 165px;
  height: 56px;
  padding: 16px 32px;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-2, 4px);
  border-radius: var(--spacing-1, 4px);
  background: var(--button-default, #4172dc);
}
.mn24 {
  color: var(--text-color-inside-inside, #fff);
  text-align: right;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  text-transform: uppercase;
}
.mn25 {
  width: 500px;
  height: 316px;
}
.mn28 {
  display: flex;
  padding: var(--spacing-9, 36px) 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: var(--spacing-0, 0px);
  background: var(--background-color-white, #fff);
}
.mn26 {
  width: 180px;
  color: var(--text-color-light-primary-text, #262626);
  text-align: right;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 100% */
}
.mn27 {
  color: var(--text-color-light-text-off-proces, #ff2e00);
  text-align: right;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 100% */
}
.mn29 {
  display: flex;
  height: var(--spacing-10, 40px);
  padding: 10px 75px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: var(--spacing-0, 0px);
  background: var(--background-color-gray, #262626);
  color: var(--text-color-dark-text-primary, #fff);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.main13 {
  display: flex;
  width: 228px;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 433px;
  bottom: 85px;
}
</style>
