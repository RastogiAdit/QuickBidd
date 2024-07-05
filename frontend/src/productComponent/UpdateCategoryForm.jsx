import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateCategoryForm = () => {
  const location = useLocation();
  const categoryRes = location.state;

  const [category, setCategory] = useState(categoryRes);

  let navigate = useNavigate();
  const handleInput = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const saveCategory = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/category/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
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
              navigate("/admin/category/all");
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
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          class="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h5 class="card-title">Update Category</h5>
          </div>
          <div class="card-body text-color">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Category Title</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  name="title"
                  placeholder="enter title.."
                  onChange={handleInput}
                  value={category.title}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">
                  <b>Category Description</b>
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="enter description.."
                  onChange={handleInput}
                  value={category.description}
                  required
                />
              </div>

              <button
                type="submit"
                onClick={saveCategory}
                class="btn bg-color custom-bg-text"
              >
                Update Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryForm;
