import React, { FC, useMemo, useRef, useState } from 'react';
// components
import { Button, Input, InputRef, Space, Table } from 'antd';
// styles
import s from './styles.module.css';
// utils
import type { ColumnType, ExpandableConfig, FilterConfirmProps } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';
import type { IDataItem } from 'types';
import { SearchOutlined } from '@ant-design/icons';

// interface IDataModel extends Omit<IDataItem, 'id'> {
//   key: string;
// }
type DataIndex = keyof IDataItem;

const expandableConfig: ExpandableConfig<IDataItem> = {
  expandedRowRender: (record: IDataItem) => (
    <p className={s.subtotal}>{`Total: ${record.sum + record.qty} ${record.currency}`}</p>
  ),
  defaultExpandAllRows: false,
};

const dateConfig: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
};

type ProductTableProps = {
  data: IDataItem[];
};

export const ProductTable: FC<ProductTableProps> = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<DataIndex>();
  const searchInput = useRef<InputRef>(null);

  let tableData = useMemo(() => {
    return data.sort((a, b) => Date.parse(a.delivery_date) - Date.parse(b.delivery_date)) || [];
  }, [data]);

  function handleSearch(
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters: () => void) {
    clearFilters();
    setSearchText('');
  }

  function getColumnSearchProps(dataIndex: DataIndex): ColumnType<IDataItem> {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type='primary'
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              icon={<SearchOutlined />}
              size='small'
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters && handleReset(clearFilters);
                handleSearch(selectedKeys as string[], confirm, dataIndex);
              }}
              size='small'
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    };
  }

  let columns: ColumnsType<IDataItem> = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status'),
      width: 200,
    },
    {
      title: 'Sum',
      dataIndex: 'sum',
      key: 'sum',
      ...getColumnSearchProps('sum'),
      width: 200,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      ...getColumnSearchProps('qty'),
      width: 200,
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      ...getColumnSearchProps('volume'),
      width: 200,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      width: 200,
    },
    {
      title: 'Delivery Date',
      dataIndex: 'delivery_date',
      key: 'delivery-date',
      render(value, record, index) {
        return new Intl.DateTimeFormat('ru-RU', dateConfig).format(new Date(value));
      },
      ...getColumnSearchProps('delivery_date'),
      width: 200,
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      width: 100,
      ...getColumnSearchProps('currency'),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      rowKey='id'
      expandable={expandableConfig}
      summary={(data) => {
        return <div>2</div>;
      }}
      pagination={false}
      size='small'
      className={s.table}
      sticky={true}
      scroll={{ y: 600 }}
    ></Table>
  );
};
