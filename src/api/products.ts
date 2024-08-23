import { Product } from './models';
const headers: { [key: string]: string } = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const fetchProducts = async (page: number | null) => {
  const urlParams = new URLSearchParams();
  if (page) {
    urlParams.append('page', page.toString());
  }

  const response = await fetch(`http://localhost:3000/products?${urlParams.toString()}`, {
    method: 'GET',
    headers,
  });
  console.log('fetchProducts:', response);
  if (response.ok) {
    return await response.json();
  }
  return undefined;
};

export const fetchProduct = async (productId: string) => {
  const response = await fetch('http://localhost:3000/products/' + productId, {
    method: 'GET',
    headers,
  });
  console.log('fetchProduct:', response);
  if (response.ok) {
    return await response.json();
  }
  return undefined;
};

export const createProduct = async (product: Product) => {
  const token = localStorage.getItem('token');
  let saveHeaders = {
    ...headers,
  };
  if (token) {
    saveHeaders = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch('http://localhost:3000/products/', {
    method: 'POST',
    body: JSON.stringify(product),
    headers: saveHeaders,
  });
  console.log('createProduct:', response);
  const { error, ...responseData } = await response.json();
  console.log('createProduct:', error, responseData);
  if (response.ok) {
    return responseData;
  }
  const errorDescription = Object.keys(responseData)
    .map((field) => `${field} ${responseData[field].join(', ')}`)
    .join(', ');
  return new Error(error ?? errorDescription);
};

export const updateProduct = async (product: Product) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, created_at, updated_at, ...data } = product;
  const token = localStorage.getItem('token');
  let saveHeaders = {
    ...headers,
  };
  if (token) {
    saveHeaders = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  console.log('update id:', id, 'data:', data);

  const response = await fetch('http://localhost:3000/products/' + id, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: saveHeaders,
  });

  const { error, ...responseData } = await response.json();
  console.log('updateProduct:', error, responseData);
  if (response.ok) {
    return responseData;
  }
  const errorDescription = Object.keys(responseData)
    .map((field) => `${field} ${responseData[field].join(', ')}`)
    .join(', ');
  return new Error(error ?? errorDescription);
};

export const deleteProduct = async (productId: string) => {
  const token = localStorage.getItem('token');
  let saveHeaders = {
    ...headers,
  };
  if (token) {
    saveHeaders = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch('http://localhost:3000/products/' + productId, {
    method: 'DELETE',
    headers: saveHeaders,
  });

  const { error, ...responseData } = await response.json();
  if (response.ok) {
    return responseData;
  }
  const errorDescription = Object.keys(responseData)
    .map((field) => `${field} ${responseData[field].join(', ')}`)
    .join(', ');
  return new Error(error ?? errorDescription);
};
