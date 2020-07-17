export const getOptions = () => {
    return {
        backgroundColor: '#fff',
        legend: {
            icon: 'circle',
            itemWidth: 9,
            itemHeight: 9,
            data: ['移动', '电信'],
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
                data: [
                    '13:00',
                    '13:05',
                    '13:10',
                    '13:15',
                    '13:20',
                    '13:25',
                    '13:30',
                    '13:35',
                ],
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
        series: [
            {
                name: '移动',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    color: '#fe9a8b',
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
                                    color: 'rgba(137, 189, 27, 0.3)', // 0% 处的颜色
                                },
                                {
                                    offset: 0.8,
                                    color: 'rgba(137, 189, 27, 0)', // 100% 处的颜色
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
                        color: 'rgb(137,189,27)',
                        borderColor: 'rgba(137,189,2,0.27)',
                        borderWidth: 12,
                    },
                },
                data: [220, 182, 191, 134, 150, 120, 110, 125],
            },
            {
                name: '电信',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 6,
                showSymbol: false,
                lineStyle: {
                    color: '#9E87FF',
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
                                    color: 'rgba(0, 136, 212, 0.3)', // 0% 处的颜色
                                },
                                {
                                    offset: 0.8,
                                    color: 'rgba(0, 136, 212, 0)', // 100% 处的颜色
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
                        color: 'rgb(0,136,212)',
                        borderColor: 'rgba(0,136,212,0.2)',
                        borderWidth: 12,
                    },
                },
                data: [120, 110, 125, 145, 122, 165, 122, 220],
            },
        ],
    };
};
