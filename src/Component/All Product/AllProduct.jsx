import { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllProduct = () => {
  const allProduct = useLoaderData();
  const [allProducts, setAllProducts] = useState(allProduct);
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);

  // Fetch current logged-in user's role from backend
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then((res) => setUserRole(res.data.role))
        .catch((err) => console.error('Failed to fetch user role:', err));
    }
  }, [user]);

  // delete product handler with SweetAlert
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/allproducts/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // remove deleted product from state
              const remaining = allProducts.filter((p) => p._id !== id);
              setAllProducts(remaining);

              Swal.fire('Deleted!', 'Product has been removed.', 'success');
            }
          })
          .catch((err) => {
            console.error('Failed to delete product:', err);
            Swal.fire('Error!', 'Failed to delete product.', 'error');
          });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 py-10 mt-14">
      {allProducts.map((product) => (
        <div
          key={product._id}
          className="bg-black border border-gray-700 rounded-xl p-5 shadow-md hover:shadow-yellow-400/40 transition flex flex-col items-center"
        >
          {/* Fixed size box for image */}
          <div className="w-full h-60 flex items-center justify-center bg-white rounded-md mb-4 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <h2 className="text-lg font-semibold text-white">{product.name}</h2>
          <p className="text-yellow-400 font-medium">Price: ${product.price}</p>
          <p className="text-gray-400 text-sm mt-2 text-center">{product.description}</p>

          {/* Buttons based on role */}
          <div className="flex flex-wrap justify-center gap-3 mt-4 w-full">
            {userRole === 'admin' && (
              <>
                <button className="btn bg-blue-600 hover:bg-blue-700 text-white">
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </>
            )}
            {userRole && (
              <div className="flex gap-3">
                <button className="btn bg-green-600 hover:bg-green-700 text-white">
                  Purchase
                </button>
                <button className="btn bg-orange-600 hover:bg-orange-700 text-white">
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProduct;
