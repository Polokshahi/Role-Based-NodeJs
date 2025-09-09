import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const AddtoCart = () => {
  const addToCartData = useLoaderData();
  const [remainingProducts, setRemainingProducts] = useState(addToCartData);

  const handleAddCartDelete = (id) => {
    console.log("Delete product with id:", id);
    axios
      .delete(`http://localhost:3000/addtoCart/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          // Filter out the deleted product
          const remaining = remainingProducts.filter(
            (product) => product.productId !== id
          );
          setRemainingProducts(remaining);
        }
            alert('Product deleted successfully');


      })
      .catch((err) => {
        console.error("Failed to delete product:", err);
      });
  };

  if (!remainingProducts || remainingProducts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-semibold text-gray-800">
          Your cart is empty
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-800 text-white text-sm uppercase">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">User Email</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {remainingProducts.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={product.image} alt={product.name} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">${product.price}</td>
                  <td className="px-4 py-3">{product.userEmail}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleAddCartDelete(product.productId)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition duration-200"
                    >
                      X
                    </button>

                    {/* <button className="btn">
                      buy
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddtoCart;


 app.get("/addtoCart", async(req, res) =>{
            const email = req.params.email;
            const query = {email: email}
            const result = addtoCart.find(query).toArray();
            res.send(result);
        })