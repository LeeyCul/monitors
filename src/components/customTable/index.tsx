import React, { useState, useEffect } from 'react';
import { Pagination, Empty, Spin } from 'antd';
import moment from 'moment';
import { groupBy } from '@/utils/util';
import styles from './style.less';
import { Common } from '@/types';

function CustomTable({ columns, data = {}, loading }: Common.CustomTables) {
    const [current, setCurrent] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [pageSize, setpageSize] = useState<number>(15);
    const TableItem = ({ dataSource, title, other }: any) => {
        return (
            <div className={styles.sigleItem}>
                <div className={styles.title}>{title}</div>
                <div className={styles.viewBox}>
                    {dataSource && dataSource.length > 0
                        ? groupBy(dataSource, pageSize)[current - 1].map(
                              (item: any, index: number) => {
                                  const { value } = item;
                                  return other ? (
                                      <div
                                          key={index}
                                          className={styles.viewItem}
                                      >
                                          {moment(item['ts']).format(
                                              'YYYY-MM-DD h:mm:ss',
                                          ) || '暂无数据'}
                                      </div>
                                  ) : (
                                      <div
                                          key={index}
                                          className={styles.viewItem}
                                      >
                                          {value || '暂无数据'}
                                      </div>
                                  );
                              },
                          )
                        : null}
                </div>
            </div>
        );
    };
    useEffect(() => {
        const fristKey = Object.keys(data)[0];
        const list = data[fristKey] ? data[fristKey] : 0;
        setTotal(list.length);
    }, [total, data]);

    return (
        <div className={styles.customTable}>
            <Spin spinning={loading} className={styles.loading} />
            <div className={styles.view}>
                {Object.keys(data).length > 0 ? (
                    columns.map((item: any, index: number) => {
                        const { title, dataIndex, key, other } = item;
                        return (
                            <TableItem
                                dataSource={data[dataIndex]}
                                title={title}
                                key={key || index}
                                other={other}
                            />
                        );
                    })
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </div>
            {Object.keys(data).length > 0 ? (
                <div className={styles.pagination}>
                    <Pagination
                        current={current}
                        onChange={page => setCurrent(page)}
                        size="small"
                        total={total}
                        pageSize={pageSize}
                    />
                </div>
            ) : null}
        </div>
    );
}

export default CustomTable;
