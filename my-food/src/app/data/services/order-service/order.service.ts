import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../model/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private urlEndPoint: string = 'http://localhost:4001/api/orders';
 

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.urlEndPoint);
  }

  getOrderById(idOrder: string): Observable<Order> {
    return this.http.get<Order>(this.urlEndPoint + '/' + idOrder);
  }

}
