import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import "./view.css";

function View() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // For modal

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Fetch items error:", err));
  }, []);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => setSelectedItem(null);

  return (
    <>
      <Navbar />
      <div className="view-container">
        <h1>Lost & Found Items</h1>

        {items.length === 0 ? (
          <p className="empty-msg">No items found!</p>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <div
                key={item._id}
                className="item-card"
                onClick={() => handleCardClick(item)}
              >
                <img src={item.imageUrl} alt={item.title} className="item-image" />
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p><strong>Type:</strong> {item.type}</p>
                  <p><strong>Status:</strong> {item.status}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedItem && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-btn" onClick={closeModal}>
                &times;
              </span>
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="modal-image"
              />
              <h2>{selectedItem.title}</h2>
              <p><strong>Type:</strong> {selectedItem.type}</p>
              <p><strong>Status:</strong> {selectedItem.status}</p>
              <p><strong>Location:</strong> {selectedItem.location}</p>
              <p><strong>Description:</strong> {selectedItem.description}</p>
              <p><strong>Posted by:</strong> {selectedItem.userEmail}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default View;
