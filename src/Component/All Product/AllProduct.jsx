import { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

const AllProduct = () => {
  const allProduct = useLoaderData();
  const [allProducts, setAllProducts] = useState(allProduct);
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    document.title = 'All Products';
  }, []);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then((res) => setUserRole(res.data.role))
        .catch((err) => console.error('Failed to fetch user role:', err));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#555',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/allproducts/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setAllProducts(allProducts.filter((p) => p._id !== id));
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

  const handleAddCart = (id) => {
    const targetedProduct = allProducts.find((product) => product._id === id);
    const itemId = uuidv4();
    if (!targetedProduct) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Product not found!',
      });
      return;
    }

    axios
      .post('http://localhost:3000/addtoCart', 
        { ...targetedProduct,
           userEmail: user?.email,
           productId : itemId, 

      })
      .then((res) => {
        if (res.data.insertedId || res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: 'Product added to cart successfully.',
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Invalid product. Could not add to cart.',
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong while adding the product.',
        });
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5 py-12 mt-4 max-w-7xl mx-auto">
      {allProducts.map((product) => (
        <div
          key={product._id}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          {/* Image Section */}
          <div className="w-full h-60 flex items-center justify-center bg-gray-50 rounded-lg mb-4 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Product Info */}
          <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
          <p className="text-gray-700 font-medium mt-1">Price: ${product.price}</p>
          <p className="text-gray-500 text-sm mt-2">{product.description}</p>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {userRole === 'admin' && (
              <>
                <button className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md transition duration-200">
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition duration-200"
                >
                  Delete
                </button>
              </>
            )}
            {userRole && (
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition duration-200">
                  Purchase
                </button>
                <button
                  onClick={() => handleAddCart(product._id)}
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition duration-200"
                >
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
