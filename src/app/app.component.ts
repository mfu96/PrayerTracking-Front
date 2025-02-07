import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { UserData } from './providers/user-data';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit{


  public appPages = [
    { title: 'Prayer Time', url: '/tabs/prayer-time', icon: 'assets/icon/prayer-time.svg', type:'svg' },
    { title: 'Mosque', url: '/tabs/mosque', icon: 'assets/icon/mosque.svg', type:'svg' },
    { title: 'Tab 3', url: '/tabs/tab3', icon: 'square' },
    { title: 'Prayer', url: '/tabs/prayer', icon: 'square' },
    { title: 'Mosque', url: '/tabs/mosque', icon: 'ellipse' },
    { title: 'Employee', url: '/tabs/employees', icon: 'ellipse' },

  ];

  
  loggedIn = false;
  dark = false;

  constructor(
    private storage: Storage,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private platform: Platform,
    private userData: UserData,
    private router: Router,
    private menu: MenuController,








  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    await this.storage.create();
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.versionUpdates.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        StatusBar.hide();
        SplashScreen.hide();
      }
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/app/tabs/schedule');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }
}
