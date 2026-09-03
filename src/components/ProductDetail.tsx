import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Product } from "../types";

const ProductDetail = () => {
  // 1. Extract the ID from the URL bar
  const { id } = useParams<{ id: string }>();

  // 2. The State Jars for the single product
  const [product, setProduct] = useState<Product |  null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3. The Fetch Engine
  useEffect(() => {
    const fetchSingleProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError("Could not load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  // 4. Handle missing data before painting the UI
  if (loading) return <div className="text-center p-10 text-xl font-semibold">Loading Product...</div>;
  if (error) return <div className="text-center p-10 text-xl text-red-600">{error}</div>;
  if (!product) return <div className="text-center p-10 text-xl">No product found.</div>;

  // 5. The Product UI Layout
  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 border border-gray-200 shadow-lg rounded-xl bg-white">
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-96 object-contain p-4"
      />
      
      <div className="flex flex-col justify-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
        <p className="text-2xl font-bold text-green-600 mb-6">${product.price}</p>
        <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
        
        <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full md:w-auto">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;