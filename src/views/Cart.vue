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
                <input v-model="Email" class="ci5 ci7" type="email" />
                <span v-if="!isEmailValid" class="error-message"
                  >Invalid email format.</span
                >
              </div>
              <div class="ci6">
                <div class="ci3">
                  <label class="ci4">First Name</label>
                  <input v-model="Firstname" class="ci5" type="text" />
                  <span v-if="!isFirstnameValid" class="error-message"
                    >Please enter a first name.</span
                  >
                </div>
                <div class="ci3">
                  <label class="ci4">Last Name</label>
                  <input v-model="Lastname" class="ci5" type="text" />
                  <span v-if="!isLastnameValid" class="error-message"
                    >Please enter a last name.</span
                  >
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
              <span v-if="!isCountryValid" class="error-message"
                >Please select a country.</span
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
              <span v-if="!isCityValid" class="error-message">Please select a city.</span>
            </div>
            <div class="ci3">
              <label class="ci4">Address</label>
              <input v-model="address" class="ci5 ci7" type="text" />
              <span v-if="!isAddressValid" class="error-message"
                >Please enter an address.</span
              >
            </div>
            <div class="ci3">
              <label class="ci4">Phone Number</label>
              <input v-model="Phonenumber" class="ci5 ci7 ci9" type="number" />
              <span v-if="!isPhonenumberValid" class="error-message"
                >Invalid phone number.</span
              >
            </div>
          </div>
        </div>
        <div v-show="cShipping" class="cShipping">
          <div class="cpayment">
            <div class="cpayment1">
              <span class="cpayment2">Payment </span>
              <span class="cpayment3">Please choose a payment method</span>
              <div v-if="!isSelectionValid" class="validation-message">
                Please select at least one payment method
              </div>
            </div>
            <div class="cpayment4" :class="{ cpayment63: paypal }">
              <div class="cpayment5">
                <div class="cpayment6">
                  <span class="cpayment61"
                    ><div class="checkbox-wrapper cpayment61">
                      <input
                        v-model="paypal"
                        @click="Paypal1()"
                        type="checkbox"
                        id="checkbox-1"
                        class="styled-checkbox"
                      />
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
            <div class="cpayment4" :class="{ cpayment63: mastercard }">
              <div class="cpayment5">
                <div class="cpayment6">
                  <span class="cpayment61"
                    ><div class="checkbox-wrapper cpayment61">
                      <input
                        v-model="mastercard"
                        @click="mastercard1()"
                        type="checkbox"
                        id="checkbox-2"
                        class="styled-checkbox"
                      />
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
            <div class="cpayment4" :class="{ cpayment63: bitcoin }">
              <div class="cpayment5">
                <div class="cpayment6">
                  <span class="cpayment61"
                    ><div class="checkbox-wrapper cpayment61">
                      <input
                        v-model="bitcoin"
                        @click="bitcoin1()"
                        type="checkbox"
                        id="checkbox-3"
                        class="styled-checkbox"
                      />
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
              <div v-if="!isSelectionValid" class="validation-message">
                Please select at least one shipping company.
              </div>
            </div>
            <div class="cpayment4" :class="{ cpayment63: ausff }">
              <div class="cpayment5">
                <div class="cpayment6">
                  <span class="cpayment61"
                    ><div class="checkbox-wrapper cpayment61">
                      <input
                        type="checkbox"
                        v-model="ausff"
                        @click="ausff1()"
                        id="checkbox-4"
                        class="styled-checkbox"
                      />
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
            <div class="cpayment4" :class="{ cpayment63: racecouriers }">
              <div class="cpayment5">
                <div class="cpayment6">
                  <span class="cpayment61"
                    ><div class="checkbox-wrapper cpayment61">
                      <input
                        type="checkbox"
                        v-model="racecouriers"
                        @click="racecouriers1()"
                        id="checkbox-5"
                        class="styled-checkbox"
                      />
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
            <div class="cpayment4" :class="{ cpayment63: transcargo }">
              <div class="cpayment5">
                <div class="cpayment6">
                  <span class="cpayment61"
                    ><div class="checkbox-wrapper cpayment61">
                      <input
                        type="checkbox"
                        v-model="transcargo"
                        @click="transcargo1()"
                        id="checkbox-6"
                        class="styled-checkbox"
                      />
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
        <div v-show="cProduct" class="cProduct">
          <div class="cproduct1">Confirmation</div>
          <div class="cproduct2">
            <div class="cproduct3">
              <div class="cproduct31">Shopping items</div>
              <div class="cproduct32">
                <div class="cproduct33" v-for="cart in carts">
                  <div class="cproduct331">
                    <div><img class="cproduct332" :src="cart.thumbnail" alt="" /></div>
                    <div class="cproduct333">{{ cart.title }}</div>
                  </div>
                  <div class="cproduct334">
                    <span class="cproduct335">${{ cart.Price }}</span>
                    <span class="cproduct336">x{{ cart.Quantity }}</span>
                  </div>
                  <div class="cproduct337">${{ calculateTotal(cart).toFixed(2) }}</div>
                </div>
              </div>
            </div>
            <div class="cproduct34"></div>
            <div class="cproduct4">
              <div class="cproduct31">Payment method</div>
              <div v-if="paypal" class="cproduct41">
                <span class="cproduct42">Paypal</span>
                <span class="cpayment62"><img src="../assets/Paypal.png" alt="" /></span>
              </div>
              <div v-if="mastercard" class="cproduct41">
                <span class="cproduct42">Mastercard</span>
                <span class="cpayment62"
                  ><img src="../assets/Mastercard.png" alt=""
                /></span>
              </div>
              <div v-if="bitcoin" class="cproduct41">
                <span class="cproduct42">Bitcoin</span>
                <span class="cpayment62"><img src="../assets/bitcoin.png" alt="" /></span>
              </div>
            </div>
            <div class="cproduct34"></div>
            <div class="cproduct4">
              <div class="cproduct31">Shipping company</div>
              <div v-if="ausff" class="cproduct41">
                <span class="cproduct42">AUSFF</span>
                <span class="cpayment62"><img src="../assets/ausff.png" alt="" /></span>
              </div>
              <div v-if="racecouriers" class="cproduct41">
                <span class="cproduct42">RaceCouriers</span>
                <span class="cpayment62"
                  ><img src="../assets/racecouriers.png" alt=""
                /></span>
              </div>
              <div v-if="transcargo" class="cproduct41">
                <span class="cproduct42">TranscoCargo</span>
                <span class="cpayment62"
                  ><img
                    style="width: 72px; height: 20.093px; flex-shrink: 0"
                    src="../assets/23.gif"
                    alt=""
                /></span>
              </div>
            </div>
            <div class="cproduct4">
              <div class="cproduct5">
                <span class="cproduct51">Name</span
                ><span class="cproduct52">{{ Lastname }} {{ Firstname }}</span>
              </div>
              <div class="cproduct5">
                <span class="cproduct51">Country</span
                ><span class="cproduct52">{{ selectedCountry }}</span>
              </div>
              <div class="cproduct5">
                <span class="cproduct51">Address</span
                ><span class="cproduct52">{{ address }}</span>
              </div>
              <div class="cproduct5">
                <span class="cproduct51">City</span
                ><span class="cproduct52">{{ selectedCity }}</span>
              </div>
              <div class="cproduct5">
                <span class="cproduct51">Phone</span
                ><span class="cproduct52">{{ Phonenumber }}</span>
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
            <stripe-checkout
              ref="checkoutRef"
              mode="payment"
              :pk="publishableKey"
              :line-items="lineItems"
              :success="successURl"
              :cancel="cancelURl"
              @loading="(v) => (loading = v)"
            />
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
            <div @click="Buy()" v-else class="cm6">
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
                /></svg
              ><span>Shop now</span>
            </div>
          </div>
        </div>
      </div>
      <div class="coupon" :class="{ coupon5: !procee }">
        <div v-show="procee" class="coupon4" @click="proceed()">Proceed</div>
        <div class="coupon3">
          <div class="coupon1">
            <input type="text" placeholder="Enter Coupon Code" />
          </div>
          <div class="coupon2">Login and Apply code</div>
        </div>
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
import { StripeCheckout } from "@vue-stripe/vue-stripe";
export default {
  data() {
    return {
      loading: false,
      lineItems: [
        {
          price: "price_1OS1y4Gl2kDj8xLv0o3aeDQ8",
          quantity: 1,
        },
      ],
      successURl: "http://localhost:5173/sign-in",
      cancelURl: "http://localhost:5173/sign-up",
      publishableKey:
        "pk_test_51ORzhDGl2kDj8xLv18vpQ4sDVJprapVGzjlvyoccObPcMt7DMttV77S1VZQqR24n8Rwbv1Xb4HYAd4I2IHw1uONc00gczlLhXe",
      Email: "",
      Firstname: "",
      Lastname: "",
      address: "",
      Phonenumber: "",
      isPhonenumberValid: true,
      isAddressValid: true,
      isCityValid: true,
      isCountryValid: true,
      isLastnameValid: true,
      isFirstnameValid: true,
      isEmailValid: true,
      paypal: false,
      bitcoin: false,
      mastercard: false,
      ausff: false,
      racecouriers: false,
      transcargo: false,
      selectedCity: "",
      selectedCountry: "",
      discount: false,
      gift: false,
      checkedout: false,
      cCard: true,
      cCustomer: false,
      cShipping: false,
      cProduct: false,
      procee: true,
    };
  },
  components: { Header, Footer, StripeCheckout },
  watch: {
    selectedCountry(newValue) {
      this.$store.dispatch("productdetails/fetchFlagImageUrl", newValue);
    },
  },
  computed: {
    isSelectionValid() {
      return (
        (this.paypal || this.mastercard || this.bitcoin) &&
        (this.ausff || this.racecouriers || this.transcargo)
      );
    },
    selectedCountryDialCode() {
      const dialCode = this.$store.state.productdetails.selectedCountryDialCode;
      return dialCode;
    },
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
    async Buy() {
      try {
        await this.$refs.checkoutRef.redirectToCheckout();
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    },
    validateForm() {
      this.isEmailValid = this.validateEmail(this.Email);
      this.isFirstnameValid = this.validateRequiredField(this.Firstname);
      this.isLastnameValid = this.validateRequiredField(this.Lastname);
      this.isCountryValid = this.validateRequiredField(this.selectedCountry);
      this.isCityValid = this.validateRequiredField(this.selectedCity);
      this.isAddressValid = this.validateRequiredField(this.address);
      this.isPhonenumberValid = this.validatePhoneNumber(this.Phonenumber);
      return (
        this.isEmailValid &&
        this.isFirstnameValid &&
        this.isLastnameValid &&
        this.isCountryValid &&
        this.isCityValid &&
        this.isAddressValid &&
        this.isPhonenumberValid
      );
    },
    proceed() {
      if (this.cCard) {
        this.cCard = false;
        this.cCustomer = true;
        this.procee = true;
      }
      if (this.cCustomer) {
        if (this.validateForm()) {
          this.cShipping = true;
          this.cCustomer = false;
          this.procee = true;
        } else {
          console.log("Form validation failed. Please check your inputs.");
        }
      }
      if (this.cShipping) {
        if (this.isSelectionValid) {
          this.cProduct = true;
          this.cShipping = false;
          this.procee = false;
        }
      }
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validateRequiredField(value) {
      return value.trim() !== "";
    },
    validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNumber);
    },
    Paypal1() {
      this.paypal = !this.paypal;
      if (this.paypal) {
        this.mastercard = false;
        this.bitcoin = false;
      }
    },
    mastercard1() {
      this.mastercard = !this.mastercard;
      if (this.mastercard) {
        this.paypal = false;
        this.bitcoin = false;
      }
    },
    bitcoin1() {
      this.bitcoin = !this.bitcoin;
      if (this.bitcoin) {
        this.mastercard = false;
        this.paypal = false;
      }
    },
    ausff1() {
      this.ausff = !this.ausff;
      if (this.ausff) {
        this.racecouriers = false;
        this.transcargo = false;
      }
    },
    racecouriers1() {
      this.racecouriers = !this.racecouriers;
      if (this.racecouriers) {
        this.ausff = false;
        this.transcargo = false;
      }
    },
    transcargo1() {
      this.transcargo = !this.transcargo;
      if (this.transcargo) {
        this.racecouriers = false;
        this.ausff = false;
      }
    },
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
    this.$store.dispatch("productdetails/fetchDialCode");
  },
  watch: {
    selectedCountry(newValue) {
      this.$store.commit("productdetails/setSelectedCountry", newValue);
    },
  },
};
</script>
<style>
.cpayment63 {
  background: #e9e9e9 !important;
}
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
.cProduct {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-8, 32px);
  flex: 1 0 0;
}
.cproduct1 {
  color: var(--base-grey-100, #262d33);
  font-family: Lato;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px; /* 125% */
}
.cproduct2 {
  display: flex;
  padding: var(--spacing-6, 24px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-5, 20px);
  align-self: stretch;
  background: var(--background-color-color, #f5f5f5);
}
.cproduct3 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-3, 12px);
  align-self: stretch;
}
.cproduct31 {
  color: var(--base-grey-85, #4b5157);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.cproduct32 {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-5, 20px);
  align-self: stretch;
}
.cproduct33 {
  display: flex;
  padding: var(--spacing-0, 0px);
  justify-content: space-between;
  align-items: center;
  align-content: center;
  row-gap: var(--spacing-4, 16px);
  align-self: stretch;
  flex-wrap: wrap;
}
.cproduct34 {
  border-radius: var(--spacing-0, 0px);
  background: var(--button-stroke-stroke, #d9d9d9);
  width: 100%;
  height: var(--spacing-0, 1px);
}
.cproduct4 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-1, 4px);
  align-self: stretch;
}
.cproduct5 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  row-gap: 340px;
  align-self: stretch;
  flex-wrap: wrap;
}
.cproduct51 {
  color: var(--text-color-light-secondary-text, #555);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.cproduct52 {
  color: var(--text-color-light-primary-text, #262626);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.cproduct41 {
  display: flex;
  height: 32px;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  align-self: stretch;
  flex-wrap: wrap;
}
.cproduct42 {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-2, 8px);
  flex: 1 0 0;
  color: var(--text-color-light-primary-text, #262626);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
}
.cproduct331 {
  display: flex;
  width: 350px;
  padding: var(--spacing-0, 0px);
  align-items: center;
  align-content: center;
  gap: 16px var(--spacing-4, 16px);
  flex-wrap: wrap;
}
.cproduct332 {
  width: 58px;
  height: 70px;
  border-radius: var(--spacing-0, 10px);
  border-top: 1px solid var(--button-stroke-stroke, #d9d9d9);
  border-right: var(--spacing-0, 1px) solid var(--button-stroke-stroke, #d9d9d9);
  border-bottom: var(--spacing-0, 1px) solid var(--button-stroke-stroke, #d9d9d9);
  border-left: var(--spacing-0, 1px) solid var(--button-stroke-stroke, #d9d9d9);
  background: lightgray 0px 0.693px / 100% 124.182% no-repeat;
}
.cproduct333 {
  color: var(--text-color-light-primary-text, #262626);
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
}
.cproduct334 {
  display: flex;
  width: 70px;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-1, 4px);
}
.cproduct335 {
  align-self: stretch;
  color: var(--text-color-light-secondary-text, #555);
  text-align: right;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.cproduct336 {
  align-self: stretch;
  color: var(--base-grey-85, #4b5157);
  text-align: right;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.cproduct337 {
  width: 70px;
  color: var(--text-color-light-secondary-text, #555);
  text-align: right;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.checkbox-wrapper {
  display: flex;
  align-items: center;
}

.checkbox-wrapper label {
  margin-left: 8px;
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
  justify-content: space-between;
  align-items: center;
}
.error-message {
  display: block;
  width: 145px;
  color: var(--text-color-light-text-off-proces, #ff2e00);
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 10px;
  padding-bottom: 10px;
}
.validation-message {
  display: block;
  color: var(--text-color-light-text-off-proces, #ff2e00);
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 10px;
  padding-bottom: 10px;
}
.coupon3 {
  display: flex;
}
.coupon5 {
  display: flex;
  padding: var(--spacing-0, 0px) 90px;
  justify-content: flex-end !important;
  align-items: center;
}
.coupon4 {
  border-radius: 5px;
  padding: 10px;
  background: #7b7b7b;
  color: #fff;
  text-align: right;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
  text-transform: capitalize;
  cursor: pointer;
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
  gap: 50px;
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
.ci9::-webkit-inner-spin-button,
.ci9::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.ci9 {
  -moz-appearance: textfield;
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
