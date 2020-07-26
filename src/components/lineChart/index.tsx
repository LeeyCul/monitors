import React from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './style.less';
import { getOptions } from './options';
import { Common } from '@/types';

function index({ style, title, data }: Common.LineChart) {
    return (
        <div className={styles.line_chartBox}>
            <span className={styles.title}>{title}</span>
            <ReactEcharts
                option={getOptions(data)}
                style={style}
                notMerge={true}
            />
        </div>
    );
}

export default index;
