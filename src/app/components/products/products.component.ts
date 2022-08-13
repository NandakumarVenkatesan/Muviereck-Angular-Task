import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: any = [];
  constructor(private productService: ProductServiceService,
     private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProductList().subscribe(res => {
      this.productList = res;
    });
  }

  addtocart(item: any){
    item.variants[0].quantity = 1;
    item.variants[0].total = item.variants[0].quantity * item.variants[0].price;
    this.cartService.addtoCart(item);
  }
}
