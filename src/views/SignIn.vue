<template>
  <div class="sign-in">
    <div class="sg1">Sign in</div>
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
        <div class="sg2">
          <label class="sg21">Password</label>
          <div :class="{ error: err2 !== '' }" class="sg22">
            <div class="sg211">
              <div>
                <input
                  :type="IsPassword ? 'password' : 'text'"
                  placeholder="Password"
                  v-model="Password"
                  required
                />
              </div>
              <div @click="showpassword()">
                <img src="../assets/showpass.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="err1">{{ err3 }}</div>
        <div class="sg3">
          <div class="sg31">
            <input v-model="remember" type="checkbox" />
            <label class="sg311">Remember me</label>
          </div>
          <div class="sg32">
            <router-link to="/forgetpassword">forget Password</router-link>
          </div>
        </div>
        <div class="sg8">
          <button
            :style="{
              backgroundColor:
                this.Email.length > 2 && this.Password.length > 2 ? '#4172DC' : '#C4C4C4',
              color:
                this.Email.length > 2 && this.Password.length > 2 ? 'white' : 'black',
            }"
            @click.prevent="validate()"
            class="sg4"
          >
            Sign in
          </button>
        </div>
        <div class="sg6">
          <div class="sg61"></div>
          <div class="sg62">or</div>
          <div class="sg63"></div>
        </div>
        <div class="sg8">
          <button @click.prevent="validate1()" class="sg5">
            <div><img src="../assets/Google__G__Logo.png" alt="" /></div>
            <div>Sign in by Google</div>
          </button>
        </div>
      </div>
    </form>
    <div class="sg7">
      <div><img src="../assets/warning-polygon.svg" alt="" /></div>
      <div class="sg71">
        Sign up to save $9 for free shipping with Ausff company through australlian
        territory
      </div>
    </div>
    <div class="sg72">
      <span class="sg73">Don’t have an account?</span>
      <router-link to="/sign-up"> <span class="sg74"> Sign Up</span></router-link>
    </div>
  </div>
