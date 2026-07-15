import { NextResponse } from "next/server";
import { PaginatedMeta } from "@/shared/types/common";
export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

/**
 * Utility untuk mengirim response sukses ber-pagination (Standard Blueprint)
 */
export function sendPaginatedResponse<T>({
  requestUrl,
  items,
  totalItems,
  page,
  perPage,
  message = "Berhasil mengambil data.",
}: {
  requestUrl: string;
  items: T[];
  totalItems: number;
  page: number;
  perPage: number;
  message?: string;
}) {
  const urlObj = new URL(requestUrl);
  const baseUrl = `${urlObj.origin}${urlObj.pathname}`;
  const lastPage = Math.ceil(totalItems / perPage) || 1;
  const offset = (page - 1) * perPage;
  const fromItem = totalItems > 0 ? offset + 1 : 0;
  const toItem = Math.min(offset + perPage, totalItems);

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams(urlObj.searchParams);
    params.set("page", String(p));
    params.set("per_page", String(perPage));
    return `${baseUrl}?${params.toString()}`;
  };

  const paginationLinks: Array<{
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }> = [];

  paginationLinks.push({
    url: page > 1 ? buildPageUrl(page - 1) : null,
    label: "&laquo; Previous",
    page: page > 1 ? page - 1 : null,
    active: false,
  });

  for (let i = 1; i <= lastPage; i++) {
    paginationLinks.push({
      url: buildPageUrl(i),
      label: String(i),
      page: i,
      active: i === page,
    });
  }

  paginationLinks.push({
    url: page < lastPage ? buildPageUrl(page + 1) : null,
    label: "Next &raquo;",
    page: page < lastPage ? page + 1 : null,
    active: false,
  });

  return NextResponse.json({
    meta: {
      code: 200,
      status: "success",
      message,
    },
    data: {
      items,
      links: {
        first: buildPageUrl(1),
        last: buildPageUrl(lastPage),
        prev: page > 1 ? buildPageUrl(page - 1) : null,
        next: page < lastPage ? buildPageUrl(page + 1) : null,
      } as PaginationLinks,
      meta: {
        current_page: page,
        from: fromItem,
        last_page: lastPage,
        links: paginationLinks,
        path: baseUrl,
        per_page: perPage,
        to: toItem,
        total: totalItems,
      } as PaginatedMeta,
    },
  });
}

/**
 * Utility untuk mengirim response standar Non-Pagination (POST, PUT, DELETE atau single GET)
 * Menggunakan generic <T> menggantikan 'any' agar type-safe
 */
export function sendStandardResponse<T>(
  data: T,
  message: string,
  code: number = 200,
  status: "success" | "error" = "success",
) {
  return NextResponse.json(
    {
      meta: { code, status, message },
      data,
    },
    { status: code },
  );
}
