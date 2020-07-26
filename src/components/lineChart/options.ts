import { quotaName } from '@/assets/asssetsData';
import moment from 'moment';
import Item from 'antd/lib/list/Item';
export const getOptions = (data: any) => {
    let keyTitle = Object.keys(data).filter(Boolean);
    const chartsTitle: any[] = [];
    const ts = data.ts ? data.ts : [];
    const times =
        ts.length && ts.map((item: any) => moment(item.ts).format('mm:ss'));
    const series =
        keyTitle &&
        keyTitle.length > 0 &&
        keyTitle.map((item: any, key: number) => {
            const colors: any = [
                [
                    '#fe9a8b',
                    'rgba(137, 189, 27, 0.3)',
                    'rgba(137, 189, 27, 0)',
                    'rgb(137,189,27)',
                    'rgba(137,189,2,0.27)',
                ],
                [
                    '#9E87FF',
                    'rgba(0, 136, 212, 0.3)',
                    'rgba(0, 136, 212, 0)',
                    'rgb(0,136,212)',
                    'rgba(0,136,212,0.2)',
                ],
            ];

            if (item !== 'ts') {
                const chartsData = data[item];
                chartsTitle.push(quotaName[item]);
                return {
                    name: quotaName[item],
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        color: colors[key][0],
                    },
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: colors[key][1], // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.8,
                                        color: colors[key][2], // 100% 处的颜色
                                    },
                                ],
                                globalCoord: false, // 缺省为 false
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10,
                            },
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: colors[key][3],
                            borderColor: colors[key][4],
                            borderWidth: 12,
                        },
                    },
                    data: chartsData,
                };
            }
        });
    return {
        backgroundColor: '#fff',
        legend: {
            icon: 'circle',
            itemWidth: 9,
            itemHeight: 9,
            data: chartsTitle,
            left: 0,
            top: 8,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#57617B',
                },
            },
        },
        grid: {
            // 调整位置
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#999',
                    },
                },
                data: times,
            },
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B',
                    },
                    show: false,
                },
                axisLabel: {
                    // margin: 10,
                    textStyle: {
                        fontSize: 14,
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: '#f2f2f2',
                    },
                },
            },
        ],
        series: series,
    };
};
