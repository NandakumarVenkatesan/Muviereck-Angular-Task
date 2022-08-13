import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalItem : number = 0;

  constructor(private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.getTotalItem();
  }

  getTotalItem() {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    });
  }
}
