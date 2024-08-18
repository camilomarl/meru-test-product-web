import { signOut } from '../../api/auth';
import Button from '../button/Button';

const NavBar = () => {
  const logout = () => {
    signOut();
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between  p-10">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="font-mono self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Meru
            </span>
          </a>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
