import Carousel from "./Carousel";
import GetAllCategories from "../productComponent/GetAllCategories";
import ProductCard from "../productComponent/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const { categoryId } = useParams();

  const [searchText, setSearchText] = useState("");
  const [tempSearchText, setTempSearchText] = useState("");

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveAllProducts();
      if (allProducts) {
        setProducts(allProducts);
      }
    };

    const getProductsByCategory = async () => {
      const allProducts = await retrieveProductsByCategory();
      if (allProducts) {
        setProducts(allProducts);
      }
    };

    const getProductsBySearch = async () => {
      const allProducts = await retrieveProductsBySearch();
      if (allProducts) {
        setProducts(allProducts);
      }
    };

    if (searchText !== "") {
      getProductsBySearch();
    } else {
      getAllProducts();
    }
  }, [categoryId, searchText]);

  const retrieveAllProducts = async () => {
    const response = await axios.get("http://localhost:8080/api/product/all");

    return response.data;
  };

  const retrieveProductsByCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/category?categoryId=" + categoryId
    );

    return response.data;
  };

  const retrieveProductsBySearch = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/search?productName=" + searchText
    );

    return response.data;
  };

  const searchProducts = (e) => {
    e.preventDefault();
    setSearchText(tempSearchText);
  };

  return (
    <div className="container-fluid mb-2">
      <Carousel />

      <div className="d-flex aligns-items-center justify-content-center mt-5">
        <form class="row g-3">
          <div class="col-auto">
            <input
              type="text"
              class="form-control"
              id="inputPassword2"
              placeholder="Enter Product Name..."
              onChange={(e) => setTempSearchText(e.target.value)}
              style={{
                width: "350px",
              }}
              value={tempSearchText}
              required
            />
          </div>
          <div class="col-auto">
            <button
              type="submit"
              class="btn bg-color custom-bg-text mb-3"
              onClick={searchProducts}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="mt-2 mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {products.map((product) => {
                return <ProductCard item={product} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
