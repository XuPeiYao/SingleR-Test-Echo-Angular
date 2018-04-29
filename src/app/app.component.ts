import { Component, OnInit } from '@angular/core';
import * as signalr from '@aspnet/signalr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private hubConnection: signalr.HubConnection;

  message: string;


  ngOnInit() {
    this.hubConnection = new signalr.HubConnection('/echo');

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started!');
        this.hubConnection.on('ReceiveMessage', (message) => { // 註冊本地事件
          alert(message);
        });
      })
      .catch(err => console.log('Error while establishing connection :('));

  }

  submit() {
    this.hubConnection.send('SendMessage', this.message); // 調用EchoHub的SendMessage方法
    this.message = '';
  }
}
