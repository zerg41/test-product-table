import React, { FC } from 'react';
// components
import { Layout } from 'antd';
// styles
import 'antd/dist/reset.css';
import s from './styles.module.css';

const { Header, Content } = Layout;

const App: FC = () => {
  return (
    <Layout>
      <Header>
        <h2 className={s.title}>Product Table</h2>
      </Header>
      <Content></Content>
    </Layout>
  );
};

export default App;
