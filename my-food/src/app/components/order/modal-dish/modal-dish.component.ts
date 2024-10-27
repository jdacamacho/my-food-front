import { Component, Input } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../../data/model/order/order';
import { OrderService } from '../../../data/services/order-service/order.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-dish',
  standalone: true,
  imports: [FormsModule],
  providers: [NgbModalConfig, NgbModal],
  templateUrl: './modal-dish.component.html',
  styleUrl: './modal-dish.component.css'
})
export class ModalDishComponent {
  @Input() order: Order | null = null;
  dishName: string = ''; 
  dishValue: number | null = null; 


  constructor(private orderService: OrderService, config: NgbModalConfig, private modalService: NgbModal) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

  open(content: any) {
		this.modalService.open(content);
	}

  addDish(): void {
    if (this.order && this.dishName && this.dishValue !== null) {
      const idOrder = this.order.id_order; 

      this.orderService.addDish(idOrder, this.dishName, this.dishValue).subscribe(
        response => {
          console.error('Succes:', response);
          Swal.fire({
            icon: 'success',
            title: 'Dish Added!',
            text: `The dish ${this.dishName} has been added successfully.`,
          });
          this.resetForm(); 
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'There was a problem adding the dish.',
          });
          console.error('Error adding dish:', error);
        }
      );
    }
  }

  private resetForm(): void {
    this.dishName = ''; 
    this.dishValue = null; 
  }


}
