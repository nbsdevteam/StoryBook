import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Table, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './DataTable.module.css';
import { Button } from '../Button';
import { DropdownMenu } from '../DropdownMenu';
import { TableConfig, TableColumn } from './DataTable.types';

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
   * Config-driven API (preferred for complex tables).
   */
  config?: TableConfig<T>;
  /**
   * Table columns configuration
   */
  columns?: DataTableColumn<T>[];
  
  /**
   * Table data source
   */
  dataSource?: T[];
  
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

const mapConfigColumns = <T extends Record<string, any>>(
  columns: TableColumn<T>[],
  rowActions?: TableConfig<T>['rowActions']
): DataTableColumn<T>[] => {
  const mapped = columns.map((column) => ({
    title: column.label,
    dataIndex: typeof column.accessor === 'string' ? column.accessor : undefined,
    key: column.id,
    width: column.width,
    align: column.align,
    sorter: column.sortable ? true : undefined,
    render:
      typeof column.accessor === 'function'
        ? (value: any, record: T, index: number) =>
            column.cell
              ? column.cell(column.accessor(record), record, index)
              : column.accessor(record)
        : column.cell
          ? (value: any, record: T, index: number) =>
              column.cell(value, record, index)
          : undefined,
  }));

  if (rowActions?.actions?.length) {
    mapped.push({
      title: rowActions.dropdownLabel ?? 'Actions',
      key: 'actions',
      render: (_value: any, record: T, index: number) => {
        const actions = rowActions.actions.filter((action) => {
          if (typeof action.show === 'function') return action.show(record);
          return action.show !== false;
        });
        if (rowActions.dropdown) {
          return (
            <DropdownMenu
              config={{
                trigger: { label: rowActions.dropdownLabel ?? 'Actions', variant: 'outline' },
                items: actions.map((action) => ({
                  type: 'item',
                  label: action.label,
                  onClick: () => action.onClick(record, index),
                })),
              }}
            />
          );
        }
        return (
          <div className={styles.actionButtons}>
            {actions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant === 'danger' ? 'danger' : 'secondary'}
                size="small"
                onClick={() => action.onClick(record, index)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        );
      },
    });
  }

  return mapped;
};

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
  config,
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
  const resolvedColumns = config
    ? mapConfigColumns(config.columns, config.rowActions)
    : (columns ?? []);
  const resolvedDataSource = config ? config.data : dataSource ?? [];
  const resolvedLoading = config?.loading ?? loading;
  const resolvedSearchable = config?.filtering ? true : searchable;
  const resolvedSearchPlaceholder =
    config?.filtering?.searchValue !== undefined ? 'Search' : searchPlaceholder;
  const resolvedRowKey = config?.selection?.idField ?? rowKey ?? 'id';
  const resolvedPagination = config?.pagination
    ? {
        current: config.pagination.currentPage,
        total: config.pagination.totalItems,
        pageSize: config.pagination.pageSize,
        showSizeChanger: config.pagination.showPageSize ?? false,
        onChange: (page: number, pageSize: number) => {
          config.pagination.onPageChange(page);
          config.pagination.onPageSizeChange?.(pageSize);
        },
        showTotal: config.pagination.showTotal
          ? (total: number) => `Total ${total} items`
          : undefined,
      }
    : pagination;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce search text for better performance
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    if (typeof config?.filtering?.searchValue === 'string') {
      setSearchText(config.filtering.searchValue);
    }
  }, [config?.filtering?.searchValue]);

  // Handle initial load
  useEffect(() => {
    if (resolvedDataSource && resolvedDataSource.length >= 0) {
      const rafId = requestAnimationFrame(() => {
        setIsInitialLoad(false);
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [resolvedDataSource]);

  // Show loading state
  const isLoading = isInitialLoad || resolvedLoading || isFiltering;

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
      if (config?.filtering?.onSearchChange) {
        config.filtering.onSearchChange('');
      } else if (onSearchChange) {
        onSearchChange('');
      }
      return resolvedDataSource;
    }

    const searchLower = debouncedSearchText.toLowerCase();
    const filtered = resolvedDataSource.filter((record: T) => {
      const values = Object.values(record);
      for (let i = 0; i < values.length; i++) {
        if (String(values[i]).toLowerCase().includes(searchLower)) {
          return true;
        }
      }
      return false;
    });

    if (config?.filtering?.onSearchChange) {
      config.filtering.onSearchChange(debouncedSearchText);
    } else if (onSearchChange) {
      onSearchChange(debouncedSearchText);
    }

    return filtered;
  }, [resolvedDataSource, debouncedSearchText, onSearchChange, config]);

  // Convert columns to Ant Design format
  const antdColumns: ColumnsType<T> = useMemo(() => {
    return resolvedColumns.map((col) => ({
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
  }, [resolvedColumns]);

  // Row selection configuration
  const rowSelection = useMemo(() => {
    if (config?.selection) {
      return {
        selectedRowKeys: config.selection.selectedIds,
        onChange: (keys: React.Key[]) =>
          config.selection?.onSelectionChange(keys as string[]),
        preserveSelectedRowKeys: true,
        type: config.selection.multiple === false ? 'radio' : 'checkbox',
      };
    }

    if (!selection) return undefined;

    return {
      selectedRowKeys,
      onChange: (keys: React.Key[], selectedRows: T[]) => {
        setSelectedRowKeys(keys);
        if (onSelectionChange) {
          onSelectionChange(keys, selectedRows);
        }
      },
      preserveSelectedRowKeys: true,
    };
  }, [selectedRowKeys, onSelectionChange, selection, config]);

  // Pagination configuration
  const paginationConfig = useMemo((): false | import('antd/es/table').TablePaginationConfig => {
    if (resolvedPagination === false) return false;

    const defaultConfig: import('antd/es/table').TablePaginationConfig = {
      locale: { items_per_page: '' },
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '50', '100'],
      showQuickJumper: filteredData.length > 100,
    };

    if (typeof resolvedPagination === 'object') {
      return {
        ...defaultConfig,
        ...resolvedPagination,
      };
    }

    return {
      ...defaultConfig,
      showTotal: (total: number, range: [number, number]) =>
        `Showing ${range[0]} - ${range[1]} of ${total} entries`,
    };
  }, [resolvedPagination, filteredData.length]);

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
    const selectionEnabled = !!config?.selection || selection;
    return (selectionEnabled ? 1 : 0) + resolvedColumns.length;
  }, [selection, resolvedColumns, config]);

  // Table props
  const tableProps = useMemo(
    () => ({
      className: `table datanew dataTable no-footer ${className}`,
      columns: antdColumns,
      dataSource: filteredData,
      loading: false, // We handle loading ourselves
      rowKey: resolvedRowKey,
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
        emptyText: emptyText || config?.emptyState?.message || 'No data available',
      },
    }),
    [
      className,
      antdColumns,
      filteredData,
      resolvedRowKey,
      size,
      virtual,
      scroll,
      paginationConfig,
      onRowClick,
      emptyText,
      config?.emptyState?.message,
    ]
  );

  return (
    <div className={styles.dataTableWrapper} style={style}>
      {(resolvedSearchable || searchText) && (
        <div className={styles.tableTopData}>
          <div className={styles.searchRow}>
            <div className={styles.searchLeft} />
            <div className={styles.searchRight}>
              <label className={styles.searchLabel}>
                <input
                  type="search"
                  className={styles.searchInput}
                  placeholder={resolvedSearchPlaceholder}
                  value={searchText}
                  onChange={handleSearchChange}
                />
                {searchText && (
                  <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={handleClearSearch}
                    title="Clear search"
                  >
                    ×
                  </button>
                )}
              </label>
            </div>
          </div>
        </div>
      )}

      {config?.bulkActions && config.selection?.selectedIds?.length ? (
        <div className={styles.bulkActions}>
          {config.bulkActions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant === 'danger' ? 'danger' : 'secondary'}
              size="small"
              onClick={() =>
                action.onClick(
                  resolvedDataSource.filter((row: any) =>
                    config.selection?.selectedIds.includes(
                      String((row as any)[config.selection?.idField ?? 'id'])
                    )
                  )
                )
              }
            >
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}

      {!isLoading && filteredData.length === 0 && config?.emptyState?.action && (
        <div className={styles.emptyState}>
          <div className={styles.emptyMessage}>
            {config.emptyState.message ?? 'No data available'}
          </div>
          <Button
            variant="primary"
            size="small"
            onClick={config.emptyState.action.onClick}
          >
            {config.emptyState.action.label}
          </Button>
        </div>
      )}

      {isLoading ? (
        <TableSkeleton columns={visibleColumnsCount} rows={skeletonRows} />
      ) : !(config?.selection || selection) ? (
        <Table<T> {...tableProps} />
      ) : (
        <Table<T> {...tableProps} rowSelection={rowSelection} />
      )}
    </div>
  );
}

export default React.memo(DataTable) as typeof DataTable;
