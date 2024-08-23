import { ArrowLongRightIcon, ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { Pagination } from '../../api/models';
import Button from '../button/Button';

export type PaginationProps = {
  pagination: Pagination | undefined;
  goToPage: (newPage: number) => void;
};
const PaginationComponent = ({ pagination, goToPage }: PaginationProps) => {
  console.log('pagination:', pagination);

  const handleNext: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (pagination?.next) {
      goToPage(pagination?.next);
    }
  };

  const handlePrev: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (pagination?.prev) {
      goToPage(pagination?.prev);
    }
  };

  return (
    <>
      <div className="flex justify-end my-5">
        {pagination?.prev && (
          <Button onClick={handlePrev} variant="primary">
            <span className="flex">
              <ArrowLongLeftIcon className="w-5 mr-2" />
              Previous
            </span>
          </Button>
        )}
        {pagination?.next && (
          <Button onClick={handleNext} variant="primary">
            <span className="flex">
              Next
              <ArrowLongRightIcon className="w-5 ml-2" />
            </span>
          </Button>
        )}
      </div>
    </>
  );
};

export default PaginationComponent;
