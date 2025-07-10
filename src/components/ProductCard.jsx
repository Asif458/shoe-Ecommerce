import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-2"
      />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600 mb-4">₹ {product.price}</p>

      <div className="text-center">
        <button
          onClick={handleViewDetails}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

