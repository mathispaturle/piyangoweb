"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";

import { IconDotsVertical, IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Schema for table rows — adapt as needed.
 * We keep it minimal: id, email, fullname, phone, createdAt, referralCode, referredBy
 */
export const schema = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  fullname: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  referralCode: z.string().nullable().optional(),
  referredBy: z.string().nullable().optional(),
  status: z.string().optional(),
});

/**
 * Column definitions mapped to the schema above.
 * header -> email (clickable, opens Drawer)
 */
type RowType = z.infer<typeof schema>;

const columns: ColumnDef<RowType>[] = [
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <TableCellViewer item={row.original} />
      );
    },
  },
  {
    accessorKey: "fullname",
    header: "Full name",
    cell: ({ row }) => row.original.fullname ?? "-",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.original.phone ?? "-",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const v = row.original.createdAt;
      return v ? new Date(v).toLocaleString() : "-";
    },
  },
  {
    accessorKey: "referralCode",
    header: "Referral",
    cell: ({ row }) => (row.original.referralCode ? <Badge variant="outline">{row.original.referralCode}</Badge> : "-"),
  },
  {
    accessorKey: "referredBy",
    header: "Referred by",
    cell: ({ row }) => row.original.referredBy ?? "-",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = "/admin/dashboard/users/" + row.original.id
            }

          }} className="cursor-pointer" >Ver

          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function TableCellViewer({ item }: { item: RowType }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.email ?? item.id}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.fullname ?? item.email ?? item.id}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <div className="grid gap-2">
            <div>
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="font-medium">{item.email ?? "-"}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Full name</div>
              <div className="font-medium">{item.fullname ?? "-"}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Phone</div>
              <div className="font-medium">{item.phone ?? "-"}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Created</div>
              <div className="font-medium">{item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Referral code</div>
              <div className="font-medium">{item.referralCode ?? "-"}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Referred by</div>
              <div className="font-medium">{item.referredBy ?? "-"}</div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Close</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function DataTable() {
  const [data, setData] = React.useState<RowType[]>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Load users from Firestore
  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const col = collection(db, "users");
        const snap = await getDocs(col);
        if (!mounted) return;

        const rows: RowType[] = snap.docs.map((d) => {
          const raw = d.data() as any;
          // createdAt may be a Timestamp or ISO string — normalize to ISO string
          let createdAt: string | undefined = undefined;
          if (raw?.createdAt?.toDate) {
            createdAt = raw.createdAt.toDate().toISOString();
          } else if (typeof raw?.createdAt === "string") {
            createdAt = raw.createdAt;
          } else if (raw?.createdAt?.seconds) {
            // firebase timestamp object shape
            createdAt = new Date(raw.createdAt.seconds * 1000).toISOString();
          }

          return {
            id: d.id,
            email: raw.email ?? null,
            fullname: raw.fullname ?? null,
            phone: raw.phone ?? null,
            createdAt,
            referralCode: raw.referralCode ?? null,
            referredBy: raw.referredBy ?? null,
            status: raw.disabled ? "Disabled" : "Active",
          } as RowType;
        });

        setData(rows);
      } catch (err: any) {
        console.error("Error loading users:", err);
        toast.error("Error loading users");
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                <>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={`${table.getState().pagination.pageSize}`} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>{pageSize}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">Go to first page</span>
                {"<<"}
              </Button>
              <Button variant="outline" className="size-8" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">Go to previous page</span>
                {"<"}
              </Button>
              <Button variant="outline" className="size-8" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <span className="sr-only">Go to next page</span>
                {">"}
              </Button>
              <Button variant="outline" className="hidden size-8 lg:flex" size="icon" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                <span className="sr-only">Go to last page</span>
                {">>"}
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default DataTable;
