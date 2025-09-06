import { useLoaderData } from 'react-router-dom';

const AllProduct = () => {
    const allProduct = useLoaderData();
    console.log(allProduct);

    return (
        <div className="px-5 py-10">
            <h1 className="text-2xl font-bold text-center mb-8 text-yellow-400">All Products</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProduct.map(product => (
                    <div 
                        key={product._id} 
                        className="bg-black border border-gray-700 rounded-xl p-5 shadow-md hover:shadow-yellow-400/40 transition flex flex-col items-center"
                    >
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full max-h-60 object-contain rounded-md mb-4 bg-white"
                        />
                        <h2 className="text-lg font-semibold text-white">{product.name}</h2>
                        <p className="text-yellow-400 font-medium">Price: ${product.price}</p>
                        <p className="text-gray-400 text-sm mt-2">{product.description}</p>

                        {/* Buttons without functions */}
                        <div className="flex gap-2 mt-4">
                            <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white">
                                Update
                            </button>
                            <button className="btn btn-sm bg-green-600 hover:bg-green-700 text-white">
                                Purchase
                            </button>
                            <button className="btn btn-sm bg-red-600 hover:bg-red-700 text-white">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProduct;
