import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../model/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private urlEndPoint: string = 'http://localhost:4001/api/orders';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.urlEndPoint);
  }

  getOrderById(idOrder: string): Observable<Order> {
    return this.http.get<Order>(this.urlEndPoint + '/' + idOrder);
  }

  createOrder(): Observable<Order> {
    return this.http.post<Order>(this.urlEndPoint,  {headers: this.httpHeaders});
  }

  addDish(idOrder: string, dishName: string, dishValue: number): Observable<Order> {
    const params = new HttpParams()
      .set('dishName', dishName)
      .set('dishValue', dishValue.toString()); 

    return this.http.patch<Order>(this.urlEndPoint + "/dishes/" + idOrder, { headers: this.httpHeaders }, { params });
  }

  calculateOrderTotalPrice(idOrder: string): Observable<number> {
    return this.http.post<number>(this.urlEndPoint + "/" + idOrder, {});
  }
}
