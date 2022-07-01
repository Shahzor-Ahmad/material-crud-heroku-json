import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL = "http://localhost:4500/productList/"

  constructor(private http: HttpClient) { }

  postProduct(data : any){
    return this.http.post<any>(this.URL, data);
  }

  getProduct(){
    return this.http.get<any>(this.URL);
  }

  putProduct(data: any, id: number){
    return this.http.put<any>(this.URL+id, data);
  }

  deleteProduct(id: number){
    return this.http.delete<any>(this.URL+id);
  }

}