</template>
<script>
import { supabase } from "../clients/supabase";
export default {
  data() {
    return {
      Email: "",
      Password: "",
      remember: false,
      IsPassword: true,
      emailerr: true,
      err1: false,
      passerr: true,
      err2: "",
      err3: "",
    };
  },
  methods: {
    async validate1() {
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        redirectTo: "https://ecommerce-nu-hazel.vercel.app",
      });
      console.log(user);
      if (error) {
        console.error(error);
      }
    },
    showpassword() {
      this.IsPassword = !this.IsPassword;
    },
    async validate() {
      this.err2 = "";
      this.err3 = "";
      if (this.Email.length < 2) {
        this.err2 = "Wrong email address";
      }

      if (this.Password.length < 1) {
        this.err3 = "Password cannot be empty";
      } else {
        try {
          const { user, error } = await supabase.auth.signInWithPassword({
            email: this.Email,
            password: this.Password,
          });
          if (error) {
            console.log(error);
            this.err3 = "Wrong Password";
            this.err2 = "Wrong email address";
          } else {
            console.log(user);
            setTimeout(() => {
              this.$router.push("/");
            }, 500);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    async logout() {
      const user = await supabase.auth.signOut();
      console.log(user);
    },
  },
};
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  .search {
    display: none !important;
  }
}
</style>
<style>
@media only screen and (max-width: 600px) {
  form {
    width: 100%;
  }
  .sg8 {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }
  .sg4,
  .sg5 {
    width: 100% !important;
  }
  .sg22 {
    width: 100% !important;
  }
  .sg211 div input {
    width: 270px !important;
  }
  .sg31 {
    flex: unset !important;
  }
  .sg3 {
    justify-content: space-between;
  }
  .sg211 {
    gap: unset;
    justify-content: space-between;
  }
  .sg72 {
    display: block !important;
  }
}
.sg72 {
  display: none;
}
.sg73 {
  color: var(--text-color-Light-Primary-text, #262626);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
}
.sg74 {
  color: var(--text-color-Light-Text-Selected-category, #ff7a00);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 125% */
  text-transform: capitalize;
  cursor: pointer;
}
.error {
  outline: 1px solid red;
}
.err,
.err1 {
  display: block;
  width: 145px;
  color: var(--text-color-light-text-off-proces, #ff2e00);
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 10px; /* 83.333% */
  padding-bottom: 10px;
}
.emailerr,
.passerr {
  width: 145px;
  color: var(--text-color-light-text-off-proces, #ff2e00);
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 10px; /* 83.333% */
  padding-bottom: 10px;
  display: none;
}
.sg71 {
  color: var(--tag-notif-off-tag, #ff2e00);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  width: 385px;
}
.sg7 {
  display: flex;
  padding: var(--spacing-0, 0px);
  align-items: center;
  gap: var(--spacing-2, 8px);
  width: 100%;
}
.sg61 {
  width: 165px;
  height: var(--spacing-0, 1px);
  border-radius: var(--spacing-0, 0px);
  background: var(--button-stroke-stroke, #d9d9d9);
}
.sg62 {
  width: 12px;
  color: var(--text-color-light-tritary-text, #9d9d9d);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  text-transform: uppercase;
}
.sg63 {
  width: 177px;
  height: var(--spacing-0, 1px);
  border-radius: var(--spacing-0, 0px);
  background: var(--button-stroke-stroke, #d9d9d9);
}
.sg6 {
  display: flex;
  padding: var(--spacing-0, 0px);
  align-items: center;
  gap: 13px;
  align-self: stretch;
}
.sg5 {
  cursor: pointer;
  display: flex;
  padding: var(--spacing-4, 16px) var(--spacing-0, 0px);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-2, 8px);
  align-self: stretch;
  border-radius: var(--spacing-1, 4px);
  background: var(--button-card-background-pressed, #434343);
  border: none;
  width: 385px;
  color: var(--text-color-inside-inside, #fff);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
}
.sg4 {
  cursor: pointer;
  display: flex;
  height: 56px;
  padding: 16px 32px;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-2, 8px);
  align-self: stretch;
  border-radius: var(--spacing-1, 4px);
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.2) 100%
    ),
    var(--button-card-background-disabled, #c4c4c4);
  border: none;
  width: 385px;
}
.sg311 {
  color: var(--text-color-light-primary-text, #262626);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
}
.sg32 a {
  color: var(--button-default, #4172dc) !important;
}
.sg32 {
  color: var(--button-default, #4172dc) !important;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
}
.sg31 {
  display: flex;
  padding: var(--spacing-0, 0px);
  align-items: center;
  gap: var(--spacing-1, 4px);
  flex: 1 0 0;
}
.sg3 {
  display: flex;
  padding: var(--spacing-0, 0px);
  align-items: center;
  align-content: center;
  align-self: stretch;
  flex-wrap: wrap;
}
.sg211 div input {
  color: var(--text-color-light-secondary-text, #555);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  border: none;
  width: 330px;
}
.sg22 {
  border-radius: var(--spacing-1, 4px);
  border: 1px solid var(--button-stroke-stroke, #d9d9d9);
  display: flex;
  height: var(--spacing-10, 40px);
  padding: var(--spacing-4, 16px) 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  width: 385px;
}
.sg2 {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-1, 4px);
  align-self: stretch;
}
.sg211 {
  display: flex;
  padding: var(--spacing-0, 0px);
  align-items: center;
  gap: 12px;
  align-self: stretch;
}
.sg1 {
  color: var(--color-base-black, #000);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Lato;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 100% */
}
.sign-in {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-9, 25px);
  flex: 1 0 0;
  border-radius: var(--spacing-0, 0px);
  background: var(--background-color-white, #fff);
}
</style>
