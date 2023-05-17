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
