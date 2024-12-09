import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly panelOpenState = signal(false);

  handleConnect() {
    console.log('Connecting...');
  }
}
