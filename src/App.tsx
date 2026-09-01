// import { Product } from "./types"
import { Link } from "react-router-dom";
import { type Product } from "./types";
import { useEffect, useState } from "react"


const App = () => {

    const [product, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
      const fetchProducts = async () =>{
      setLoading(true);
      setError(null);

    try {
      const responce = await fetch("https://fakestoreapi.com/products");
      const data = await responce.json();
      setProducts(data);
    } catch (err) {
     setError("Failed to fetch products. Please try again.");
    }finally{
      setLoading(false)
    }
      };
      fetchProducts();
      }, [])

      if(loading){
        return(
        <div>Loading...</div>
        )
      }

      if(error){
        return(
        <div>{error}</div>
        )
      }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      
{
product.map((item) => (
        <Link 
          to={`/product/${item.id}`} 
          key={item.id} 
          className="border-2 border-gray-200 rounded-xl p-4 shadow-md bg-white hover:shadow-2xl transition-shadow duration-300 flex flex-col"
        >
          <img src={item.image} alt={item.title} className="h-48 w-full object-contain mb-4" />
          <h2 className="font-bold text-gray-800 truncate">{item.title}</h2>
          <p className="text-gray-500 text-sm mb-2">{item.category}</p>
          <p className="text-green-600 font-bold text-lg mt-auto">${item.price}</p>
        </Link>
      ))
      }
      
    </div>
  );
}

export default App