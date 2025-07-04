import React, { useState } from 'react';
import "./file_upload.css";

function ImageUpload({ onImageSelect }) {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        if (onImageSelect) {
          onImageSelect(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ margin: '1rem' }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="image-upload-input"
      />
      {imagePreview && (
        <div style={{ marginLeft: '8%', marginTop: '10px' }}>
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            style={{ maxWidth: '250px', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
