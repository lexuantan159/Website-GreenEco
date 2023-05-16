import React from "react";

const Header = () => {
  return (
    <div>
      {" "}
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">Logo</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
