import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
const routes: Routes = [
  // { path: '', redirectTo: '/product',  pathMatch: 'full'},
  { path: 'product', component: ProductComponent },
  { path: 'customer', component: CustomerComponent }    
  // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
