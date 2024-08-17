import { useEffect, useState } from 'react';
import { Product } from '../../api/models';
import { InformationCircleIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { fetchProducts } from '../../api/products';

const ListProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const thClass = 'w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm';
  const tdClass = 'w-1/3 text-left py-3 px-4';
  const buttonClass =
    'rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetchProducts();
    if (response) {
      setProducts(response);
    }
  };

  const deleteProduct = () => {};

  return (
    <>
      <div className="p-10">
        <div className="grid grid-cols-2 gap-4 my-4">
          <div>
            <h1 className="text-3xl my-4">Products</h1>
          </div>
          <div className="flex justify-end">
            <button
              className={clsx(
                buttonClass,
                'w-40 bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'
              )}
              onClick={() => {
                navigate('/products/new');
              }}
            >
              Create Product
            </button>
          </div>
        </div>
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
                <th className={thClass}>&nbsp;</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.map((product: Product, index: number) => (
                <tr key={index} className={clsx({ 'bg-indigo-100': index % 2 == 0 })}>
                  <td className={tdClass}>
                    <Link to={`/products/edit/${product.id}`}>{product.name}</Link>
                  </td>
                  <td className={tdClass}>
                    <Link to={`/products/edit/${product.id}`}>{product.sku}</Link>
                  </td>
                  <td className={tdClass}>{product.serial}</td>
                  <td className={tdClass}>{product.price}</td>
                  <td className={tdClass}>{product.stock}</td>
                  <td>
                    <button
                      className={clsx(
                        buttonClass,
                        'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600 flex flex-row items-center'
                      )}
                      onClick={deleteProduct}
                    >
                      <TrashIcon className="w-5 mr-3" />
                      Delete
                    </button>
                  </td>
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
