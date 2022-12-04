import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-around gap-2 py-10 bg-[#f3f3f3]">
      <p>© 2022 Copyright: Harvi</p>

      {/* social media links */}
      <div className="flex items-center gap-4">
        <a href="#">
          <i className="fa-brands fa-linkedin-in px-3 py-3 bg-gray-200 rounded-full"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-twitter px-3 py-3 bg-gray-200 rounded-full"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-github px-3 py-3 bg-gray-200 rounded-full"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-instagram px-3 py-3 bg-gray-200 rounded-full"></i>
        </a>
      </div>

      <p>
        Designed and Created by <a href="https://harvi.me">Harvi</a>
      </p>
    </div>
  );
};

export default Footer;
