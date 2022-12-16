import React, { FC, useState } from 'react';
// components
import { Table } from 'antd';
import Filter from './filter';
import Footer from './footer';
// styles
import { SearchOutlined } from '@ant-design/icons';
import s from './styles.module.css';
// utils
import type { ColumnType, ExpandableConfig } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';
import type { DataIndex, IProduct } from 'types';

const expandableConfig: ExpandableConfig<IProduct> = {
  expandedRowRender: (record: IProduct) => (
    <p className={s.subtotalRow}>{`Total: ${record.sum + record.qty} ${record.currency}`}</p>
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
  data: IProduct[];
};

export const ProductTable: FC<ProductTableProps> = ({ data }) => {
  let [searchText, setSearchText] = useState<string>();
  let [searchedColumn, setSearchedColumn] = useState<DataIndex>();
  let [selectedItems, setSelectedItems] = useState<IProduct['id'][]>([]);

  let tableData = data.sort((a, b) => Date.parse(a.delivery_date) - Date.parse(b.delivery_date));
  let tableColumns: ColumnsType<IProduct> = [
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
      title: 'Quantity',
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
      ...getColumnSearchProps('currency'),
      width: 100,
    },
  ];

  function handleSelect(selectedRowKeys: React.Key[]) {
    let selectedItemIds = selectedRowKeys.map((key) => String(key));
    setSelectedItems(selectedItemIds);
  }

  function getColumnSearchProps(dataIndex: DataIndex): ColumnType<IProduct> {
    return {
      filterDropdown: (props) => (
        <Filter
          dataIndex={dataIndex}
          setSearchText={setSearchText}
          setSearchedColumn={setSearchedColumn}
          {...props}
        />
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
    };
  }

  return (
    <Table
      columns={tableColumns}
      dataSource={tableData}
      rowKey='id'
      expandable={expandableConfig}
      pagination={false}
      size='small'
      className={s.table}
      sticky={true}
      scroll={{ y: 530 }}
      rowSelection={{
        selectedRowKeys: selectedItems,
        onChange: handleSelect,
      }}
      footer={(records) => <Footer data={records} selectedItemIds={selectedItems} />}
    />
  );
};
