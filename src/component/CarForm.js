import React, { useState, useEffect } from "react";
import { createProduct, updateProduct, getProduct } from "../services/api";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

const CarForm = ({ isEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const { id } = useParams();  // For editing a car
  const navigate = useNavigate(); // useNavigate hook

  // Fetch the car details if it's an edit
  useEffect(() => {
    if (isEdit) {
      const fetchCar = async () => {
        try {
          const { data } = await getProduct(id);
          setTitle(data.title);
          setDescription(data.description);
          setTags(data.tags.join(", "));
          setImages(data.images);
        } catch (error) {
          console.error("Error fetching car for edit", error);
        }
      };
      fetchCar();
    }
  }, [id, isEdit]);

  // Handle image file uploads
  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(Array.from(files));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);

    try {
      if (isEdit) {
        await updateProduct(id, formData);
        navigate(`/product/${id}`); // Use navigate to redirect
      } else {
        await createProduct(formData);
        navigate("/product-list"); // Redirect to product list after creating a new car
      }
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? "Edit Car" : "Add Car"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Images (Up to 10)</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          {isEdit ? "Update Car" : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default CarForm;
