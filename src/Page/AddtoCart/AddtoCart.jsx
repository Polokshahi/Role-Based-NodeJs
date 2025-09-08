
import { useLoaderData } from "react-router-dom";

const AddtoCart = () => {
    const addToCartData = useLoaderData();
    // const [afterDeletedProduct, setUpterDeletedProduct] = useState(null);
    console.log(addToCartData);


    //   delete add to cart product

    const handleAddCartDetele = (id) => {
        console.log(id)
        
    }

    return (
        <div className="flex justify-center items-center">
            <div className=" mt-20">
                <div className="overflow-x-auto w-full max-w-6xl m-3">
                    <table className="table w-full">
                        {/* table head */}
                        <thead>
                            <tr className="text-white text-[16px]">
                                <th>Product</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>User Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addToCartData?.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product.image} alt={product.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.userEmail}</td>
                                    <td><button onClick={() => handleAddCartDetele(product._id)} className="btn bg-red-600 text-white">Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                        {/* table foot */}

                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddtoCart;
