import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../model/inventory/Product';
import { ApiError } from '../../model/inventory/ApiError';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private urlEndPoint: string = "http://localhost:8080/api/v1/products";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  updateProduct(product:Product):Observable<Product>{
    return this.http.put<Product>(this.urlEndPoint, product);
  }

  createProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(this.urlEndPoint, product);
  }

  checkInventory(demand:Product[]):Observable<Product[]>{
    return this.http.post<Product[]>(this.urlEndPoint+"/avalible/inventory", demand);
  }

  checkExpiredState(id:string):Observable<Product>{
    return this.http.patch<Product>(`${this.urlEndPoint}/identifier/${id}`, null);
  }
  changeName(id:string, name:string):Observable<Product>{
    return this.http.patch<Product>(`${this.urlEndPoint}/identifier/${id}/name/${name}`, null);
  }
  increaseStock(id:string, amount:number):Observable<Product>{
    return this.http.patch<Product>(`${this.urlEndPoint}/identifier/${id}/amount/${amount}`, null);
  }
  decreaseStock(id:string, amount:number):Observable<Product>{
    return this.http.patch<Product>(`${this.urlEndPoint}/amount/${amount}/identifier/${id}`, null);
  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.urlEndPoint)
  }

  updateStatus():Observable<Product[]>{
    return this.http.patch<Product[]>(this.urlEndPoint,null);
  }

  getProductsNearToExpire():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.urlEndPoint}/near/expire`);
  }
  getProductsExpired():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.urlEndPoint}/expired`);
  }
  getProductsWithExistences():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.urlEndPoint}/existences`);
  }
  getProductsWithoutExistences():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.urlEndPoint}/existences/any`);
  }

}
