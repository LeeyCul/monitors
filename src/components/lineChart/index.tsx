import React from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './style.less';
import { getOptions } from './options';
import { Common } from '@/types';

function index({ style, title }: Common.LineChart) {
    return (
        <div className={styles.line_chartBox}>
            <span className={styles.title}>{title}</span>
            <ReactEcharts option={getOptions()} style={style} />
        </div>
    );
}

export default index;
