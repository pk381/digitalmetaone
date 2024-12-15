import React from "react";
import logo from "../../assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="text-white body-font bg-black py-2">
      <div className="container px-5 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center">
          <img
            src={logo}
            className="w-12 h-12 text-white p-2 bg-indigo-500 rounded-full"
            alt="Digital Meta one"
          />

          <span className="ml-3 text-xl">Digital Meta One</span>
        </a>
        <p className="text-sm text-gray-200 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2023 www.digitalmetaone.com All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
