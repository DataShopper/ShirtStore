/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as Cart} from './Cart'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './AllProducts'
export {default as Account} from './Account'
export {default as PurchasedOrders} from './PurchasedOrders'
export {default as SingleProduct} from './SingleProduct'
export {default as ProductComponent} from './ProductComponent'
export {default as ProductForm} from './ProductForm'
export {default as UpdateProduct} from './UpdateProduct'
export {default as Search} from './Search'
