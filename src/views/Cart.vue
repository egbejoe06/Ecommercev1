<template>
  <div class="carts">
    <div><Header /></div>
    <div class="cartmain1">
      <div class="cart-categories">
        <div class="cartc1">
          <div :class="{ cartc4: cCard }" class="cartc3" @click="change1()">
            CARD({{ carts.length }})
          </div>
          <div :class="{ cartc4: cCustomer }" class="cartc3" @click="change2()">
            Customer info
          </div>
          <div :class="{ cartc4: cShipping }" class="cartc3" @click="change3()">
            Shipping & Payment
          </div>
          <div :class="{ cartc4: cProduct }" class="cartc3" @click="change4()">
            Product confirmation
          </div>
        </div>
        <div class="cartc2"></div>
      </div>
      <div class="cartmain">
        <div class="cm1" v-show="cCard">
          <div class="cmain1">
            <div class="cmain13">
              <span class="cmain11">Card</span>
              <span class="cmain12">{{ carts.length }}</span>
            </div>
            <div class="cartm1">
              <div v-for="cart in carts">
                <div class="cartm11">
                  <div class="cartm13">
                    <img class="cartm12" :src="cart.thumbnail" alt="" />
                  </div>
                  <div class="cartm21">{{ cart.title }}</div>
                  <div class="cartm22">${{ cart.Price }}</div>
                  <div class="pd5">
                    <img
                      style="cursor: pointer"
                      @click="decrease(cart)"
                      src="../assets/Minus.svg"
                      alt=""
                    />
                    <span class="pd52">{{ cart.Quantity }}</span>
                    <img
                      style="cursor: pointer"
                      @click="increase(cart)"
                      src="../assets/Plus.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <span class="cartm3">${{ calculateTotal(cart).toFixed(2) }}</span>
                  <img
                    class="cartm31"
                    @click="del(cart)"
                    src="../assets/trash.svg"
                    alt=""
                  />
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="cCustomer" v-show="cCustomer">
          <div class="customer-info">
            <div class="ci1">Customer Information</div>
            <div class="ci2">
              <div class="ci3">
                <label class="ci4">E-mail</label>
                <input class="ci5 ci7" type="email" />
              </div>
              <div class="ci6">
                <div class="ci3">
                  <label class="ci4">First Name</label>
                  <input class="ci5" type="text" />
                </div>
                <div class="ci3">
                  <label class="ci4">Last Name</label>
                  <input class="ci5" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div class="customer-info">
            <div class="ci1">Shipping Address</div>
            <div class="ci3">
              <span class="ci4">Country</span>
              <span class="ci8">
                <span>
                  <img class="flag" v-if="flagImageUrl" :src="flagImageUrl" alt="Flag"
                /></span>
                <select
                  class="ship34 ci7"
                  v-model="selectedCountry"
                  @change="updateSelectedCountry"
                >
                  <option value="">Select a country</option>
                  <option
                    v-for="country in countries"
                    :value="country.country"
                    :key="country.country"
                  >
                    {{ country.country }}
                  </option>
                </select></span
              >
            </div>
            <div class="ci3">
              <span class="ci4">State/Region</span>
              <span class="ship36">
                <select class="ship35" v-model="selectedCity">
                  <option value="">Select a city</option>
                  <option v-for="city in cities" :value="city" :key="city">
                    {{ city }}
                  </option>
                </select>
              </span>
            </div>
            <div class="ci3">
              <label class="ci4">Address</label>
              <input class="ci5 ci7" type="email" />
            </div>
            <div class="ci3">
              <label class="ci4">Phone Number</label>
              <input class="ci5 ci7" type="email" />
            </div>
          </div>
        </div>
        <div v-show="cShipping" class="cShipping">
          <div class="cpayment">
            <div class="cpayment1">
              <span class="cpayment2">Payment </span>
              <span class="cpayment3">Please choose a payment method</span>
            </div>
            <div class="cpayment4">
              <div class="cpayment5">
                <div class="cpayment6">
                  <span class="cpayment61"
                    ><div class="checkbox-wrapper cpayment61">
                      <input type="checkbox" id="checkbox-1" class="styled-checkbox" />
                      <label class="cpayment7" for="checkbox-1">Paypal</label>
                    </div></span
                  >
                  <span class="cpayment62"
                    ><img src="../assets/Paypal.png" alt=""
                  /></span>
                </div>
              </div>
              <div class="cpayment8">
                PayPal is a trusted online payment platform that allows individuals and
                businesses to securely send and receive money electronically.
              </div>
            </div>
            <div class="cpayment4">
              <div class="cpayment5">
                <div class="cpayment6">
                  <span class="cpayment61"
                    ><div class="checkbox-wrapper cpayment61">
                      <input type="checkbox" id="checkbox-2" class="styled-checkbox" />
                      <label class="cpayment7" for="checkbox-2">Mastercard</label>
                    </div></span
                  >
                  <span class="cpayment62"
                    ><img src="../assets/Mastercard.png" alt=""
                  /></span>
                </div>
              </div>
              <div class="cpayment8">
                Mastercard is a widely accepted credit card for online transactions
              </div>
            </div>
            <div class="cpayment4">
              <div class="cpayment5">
                <div class="cpayment6">
                  <span class="cpayment61"
                    ><div class="checkbox-wrapper cpayment61">
                      <input type="checkbox" id="checkbox-3" class="styled-checkbox" />
                      <label class="cpayment7" for="checkbox-3">Bitcoin</label>
                    </div></span
                  >
                  <span class="cpayment62"
                    ><img src="../assets/bitcoin.png" alt=""
                  /></span>
                </div>
              </div>
              <div class="cpayment8">
                Bitcoin is a decentralized digital currency, without a central bank or
                single administrator.
              </div>
            </div>
          </div>
          <div class="cpayment">
            <div class="cpayment1">
              <span class="cpayment2">Shipping </span>
              <span class="cpayment3"
                >Please choose a shipping company based on your region</span
              >
            </div>
            <div class="cpayment4">
              <div class="cpayment5">
                <div class="cpayment6">
                  <span class="cpayment61"
                    ><div class="checkbox-wrapper cpayment61">
                      <input type="checkbox" id="checkbox-4" class="styled-checkbox" />
                      <label class="cpayment7" for="checkbox-4">AUSFF</label>
                    </div></span
                  >
                  <span class="cpayment62"><img src="../assets/ausff.png" alt="" /></span>
                </div>
              </div>
              <div class="cpayment9">
                <span>Delivery time: 14-21 days</span>
                <span>Shipping cost: Free</span>
                <span>Insurance: <span style="color: #ff2e00">Unavailable</span></span>
              </div>
            </div>
            <div class="cpayment4">
              <div class="cpayment5">
                <div class="cpayment6">
                  <span class="cpayment61"
                    ><div class="checkbox-wrapper cpayment61">
                      <input type="checkbox" id="checkbox-5" class="styled-checkbox" />
                      <label class="cpayment7" for="checkbox-5">RaceCouriers</label>
                    </div></span
                  >
                  <span class="cpayment62"
                    ><img src="../assets/racecouriers.png" alt=""
                  /></span>
                </div>
              </div>
              <div class="cpayment9">
                <span>Delivery time: 14-21 days</span>
                <span>Shipping cost: $10</span>
                <span>Insurance: <span style="color: #00a95d">Available</span></span>
              </div>
            </div>
            <div class="cpayment4">
              <div class="cpayment5">
                <div class="cpayment6">
                  <span class="cpayment61"
                    ><div class="checkbox-wrapper cpayment61">
                      <input type="checkbox" id="checkbox-6" class="styled-checkbox" />
                      <label class="cpayment7" for="checkbox-6">TranscoCargo</label>
                    </div></span
                  >
                  <span class="cpayment62"
                    ><img
                      style="width: 72px; height: 20.093px; flex-shrink: 0"
                      src="../assets/23.gif"
                      alt=""
                  /></span>
                </div>
              </div>
              <div class="cpayment9">
                <span>Delivery time: 14-21 days</span>
                <span>Shipping cost: $12</span>
                <span>Insurance: <span style="color: #00a95d">Available</span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="cm2">
          <div class="cm21">
            <div class="cm22">Order Summary</div>
            <div class="cm3">
              <div class="cm31">
                <span class="cm32">Price</span
                ><span class="cm33">${{ Total.toFixed(2) }}</span>
              </div>
              <div class="cm31">
                <span class="cm32">Shipping</span><span class="cm33">$0</span>
              </div>
              <div class="cm31">
                <span class="cm32">Tax</span><span class="cm33">$0</span>
              </div>
              <div v-if="discount" class="cm31">
                <span class="cm32">Discount Price</span><span class="cm33">$0</span>
              </div>
              <div v-else class="cm34">
                <span class="cm32">Discount Price</span>
                <div class="cm35">
                  <span
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                    >
                      <circle
                        cx="8.49984"
                        cy="11.3333"
                        r="0.666667"
                        transform="rotate(-180 8.49984 11.3333)"
                        fill="#FF2E00"
                      />
                      <path
                        d="M8.5 9.33323L8.5 4.66656M2.5 6.08787V9.91197C2.5 10.9275 3.0282 11.8659 3.88564 12.3737L7.11436 14.2858C7.9718 14.7935 9.0282 14.7935 9.88564 14.2858L13.1144 12.3737C13.9718 11.8659 14.5 10.9275 14.5 9.91197V6.08787C14.5 5.07232 13.9718 4.13391 13.1144 3.62613L9.88564 1.71408C9.0282 1.20631 7.9718 1.20631 7.11436 1.71408L3.88564 3.62613C3.0282 4.13391 2.5 5.07232 2.5 6.08787Z"
                        stroke="#FF2E00"
                        stroke-linecap="round"
                      /></svg></span
                  ><span> You must log in to use the discount code</span>
                </div>
              </div>
              <div class="cm36">
                <span class="cm32"
                  ><span> <input v-model="gift" type="checkbox" /></span>Pack in a Gift
                  Box</span
                ><span class="cm33">$10.90</span>
              </div>
              <div class="cm4"></div>
              <div class="cm5">
                <span class="cm51">Total Price</span>
                <span class="cm52">${{ Total1.toFixed(2) }}</span>
              </div>
            </div>
            <div v-if="checkedout" @click="checkout()" class="cm6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M16.5 7.66667H6.5M16.5 7.66667C19.2614 7.66667 21.5 9.65651 21.5 12.1111V16.5556C21.5 19.0102 19.2614 21 16.5 21H6.5C3.73858 21 1.5 19.0102 1.5 16.5556V12.1111C1.5 9.65651 3.73858 7.66667 6.5 7.66667M16.5 7.66667V5.44444C16.5 2.98985 14.2614 1 11.5 1C8.73858 1 6.5 2.98985 6.5 5.44444V7.66667"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Checkout</span>
            </div>
            <div v-else class="cm6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M12.5 2V6"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.5 4L10.5 4"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.5 10V16.7639C4.5 17.5215 4.928 18.214 5.60557 18.5528L11.6056 21.5528C12.1686 21.8343 12.8314 21.8343 13.3944 21.5528L19.3944 18.5528C20.072 18.214 20.5 17.5215 20.5 16.7639V10"
                  stroke="white"
                />
                <path
                  d="M18.5 5L20.5 6L12.5 10L4.5 6L6.5 5"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.5 6L12.5 10L14.5 13L22.5 9L20.5 6Z"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.5 6L12.5 10L10.5 13L2.5 9L4.5 6Z"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Shop now</span>
            </div>
          </div>
        </div>
      </div>
      <div class="coupon">
        <div class="coupon1">
          <input type="text" placeholder="Enter Coupon Code" />
        </div>
        <div class="coupon2">Login and Apply code</div>
      </div>
    </div>
    <div class="siproduct">
      <div class="sip1">You might also like</div>
      <div class="sip11">
        <div class="sip2" v-for="product in siproducts.slice(0, 4)" :key="product.id">
          <div><img class="sip3" :src="product.thumbnail" alt="" /></div>
          <div class="sip4">
            <router-link :to="{ name: 'Productdetails', params: { id: product.id } }">
              <div class="sip5">
                {{ product.title }}
              </div></router-link
            >
            <div class="sip6">
              <div class="sip7">
                ${{ calculateNormalPrice(product.discountPercentage, product.price) }}
              </div>
              <div class="sip71">${{ product.price }}</div>
              <div class="sip8">{{ product.discountPercentage }}%</div>
            </div>
            <div class="sip9" @click="addCart(product)">Add to cart</div>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%"><Footer /></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  data() {
    return {
      selectedCity: "",
      selectedCountry: "",
      discount: false,
      gift: false,
      checkedout: true,
      cCard: false,
      cCustomer: false,
      cShipping: true,
      cProduct: false,
    };
  },
  components: { Header, Footer },
  watch: {
    selectedCountry(newValue) {
      this.$store.dispatch("productdetails/fetchFlagImageUrl", newValue);
    },
  },
  computed: {
    siproducts() {
      const currentProductId = this.productDetails.id;
      return this.products.filter((product) => {
        const category = product.category.toLowerCase();
        const siproduct = category.includes(this.productDetails.category);
        return siproduct && product.id !== currentProductId;
      });
    },
    Total() {
      return this.calculatedTotals.reduce((acc, total) => acc + total, 0);
    },
    calculatedTotals() {
      return this.carts.map((cart) => cart.Price * cart.Quantity);
    },
    Total1() {
      const baseTotal = this.calculatedTotals.reduce((acc, total) => acc + total, 0);
      return this.gift ? baseTotal + 10.9 : baseTotal;
    },
    ...mapGetters("productdetails", [
      "total",
      "normalPrice",
      "number",
      "productDetails",
      "carts",
      "countries",
      "cities",
      "selectedCountry",
      "selectedCity",
      "flagImageUrl",
    ]),
    ...mapGetters("product", ["products", "isFavorite", "Images", "favoriteProducts"]),
  },
  methods: {
    change1() {
      this.cCard = !this.cCard;
      if ((this.cCard = true)) {
        this.cShipping = false;
        this.cProduct = false;
        this.cCustomer = false;
      }
    },
    change2() {
      this.cCustomer = !this.cCustomer;
      if ((this.cCustomer = true)) {
        this.cCard = false;
        this.cProduct = false;
        this.cShipping = false;
      }
    },
    change3() {
      this.cShipping = !this.cShipping;
      if ((this.cShipping = true)) {
        this.cCard = false;
        this.cProduct = false;
        this.cCustomer = false;
      }
    },
    change4() {
      this.cProduct = !this.cProduct;
      if ((this.cProduct = true)) {
        this.cCard = false;
        this.cCustomer = false;
        this.cShipping = false;
      }
    },
    ...mapActions("productdetails", ["fetchFlagImageUrl"]),
    updateCities() {
      this.$store.dispatch("productdetails/updateCities");
    },
    async updateSelectedCountry() {
      await this.$store.dispatch(
        "productdetails/fetchFlagImageUrl",
        this.selectedCountry
      );
      this.updateCities();
      this.$store.commit("productdetails/setSelectedCountry", this.selectedCountry);
    },
    checkout() {
      this.checkedout = !this.checkedout;
    },
    addCart(product) {
      const isProductInCart = this.carts.some((item) => item.id === product.id);
      const Quantity = 1;
      const Price = (
        product.price -
        (product.discountPercentage / 100) * product.price
      ).toFixed(2);
      if (!isProductInCart) {
        this.carts.push({ ...product, Quantity, Price });
      }
    },
    calculateNormalPrice(discountPercentage, discountPrice) {
      if (typeof discountPercentage === "number" && discountPercentage !== 0) {
        const normalPrice = discountPrice - (discountPercentage / 100) * discountPrice;
        return normalPrice.toFixed(2);
      } else {
        return discountPrice.toFixed(2);
      }
    },
    del(cart) {
      const index = this.carts.findIndex((c) => c.id === cart.id);
      if (index !== -1) {
        this.carts.splice(index, 1);
      }
    },
    calculateTotal(cart) {
      return this.calculatedTotals[this.carts.indexOf(cart)];
    },
    increase(cart) {
      cart.Quantity++;
    },
    decrease(cart) {
      if (cart.Quantity > 0) {
        cart.Quantity--;
      }
    },
  },
  created() {
    this.$store.dispatch("productdetails/fetchCountries");
  },
  watch: {
    selectedCountry(newValue) {
      this.$store.commit("productdetails/setSelectedCountry", newValue);
    },
  },
};
</script>
<style>
.cpayment {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-5, 20px);
  flex: 1 0 0;
}
.cpayment1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2, 8px);
  align-self: stretch;
}
.cpayment2 {
  color: var(--text-color-light-primary-text, #262626);
  font-family: Lato;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px; /* 125% */
}
.cpayment3 {
  color: var(--text-color-light-secondary-text, #555);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.cpayment4 {
  display: flex;
  padding: var(--spacing-3, 12px) var(--spacing-4, 16px);
  flex-direction: column;
  justify-content: center;
  gap: var(--spacing-2, 8px);
  align-self: stretch;
  border-radius: var(--spacing-1, 4px);
  background: #f5f5f5;
}
.cpayment5 {
  display: flex;
  align-self: stretch;
}
.cpayment6 {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.cpayment62 {
  float: right;
  display: flex;
  width: 73px;
  height: 32px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
.cpayment7 {
  margin-left: 8px;
  color: var(--text-color-light-primary-text, #262626);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
}
.cpayment8 {
  margin-left: 38px;
  color: var(--text-color-light-secondary-text, #555);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  height: 62px;
  flex: 1 0 0; /* 166.667% */
}
.cpayment9 {
  color: var(--text-color-light-secondary-text, #555);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  height: 62px;
  flex: 1 0 0; /* 166.667% */
  display: flex;
  padding: var(--spacing-0, 0px) var(--spacing-7, 28px);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
}
.cShipping {
  display: flex;
  height: 501px;
  gap: 32px var(--spacing-8, 32px);
  flex: 1 0 0;
  flex-wrap: wrap;
}
.checkbox-wrapper {
  display: flex;
  align-items: center;
}

.checkbox-wrapper label {
  margin-left: 8px; /* Adjust the margin to your preference */
  cursor: pointer;
}

.styled-checkbox {
  display: none;
}

.styled-checkbox + label {
  position: relative;
  padding-left: 30px; /* Adjust the padding to match the checkbox size */
  cursor: pointer;
  display: inline-block;
}

.styled-checkbox + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 20px; /* Adjust the width and height to match the checkbox size */
  height: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 50%;
}

.styled-checkbox:checked + label:before {
  background-color: #4172dc;
  border-color: #66bb6a;
}
.flag {
  width: 26px;
  height: 26px;
}
.cartc4 {
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
.cartc3 {
  cursor: pointer;
}
.cartc1 {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-15, 64px);
  color: var(--text-color-light-tritary-text, #9d9d9d);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.cart-categories {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-5, 20px);
}
.cartc2 {
  width: 100%;
  height: var(--spacing-0, 1px);
  background: var(--button-stroke-stroke, #d9d9d9);
}
.coupon {
  display: flex;
  padding: var(--spacing-0, 0px) 90px;
  justify-content: flex-end;
  align-items: center;
}
.coupon1 {
  display: flex;
  width: 197px;
  height: 57px;
  padding: var(--spacing-1, 4px) 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--spacing-1, 4px) var(--spacing-0, 0px) var(--spacing-0, 0px)
    var(--spacing-1, 4px);
  border: 1px solid var(--button-stroke-card-stroke-hover, #7b7b7b);
  color: var(--text-color-light-secondary-text, #555);
  text-align: right;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
  text-transform: capitalize;
}
.coupon1 input {
  border: none;
  outline: none;
}
.coupon2 {
  display: flex;
  padding: var(--spacing-2, 8px) 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--spacing-0, 0px) var(--spacing-1, 4px) var(--spacing-1, 4px)
    var(--spacing-0, 0px);
  background: var(--background-color-gray, #262626);
  color: var(--text-color-inside-inside, #fff);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
  text-transform: capitalize;
  width: 91px;
}
.carts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-10, 40px);
}
.cartmain {
  display: flex;
  padding: 90px;
  padding-top: 50px;
  padding-bottom: 40px;
  align-items: flex-start;
  gap: 100px;
}
.cCustomer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-8, 32px);
}
.customer-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-5, 20px);
}
.ci1 {
  color: var(--text-color-light-primary-text, #262626);
  font-family: Lato;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px; /* 125% */
}
.ci2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-3, 12px);
}
.ci6 {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-4, 16px);
}
.ci3 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-1, 4px);
}
.ci4 {
  color: var(--text-color-light-secondary-text, #555);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
}
.ci5 {
  display: flex;
  padding: var(--spacing-3, 12px);
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: var(--spacing-1, 4px);
  border: 1px solid var(--button-stroke-stroke, #d9d9d9);
  background: var(--background-color-white, #fff);
}
.ci7 {
  width: 390px;
}
.ship35 {
  display: flex;
  width: 200px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 47px;
  border: none;
  outline: none;
  width: 374px;
}
.ship36 {
  width: 390px;
  border-radius: 6px;
  border: 1px solid #c4c4c4;
}
.ci8 {
  display: flex;
  padding: var(--spacing-2, 8px) var(--spacing-4, 16px);
  align-items: flex-start;
  gap: 10px;
  border-radius: var(--spacing-1, 4px);
  border: 1px solid var(--button-stroke-stroke, #d9d9d9);
  background: var(--background-color-white, #fff);
}
.ship34 {
  display: flex;
  padding: var(--spacing-0, 0px);
  align-items: center;
  gap: 264px;
  width: 320px;
  align-self: stretch;
  border: none;
}
.cartmain1 {
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
}
.cmain1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-8, 32px);
}
.cartm11 {
  display: flex;
  align-items: center;
  align-content: center;
  gap: var(--spacing-4, 16px) 80px;
  flex-wrap: wrap;
}
.cm2 {
  display: flex;
  padding: var(--spacing-5, 20px) var(--spacing-10, 40px);
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  background: var(--background-color-top-category, #e9e9e9);
  gap: var(--spacing-7, 28px);
}
.cm21 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-3, 12px);
}
.cm22 {
  color: var(--text-color-light-primary-text, #262626);
  font-family: Roboto Slab;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px; /* 156.25% */
}
.cm3 {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 16px var(--spacing-4, 16px);
  flex-direction: column;
}
.cm4 {
  width: 100%;
  height: var(--spacing-0, 1px);
  background: var(--button-stroke-stroke, #d9d9d9);
}
.cm5 {
  display: flex;
  padding: var(--spacing-0, 0px);
  align-items: flex-start;
  gap: 16px;
}
.cm6 {
  display: flex;
  height: 52px;
  padding: 16px 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--spacing-1, 4px);
  background: var(--button-card-background-pressed, #434343);
  color: var(--text-color-inside-inside, #fff);
  text-align: right;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  text-transform: uppercase;
  cursor: pointer;
}
.cm51 {
  width: 130px;
  color: var(--text-color-light-primary-text, #262626);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
}
.cm52 {
  width: 50px;
  color: var(--text-color-light-primary-text, #262626);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  text-align: right;
}
.cm31 {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 16px var(--spacing-4, 16px);
}
.cm34 {
  display: flex;
  width: 160px;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-1, 4px);
}
.cm36 {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 12px;
}
.cm35 {
  display: flex;
  align-items: center;
  gap: var(--spacing-1, 4px);
  color: var(--text-color-light-text-off-proces, #ff2e00);
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
}
.cm32 {
  display: flex;
  gap: 7px;
  width: 130px;
  color: var(--text-color-light-secondary-text, #555);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.cm33 {
  width: 50px;
  color: var(--text-color-light-primary-text, #262626);
  text-align: right;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.cartm1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-6, 10px);
}
.cartm12 {
  width: 58px;
  height: 70px;
}
.cartm13 {
  border-radius: var(--spacing-0, 10px);
  border-top: 1px solid var(--button-stroke-stroke, #d9d9d9);
  border-right: var(--spacing-0, 1px) solid var(--button-stroke-stroke, #d9d9d9);
  border-bottom: var(--spacing-0, 1px) solid var(--button-stroke-stroke, #d9d9d9);
  border-left: var(--spacing-0, 1px) solid var(--button-stroke-stroke, #d9d9d9);
}
.cmain11 {
  color: var(--text-color-light-primary-text, #262626);
  font-family: Lato;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px; /* 125% */
}
.cmain12 {
  color: var(--text-color-light-tritary-text, #9d9d9d);
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 166.667% */
}
.cmain13 {
  display: flex;
  align-items: center;
  gap: var(--spacing-1, 4px);
}
.cartm21 {
  color: var(--text-color-light-primary-text, #262626);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  width: 208px;
}
.cartm22 {
  color: var(--text-color-light-secondary-text, #555);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.cartm3 {
  color: var(--text-color-light-secondary-text, #555);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.cartm31 {
  float: right;
  position: relative;
  top: -12px;
  cursor: pointer;
}
</style>
