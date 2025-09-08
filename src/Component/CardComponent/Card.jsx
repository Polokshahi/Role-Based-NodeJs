const Card = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl m-auto mt-10 mb-10 gap-8">

      {/* Card 1 */}
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure className="h-60 bg-white flex items-center justify-center">
          <img
            className="h-full w-full object-contain"
            src="https://i.ibb.co.com/hRYCjxrY/51-FNn-Hjzh-QL-UF1000-1000-QL80.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure className="h-60 bg-white flex items-center justify-center">
          <img
            className="h-full w-full object-contain"
            src="https://i.ibb.co.com/S7RMmGqQ/X93-Y58rx3ypj5h-VWtfnta-T.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure className="h-60 bg-white flex items-center justify-center">
          <img
            className="h-full w-full object-contain"
            src="https://i.ibb.co.com/Nd9dnQW5/HMD-Smartphones-Catalogue-OG-Image.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Card;
