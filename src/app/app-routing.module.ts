import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'prayer-time',
    loadChildren: () => import('./pages/prayer-time/prayer-time.module').then( m => m.PrayerTimePageModule)
  },
  {
    path: 'mosque',
    loadChildren: () => import('./pages/mosque/mosque.module').then( m => m.MosquePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
