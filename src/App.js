import logo from "./logo.svg";
import "./App.css";
import Table from "./components/Table";
import Cart from "./components/cart";
import React, { useState } from "react";
import LoginModal from "./modal/loginmodal";

export const cartContext = React.createContext();

function App() {
  const [items, setCartItem] = useState([]);
  const [modalIsOpen, setModal] = useState(false);
  const cartChanged = (items) => {
    setCartItem(items);
  };
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
    console.log(modalIsOpen);
  };
  return (
    <cartContext.Provider value={"hello"}>
      <div className="App">
        <Table cartItemChange={cartChanged} cartItems={items} openModal={openModal} />
        <Cart cartItems={items} />
        <LoginModal modalIsOpen={modalIsOpen} closeModal={closeModal}></LoginModal>
      </div>
    </cartContext.Provider>
  );
}

export default App;
