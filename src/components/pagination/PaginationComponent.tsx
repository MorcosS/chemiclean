import React from "react";
import { Pagination } from "react-bootstrap";

interface PagingProps {
  count: number,
  currentPage: number,
  itemsPerPage: number,
  fetchMoreData: (nextPage: number) => void
}

// interface PagingStates{
//   hasNext: boolean,
//   hasPrevious: boolean,
//   isActive: boolean
// }

export class PaginationComponent extends React.Component<PagingProps> {
  render() {
    const { currentPage, count, itemsPerPage, fetchMoreData } = this.props
    return (
      <Pagination>
        <Pagination.First onClick={() => currentPage !== 1 && fetchMoreData(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => currentPage !== 1 && fetchMoreData(currentPage - 1)} disabled={currentPage === 1} />

        <Pagination.Next onClick={() => currentPage < (count / itemsPerPage) && fetchMoreData(currentPage + 1)} disabled={currentPage >= (count / itemsPerPage)} />
        <Pagination.Last onClick={() => currentPage < (count / itemsPerPage) && fetchMoreData((count / itemsPerPage))} disabled={currentPage >= (count / itemsPerPage)} />
      </Pagination>
    );
  }
}