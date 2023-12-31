import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import ForgetPass from '../views/ForgetPass.vue'
import Products from '../views/Products/Products.vue'
import Women from '../views/Products/Women.vue'
import Men from '../views/Products/Men.vue'
import Furniture from '../views/Products/Furniture.vue'
import Supermarket from '../views/Products/Supermarket.vue'
import Cosmetics from '../views/Products/Cosmetics.vue'
import Shoe from '../views/Products/Shoe.vue'
import Electronics from '../views/Products/Electronics.vue'
import Outdoor from '../views/Products/Outdoor.vue'
import Best from '../views/Products/Best.vue'
import NotFound from '../views/Products/NotFound.vue'
import Productdetails from '../views/Products/Productdetails.vue'
import Cart from '../views/Cart.vue'
import Register from '../views/Register.vue'
import { supabase } from '../clients/supabase'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/sign-in',
    name: 'Signin',
    component: HomeView
  },
  {
    path: '/sign-up',
    name: 'Signup',
    component: Register
  },
  {
    path: '/forgetpassword',
    name: 'Forgetpass',
    component: ForgetPass
  },
  {
    path: '/Products',
    name: 'All categories',
    component: Products
  },
  {
    path: '/Men',
    name: 'Men',
    component: Men
  },
  {
    path: '/Women',
    name: 'Women',
    component: Women
  },
  {
    path: '/Home&Furniture',
    name: 'Home & Furniture',
    component: Furniture
  },
  {
    path: '/Supermarket',
    name: 'Supermarket',
    component: Supermarket
  },
  {
    path: '/Cosmetics',
    name: 'Cosmetics',
    component: Cosmetics
  },
  {
    path: '/Shoe&Bag',
    name: 'Shoe & Bag',
    component: Shoe
  },
  {
    path: '/Electronics',
    name: 'Electronics',
    component: Electronics
  },
  {
    path: '/Outdoor',
    name: 'Sports and Outdoors',
    component: Outdoor
  },
  {
    path: '/Bestsellers',
    name: 'Best sellers',
    component: Best
  },
  {
    path: '/:catchAll(.*)',
    name: 'Notfound',
    component: NotFound
  },
  {
    path: '/product/:id',
    name: 'Productdetails',
    component: Productdetails
  },
  {
    path: '/sign-up',
    name: 'Signup',
    component: Register
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
async function getUser(next) {
	const localUser = await supabase.auth.getSession();
	if (localUser.data.session == null) {
		next('/sign-in')
	}
	else {
		next();
	}
}

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		getUser(next);
	}
	else {
		next();
	}
})

export default router
