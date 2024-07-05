import GetAllCategories from "../productComponent/GetAllCategories";
import CategoryNavigator from "../productComponent/CategoryNavigator";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../productComponent/ProductCard";
import { ToastContainer, toast } from "react-toastify";
import GetProductReviews from "../ReviewComponent/GetProductReviews";
import { useNavigate } from "react-router-dom";
import ProductOffers from "../productComponent/ProductOffers";

const Product = () => {
  const { productId, categoryId } = useParams();

  let navigate = useNavigate();

  let user = JSON.parse(sessionStorage.getItem("active-user"));
  let admin = JSON.parse(sessionStorage.getItem("active-admin"));

  const [amount, setAmount] = useState("");

  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    id: "",
    title: "",
    description: "",
    quantity: "",
    price: "",
    imageName: "",
    category: { id: "", title: "" },
    endDate: "",
  });

  const retrieveProduct = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/id?productId=" + productId
    );

    return response.data;
  };

  useEffect(() => {
    const getProduct = async () => {
      const retrievedProduct = await retrieveProduct();

      setProduct(retrievedProduct);
    };

    const getProductsByCategory = async () => {
      const allProducts = await retrieveProductsByCategory();
      if (allProducts) {
        setProducts(allProducts);
      }
    };

    getProduct();
    getProductsByCategory();
  }, [productId]);

  const retrieveProductsByCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/category?categoryId=" + categoryId
    );
    console.log(response.data);
    return response.data;
  };

  const saveProductOffer = (amount, e) => {
    if (product.status !== "Available") {
      toast.error("Product Already Sold", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      fetch("http://localhost:8080/api/product/offer/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          userId: user.id,
          productId: productId,
        }),
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
                window.location.reload(true);
              }, 3000); // Redirect after 3 seconds
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
      e.preventDefault();
    }
  };

  const addproductOffer = (e) => {
    e.preventDefault()
    if (user == null) {
      alert("Please login to buy the products!!!");
      e.preventDefault();
    } else {
      saveProductOffer(amount);
      setAmount("");
      e.preventDefault();
    }
  };

  const navigateToAddReviewPage = () => {
    navigate("/product/" + product.id + "/review/add");
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const deleteProduct = (e) => {
    fetch("http://localhost:8080/api/product/delete?productId=" + productId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
              navigate("/home");
            }, 3000); // Redirect after 3 seconds
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
    e.preventDefault();
  };

  const updateProduct = (e) => {
    navigate("/admin/product/update", { state: product });
  };

  return (
    <div className="container-fluid">
      <div class="row">
        <div class="col-sm-3 mt-2 admin">
          <div class="card form-card border-color custom-bg">
            <img
              src={"http://localhost:8080/api/product/" + product.imageName}
              style={{
                maxHeight: "500px",
                maxWidth: "100%",
                width: "auto",
              }}
              class="card-img-top rounded mx-auto d-block m-2"
              alt="img"
            />
          </div>
        </div>
        <div class="col-sm-5 mt-2">
          <div class="card form-card border-color custom-bg">
            <div class="card-header bg-color">
              <div className="d-flex justify-content-between">
                <h1 className="custom-bg-text">{product.title}</h1>
              </div>
            </div>

            <div class="card-body text-left text-color">
              <div class="text-left mt-3">
                <h3>Description :</h3>
              </div>

              <h4 class="card-text">{product.description}</h4>
              <div class="text-left mt-3">
                <h3>Product Expiry:</h3>
              </div>
              <h4 class="card-text">{formatDateFromEpoch(product.endDate)}</h4>

              <div class="text-left mt-3">
                <h3>Product Status:</h3>
              </div>
              <h4 class="card-text">{product.status}</h4>
            </div>

            <div class="card-footer custom-bg">
              <div className="text-center text-color">
                <p>
                  <span>
                    <h4>Min Price : Rs. {product.price}</h4>
                  </span>
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <form class="row g-3" onSubmit={addproductOffer}>
                    <div class="col-auto">
                      <input
                        type="number"
                        class="form-control"
                        id="addToCart"
                        placeholder="Offer Price..."
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        required
                      />
                    </div>
                    <div class="col-auto">
                      <input
                        type="submit"
                        className="btn bg-color custom-bg-text mb-3"
                        value="Offer"
                      />
                      <ToastContainer />
                    </div>
                  </form>
                </div>

                <p class="ml-2 text-color">
                  <b>Stock : {product.quantity}</b>
                </p>
              </div>

              {(() => {
                if (user) {
                  return (
                    <div>
                      <input
                        type="submit"
                        className="btn bg-color custom-bg-text mb-3"
                        value="Add Review"
                        onClick={navigateToAddReviewPage}
                      />
                    </div>
                  );
                }
              })()}

              {(() => {
                if (admin) {
                  return (
                    <div>
                      <input
                        type="submit"
                        className="btn bg-color custom-bg-text mb-3"
                        value="Delete Product"
                        onClick={deleteProduct}
                      />
                      <br />
                      <input
                        type="submit"
                        className="btn bg-color custom-bg-text mb-3"
                        value="Update Product"
                        onClick={updateProduct}
                      />
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>

        <div class="col-sm-2 mt-2 admin">
          <ProductOffers />
        </div>

        <div class="col-sm-2 mt-2 admin">
          <GetProductReviews />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <h2>Related Products:</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {products.map((product) => {
              return <ProductCard item={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
