export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log('isAuthenticated:', !!token);
  return !!token;
};

export const signIn = async (
  email: string,
  password: string
): Promise<{ token: string } | undefined> => {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  console.log('signIn:', response);
  if (response.ok) {
    const loginData = await response.json();
    return loginData;
  }
  return undefined;
};

export const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  location.href = '/';
};
