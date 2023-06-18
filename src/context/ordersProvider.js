import React, { createContext, useState } from 'react';

const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
  const [ordersList, setOrdersList] = useState([]);

  return (
    <OrdersContext.Provider value={{ ordersList, setOrdersList }}>
      {children}
    </OrdersContext.Provider>
  );
};

export { OrdersContext, OrdersProvider };