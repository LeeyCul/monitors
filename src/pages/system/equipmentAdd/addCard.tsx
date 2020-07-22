import React from 'react';
import { Icon } from 'antd';
import styles from './addCard.less';
import { quotaName } from '@/assets/asssetsData';
import { EquipmentAdd } from '@/types';

function AddCard({ showModa }: EquipmentAdd.AddCard) {
    const SigleItem = ({ trem }: any) => {
        return (
            <div className={styles.sigle_item}>
                <span className={styles.text}>{quotaName[trem]}</span>
                <span
                    className={styles.addText}
                    onClick={() => {
                        showModa(trem);
                    }}
                >
                    <Icon type="plus-circle" />
                    &nbsp; 添加
                </span>
            </div>
        );
    };
    return (
        <div className={styles.conainer}>
            <h4>指标添加</h4>
            {Object.keys(quotaName).map(key => {
                return <SigleItem key={key} trem={key} />;
            })}
        </div>
    );
}

export default AddCard;
