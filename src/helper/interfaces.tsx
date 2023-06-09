// for auth slice state
export interface IauthSliceState {
  accessToken: string;
  isLoggedIn: boolean;
  userDetails: any;
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

// interface for the product data
export interface IproductData {
  id?: string;
  productImage: File;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  category: string;
  quantity: number;
  inStock: string;
}
