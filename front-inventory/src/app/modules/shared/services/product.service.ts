import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const base_url = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   *  get all the products
   */
  getProducts() {
    const endpoint = `${base_url}/products`;
    return this.http.get(endpoint);
  }

  /**
   * save Product
   */
  saveProduct(body:any){
    const endpoint = `${base_url}/products`;
    return this.http.post(endpoint, body);
  }
}
