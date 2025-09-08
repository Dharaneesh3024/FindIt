import { useState, useRef, useEffect } from "react";

export default function ImageUpload({ onImageSelect, clearTrigger }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // show preview
      onImageSelect(file); // send file to parent
    }
  };

  // Reset preview and file input when clearTrigger changes
  useEffect(() => {
    if (clearTrigger) {
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  }, [clearTrigger]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {preview && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
}
