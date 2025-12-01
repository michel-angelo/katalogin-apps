import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white h-full flex flex-col transition-colors hover:bg-gray-50">
      <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 font-bold uppercase tracking-widest">
            Sold Out
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-gray-900 uppercase">
          <Link to={`/product/${product.slug}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <p className="text-sm font-bold text-gray-900">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          {product.originalPrice > 0 && (
            <p className="text-xs text-gray-400 line-through">
              Rp {product.originalPrice.toLocaleString("id-ID")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard