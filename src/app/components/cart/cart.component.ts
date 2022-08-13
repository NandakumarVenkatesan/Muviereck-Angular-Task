import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any = [];
  grandTotal: number = 0;
  name = 'Order Details';

  constructor(private cartService: CartServiceService) { }
  @ViewChild('pdfTable', { static: false }) el !: ElementRef;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].variants[0]) {
            this.grandTotal += this.products[i].variants[0].total;
          }
        }
      });
  }

  removeItem(item: any) {
    this.grandTotal = 0;
    this.cartService.removeCartItem(item);
  }
  emptycart() {
    this.cartService.removeAllCart();
  }

  quantityChange(event: any) {
    var key = event.keyCode || event.which;
    if (key == 8 || key == 46 || key == 37 || key == 39 || key == 38 || key == 40) {
      return true;
    } else if (key < 48 || key > 57) {
      return false;
    } else {
      if (event.target.value.length < 2) {
        return true;
      } else {
        return false;
      }
    }
  }

  downloadAsPDF(): any {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el?.nativeElement, {
      callback: (pdf) => {
        pdf.save("Invoice.pdf");
      }
    });
  }

  inputChange(event: any, item: any) {
    let value = event.target.value;
    if (value.length < 3) {
      if (value > 0 && value <= 99) {
        this.grandTotal = 0;
        item.variants[0].total = item.variants[0].quantity * item.variants[0].price;
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].variants[0]) {
            this.grandTotal += this.products[i].variants[0].total;
          }
        }
      } else {
        this.grandTotal = 0;
        item.variants[0].total = item.variants[0].quantity * item.variants[0].price;
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].variants[0]) {
            this.grandTotal += this.products[i].variants[0].total;
          }
        }
      }
    }
  }
}