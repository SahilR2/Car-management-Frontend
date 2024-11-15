import React, { useState, useEffect } from "react";
import { getUserProducts, searchProducts } from "../services/api";
import { Link } from "react-router-dom";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await getUserProducts();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars", error);
      }
    };
    fetchCars();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await searchProducts(searchQuery);
      setCars(data);
    } catch (error) {
      console.error("Error searching cars", error);
    }
  };

  return (
    <div className="container">
      <h2>My Cars</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control"
          placeholder="Search cars"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary mt-2">Search</button>
      </form>
      <div className="row mt-4">
        {cars.map((car) => (
          <div key={car.id} className="col-4">
            <div className="card">
              <img src={car.images[0]} alt={car.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{car.title}</h5>
                <p className="card-text">{car.description}</p>
                <Link to={`/product/${car.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
