import React, { FC, useEffect, useState } from 'react';
// api
import { getDocuments } from 'api';
// components
import { Layout, message } from 'antd';
import { ProductTable } from 'components';
// styles
import 'antd/dist/reset.css';
import s from './styles.module.css';
// utils
import { IProduct } from 'types';

const { Header, Content } = Layout;

const App: FC = () => {
  let [messageApi, messageContext] = message.useMessage();
  let [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const MESSAGE_KEY = 'fetch';

    messageApi.open({ key: MESSAGE_KEY, type: 'loading', content: 'Fetch data...' });

    let documents1 = getDocuments(1);
    let documents2 = getDocuments(2);

    // Simulation of server response delay
    setTimeout(() => {
      Promise.all([documents1, documents2])
        .then(([data1, data2]) => {
          setProducts([...data1, ...data2]);
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
    }, 2000);
  }, []);

  return (
    <Layout style={{ height: '100vh' }}>
      {messageContext}
      <Header>
        <h2 className={s.title}>Product Table</h2>
      </Header>
      <Content>
        <ProductTable data={products} />
      </Content>
    </Layout>
  );
};

export default App;
