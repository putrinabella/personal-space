"use client";

import React from "react";

type PaginationProps = {
  page: number;
  lastPage: number;
  onPageChange: (newPage: number) => void;
  perPage?: number;
  total?: number;
};

export default function Pagination({
  page,
  lastPage,
  onPageChange,
  perPage = 10,
  total = 0,
}: PaginationProps) {
  // if (lastPage <= 1) {
  //   return <div className="mt-6" />;
  // }

  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = total === 0 ? 0 : Math.min(page * perPage, total);
  const pages: (number | "...")[] = [];
  const delta = 2;
  for (let p = 1; p <= lastPage; p++) {
    if (p === 1 || p === lastPage || (p >= page - delta && p <= page + delta)) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
      <p className="text-sm text-base-content/70">
        {total === 0 ? (
          "Menampilkan 0 data"
        ) : (
          <>
            Menampilkan <span className="font-semibold">{from}</span> sampai{" "}
            <span className="font-semibold">{to}</span> dari{" "}
            <span className="font-semibold">{total}</span> data
          </>
        )}
      </p>

      <div className="flex items-center gap-1 flex-wrap">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="btn btn-sm btn-outline border-neutral/20 disabled:opacity-50"
        >
          «
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="btn btn-sm btn-ghost cursor-default"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`btn btn-sm border-neutral/20 ${
                p === page
                  ? "bg-primary text-primary-content hover:bg-primary/90"
                  : "btn-outline hover:bg-neutral/10"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= lastPage}
          className="btn btn-sm btn-outline border-neutral/20 disabled:opacity-50"
        >
          »
        </button>
      </div>
    </div>
  );
}
