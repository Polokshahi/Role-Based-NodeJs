import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const AddProduct = () => {

    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const price = form.price.value;

        const addNewProduct = { name, image, price };

        axios.post('http://localhost:3000/addProduct', addNewProduct)
            .then(response => {
                console.log('Product added successfully:', response.data);

                Swal.fire({
                    title: 'Success!',
                    text: 'Product added successfully!',
                    icon: 'success',
                    confirmButtonColor: '#facc15', // yellow
                    confirmButtonText: 'OK'
                });

                form.reset();
            })
            .catch(error => {
                console.error('Error adding product:', error);

                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add product.',
                    icon: 'error',
                    confirmButtonColor: '#f87171', // red
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-5 py-10 mt-8">
            <h1 className="text-3xl font-bold text-yellow-400 mb-6">Add Your New Product</h1>

            <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
                <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
                    {/* Product Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Product Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Image URL</span>
                        </label>
                        <input
                            type="url"
                            name="image"
                            placeholder="Enter image URL"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Price</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn bg-yellow-400 text-black hover:bg-yellow-500 mt-4"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
