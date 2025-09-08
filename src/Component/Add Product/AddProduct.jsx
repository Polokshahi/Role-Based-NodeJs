import axios from "axios";
import Swal from "sweetalert2";

const AddProduct = () => {
  const handleAddProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const price = form.price.value;

    const addNewProduct = { name, image, price };

    axios
      .post("http://localhost:3000/allproducts", addNewProduct)
      .then((response) => {
        console.log("Product added successfully:", response.data);

        Swal.fire({
          title: "Success!",
          text: "Product added successfully!",
          icon: "success",
          confirmButtonColor: "#facc15", // yellow
          confirmButtonText: "OK",
        });

        form.reset();
      })
      .catch((error) => {
        console.error("Error adding product:", error);

        Swal.fire({
          title: "Error!",
          text: "Failed to add product.",
          icon: "error",
          confirmButtonColor: "#f87171", // red
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-5 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Add a New Product
      </h1>

      {/* Card */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <form onSubmit={handleAddProduct} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              className="input input-bordered w-full rounded-lg"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              placeholder="Enter image URL"
              className="input input-bordered w-full rounded-lg"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter product price"
              className="input input-bordered w-full rounded-lg"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
