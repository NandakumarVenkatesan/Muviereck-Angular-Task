import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private url = 'https://drcmart.in/admin_panel/api-firebase/get-all-products-for-api.php';

  constructor(private http: HttpClient) { }

  getProductList() {
    const formData: any = new FormData();
    formData.append("get_all_products", '');
    return this.http.post(this.url, formData).pipe(map((res:any) => {
      return res;
    }));
  }
}
