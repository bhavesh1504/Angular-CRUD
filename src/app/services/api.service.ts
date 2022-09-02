import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:3000/productslist/';
  constructor(private http : HttpClient) { }

  postProducts(data:any){
    return this.http.post<any>(this.url,data);
}

  getProducts(){
    return this.http.get<any>(this.url);
  }
  editProducts(data:any, id:number):Observable<any>{
    return this.http.put<any>(this.url +id, data);
  }
  deleteProducts(id:number){
    return this.http.delete<any>(this.url +id);
  }
}
