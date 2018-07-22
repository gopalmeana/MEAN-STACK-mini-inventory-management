import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productModel: any = {};
  user: string;
  productList: any;
  showProductForm: boolean = false;
  showProductTable: boolean = true;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.http.get('http://localhost:3000/products/').subscribe(data => {
      if(data['serverStatus'] === 'success' && data['count'] >=1) {
        this.productList = data['product'];
      }
      console.log('----------', data['product']);
    });
  }

  addProduct() {
    this.showProductForm = true;
    this.showProductTable = false;
  }

  save() {
    this.productModel.status = 'InStock';
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/products/', this.productModel, { headers: headers, responseType: 'text' }).subscribe(res => {
      this.showProductForm = false;
      this.showProductTable = true;
      this.productModel = '';
      this.getProduct();
    });
  }

}
