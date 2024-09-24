import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


const base_url = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /**
   * Get ALl categories
   */
  getCategories(){
  const endpoint = `${base_url}/categories`;
  return this.http.get(endpoint);
  }


  /**
   * save the categories
   */
  saveCategories(body:any){
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }



}
