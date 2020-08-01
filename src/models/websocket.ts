let webSocket: any = null;
function initWebSocket(entityId: string, callback: (data: any) => void) {
    var token = sessionStorage.getItem('token');
    webSocket = new WebSocket(
        'ws://hwy.feelbang.com:8080/api/ws/plugins/telemetry?token=' + token,
    ); //创建socket对象

    //打开
    webSocket.onopen = function() {
        let object = {
            tsSubCmds: [
                {
                    entityType: 'DEVICE',
                    entityId: entityId,
                    scope: 'LATEST_TELEMETRY',
                    cmdId: 10,
                },
            ],
            historyCmds: [],
            attrSubCmds: [],
        };
        let data = JSON.stringify(object);
        webSocket.send(data);
    };

    //收信
    webSocket.onmessage = function(e: any) {
        const data = e.data;
        callback(data);
    };

    //关闭
    webSocket.onclose = function() {
        webSocketClose();
    };

    //连接发生错误的回调方法
    webSocket.onerror = function() {
        callback('err');
        console.log('WebSocket连接发生错误');
    };
}
// 关闭socket
function webSocketClose() {
    webSocket.close();
}

export { webSocketClose, initWebSocket };
