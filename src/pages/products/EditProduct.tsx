import { FormEvent, useEffect, useState } from 'react';
import { Product } from '../../api/models';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, fetchProduct, updateProduct } from '../../api/products';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    sku: '',
    serial: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    if (productId) {
      getProduct(productId);
    }
  }, [productId]);

  const getProduct = async (productId: string) => {
    const newProduct = await fetchProduct(productId);
    setProduct(newProduct);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = productId ? await updateProduct(product) : await createProduct(product);
    if (response) {
      console.log('redirect to products');
      navigate('/products');
    }
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <>
      <div className="p-10">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-3xl my-4">Product {product.id}</h2>
              <div className="col-span-full mb-3">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Name"
                      value={product.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full mb-3">
                <label htmlFor="sku" className="block text-sm font-medium leading-6 text-gray-900">
                  SKU
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="sku"
                      id="sku"
                      autoComplete="sku"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="SKU"
                      value={product.sku}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full mb-3">
                <label
                  htmlFor="serial"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Serial
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="serial"
                      id="serial"
                      autoComplete="serial"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Serial"
                      value={product.serial}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full mb-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      autoComplete="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Price"
                      value={product.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full mb-3">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="stock"
                      id="stock"
                      autoComplete="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Stock"
                      value={product.stock}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => navigate('/products')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
