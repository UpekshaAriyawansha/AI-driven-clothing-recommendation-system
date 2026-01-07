// src/components/RecommendationModal.js
import React from "react";
import { Modal } from "antd";
import { FaTshirt, FaPalette, FaPaintBrush } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";

const RecommendationModal = ({ visible, onClose, result }) => {
  return (
    <Modal
      title="Your Personalized Recommendation"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto", backgroundColor: "#111", color: "#fff" }}
    >
      <div className="row g-3">
        {result.generated_images.map((url, idx) => (
          <div className="col-12" key={idx}>
            <div className="card bg-dark text-white shadow-sm hover-zoom">
              <img
                src={`http://127.0.0.1:5000${url}`}
                alt={`preview_${idx}`}
                className="card-img-top"
                style={{ borderRadius: "0.5rem", objectFit: "cover", maxHeight: "300px" }}
              />
              <div className="card-body">
                <p><FaTshirt /> <strong>Clothing:</strong> {result.recommendations.clothing_item}</p>
                <p><GiClothes /> <strong>Fabrics:</strong> {result.recommendations.fabric.join(", ")}</p>
                <p><FaPalette /> <strong>Colors:</strong> {result.recommendations.color.join(", ")}</p>
                <p><FaPaintBrush /> <strong>Patterns:</strong> {result.recommendations.pattern.join(", ")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hover-zoom:hover img {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
      `}</style>
    </Modal>
  );
};

export default RecommendationModal;
