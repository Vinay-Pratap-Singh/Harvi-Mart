import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      {/* adding the logo here */}
      <NavLink to={"/"}>Electro Mart</NavLink>

      <div>
        {/* adding the menu bar for mobile screen */}
        <i class="fa-solid fa-bars"></i>
        {/* creating the menu item */}
        <div>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"./products"}>Products</NavLink>
          <NavLink to={"./wishlist"}>Wishlist</NavLink>
          <NavLink to={"./cart"}>Cart</NavLink>
          <NavLink to={"./registration"}>Log In</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
