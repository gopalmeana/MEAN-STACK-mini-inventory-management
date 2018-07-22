import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerModel: any ={};
  productModel: any ={};
  productFilter1: any;
  productListD: any;
  user:string;
  productList: any;
  customerList:any;
  quantiOfProdReqError:boolean = false;
  quantityOfProduct: any;
  showCustomerForm:boolean= false;
  showCustomerTable:boolean= true;
  constructor(private http: HttpClient) { 

  }

  ngOnInit() {
    this.getProduct();  
    this.getCustomer(); 
}

getProduct() {
  this.http.get('http://localhost:3000/products/').subscribe(data => {
  if(data['serverStatus'] === 'success' && data['count'] >=1) {
     console.log('data', data);
     this.productListD = data['product'];
    this.productList = data['product'].filter(
      product => product.status === 'InStock');
  } 

  });
}

getCustomer() {
  this.http.get('http://localhost:3000/customers/').subscribe(data => {
    this.customerList = data['customer'];
  });

}

addCustomer() {
    this.showCustomerForm = true;
    this.showCustomerTable = false;
}

productSelect(event) {

}


quantiOfProdReq(quantiOfProdReq){
var productFilter;
  if(this.customerModel.produtName && quantiOfProdReq) {
    productFilter = this.productList.filter(
      product => product.produtName === this.customerModel.produtName);
 this.productFilter1 = productFilter; 
    if(productFilter[0].quantityOfProduct < quantiOfProdReq){
 this.quantiOfProdReqError = true;
this.quantityOfProduct = productFilter[0].quantityOfProduct;
    } else {
 this.quantiOfProdReqError = false;      
    } 

  }
}

openDelete(data) {
let headers = new HttpHeaders();
headers = headers.append('Content-Type', 'application/json');
this.http.put('http://localhost:3000/customers/', data, {headers: headers, responseType: 'text'}).subscribe(res => {
let customerRes = JSON.parse(res);

let qutyOfProdReq;
let productFilter;
if(customerRes.serverStatus === "delete" ) {
   let produtName = customerRes.result['produtName'];
  productFilter = this.productListD.filter(
    product => product.produtName == produtName);
this.productModel._id = productFilter[0]._id;
this.productModel.produtName = productFilter[0].produtName;
if(productFilter[0].quantityOfProduct == 0) {
  this.productModel.quantityOfProduct = data.quantiOfProdReq;
} else if(productFilter[0].quantityOfProduct && data.quantiOfProdReq){
  this.productModel.quantityOfProduct = (productFilter[0].quantityOfProduct) + (data.quantiOfProdReq);
}
  this.productModel.status = 'InStock';

this.http.put('http://localhost:3000/products/', this.productModel, {headers: headers, responseType: 'text'}).subscribe(res => {
  this.getProduct();
  this.getCustomer();
});
}
});
}



save() {

  if( this.quantiOfProdReqError === false){
this.customerModel.status = 'Confirm';
let headers = new HttpHeaders();
headers = headers.append('Content-Type', 'application/json');
this.customerModel.produtName = this.productFilter1[0].produtName;
this.http.post('http://localhost:3000/customers/', this.customerModel, {headers: headers, responseType: 'text'}).subscribe(res => {
let customerRes = JSON.parse(res);
let qutyOfProdReq;
if(customerRes.status === "Confirm" ) {
this.productModel._id = this.productFilter1[0]._id;
this.productModel.produtName = this.productFilter1[0].produtName;
if(this.productFilter1[0].quantityOfProduct && this.customerModel.quantiOfProdReq){
  qutyOfProdReq = Number(this.productFilter1[0].quantityOfProduct) - Number (this.customerModel.quantiOfProdReq);
}
this.productModel.quantityOfProduct = qutyOfProdReq;
if(this.productModel.quantityOfProduct === 0){
  this.productModel.status = 'OutOfStock';
} else {
  this.productModel.status = 'InStock';
}


this.http.put('http://localhost:3000/products/', this.productModel, {headers: headers, responseType: 'text'}).subscribe(res => {
  this.showCustomerForm = false;
  this.showCustomerTable = true;
  this.productModel = '';
  this.customerModel = '';
  this.getProduct();
  this.getCustomer();
});
}
});
}
}
}

