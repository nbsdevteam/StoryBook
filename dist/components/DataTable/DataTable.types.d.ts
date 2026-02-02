import * as React from "react";
import { LucideIcon } from "lucide-react";
import { ComponentWrapperProps } from "../../types/component-config.types";
export interface TableConfig<T = any> {
    columns: TableColumn<T>[];
    data: T[];
    loading?: boolean;
    emptyState?: {
        message?: string;
        icon?: LucideIcon;
        action?: {
            label: string;
            onClick: () => void;
        };
    };
    pagination?: {
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        onPageChange: (page: number) => void;
        onPageSizeChange?: (pageSize: number) => void;
        pageSizeOptions?: number[];
        showPageSize?: boolean;
        showTotal?: boolean;
    };
    sorting?: {
        sortBy?: string;
        sortDirection?: "asc" | "desc";
        onSortChange?: (column: string, direction: "asc" | "desc") => void;
    };
    filtering?: {
        searchValue?: string;
        onSearchChange?: (value: string) => void;
        columnFilters?: Record<string, any>;
        onFiltersChange?: (filters: Record<string, any>) => void;
    };
    selection?: {
        selectedIds: string[];
        onSelectionChange: (selectedIds: string[]) => void;
        multiple?: boolean;
        idField?: string;
    };
    rowActions?: {
        actions: RowAction<T>[];
        dropdown?: boolean;
        dropdownLabel?: string;
    };
    bulkActions?: BulkAction<T>[];
    variant?: "default" | "bordered" | "striped" | "hoverable";
    size?: "sm" | "md" | "lg";
    stickyHeader?: boolean;
    maxHeight?: string | number;
    resizableColumns?: boolean;
    reorderableColumns?: boolean;
    columnVisibility?: boolean;
    export?: {
        enabled: boolean;
        formats?: ("csv" | "excel" | "pdf")[];
        onExport?: (format: string, data: T[]) => void;
    };
}
export interface TableColumn<T = any> {
    id: string;
    label: string;
    accessor: keyof T | ((row: T) => any);
    cell?: (value: any, row: T, index: number) => React.ReactNode;
    width?: string | number;
    minWidth?: number;
    maxWidth?: number;
    sortable?: boolean;
    filterable?: boolean;
    filterType?: "text" | "select" | "date" | "number" | "custom";
    filterOptions?: {
        label: string;
        value: any;
    }[];
    customFilter?: React.ComponentType<any>;
    align?: "left" | "center" | "right";
    headerClassName?: string;
    cellClassName?: string;
    visible?: boolean;
    sticky?: "left" | "right";
    icon?: LucideIcon;
    tooltip?: string;
}
export interface RowAction<T = any> {
    label: string;
    icon?: LucideIcon;
    onClick: (row: T, index: number) => void;
    show?: boolean | ((row: T) => boolean);
    disabled?: boolean | ((row: T) => boolean);
    variant?: "default" | "primary" | "danger";
    confirm?: {
        title: string;
        message: string;
    };
}
export interface BulkAction<T = any> {
    label: string;
    icon?: LucideIcon;
    onClick: (selectedRows: T[]) => void;
    variant?: "default" | "primary" | "danger";
    confirm?: {
        title: string;
        message: string;
    };
}
export interface TableProps<T = any> extends ComponentWrapperProps<TableConfig<T>> {
}
//# sourceMappingURL=DataTable.types.d.ts.map