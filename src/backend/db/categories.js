import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    imageURL: "https://rukminim1.flixcart.com/image/832/832/k2jbyq80pkrrdj/mobile-refurbished/q/z/g/iphone-11-128-a-mwm32hn-a-apple-0-original-imafkg25hjmuy98e.jpeg?q=70",
    categoryName: "mobile",
    description:
      "Have a look over the brand new, top quality smartphone in our store with heavy discount and support assistence",
  },
  {
    _id: uuid(),
    imageURL: "https://rukminim1.flixcart.com/image/832/832/xif0q/smartwatch/o/f/m/-original-imaghxkmtbhp8nt5.jpeg?q=70",
    categoryName: "smartwatch",
    description:
      "We have the best collection of smartwatch for all age group, from budget to permium segment with best services",
  },
  {
    _id: uuid(),
    imageURL: "https://rukminim1.flixcart.com/image/832/832/kp5sya80/screen-guard/tempered-glass/o/v/n/apple-macbook-air-m1-13-3-inch-lightwings-original-imag3gh5xftgbpg3.jpeg?q=70",
    categoryName: "laptop",
    description:
      "Best collection of laptop for students, working professionals, and normal user. A wide range from budget to premium",
  },
];
