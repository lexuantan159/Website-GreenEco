import AddProduct from '../components/Dashboard/AddProduct';
import EditProduct from '../components/Dashboard/EditProduct';
import EditUser from '../components/Dashboard/EditUser';
import OrderList from '../components/Dashboard/OrderList';
import ProductList from '../components/Dashboard/ProductList';
import UserList from '../components/Dashboard/UserList';
import { Home, Contact, Login, Signup, About, Products, ShoppingCart ,Checkout,ProductDetail, ForgotPassword, ResetPassword, UserIn4, DashboardAdmin } from '../pages/index';


const router = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/products', component: Products },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/cart', component: ShoppingCart },
    { path: '/checkout', component: Checkout },
    { path: '/userinformation', component: UserIn4 },
    { path: '/products/:id', component: ProductDetail },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/reset-password', component: ResetPassword },
    { path: '/dashboard', component: DashboardAdmin },
    { path: '/dashboard/list-product', component: ProductList },
    { path: '/dashboard/add-product', component: AddProduct },
    { path: '/dashboard/edit-product/:id', component: EditProduct },
    { path: '/dashboard/list-user', component: UserList },
    { path: '/dashboard/list-order', component: OrderList },
    { path: '/dashboard/edit-user/:id', component: EditUser },
];

export {router}
