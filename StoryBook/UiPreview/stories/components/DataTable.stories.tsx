import type { Meta, StoryObj } from '@storybook/react';
import React, { useMemo } from 'react';
import { DataTable } from '@consumer/components/DataTable';

type DemoRow = {
  id: string;
  name: string;
  role: string;
  age: number;
};

const meta: Meta<typeof DataTable<DemoRow>> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const data = useMemo<DemoRow[]>(
      () => [
        { id: '1', name: 'Alex Johnson', role: 'Admin', age: 31 },
        { id: '2', name: 'Maria Garcia', role: 'Manager', age: 28 },
        { id: '3', name: 'Sam Lee', role: 'User', age: 24 },
      ],
      []
    );

    const columns = useMemo(
      () => [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
      ],
      []
    );

    return (
      <div style={{ maxWidth: 900 }}>
        <DataTable<DemoRow>
          columns={columns}
          dataSource={data}
          rowKey="id"
          searchable
          selection={false}
        />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const data = useMemo<DemoRow[]>(
      () => [
        { id: '1', name: 'Alex Johnson', role: 'Admin', age: 31 },
        { id: '2', name: 'Maria Garcia', role: 'Manager', age: 28 },
        { id: '3', name: 'Sam Lee', role: 'User', age: 24 },
      ],
      []
    );

    const columns = useMemo(
      () => [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
      ],
      []
    );

    return (
      <div style={{ maxWidth: 900 }}>
        <DataTable<DemoRow>
          columns={columns}
          dataSource={data}
          rowKey="id"
          selection
          onSelectionChange={(keys) => {
            // eslint-disable-next-line no-console
            console.log('Selected keys:', keys);
          }}
        />
      </div>
    );
  },
};

export const ConfigDriven: Story = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <DataTable
        config={{
          columns: [
            { id: 'name', label: 'Name', accessor: 'name' },
            { id: 'role', label: 'Role', accessor: 'role' },
            { id: 'age', label: 'Age', accessor: 'age' },
          ],
          data: [
            { id: '1', name: 'Alex Johnson', role: 'Admin', age: 31 },
            { id: '2', name: 'Maria Garcia', role: 'Manager', age: 28 },
            { id: '3', name: 'Sam Lee', role: 'User', age: 24 },
          ],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            pageSize: 10,
            totalItems: 3,
            onPageChange: () => undefined,
          },
        }}
      />
    </div>
  ),
};

