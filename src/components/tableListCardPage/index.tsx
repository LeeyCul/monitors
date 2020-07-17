import React, { useState, FC } from 'react';
import { Divider, Table, Alert } from 'antd';
import Filters from './filter';
import styles from './style.less';
import { Common } from '@/types';

const TableListCardPage: FC<Common.TableListCardPage> = ({
    columns,
    dataSource,
    selectable,
    title,
    queryName,
    handleQuery,
    add,
    lotSizeDel,
}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys: any) => setSelectedRowKeys(selectedRowKeys),
    };

    return (
        <div className={styles.TableListCardPage}>
            <h4>{title || '通用标题'}</h4>
            <Filters
                queryName={queryName}
                handleQuery={handleQuery}
                add={add}
            />
            <Divider />
            <Alert
                style={{
                    display: selectedRowKeys.length > 0 ? 'block' : 'none',
                }}
                message={
                    <div className={styles.info}>
                        <span>
                            已选择
                            <label className={styles.number}>
                                &nbsp;{selectedRowKeys.length}&nbsp;
                            </label>
                            项
                        </span>
                        <label
                            className={styles.button}
                            onClick={() => lotSizeDel(selectedRowKeys)}
                        >
                            批量删除
                        </label>
                        <label
                            className={styles.button}
                            onClick={() => setSelectedRowKeys([])}
                        >
                            取消
                        </label>
                    </div>
                }
                type="info"
                showIcon
            />
            <Table
                dataSource={dataSource}
                columns={columns}
                rowClassName={(r, k) => (k % 2 === 0 ? '' : styles.odd)}
                rowSelection={selectable ? rowSelection : undefined}
                rowKey={rc => JSON.stringify(rc.age)}
            />
        </div>
    );
};

export default TableListCardPage;
