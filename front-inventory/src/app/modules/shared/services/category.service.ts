import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


const base_url = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get ALl categories
   */
  getCategories() {
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }


  /**
   * save the categories
   */
  saveCategories(body: any) {
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }

  /**
   * update categorie
   */
  updateCategorie(body: any, id: any) {
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * search categorie by ID
   */
  getCategorieById(id: any) {
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.get(endpoint);
  }

  /**
   * TODO:search categorie by Name
   */
  // getCategorieByName(name: string){
  //   const endpoint = `${base_url}/categories/name/${name}`;
  //   return this.http.get(endpoint);
  // }

  getCategoryByName(name: any) {
    const endpoint = `${base_url}/categories/name/${name}`;
    return this.http.get(endpoint);
  }




  /**
   * delete categorie
   */
  deleteCategorie(id: any) {
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.delete(endpoint);
  }


}
