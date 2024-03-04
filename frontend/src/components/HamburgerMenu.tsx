import { useState } from "react";
import { Link } from "react-router-dom";
// import homeLogo from "../assets/home.svg";
// import cartLogo from "../assets/shopping_cart.svg";
// import bookmarks from "../assets/bookmarks.svg";
// import shoppingBag from "../assets/shopping_bag.svg";
// import closeIcon from "../assets/close.svg";
// import menuIcon from "../assets/menu.svg";

function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  if (menuOpen) {
    return (
      <div className="text-xl py-4 bg-main_yellow h-screen w-screen gap-8 flex flex-col p-10 md:hidden">
        <button
          className="absolute top-8 left-8"
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          {/* <img src={closeIcon} alt="" className="w-10" /> */}close
        </button>
        <Link
          to={"/"}
          onClick={() => {
            setMenuOpen(false);
          }}
          className="flex gap-1 items-center mt-40"
        >
          {/* <img src={homeLogo} alt="" className="" /> */}
          Home
        </Link>
        <Link
          to={"/store"}
          onClick={() => {
            setMenuOpen(false);
          }}
          className="flex gap-1 items-center"
        >
          {/* <img src={shoppingBag} alt="" /> */}
          Shop
        </Link>
        <Link
          to={"/wish-list"}
          onClick={() => {
            setMenuOpen(false);
          }}
          className="flex gap-1 items-center"
        >
          {/* <img src={bookmarks} alt="" /> */}
          Wish List
        </Link>
        <Link
          to={"/cart"}
          onClick={() => {
            setMenuOpen(false);
          }}
          className="flex gap-2 items-center"
        >
          {/* <img src={cartLogo} alt="" /> */}
          Basket
        </Link>
      </div>
    );
  } else {
    return (
      <div className="md:hidden">
        <button
          className="absolute top-8 left-8"
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          {/* <img src={menuIcon} alt="" className="w-8" /> */}open
        </button>
      </div>
    );
  }
}

export default HamburgerMenu;
