import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProductForm = () => {
  const [categories, setCategories] = useState([]);

  let navigate = useNavigate();

  const location = useLocation();
  const productRes = location.state;

  const [product, setProduct] = useState(productRes);

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateProduct = (e) => {
    e.preventDefault();
    if (product.status !== "Available") {
      toast.error("Product Already Sold, can't update Product", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      fetch("http://localhost:8080/api/product/update", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((result) => {
          console.log("result", result);
          result.json().then((res) => {
            console.log(res);

            if (res.responseCode === 0) {
              console.log("Got the success response");

              toast.success(res.responseMessage, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                navigate(
                  `/product/${product.id}/category/${product.category.id}`
                );
              }, 2000); // Redirect after 3 seconds
            } else {
              console.log("Didn't got success response");
              toast.error("It seems server is down", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                window.location.reload(true);
              }, 1000); // Redirect after 3 seconds
            }
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          class="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 class="card-title">Update Product</h5>
          </div>
          <div class="card-body text-color">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Product Title</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  name="title"
                  onChange={handleInput}
                  value={product.title}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">
                  <b>Product Description</b>
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  onChange={handleInput}
                  value={product.description}
                  required
                />
              </div>

              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Product Category</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={product.category.title}
                  required
                />
              </div>

              <div class="mb-3 mt-1">
                <label for="quantity" class="form-label">
                  <b>Product Quantity</b>
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="quantity"
                  name="quantity"
                  onChange={handleInput}
                  value={product.quantity}
                  required
                />
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">
                  <b>Product Min Price</b>
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  name="price"
                  onChange={handleInput}
                  value={product.price}
                  required
                />
              </div>

              <button
                type="submit"
                class="btn bg-color custom-bg-text"
                onClick={updateProduct}
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductForm;
