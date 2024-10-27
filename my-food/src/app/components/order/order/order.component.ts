import { Component, OnInit } from '@angular/core';
import { Order } from '../../../data/model/order/order';
import { OrderService } from '../../../data/services/order-service/order.service';
import { CommonModule } from '@angular/common';
import { ModalInfoComponent } from '../modal-info/modal-info.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ModalInfoComponent],
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

}
