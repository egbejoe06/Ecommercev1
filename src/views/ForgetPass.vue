<template>
  <div>
    <div class="home1">
      <Header v-if="windowWidth >= 767" />
      <MobileHeader v-else />
    </div>
    <div class="b2w">
      <router-link to="/">
        <div class="b2w1">
          <div><img src="../assets/arrow-left.svg" alt="" /></div>
          <div class="b2w2">Back to the website</div>
        </div>
      </router-link>
    </div>
    <div class="forget">
      <div class="sign-in">
        <div class="sg1">Forgot password</div>
        <div class="fg1">Enter your email adress to reacquisition to your password.</div>
        <form>
          <div>
            <div class="sg2">
              <label class="sg21">Email</label>
              <div class="sg22" :class="{ error: err2 !== '' }">
                <div class="sg211">
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      v-model="Email"
                      required
                    />
                  </div>
                  <div><img src="../assets/Vector.svg" alt="" /></div>
                </div>
              </div>
              <div class="err">{{ err2 }}</div>
            </div>
            <div class="sg8">
              <button
                @click.prevent="validate()"
                :style="{
                  backgroundColor:
                    this.Email.length > 2 && this.Password.length > 2
                      ? '#4172DC'
                      : '#C4C4C4',
                  color:
                    this.Email.length > 2 && this.Password.length > 2 ? 'white' : 'black',
                }"
                class="sg4"
              >
                Reset password
              </button>
            </div>
            <div class="fg2">
              <div class="fg21">Don’t have an account?</div>
              <router-link to="/sign-in"><div class="fg22">Sign Up</div></router-link>
            </div>
          </div>
        </form>
      </div>
      <div class="popup-wrapper" v-if="isPopupVisible">
        <div class="popup">
          <div><img src="../assets/email.png" alt="" /></div>
          <div class="popup3">
            <div class="popup1">Check Your Email</div>
            <div class="popup2">
              We have just sent you your new confirmation email to complete your
              registration to {{ Email }}.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div><Footer /></div>
  </div>
</template>
<script>
import { supabase } from "../clients/supabase";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import MobileHeader from "../components/MobileHeader.vue";
export default {
  components: { Header, Footer, MobileHeader },
  data() {
    return {
      windowWidth: window.innerWidth,
      Email: "",
      Password: "",
      remember: false,
      emailerr: true,
      err1: false,
      err2: "",
      err3: "",
      isPopupVisible: false,
    };
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    async validate() {
      this.err2 = "";

      if (this.Email.length < 2) {
        this.err2 = "Wrong email address";
      } else {
        try {
          const { user, error } = await supabase.auth.resetPasswordForEmail(this.Email, {
            redirectTo: "https://ecommerce-nu-hazel.vercel.app/forgetpassword",
          });
          if (error) {
            console.log(error);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  .forget {
    padding-left: 10px !important;
    padding-right: 10px !important;
    padding-bottom: 0px !important;
    padding-top: 10px !important;
  }
  .sg1 {
    left: unset !important;
    display: flex;
    justify-content: center;
  }
}
.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Ensure the popup is above other content */
}
.fg2 {
  display: flex;
  padding: var(--spacing-2, 8px) var(--spacing-0, 0px);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-2, 8px);
  align-self: stretch;
  border-radius: var(--spacing-1, 4px);
  background: var(--background-color-white, #fff);
}
.fg1 {
  color: var(--text-color-light-secondary-text, #555);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 125% */
}
.sg1 {
  color: var(--text-color-light-primary-text, #262626);
  text-align: center;
  position: relative;
  left: 108px;
  font-family: Lato;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.forget {
  display: flex;
  padding: 24px 90px var(--spacing-11, 44px) 90px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
  align-self: stretch;
  background: var(--background-color-white, #fff);
}
.fg21 {
  color: var(--text-color-light-primary-text, #262626);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
}
.fg22 {
  color: var(--text-color-light-text-selected-category, #ff7a00);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px; /* 156.25% */
}
</style>
