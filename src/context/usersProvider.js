import React, { createContext, useState } from 'react';

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);

  return (
    <UsersContext.Provider value={{ userList, setUserList }}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersProvider };