import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";

interface UiTableProps {
  tableData: any;
  columnsSchema: ColumnDef<any>[];
  actionButtonComponent?: React.ReactNode
}

function UiTable({ tableData, columnsSchema, actionButtonComponent }: UiTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const data = useMemo(() => tableData?.data?.data || [], [tableData?.data?.data]);
  

  const table = useReactTable({
    data,
    columns: columnsSchema,
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableGlobalFilter: true,
  });

  const perPageOptions = [5, 10, 20, 50, 100];

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
        <div className="relative sm:w-1/2">
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search across all columns..."
            className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none w-60"
          />
          {globalFilter && (
            <button
              onClick={() => setGlobalFilter("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
            >
              ✕
            </button>
          )}
        </div>
        <div>
          {actionButtonComponent || <></>}
        </div>
      </div>

      <div className="border border-gray-300 rounded overflow-x-auto overflow-y-auto max-h-[calc(100vh-300px)]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {table.getRowModel().rows?.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={table.getHeaderGroups()[0].headers?.length}
                  className="h-32 text-center text-sm text-gray-500"
                >
                  {globalFilter
                    ? "No results found for your search."
                    : "No data available to show!"}
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {table?.getRowModel()?.rows?.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>Rows per page:</span>
          <select
            className="h-8 px-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
            value={pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {perPageOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>
            of{" "}
            <span className="font-semibold">
              {table.getFilteredRowModel().rows?.length}
            </span>{" "}
            results
          </span>
        </div>

  
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <button
            className="px-3 py-1 text-sm rounded disabled:opacity-50 hover:bg-gray-100 transition"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
          >
            First
          </button>
          <button
            className="px-3 py-1 text-sm rounded disabled:opacity-50 hover:bg-gray-100 transition"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Prev
          </button>
          <span className="text-sm">
            Page <strong>{pagination.pageIndex + 1}</strong> of{" "}
            <strong>{table.getPageCount()}</strong>
          </span>
          <button
            className="px-3 py-1 text-sm rounded disabled:opacity-50 hover:bg-gray-100 transition"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
          </button>
          <button
            className="px-3 py-1 text-sm rounded disabled:opacity-50 hover:bg-gray-100 transition"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}

export default UiTable;