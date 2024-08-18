import { useEffect, useState } from 'react';
import { Product } from '../../api/models';
import { InformationCircleIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { deleteProduct, fetchProducts } from '../../api/products';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import Button from '../../components/button/Button';
import NavBar from '../../components/navigation/NavBar';

type DeleteDialog = {
  open: boolean;
  productId: string;
};

const ListProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialog>({
    open: false,
    productId: '',
  });
  const navigate = useNavigate();
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

  const destroyProduct = async (productId: string) => {
    const response = await deleteProduct(productId);
    if (response) {
      getProducts();
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-10">
        <div className="grid grid-cols-2 gap-4 my-4">
          <div>
            <h1 className="text-3xl my-4">Products</h1>
          </div>
          <div className="flex justify-end">
            <Button
              variant="primary"
              className="w-40"
              onClick={() => {
                navigate('/products/new');
              }}
            >
              Create Product
            </Button>
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
                    <Button
                      variant="danger"
                      className="flex flex-row items-center"
                      onClick={() => {
                        if (product.id) {
                          setDeleteDialog({
                            open: true,
                            productId: product.id,
                          });
                        }
                      }}
                    >
                      <TrashIcon className="w-5 mr-3" />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ConfirmDialog
        title="Confirm product deletion"
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, productId: '' })}
        onConfirm={() => {
          destroyProduct(deleteDialog.productId);
        }}
      >
        Are you sure to delete this product?
      </ConfirmDialog>
    </>
  );
};

export default ListProducts;
