// for auth slice state
export interface IauthSliceState {
  accessToken: string;
  isLoggedIn: boolean;
  userDetails: any;
  loading: boolean;
}

// interface for signup data
export interface IsignupData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

// interface for login data
export interface IloginData {
  email: string;
  password: string;
}

// interface for category data
export interface IcategoryDetails {
  name: string;
  description?: string;
}

// interface for the coupon code data
export interface IcouponData {
  _id?: string;
  couponCode: string;
  discount: number;
}

// interface for creating the new product
export interface IproductData {
  id?: string;
  productImage: File[] | null;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  category: string;
  quantity: number;
  inStock: string;
  imageURL?: string[];
}

// interface for images array of product
interface Iimage {
  image: { public_id: string; secure_url: string };
  _id: string;
}

// interface for the single product data
export interface Iproduct {
  _id: string;
  category: { _id: string; name: string };
  description: string;
  discountedPrice: number;
  images: Iimage[];
  inStock: boolean;
  numOfUnitsSold: number;
  originalPrice: number;
  quantity: number;
  title: string;
}

// interface for the product review
export interface IproductReview {
  title: string;
  rating: number;
  review: string;
  reviewedFor: string;
}

// interface for the address
export interface Iaddress {
  _id?: string;
  name: string;
  phoneNumber: string;
  houseNumber: string;
  city: string;
  state: string;
  pinCode: string;
}

// interface for update profile
export interface IupdateProfile {
  fullName: string;
  userImage: File;
}

// interface for wishlist
export interface Iwishlist {
  name: string;
  products: Iproduct[];
  _id: string;
}

// for checkout product
export interface IcheckoutProduct {
  _id?: string;
  product: string;
  quantity: number;
  price: number;
}

// interface for checkout data
export interface IcheckoutData {
  address: string;
  phoneNumber: string;
  paymentMethod: string;
  total: number;
  coupon?: string;
  products: IcheckoutProduct[];
}

// for updated cart items after adding the user selected quantity as a field
export interface IupdateCartItem extends Iproduct {
  userSelectedQuantity: number;
}
