import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <header className="mx-auto max-w-5xl  h-[76px] flex justify-between sm:px-3 md:px-10 px-[10%] lg:px-0 lg:grid lg:grid-flow-col">
              <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-primaryColor">GreenEco</h1>
              </div>
              <div className="h-full flex items-center">
                <Link to="/userinformation">
                  <div className="hidden lg:flex lg:justify-center lg:items-center">
                      <h3 className="text-[#252525] text-sm mr-2 font-bold">Admin</h3>
                      <img
                          className="h-[36px] w-[36px] rounded-[50%] border-4 border-[#ccc]"
                          src="https://english4u.com.vn/Uploads/images/bai-viet-ve-mot-nguoi-noi-tieng-bang-tieng-anh2.jpg"
                          alt="ImageUser"
                      />
                  </div>
                </Link>
              </div>
            </header>
        </div>
    );
};

export default Header;
