const Card = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl m-auto mt-10 mb-10 gap-8">
      
      {/* Card 1 */}
      <div className="card w-96 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
        <figure className="h-60 bg-gray-50 flex items-center justify-center rounded-t-xl">
          <img
            className="h-full w-full object-contain p-4"
            src="https://i.ibb.co.com/hRYCjxrY/51-FNn-Hjzh-QL-UF1000-1000-QL80.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold text-gray-800">Shoes!</h2>
          <p className="text-sm text-gray-600">If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end mt-3">
            <button className="btn bg-indigo-600 text-white hover:bg-indigo-700 px-5">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card w-96 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
        <figure className="h-60 bg-gray-50 flex items-center justify-center rounded-t-xl">
          <img
            className="h-full w-full object-contain p-4"
            src="https://i.ibb.co.com/S7RMmGqQ/X93-Y58rx3ypj5h-VWtfnta-T.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold text-gray-800">Shoes!</h2>
          <p className="text-sm text-gray-600">If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end mt-3">
            <button className="btn bg-indigo-600 text-white hover:bg-indigo-700 px-5">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="card w-96 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
        <figure className="h-60 bg-gray-50 flex items-center justify-center rounded-t-xl">
          <img
            className="h-full w-full object-contain p-4"
            src="https://i.ibb.co.com/Nd9dnQW5/HMD-Smartphones-Catalogue-OG-Image.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold text-gray-800">Shoes!</h2>
          <p className="text-sm text-gray-600">If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end mt-3">
            <button className="btn bg-indigo-600 text-white hover:bg-indigo-700 px-5">Buy Now</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Card;
