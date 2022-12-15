import React, { FC, useEffect, useState } from 'react';
// api
import { getDocumentsData } from 'api';
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
    const MESSAGE_KEY = 'fetch';

    messageApi.open({ key: MESSAGE_KEY, type: 'loading', content: 'Fetch data...' });

    let documents1 = getDocumentsData(1);
    let documents2 = getDocumentsData(2);

    Promise.all([documents1, documents2])
      .then(([data1, data2]) => {
        setData([...data1, ...data2]);
        messageApi.open({
          key: MESSAGE_KEY,
          type: 'success',
          content: 'Data loaded!',
          duration: 2,
        });
      })
      .catch((err) => {
        messageApi.open({
          key: MESSAGE_KEY,
          type: 'error',
          content: 'Fetch failed!',
          duration: 2,
        });
      });
  }, []);

  return (
    <Layout style={{ height: '100vh' }}>
      {contextHolder}
      <Header>
        <h2 className={s.title}>Product Table</h2>
      </Header>
      <Content style={{ display: 'flex', justifyContent: 'center' }}>
        <ProductTable data={data ?? []} />
      </Content>
    </Layout>
  );
};

export default App;
