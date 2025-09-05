"use client";
import ReactPaginate from "react-paginate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const CustomPagination = ({ data }) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const searchQueryParams = useSearchParams();
  const currentPage = searchQueryParams.get("page")
    ? searchQueryParams.get("page")
    : 1;
  const handlePageChange = (event) => {
    const selectedPage = event.selected + 1;
    push(`${pathname}?page=${selectedPage}`);
  };

  return (
    <>
      <div className="py-2 border-t border-gray-200 custom-pagination">
        <nav className="flex justify-end">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageChange}
            pageRangeDisplayed={4}
            pageCount={data?.pageCount}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={1}
            containerClassName="flex items-center space-x-2"
            pageClassName="cursor-pointer"
            pageLinkClassName="px-3 py-1 rounded-lg border border-gray-300  "
            previousClassName="cursor-pointer"
            previousLinkClassName="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            nextClassName="cursor-pointer"
            nextLinkClassName="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            activeClassName="bg-blue-600 text-white border-blue-600"
            forcePage={currentPage - 1}
          />
        </nav>
      </div>
    </>
  );
};

export default CustomPagination;
