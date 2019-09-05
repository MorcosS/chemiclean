import React from "react";
import { Pagination } from "react-bootstrap";

interface PagingProps {
  count: number,
  currentPage: number,
  itemsPerPage: number,
  fetchMoreData: (nextPage: number) => void
}


export class PaginationComponent extends React.Component<PagingProps> {
  render() {
    const { currentPage, count, itemsPerPage, fetchMoreData } = this.props
    return (
      <Pagination>
        <Pagination.First onClick={() => currentPage !== 0 && fetchMoreData(0)} disabled={currentPage === 0} />
        <Pagination.Prev onClick={() => currentPage !== 0 && fetchMoreData(currentPage - 1)} disabled={currentPage === 0} />

        <Pagination.Next onClick={() => currentPage < (count / itemsPerPage) && fetchMoreData(currentPage + 1)} disabled={currentPage >= (count / itemsPerPage)} />
        <Pagination.Last onClick={() => currentPage < (count / itemsPerPage) && fetchMoreData((count / itemsPerPage))} disabled={currentPage >= (count / itemsPerPage)} />
      </Pagination>
    );
  }
}