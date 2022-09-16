// 断线原因：1、websorket超时没有消息自动断开连接

// 前端解决方案：心跳检测
var heartCheck = {
  timeout: 30000, //30秒发一次心跳
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function(){
      clearTimeout(this.timeoutObj);
      clearTimeout(this.serverTimeoutObj);
      return this;
  },
  start: function(){
      var self = this;
      this.timeoutObj = setTimeout(function(){
          //这里发送一个心跳，后端收到后，返回一个心跳消息，
          //onmessage拿到返回的心跳就说明连接正常
          ws.send("ping");
          console.log("ping!")

          self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
              ws.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
          }, self.timeout);
      }, this.timeout);
  }
}

// 断线原因：2、websocket异常包括服务端出现中断，交互切屏等客户端中断
var ws = new ReconnectingWebSocket(url);
// 断线重连：
function reconnectSocket(){
    if ('ws' in window) {
        ws = new ReconnectingWebSocket(url);
    } else if ('MozWebSocket' in window) {
       ws = new MozWebSocket(url);
    } else {
      ws = new SockJS(url);
    }
}



function onLineCheck() {
  Offline.check();
  console.log(Offline.state,'---Offline.state');
  console.log(this.socketStatus,'---this.socketStatus');

  if(!this.socketStatus){
      console.log('网络连接已断开！');
      if(Offline.state === 'up' && websocket.reconnectAttempts > websocket.maxReconnectInterval){
          window.location.reload();
      }
      reconnectSocket();
  }else{
      console.log('网络连接成功！');
      websocket.send("heartBeat");
  }
}

// 使用：在websocket断开链接时调用网络中断监测
 websocket.onclose = () => {
  onLineCheck();
};