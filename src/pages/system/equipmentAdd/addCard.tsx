import React from 'react';
import { Icon } from 'antd';
import styles from './addCard.less';

function AddCard() {
    const SigleItem = ({ title }: { title: string }) => {
        return (
            <div className={styles.sigle_item}>
                <span className={styles.text}>{title}</span>
                <span className={styles.addText}>
                    <Icon type="plus-circle" />
                    &nbsp; 添加
                </span>
            </div>
        );
    };
    return (
        <div className={styles.conainer}>
            <h4>指标添加</h4>
            {[
                '二氧化碳',
                '二氧化硫折算',
                '废气流量',
                '烟气流速',
                '烟气流速',
            ].map(item => (
                <SigleItem title={item} />
            ))}
        </div>
    );
}

export default AddCard;
