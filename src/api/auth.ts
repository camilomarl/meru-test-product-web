export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log('isAuthenticated:', !!token);
  return !!token;
};

export const signIn = async (
  email: string,
  password: string
): Promise<{ token: string } | Error> => {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  console.log('signIn:', response);
  const { error, token } = await response.json();

  if (response.ok) {
    return { token };
  }
  return new Error(error);
};

export const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  location.href = '/';
};
