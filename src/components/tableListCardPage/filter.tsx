import React, { useState, memo } from 'react';
import { Input, Button } from 'antd';
import { Common } from '@/types';

function Filters({ queryName, handleQuery, add }: Common.TableFilter) {
    const [keyWords, setKeWords] = useState<string>('');
    return (
        <div style={styles.conainerBox}>
            <div>
                <span style={styles.title}>{queryName}：</span>
                <Input
                    value={keyWords}
                    onChange={e => setKeWords(e.target.value)}
                    style={{ width: 272 }}
                />
                <Button
                    type="primary"
                    style={styles.marginL}
                    onClick={() => {
                        handleQuery(keyWords);
                    }}
                >
                    查询
                </Button>
            </div>
            <Button type="primary" onClick={add}>
                新建
            </Button>
        </div>
    );
}

const styles = {
    conainerBox: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '14px',
        fontFamily: 'PingFangSC-Regular,PingFang SC',
        fontWeight: 500,
        color: 'rgba(0,0,0,0.85)',
        linHeight: '22px',
    },
    marginL: {
        marginLeft: '10px',
    },
};

export default memo(Filters);
