import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {}

  public appPages = [
    { title: 'Prayer Time', url: '/tabs/prayer-time', icon: 'assets/icon/prayer-time.svg', type:'svg' },
    { title: 'Mosque', url: '/tabs/mosque', icon: 'assets/icon/mosque.svg', type:'svg' },
    { title: 'Tab 3', url: '/tabs/tab3', icon: 'square' },
    { title: 'Prayer', url: '/tabs/prayer', icon: 'square' },
    { title: 'Mosque', url: '/tabs/mosque', icon: 'ellipse' },
    { title: 'Employee', url: '/tabs/employees', icon: 'ellipse' },

  ];
}
