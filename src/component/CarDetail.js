import React, { useState, useEffect } from "react";
import { getProduct, updateProduct, deleteProduct } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await getProduct(id);
        setCar(data);
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        console.error("Error fetching car", error);
      }
    };
    fetchCar();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateProduct(id, { title, description });
      navigate("/product-list");
    } catch (error) {
      console.error("Error updating car", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      navigate("/product-list");
    } catch (error) {
      console.error("Error deleting car", error);
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{car.title}</h2>
      <img src={car.images[0]} alt={car.title} className="img-fluid" />
      <p>{car.description}</p>

      <h3>Edit Car</h3>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Update</button>
      </form>

      <button onClick={handleDelete} className="btn btn-danger mt-2">Delete</button>
    </div>
  );
};

export default CarDetail;
