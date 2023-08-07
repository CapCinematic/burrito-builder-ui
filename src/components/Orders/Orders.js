import React from "react";
import "./Orders.css";
import { useEffect, useState } from "react";

const Orders = (props) => {
  console.log('props',props)
  const [orders, setOrders] = useState(props.orders)
  console.log("PO",props.orders)

  useEffect(() => {
    setOrders(props.orders)
  }, [props,orders])

  const orderEls = props.orders.map((order) => {
    return (
      <div key={order.id} className="order">
        <h3 className="order-name">{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>;
          })}
        </ul>
      </div>
    );
  });

  return (
    <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}
    {props.newOrder && (
      <div key={props.newOrder.id} className="order">
        <h3 className="order-name">{props.newOrder.name}</h3>
        <ul className="ingredient-list">
          {props.newOrder.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>
          })}
        </ul>
      </div>
    )}
    </section>
  );
};

export default Orders;
