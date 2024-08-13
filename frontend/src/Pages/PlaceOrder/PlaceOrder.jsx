import React, { useState,useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const { getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHnadler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const PlaceOrder = async (event)=>{
     event.preventDefault();
     let orderItems = [];
     food_list.map((item)=>{
      if(cartItems[item._id]>0){
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
      }
     })
     console.log(orderItems)
  }


  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input name='firstName' onChange={onChangeHnadler} value={data.firstName} type='text' placeholder='First name'/>
          <input name='lastName' onChange={onChangeHnadler} value={data.lastName} type='text' placeholder='Last name'/>
        </div>
        <input name='email' onChange={onChangeHnadler} value={data.email} type='email' placeholder='Email address'/>
        <input name='street' onChange={onChangeHnadler} value={data.street} type='text' placeholder='Street'/>
        <div className='multi-fields'>
          <input name='city' onChange={onChangeHnadler} value={data.city} type='text' placeholder='City'/>
          <input name='state' onChange={onChangeHnadler} value={data.state} type='text' placeholder='State'/>
        </div>
        <div className='multi-fields'>
          <input name='zipcode' onChange={onChangeHnadler} value={data.zipcode} type='text' placeholder='Zip code'/>
          <input name='country' onChange={onChangeHnadler} value={data.country} type='text' placeholder='Country'/>
        </div>
        <input name='phone' onChange={onChangeHnadler} value={data.phone}  type='text' placeholder='Phone'/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
          <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
