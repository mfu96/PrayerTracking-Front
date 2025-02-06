import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  imports: [
    CommonModule,
    IonicModule // IonicModule'ü buraya ekliyoruz
  ],
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements AfterViewInit {
  scanning = false;

  constructor(
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.startScan();
  }

  async startScan() {
    try {
      // Kamera izni iste
      const permission = await BarcodeScanner.checkPermission({ force: true });
      if (!permission.granted) {
        console.log("Kamera izni verilmedi.");
        return;
      }

      this.scanning = true;

      // Tarama işlemini başlat
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        console.log("Taranan barkod içeriği:", result.content);
        this.processScannedData(result.content);
      } else {
        console.log("Herhangi bir içerik bulunamadı.");
      }
    } catch (error) {
      console.error("Tarama sırasında hata:", error);
    } finally {
      await BarcodeScanner.showBackground(); // Arkaplanı geri getir

      this.router.navigate(['/'])
      this.scanning = false;
      

      // Tarama işlemi bittiğinde gerekirse ek işlemler yapabilirsiniz
    }
  }

  processScannedData(scannedData: string) {
    // Barkod içeriğine göre işlem yap
    console.log(`İşlenen QR bilgisi: ${scannedData}`);
    // Örneğin, taranan veriye göre bir sayfaya yönlendirme yapabilirsiniz
    // this.router.navigate(['/sonuc', { data: scannedData }]);
  }
}