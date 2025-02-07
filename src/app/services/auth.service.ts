import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/entities/user';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoginModel } from '../interfaces/entities/loginModel';
import { SingleResponseModel } from '../interfaces/responses/singleResponseModel';
import { TokenModel } from '../interfaces/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl =environment.apiUrl;
  user!: User;

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    /* Diğer servisler */
  ) {
    this.init();
  }
  
  async init() {
    await this.storage.create();
  }


  // login(loginModel: LoginModel) {
  //   return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'auth/login', loginModel)
  //     .pipe(
  //       tap(async (response) => {
  //         await this.storage.set('token', response.data.token);
  //         await this.storage.set('expiration', response.data.expiration);
  //       })
  //     );
  // }
  
}
