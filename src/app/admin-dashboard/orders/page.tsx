"use client";
import React, { useState, useEffect } from "react";
import "./DashboardOrders.css";

type OrderItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type Order = {
  id: number;
  items: OrderItem[];
  createdAt: string; // Adding a timestamp for display
};

const DashboardOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newPurchase: OrderItem[] = JSON.parse(
      localStorage.getItem("purchased") || "[]"
    );

    if (newPurchase.length > 0) {
      const newOrder: Order = {
        id: Date.now(),
        items: newPurchase,
        createdAt: new Date().toLocaleString(),
      };

      const updatedOrders = [...storedOrders, newOrder];
      setOrders(updatedOrders);

      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      localStorage.removeItem("purchased");
    } else {
      setOrders(storedOrders); // Load only existing orders
    }
  }, []);

  const handleSendProducts = (orderId: number) => {
    const orderToSend = orders.find((order) => order.id === orderId);

    if (orderToSend) {
      const deliveryOrders = JSON.parse(
        localStorage.getItem("deliveryOrders") || "[]"
      );

      const updatedDeliveryOrders = [
        ...deliveryOrders,
        { ...orderToSend, sentAt: new Date().toLocaleString() },
      ];

      const updatedOrders = orders.filter((order) => order.id !== orderId);

      localStorage.setItem(
        "deliveryOrders",
        JSON.stringify(updatedDeliveryOrders)
      );
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      setOrders(updatedOrders);

      alert(`Order #${orderId} has been sent to delivery.`);
    }
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div className="order-group" key={order.id}>
            <h2>Order #{order.id}</h2>
            <p>Created At: {order.createdAt}</p>
            <div className="order-items">
              {order.items.map((item) => (
                <div className="order-item" key={item.id}>
                  <div className="order-item-details">
                    <h1>{item.title}</h1>
                    <p>
                      Price: $
                      {item.price && !isNaN(item.price)
                        ? item.price.toFixed(2)
                        : "0.00"}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="send-button"
              onClick={() => handleSendProducts(order.id)}
            >
              Send Products
            </button>
          </div>
        ))
      ) : (
        <h1 className="no-orders">No orders available</h1>
      )}
    </div>
  );
};

export default DashboardOrders;
