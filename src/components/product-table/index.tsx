import React, { FC, useMemo } from 'react';
// components
import { Table } from 'antd';
// utils
import { IDataItem } from '../../types';

type ProductTableProps = {
  data: IDataItem[];
};

export const ProductTable: FC<ProductTableProps> = ({ data }) => {
  let tableData = useMemo(() => {
    return data || [];
  }, [data]);

  return <Table dataSource={tableData}></Table>;
};
