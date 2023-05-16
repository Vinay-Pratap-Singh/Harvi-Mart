// for auth slice state
export interface IauthSliceState {
  accessToken: string;
  isLoggedIn: boolean;
  userDetails: {
    fullName: string;
    email: string;
    phoneNumber: string;
    role: number;
    avatar: {
      public_id: string;
      secure_url: string;
    };
    addresses: string[];
  };
}
