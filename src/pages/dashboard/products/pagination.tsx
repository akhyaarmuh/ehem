import { toRupiah } from '../../../utilities';

interface PaginationProps {
  page: number;
  pages: number;
  rows: number;
  setPage: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, pages, rows, setPage }) => {
  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const nextPage = () => {
    if (page < pages) setPage(page + 1);
  };

  if (rows)
    return (
      <div className="mt-4">
        {/* detail page */}
        <div>
          <p className="mb-0">Total data: {toRupiah(rows)}</p>
          <p className="mb-0">Total Halaman: {toRupiah(pages)}</p>
        </div>

        {/* pagination */}
        <div className="flex justify-end">
          <div className="join">
            <button
              className="join-item btn btn-sm btn-outline btn-primary"
              onClick={prevPage}
            >
              &laquo;
            </button>
            <button className="join-item btn btn-sm btn-outline btn-primary">
              Halaman {toRupiah(page)}
            </button>
            <button
              className="join-item btn btn-sm btn-outline btn-primary"
              onClick={nextPage}
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
    );
};

export default Pagination;
