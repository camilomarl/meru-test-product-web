import { useEffect, useState } from 'react';
import { Product } from '../../api/models';
import { InformationCircleIcon } from '@heroicons/react/16/solid';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { fetchProducts } from '../../api/products';

const ListProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const thClass = 'w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm';
  const tdClass = 'w-1/3 text-left py-3 px-4';

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetchProducts();
    if (response) {
      setProducts(response);
    }
  };

  return (
    <>
      <div className="p-10">
        <h1 className="text-3xl my-4">Products</h1>
        {!products && (
          <div
            className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <InformationCircleIcon className="size-4 mr-3" />
            <p>No products available.</p>
          </div>
        )}
        {products && (
          <table className="min-w-full bg-white">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className={thClass}>Name</th>
                <th className={thClass}>SKU</th>
                <th className={thClass}>Serial</th>
                <th className={thClass}>Price</th>
                <th className={thClass}>Stock</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.map((product: Product, index: number) => (
                <tr key={index} className={clsx({ 'bg-indigo-100': index % 2 == 0 })}>
                  <td className={tdClass}>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </td>
                  <td className={tdClass}>
                    <Link to={`/products/${product.id}`}>{product.sku}</Link>
                  </td>
                  <td className={tdClass}>{product.serial}</td>
                  <td className={tdClass}>{product.price}</td>
                  <td className={tdClass}>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ListProducts;
