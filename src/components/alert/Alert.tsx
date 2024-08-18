import { ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/16/solid';

export type AlertProps = {
  message: string;
  type: 'info' | 'error';
};

const Alert = ({ message, type }: AlertProps) => {
  const alertStyles = {
    info: 'bg-blue-500',
    error: 'bg-red-500',
  };

  const iconTypes = {
    info: <InformationCircleIcon className="size-4 mr-3" />,
    error: <ExclamationCircleIcon className="size-4 mr-3" />,
  };

  const style = alertStyles[type];
  const icon = iconTypes[type];

  return (
    <>
      <div
        className={`${style} flex items-center text-white text-sm font-bold px-4 py-3 my-5`}
        role="alert"
      >
        {icon}
        <p>{message}</p>
      </div>
    </>
  );
};

export default Alert;
