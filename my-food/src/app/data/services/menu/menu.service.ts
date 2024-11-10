import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../../model/menu/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private urlEndPoint: string = 'http://localhost:4001/api/orders';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getMenus(): Observable<Menu[]>{
    return this.http.get<Menu[]>(this.urlEndPoint);
  }

  getMenuById(idMenu: string): Observable<Menu> {
    return this.http.get<Menu>(this.urlEndPoint + '/' + idMenu);
  }

  createMenu(): Observable<Menu> {
    return this.http.post<Menu>(this.urlEndPoint,  {headers: this.httpHeaders});
  }

  addDish(idMenu: string, dishName: string, dishValue: number): Observable<Menu> {
    const params = new HttpParams()
      .set('dishName', dishName)
      .set('dishValue', dishValue.toString()); 

    return this.http.patch<Menu>(this.urlEndPoint + "/dishes/" + idMenu, { headers: this.httpHeaders }, { params });
  }


}
