import * as React from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "react-feather";
import { clamp, mergeProps } from "../../utils";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import "./styles.scss";

type PaginatorProps = React.HTMLAttributes<HTMLDivElement> & {
  currentPage: number;
  totalPages: number;
  jumpLength: number;

  onPageChange: (newPage: number) => void;
};

const Paginator: React.FC<PaginatorProps> = (props: PaginatorProps) => {
  const { currentPage, totalPages, jumpLength, onPageChange, ...rest } = props;

  const getPageNumbers = () => {
    const pages = [];
    const startPage = clamp(
      currentPage -
        jumpLength -
        clamp(jumpLength + currentPage - totalPages, 0, Infinity),
      1,
      Infinity
    );
    const endPage = clamp(startPage + jumpLength * 2 + 1, 1, totalPages + 1);
    for (let i = startPage; i < endPage; i++) pages.push(i);

    return pages;
  };

  return (
    <div {...mergeProps({ className: "paginator" }, rest)}>
      <ButtonGroup>
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          size="sm"
        >
          <ChevronLeft />
        </Button>
        {getPageNumbers().map((v) => (
          <Button
            key={v}
            onClick={() => onPageChange(v)}
            style={{ width: "34px" }}
            size="sm"
            color={v === currentPage ? "primary" : "secondary"}
          >
            {v}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          size="sm"
        >
          <ChevronRight />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Paginator;
