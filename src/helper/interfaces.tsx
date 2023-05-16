// for auth slice state
export interface IauthSliceState {
  accessToken: string;
  isLoggedIn: boolean;
  userDetails: {};
}

// interface for signup data
export interface IsignupData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}
