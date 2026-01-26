import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Table, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './DataTable.module.css';

// #region agent log
fetch('http://127.0.0.1:7243/ingest/54e479dd-9efb-4b0b-8c28-ab5c52fe63dd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1',location:'src/components/DataTable/DataTable.tsx:6',message:'DataTable module loaded',data:{reactVersion:(React as any)?.version,hasWindow:typeof window!=='undefined',marker:(React as any).__templateNewDebugMarker??null},timestamp:Date.now()})}).catch(()=>{});
// #endregion

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
 * Custom hook for debounced value
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Skeleton row component for loading state
 */
const SkeletonRow = React.memo(({ columns }: { columns: number }) => (
  <tr className={styles.skeletonRow}>
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} style={{ padding: '12px 16px' }}>
        <Skeleton.Input
          active
          size="small"
          style={{ width: '100%', minWidth: 60 }}
        />
      </td>
    ))}
  </tr>
));

SkeletonRow.displayName = 'SkeletonRow';

/**
 * Table skeleton component
 */
const TableSkeleton = React.memo(
  ({ columns, rows = 10 }: { columns: number; rows?: number }) => (
    <div className={styles.tableSkeleton}>
      <table className="table datanew dataTable no-footer" style={{ width: '100%' }}>
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} style={{ padding: '12px 16px' }}>
                <Skeleton.Input active size="small" style={{ width: 80 }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <SkeletonRow key={index} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  )
);

TableSkeleton.displayName = 'TableSkeleton';

/**
 * DataTable Component
 * 
 * A powerful, feature-rich data table component with search, selection,
 * pagination, and loading states. Built on top of Ant Design Table.
 */
export function DataTable<T extends Record<string, any> = Record<string, any>>({
  columns,
  dataSource,
  selection = false,
  onSelectionChange,
  loading = false,
  skeletonRows = 10,
  searchable = true,
  searchPlaceholder = 'Search',
  onSearchChange,
  pagination = true,
  rowKey = 'id',
  className = '',
  style,
  size = 'middle',
  virtual,
  scroll,
  onRowClick,
  emptyText,
}: DataTableProps<T>) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/54e479dd-9efb-4b0b-8c28-ab5c52fe63dd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1',location:'src/components/DataTable/DataTable.tsx:215',message:'DataTable render entry',data:{reactVersion:(React as any)?.version,rows:Array.isArray(dataSource)?dataSource.length:null,loading,hasSkeleton:(Skeleton as any)!=null},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce search text for better performance
  const debouncedSearchText = useDebounce(searchText, 300);

  // Handle initial load
  useEffect(() => {
    if (dataSource && dataSource.length >= 0) {
      const rafId = requestAnimationFrame(() => {
        setIsInitialLoad(false);
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [dataSource]);

  // Show loading state
  const isLoading = isInitialLoad || loading || isFiltering;

  // Track filtering state
  useEffect(() => {
    if (searchText !== debouncedSearchText) {
      setIsFiltering(true);
    } else {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
      filterTimeoutRef.current = setTimeout(() => {
        setIsFiltering(false);
      }, 100);
    }

    return () => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
    };
  }, [searchText, debouncedSearchText]);

  // Memoize filtered data
  const filteredData = useMemo(() => {
    if (!debouncedSearchText) {
      if (onSearchChange) {
        onSearchChange('');
      }
      return dataSource;
    }

    const searchLower = debouncedSearchText.toLowerCase();
    const filtered = dataSource.filter((record: T) => {
      const values = Object.values(record);
      for (let i = 0; i < values.length; i++) {
        if (String(values[i]).toLowerCase().includes(searchLower)) {
          return true;
        }
      }
      return false;
    });

    if (onSearchChange) {
      onSearchChange(debouncedSearchText);
    }

    return filtered;
  }, [dataSource, debouncedSearchText, onSearchChange]);

  // Convert columns to Ant Design format
  const antdColumns: ColumnsType<T> = useMemo(() => {
    return columns.map((col) => ({
      title: col.title,
      dataIndex: col.dataIndex || col.key,
      key: col.key || (Array.isArray(col.dataIndex) ? col.dataIndex.join('.') : col.dataIndex),
      render: col.render,
      sorter: col.sorter,
      width: col.width,
      align: col.align,
      fixed: col.fixed,
      ellipsis: col.ellipsis,
    }));
  }, [columns]);

  // Row selection configuration
  const rowSelection = useMemo(
    () => ({
      selectedRowKeys,
      onChange: (keys: React.Key[], selectedRows: T[]) => {
        setSelectedRowKeys(keys);
        if (onSelectionChange) {
          onSelectionChange(keys, selectedRows);
        }
      },
      preserveSelectedRowKeys: true,
    }),
    [selectedRowKeys, onSelectionChange]
  );

  // Pagination configuration
  const paginationConfig = useMemo((): false | import('antd/es/table').TablePaginationConfig => {
    if (pagination === false) return false;

    const defaultConfig: import('antd/es/table').TablePaginationConfig = {
      locale: { items_per_page: '' },
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '50', '100'],
      showQuickJumper: filteredData.length > 100,
    };

    if (typeof pagination === 'object') {
      return {
        ...defaultConfig,
        ...pagination,
      };
    }

    return {
      ...defaultConfig,
      showTotal: (total: number, range: [number, number]) =>
        `Showing ${range[0]} - ${range[1]} of ${total} entries`,
    };
  }, [pagination, filteredData.length]);

  // Handle search change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchText('');
  }, []);

  // Calculate visible columns count for skeleton
  const visibleColumnsCount = useMemo(() => {
    return (selection ? 1 : 0) + columns.length;
  }, [selection, columns]);

  // Table props
  const tableProps = useMemo(
    () => ({
      className: `table datanew dataTable no-footer ${className}`,
      columns: antdColumns,
      dataSource: filteredData,
      loading: false, // We handle loading ourselves
      rowKey: rowKey,
      size: size,
      virtual: virtual !== undefined ? virtual : filteredData.length > 100,
      scroll: scroll || (filteredData.length > 100 ? { y: 500 } : undefined),
      pagination: paginationConfig,
      onRow: onRowClick
        ? (record: T, index?: number) => ({
            onClick: () => onRowClick(record, index || 0),
            style: { cursor: 'pointer' },
          })
        : undefined,
      locale: {
        emptyText: emptyText || 'No data available',
      },
    }),
    [
      className,
      antdColumns,
      filteredData,
      rowKey,
      size,
      virtual,
      scroll,
      paginationConfig,
      onRowClick,
      emptyText,
    ]
  );

  return (
    <div className={styles.dataTableWrapper} style={style}>
      {(searchable || searchText) && (
        <div className={styles.tableTopData}>
          <div className="row p-3">
            <div className="col-sm-12 col-md-6">
              <div className="dataTables_length" />
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="dataTables_filter text-end mb-0 d-flex align-items-center justify-content-end gap-2">
                <label className="d-flex align-items-center justify-content-end gap-2">
                  <input
                    type="search"
                    className="form-control form-control-sm"
                    placeholder={searchPlaceholder}
                    value={searchText}
                    onChange={handleSearchChange}
                  />
                  {searchText && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handleClearSearch}
                      title="Clear search"
                    >
                      <i className="ti ti-x" />
                    </button>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <TableSkeleton columns={visibleColumnsCount} rows={skeletonRows} />
      ) : !selection ? (
        <Table<T> {...tableProps} />
      ) : (
        <Table<T> {...tableProps} rowSelection={rowSelection} />
      )}
    </div>
  );
}

export default React.memo(DataTable) as typeof DataTable;
