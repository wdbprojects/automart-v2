"use client";

import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { env } from "@/env";
import { cn } from "@/lib/utils";

interface PaginationProps {
  baseURL: string;
  totalPages: number;
  maxVisiblePages?: number | undefined;
  styles: {
    paginationRoot: string;
    paginationPrevious: string;
    paginationNext: string;
    paginationLink: string;
    paginationLinkActive: string;
  };
}

const CustomPagination = (props: PaginationProps) => {
  const { baseURL, totalPages, maxVisiblePages = 5, styles } = props;

  const [currentPage, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => {
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
    },
    serialize: (value) => {
      return value.toString();
    },
    shallow: false,
  });

  const [visibleRange, setVisibleRange] = useState({
    start: 1,
    end: Math.min(maxVisiblePages, totalPages),
  });

  useEffect(() => {
    const halfVisible = Math.floor(maxVisiblePages / 2);
    const newStart = Math.max(
      1,
      Math.min(currentPage - halfVisible, totalPages - maxVisiblePages + 1),
    );
    const newEnd = Math.min(newStart + maxVisiblePages - 1, totalPages);
    setVisibleRange({ start: newStart, end: newEnd });
  }, [currentPage, totalPages, maxVisiblePages]);

  const createPageUrl = (pageNumber: number) => {
    const url = new URL(baseURL, env.NEXT_PUBLIC_APP_URL);
    url.searchParams.set("page", currentPage.toString());
    return url.toString();
  };

  const handleEllipsisClick = (direction: "left" | "right") => {
    const newPage =
      direction === "left"
        ? Math.max(1, visibleRange.start - maxVisiblePages)
        : Math.min(totalPages, visibleRange.end + maxVisiblePages);
    setPage(newPage);
  };

  return (
    <div className="flex-2">
      <Pagination className={styles?.paginationRoot}>
        <PaginationContent className="lg:gap-4">
          <PaginationItem>
            <PaginationPrevious
              className={cn(
                currentPage <= 1 && "hidden",
                styles?.paginationPrevious,
              )}
              href={createPageUrl(currentPage - 1)}
              onClick={(event) => {
                event.preventDefault();
                if (currentPage > 1) {
                  setPage(currentPage - 1);
                }
              }}
            />
          </PaginationItem>

          {visibleRange.start > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                className={styles.paginationLink}
                onClick={(event) => {
                  event.preventDefault();
                  handleEllipsisClick("left");
                }}
              >
                ...
              </PaginationLink>
            </PaginationItem>
          )}

          {Array.from(
            { length: visibleRange.end - visibleRange.start + 1 },
            (_, index) => {
              return visibleRange.start + index;
            },
          ).map((pageNumber) => {
            const isActive = pageNumber === currentPage;
            let rel = "";
            if (pageNumber === currentPage - 1) rel = "prev";
            if (pageNumber === currentPage + 1) rel = "next";

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={createPageUrl(pageNumber)}
                  {...(rel ? { rel: rel } : {})}
                  isActive={isActive}
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(pageNumber);
                  }}
                  className={cn(
                    styles.paginationLink,
                    isActive && styles.paginationLinkActive,
                  )}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {visibleRange.end < totalPages && (
            <PaginationItem>
              <PaginationLink
                href="#"
                className={styles.paginationLink}
                onClick={(event) => {
                  event.preventDefault();
                  handleEllipsisClick("right");
                }}
              >
                ...
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              className={cn(
                currentPage >= totalPages && "hidden",
                styles?.paginationNext,
              )}
              href={createPageUrl(currentPage + 1)}
              onClick={(event) => {
                event.preventDefault();
                if (currentPage < totalPages) {
                  setPage(currentPage + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default CustomPagination;
