import { Home, Contact, Login, Signup, About, Products, ShoppingCart ,Checkout} from '../pages/index';

const router = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/products', component: Products },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/cart', component: ShoppingCart },
    { path: '/checkout', component: Checkout },

];

export {router}
