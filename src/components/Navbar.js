import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const showAndHideMenu = (event) => {
    const menu = event.target.nextElementSibling;
    if (menu.style.display === "none") menu.style.display = "flex";
    else menu.style.display = "none";
  }

  return (
    <nav className="flex flex-row-reverse sm:flex-row sm:items-center justify-around py-4 sticky top-0">
      {/* adding the logo here */}
      <NavLink className="font-bold text-xl" to={"/"}>Electro Mart</NavLink>

      <div className="flex flex-col gap-2">
        {/* adding the menu bar for mobile screen */}
        <i onClick={showAndHideMenu} className="fa-solid fa-bars sm:hidden"></i>
        {/* creating the menu item */}
        <div className="hidden sm:flex flex-col sm:flex-row gap-2 sm:gap-6">
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
