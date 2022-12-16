import React, { FC } from 'react';
// api
import { postCancel } from 'api';
// components
import { Button, Modal, notification } from 'antd';
// styles
import { ExclamationCircleFilled } from '@ant-design/icons';
import s from './styles.module.css';
// utils
import type { IProduct } from 'types';

const { confirm } = Modal;

type TableFooterProps = {
  data: readonly IProduct[];
  selectedItemIds: IProduct['id'][];
};

const Footer: FC<TableFooterProps> = ({ data, selectedItemIds }) => {
  let isCancelDisabled = selectedItemIds.length ? false : true;
  let [notificationApi, notificationContext] = notification.useNotification();

  let totalVolume = 0;
  let totalQuantity = 0;

  data.forEach((item) => {
    totalVolume += item.volume;
    totalQuantity += item.qty;
  });

  function handleCancelItems(items: readonly IProduct[], selectedIds: IProduct['id'][]) {
    let selectedItems = items.filter((item) => selectedIds.includes(item.id));

    confirm({
      title: 'Do you want to cancel these items?',
      content: selectedItems.map((item) => item.name).join(', '),
      icon: <ExclamationCircleFilled />,
      okText: 'Accept',
      cancelText: 'Decline',
      onOk() {
        postCancel(selectedIds)
          .then((data) => {
            notificationApi.success({
              message: 'Cancel succeeded',
              description: data.cancelledItems.join(', '),
              duration: 2,
            });
          })
          .catch((err) => {
            notificationApi.error({
              message: 'Cancel failed',
              description: err.message,
              duration: 2,
            });
          });
      },
    });
  }

  return (
    <footer className={s.footer}>
      {notificationContext}
      <div className={s.footerItemContainer}>
        <p className={s.footerItem}>
          Total Volume: <span className={s.footerItemValue}>{totalVolume}</span>
        </p>
        <p className={s.footerItem}>
          Total Quantity: <span className={s.footerItemValue}>{totalQuantity}</span>
        </p>
      </div>
      <Button
        type='primary'
        onClick={() => handleCancelItems(data, selectedItemIds)}
        disabled={isCancelDisabled}
      >
        Cancel Selected
      </Button>
    </footer>
  );
};

export default Footer;
