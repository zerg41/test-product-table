import React, { FC } from 'react';
// components
import { Button, Input, Space } from 'antd';
// styles
import { SearchOutlined } from '@ant-design/icons';
// utils
import type { FilterConfirmProps, FilterDropdownProps } from 'antd/es/table/interface';
import type { DataIndex } from 'types';

type TableFilterProps = {
  dataIndex: DataIndex;
  setSearchText: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSearchedColumn: React.Dispatch<React.SetStateAction<DataIndex | undefined>>;
} & FilterDropdownProps;

const Filter: FC<TableFilterProps> = ({
  dataIndex,
  setSearchText,
  setSearchedColumn,
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => {
  function handleFilterSearch(
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleFilterReset(clearFilters: () => void) {
    clearFilters();
    setSearchText('');
  }

  return (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleFilterSearch(selectedKeys as string[], confirm, dataIndex)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type='primary'
          onClick={() => handleFilterSearch(selectedKeys as string[], confirm, dataIndex)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            clearFilters && handleFilterReset(clearFilters);
            handleFilterSearch(selectedKeys as string[], confirm, dataIndex);
          }}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Space>
    </div>
  );
};

export default Filter;
