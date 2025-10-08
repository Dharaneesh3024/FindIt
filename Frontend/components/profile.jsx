import { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // popup state
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    status: "",
    location: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetch(
          `${import.meta.env.VITE_SERVER_APP_URL}/api/items/user/${encodeURIComponent(
            currentUser.email
          )}`
        )
          .then((res) => res.json())
          .then((data) => setItems(data))
          .catch((err) => console.error("Error fetching items:", err));
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await fetch(`${import.meta.env.VITE_SERVER_APP_URL}/api/items/${id}`, {
        method: "DELETE",
      });
      setItems(items.filter((item) => item._id !== id));
    }
  };

  // Handle edit popup open
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      type: item.type,
      status: item.status,
      location: item.location,
      description: item.description,
    });
  };

  // Handle input change in popup
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_SERVER_APP_URL}/api/items/${editingItem._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setItems(
      items.map((it) =>
        it._id === editingItem._id ? { ...it, ...formData } : it
      )
    );
    setEditingItem(null);
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-info">
            <h2>{user?.displayName || "User"}</h2>
            <p>{user?.email}</p>
          </div>
        </div>

        <h3 className="posts-heading">Your Posts</h3>
        {items.length > 0 ? (
          <table className="items-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Location</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.type}</td>
                  <td>{item.status}</td>
                  <td>{item.location}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-posts">You haven’t posted anything yet.</p>
        )}
      </div>

      {/* Edit Popup */}
      {editingItem && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Post</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
              <select
  name="status"
  value={formData.status}
  onChange={handleChange}
  required
>
  <option value="">-- Select Status --</option>
  <option value="Lost">Lost</option>
  <option value="Found">Found</option>
</select>

             
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              ></textarea>
              <div className="modal-actions">
                <button type="submit" className="btn-save">
                  Save
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
