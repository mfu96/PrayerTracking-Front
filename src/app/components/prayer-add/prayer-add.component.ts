import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrayerTimeService } from 'src/app/services/prayer-time.service';

@Component({
  selector: 'app-prayer-add',
  templateUrl: './prayer-add.component.html',
  styleUrls: ['./prayer-add.component.scss'],
})
export class PrayerAddComponent implements OnInit {
  prayerData: any;

  constructor(
  private router: Router,
  private prayerService: PrayerTimeService) {
    const navigation = this.router.getCurrentNavigation();
    this.prayerData = navigation?.extras.state?.['prayerData'];
  }

  ngOnInit() {
    if (this.prayerData) {
      // Namaz vaktini seçip ekleme işlemine geç
      this.selectPrayerName();
    } else {
      console.error('Namaz verisi alınamadı.');
      this.router.navigate(['/']);
    }
  }

  async selectPrayerName() {
    // Namaz vakitleri listesini tanımla
    const prayerNames = ['Sabah', 'Öğle', 'İkindi', 'Akşam', 'Yatsı', 'Diğer'];

    // Kullanıcıya namaz vaktini seçmesi için bir alert göster
    const alert = document.createElement('ion-alert');
    alert.header = 'Lütfen Namaz Vaktini Seçiniz';
    alert.inputs = prayerNames.map(name => ({
      name,
      type: 'radio',
      label: name,
      value: name
    }));
    alert.buttons = [
      {
        text: 'İptal',
        role: 'cancel',
        handler: () => {
          this.router.navigate(['/']);
        }
      },
      {
        text: 'Tamam',
        handler: (data) => {
          this.prayerData.prayerName = data;
          this.addPrayerTime();
        }
      }
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  addPrayerTime() {
    // POST isteği ile namaz vaktini ekle
    this.prayerService.addPrayerTime(this.prayerData).subscribe(
      response => {
        console.log('Vakit eklendi:', response);
        // İsteğe bağlı olarak bir toast bildirimi göster
        this.showToast( response.message);
        // Anasayfaya yönlendir
        this.router.navigate(['/']);
      },
      error => {
        console.error('Namaz vakti eklenirken hata oluştu:', error.message);
        this.showToast('Namaz vakti eklenirken bir hata oluştu.');
      }
    );
  }

  async showToast(message: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 2000;
    document.body.appendChild(toast);
    await toast.present();
  }
}