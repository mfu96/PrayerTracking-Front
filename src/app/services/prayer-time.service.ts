import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../interfaces/responses/listResponseModel';
import { Observable } from 'rxjs';
import { PrayerTimeDetailDto } from '../interfaces/entities/prayerTimeDetailDto';

@Injectable({
  providedIn: 'root'
})
export class PrayerTimeService {

  apiUrl=environment.apiUrl;


  constructor(private httpClient: HttpClient) {}

  getPrayerByDetail(paryerId:number):Observable<ListResponseModel<PrayerTimeDetailDto>>{

    let newPath = this.apiUrl + 'prayertimes/getdetails?prayerId=' +paryerId;

  
    return this.httpClient.get<ListResponseModel<PrayerTimeDetailDto>>(newPath);
  }  
  
  getPrayerDetails():Observable<ListResponseModel<PrayerTimeDetailDto>>{

    let newPath = this.apiUrl + 'prayertimes/getdetails' ;

  
    return this.httpClient.get<ListResponseModel<PrayerTimeDetailDto>>(newPath);
  }


}
