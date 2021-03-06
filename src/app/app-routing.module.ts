import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'index',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'products',
    component: ProductListComponent,
    data: { title: 'Home' }
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    data: { title: 'Shopping Cart' }
  },{
    path: 'details/:id',
    component: ProductDetailComponent,
    data: { title: 'Product Details' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
