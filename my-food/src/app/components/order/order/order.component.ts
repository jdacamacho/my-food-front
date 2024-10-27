import { Component, OnInit } from '@angular/core';
import { Order } from '../../../data/model/order/order';
import { OrderService } from '../../../data/services/order-service/order.service';
import { CommonModule } from '@angular/common';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import Swal from 'sweetalert2';
import { ModalDishComponent } from '../modal-dish/modal-dish.component';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ModalInfoComponent, ModalDishComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  
  orders: Order[] = [];
  
  constructor(private orderService: OrderService){}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      data => this.orders = data,
      error => console.log('error: ', error)
    );
  }

  createOrder(): void {
    this.orderService.createOrder().subscribe(
      response => {
        console.log('succes ' + response)

        Swal.fire({
          title: 'Succes!',
          text: 'Order was created....',
          icon: 'success',
          confirmButtonText: 'Accept'
        });
      },
      error => {
        console.log('error ' + error)
      }
    );
  }

  calculateOrderTotalPrice(idOrder: string): void {
    this.orderService.calculateOrderTotalPrice(idOrder).subscribe(
      response => {
        console.log('succes ' + response)

        Swal.fire({
          title: 'Succes!',
          text: 'New total cost has been calculate',
          icon: 'success',
          confirmButtonText: 'Accept'
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There are no dishes...',
        });
        console.log('error ' + error)
      } 
    );
  }

}
