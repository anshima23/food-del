import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'; // Ensure axios is imported

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";

  const addToCart = async (itemId) => {
   if(!cartItems[itemId]){
    setCartItems((prev)=>({...prev,[itemId]:1}))
   }
   else{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
   }
   if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
   }
  };

  const removeFromCart = async (itemId) => {
   setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
   if(token){
    await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
   }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      console.log("Fetched Food List:", response.data.data); // Log fetched data
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCartData = async (token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData);
  }

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
      await fetchFoodList(); // Fetch food list data
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
