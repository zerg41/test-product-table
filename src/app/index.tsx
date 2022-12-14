import React, { FC, useEffect, useState } from 'react';
// api
import { getDataRequest } from 'api';
// components
import { Layout, message } from 'antd';
import { ProductTable } from 'components';
// styles
import 'antd/dist/reset.css';
import s from './styles.module.css';
// utils
import { IDataItem } from 'types';

const { Header, Content } = Layout;

const App: FC = () => {
  let [data, setData] = useState<IDataItem[]>();
  let [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getDataRequest()
      .then((data) => setData(data))
      .catch((err) => {
        messageApi.error(err, 2);
      });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Layout>
      <Header>
        <h2 className={s.title}>Product Table</h2>
      </Header>
      <Content>
        <ProductTable data={data ?? []} />
      </Content>
    </Layout>
  );
};

export default App;
