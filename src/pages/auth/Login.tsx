import { FormEvent, useState } from 'react';
import { signIn } from '../../api/auth';
import Button from '../../components/button/Button';
import Alert from '../../components/alert/Alert';
interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(undefined);
    const response = await signIn(formData.email, formData.password);
    console.log('signIn response:', response);
    if (response instanceof Error) {
      setError(response.message);
    } else {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', formData.email);
      location.href = '/products';
    }
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 font-mono text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
          Meru
        </h1>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <Alert type="error" message={error} />}
        <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="flex w-full justify-center">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
