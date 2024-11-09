import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Waste } from '../../model/waste/Waste';

@Injectable({
  providedIn: 'root'
})
export class WasteService {

  private urlEndPoint: string = "http://localhost:8080/api/v1/wastes";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) {}

  getAllWastes(): Observable<Waste[]> {
    return this.http.get<Waste[]>(`${this.urlEndPoint}/`, { headers: this.httpHeaders });
  }

  getWasteByCause(cause: string): Observable<Waste[]> {
    return this.http.get<Waste[]>(`${this.urlEndPoint}/cause/${cause}`, { headers: this.httpHeaders });
  }

  getWasteByProductId(productId: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/product/${productId}`, { headers: this.httpHeaders });
  }

  getTotalWasteByProductId(productId: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/total-waste/${productId}`, { headers: this.httpHeaders });
  }

  suggestReductionMeasures(wasteId: string): Observable<string> {
    return this.http.get<string>(`${this.urlEndPoint}/suggestions/${wasteId}`, { headers: this.httpHeaders });
  }

  createWaste(waste: Waste): Observable<Waste> {
    return this.http.post<Waste>(`${this.urlEndPoint}`, waste, { headers: this.httpHeaders });
  }

  updateWaste(waste: Waste): Observable<Waste> {
    return this.http.put<Waste>(`${this.urlEndPoint}`, waste, { headers: this.httpHeaders });
  }

  registerAdditionalWaste(wasteId: string, quantity: number): Observable<Waste> {
    return this.http.patch<Waste>(`${this.urlEndPoint}/identifier/${wasteId}/quantity/${quantity}`, {}, { headers: this.httpHeaders });
  }
}
