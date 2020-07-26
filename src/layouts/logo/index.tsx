import React, { memo } from 'react';
import { Icon } from 'antd';

function Logo() {
    return (
        <div style={styles.title}>
            <Icon type="pic-left" />
            &nbsp; 园区环境监测系统
        </div>
    );
}

const styles = {
    title: {
        width: '100%',
        height: '100%',
        fontSize: '18px',
        fontFamily: 'PingFangSC-Semibold,PingFang SC',
        fontWeight: 600,
        color: 'rgba(255,255,255,1)',
        background: '#3A4A68',
        lineHeight: '50px',
        textAlin: 'right',
        padding: '0 10px',
    },
};

export default memo(Logo);
