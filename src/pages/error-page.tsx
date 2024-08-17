import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col justify-center p-10">
      <h1 className="text-3xl my-5">Oops!</h1>

      <div
        className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 my-5"
        role="alert"
      >
        <ExclamationCircleIcon className="size-4 mr-3" />
        <p>Sorry, an unexpected error has occurred</p>
      </div>
      <p className="bg-gray-100">
        <pre className="p-5">{JSON.stringify(error, null, 2)}</pre>
      </p>
    </div>
  );
}
