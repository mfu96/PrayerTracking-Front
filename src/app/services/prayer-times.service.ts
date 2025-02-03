import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../interfaces/responses/listResponseModel';
import { PrayerTimeDetailDto } from '../interfaces/entities/prayerTimeDetailDto';

@Injectable({
  providedIn: 'root'
})
export class PrayerTimesService {
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
