// const ws = new WebSocket('wss://echo.websocket.org/');

// export function listenWebSocket(cb: (val: any) => void) {
//     let token = localStorage.getItem('token');
//     let entityId = '974e0250-c665-11ea-b841-5372d88158bc';

//     if (entityId === 'YOUR_DEVICE_ID') {
//         alert('Invalid device id!');
//         ws.close();
//     }

//     if (token === 'YOUR_JWT_TOKEN') {
//         alert('Invalid JWT token!');
//         ws.close();
//     }
//     ws.onopen = event => {
//         let object = {
//             tsSubCmds: [
//                 {
//                     entityType: 'DEVICE',
//                     entityId: entityId,
//                     scope: 'LATEST_TELEMETRY',
//                     cmdId: 10,
//                 },
//             ],
//             historyCmds: [],
//             attrSubCmds: [],
//         };
//         let data = JSON.stringify(object);
//         ws.send(data);
//     };

//     // ws.onclose = event => {
//     //     console.log('disconnected');
//     // };

//     // ws.onerror = event => {
//     //     console.log(event);
//     // };

//     ws.onmessage = event => {
//         console.log(111, event.data);
//         cb(event.data);
//     };
// }

export function WebSocketAPIExample(cb: (val: any, socket?: any) => void) {
    var token = localStorage.getItem('token');
    var entityId = '974e0250-c665-11ea-b841-5372d88158bc';
    var webSocket = new WebSocket(
        'ws://hwy.feelbang.com:8080/api/ws/plugins/telemetry?token=' + token,
    );

    if (entityId === 'YOUR_DEVICE_ID') {
        alert('Invalid device id!');
        webSocket.close();
    }

    if (token === 'YOUR_JWT_TOKEN') {
        alert('Invalid JWT token!');
        webSocket.close();
    }

    webSocket.onopen = function() {
        var object = {
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
        var data = JSON.stringify(object);
        webSocket.send(data);
    };

    webSocket.onmessage = async function(event) {
        var received_msg = event.data;
        cb(received_msg, webSocket);
    };

    webSocket.onclose = function(event) {
        console.log('Connection is closed!');
    };
}
