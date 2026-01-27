import React from 'react';
/**
 * DataTable Column Definition
 */
export interface DataTableColumn<T = any> {
    title: string;
    dataIndex?: string | string[];
    key?: string;
    render?: (value: any, record: T, index: number) => React.ReactNode;
    sorter?: (a: T, b: T) => number;
    filterable?: boolean;
    width?: number | string;
    align?: 'left' | 'right' | 'center';
    fixed?: 'left' | 'right';
    ellipsis?: boolean;
}
/**
 * DataTable Component Props
 */
export interface DataTableProps<T extends Record<string, any> = Record<string, any>> {
    /**
     * Table columns configuration
     */
    columns: DataTableColumn<T>[];
    /**
     * Table data source
     */
    dataSource: T[];
    /**
     * Whether to show row selection checkbox
     * @default false
     */
    selection?: boolean;
    /**
     * Callback when selection changes
     */
    onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
    /**
     * Whether table is in loading state
     * @default false
     */
    loading?: boolean;
    /**
     * Number of skeleton rows to show during loading
     * @default 10
     */
    skeletonRows?: number;
    /**
     * Whether to show search input
     * @default true
     */
    searchable?: boolean;
    /**
     * Search placeholder text
     * @default 'Search'
     */
    searchPlaceholder?: string;
    /**
     * Callback when search text changes
     */
    onSearchChange?: (searchText: string) => void;
    /**
     * Whether to show pagination
     * @default true
     */
    pagination?: boolean | {
        pageSize?: number;
        showSizeChanger?: boolean;
        pageSizeOptions?: string[];
        showQuickJumper?: boolean;
        showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    };
    /**
     * Table row key
     * @default 'id'
     */
    rowKey?: string | ((record: T) => string);
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Inline styles
     */
    style?: React.CSSProperties;
    /**
     * Table size
     * @default 'middle'
     */
    size?: 'small' | 'middle' | 'large';
    /**
     * Whether to enable virtual scrolling for large datasets
     * @default true (auto-enabled for >100 rows)
     */
    virtual?: boolean;
    /**
     * Scroll configuration
     */
    scroll?: {
        x?: number | string;
        y?: number | string;
    };
    /**
     * Callback when row is clicked
     */
    onRowClick?: (record: T, index: number) => void;
    /**
     * Custom empty state content
     */
    emptyText?: React.ReactNode;
}
/**
 * DataTable Component
 *
 * A powerful, feature-rich data table component with search, selection,
 * pagination, and loading states. Built on top of Ant Design Table.
 */
export declare function DataTable<T extends Record<string, any> = Record<string, any>>({ columns, dataSource, selection, onSelectionChange, loading, skeletonRows, searchable, searchPlaceholder, onSearchChange, pagination, rowKey, className, style, size, virtual, scroll, onRowClick, emptyText, }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
declare const _default: typeof DataTable;
export default _default;
//# sourceMappingURL=DataTable.d.ts.map