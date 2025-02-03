"use client";
import React, { useState, useEffect } from "react";
import "./DashboardDelivery.css";

type DeliveryItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type DeliveryOrder = {
  id: number;
  items: DeliveryItem[];
  sentAt: string; // Added timestamp for tracking
};

const DashboardDelivery: React.FC = () => {
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrder[]>([]);

  useEffect(() => {
    // Fetch delivered orders from localStorage
    const deliveredOrders = JSON.parse(
      localStorage.getItem("deliveryOrders") || "[]"
    );
    if (Array.isArray(deliveredOrders)) {
      setDeliveryOrders(deliveredOrders);
    } else {
      setDeliveryOrders([]); // Fallback in case of corrupted data
    }
  }, []);

  const handleOrderRemoval = (orderId: number) => {
    if (
      window.confirm(
        `Are you sure you want to remove Delivery Order #${orderId}?`
      )
    ) {
      // Filter out the order to be removed
      const updatedOrders = deliveryOrders.filter(
        (order) => order.id !== orderId
      );

      // Update state and localStorage
      setDeliveryOrders(updatedOrders);
      localStorage.setItem("deliveryOrders", JSON.stringify(updatedOrders));

      alert(`Delivery Order #${orderId} has been removed.`);
    }
  };

  return (
    <div className="delivery-container">
      <h1 className="delivery-title">Delivery Orders</h1>
      {deliveryOrders.length > 0 ? (
        deliveryOrders.map((order) => (
          <div className="delivery-group" key={order.id}>
            <h2>Delivery Order #{order.id}</h2>
            <p>Sent At: {order.sentAt}</p>
            <div className="delivery-items">
              {order.items.map((item) => (
                <div className="delivery-item" key={item.id}>
                  <div className="delivery-item-details">
                    <h1>{item.title}</h1>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="remove-button"
              onClick={() => handleOrderRemoval(order.id)}
            >
              Remove Order
            </button>
          </div>
        ))
      ) : (
        <h1 className="no-deliveries">No deliveries available</h1>
      )}
    </div>
  );
};

export default DashboardDelivery;
