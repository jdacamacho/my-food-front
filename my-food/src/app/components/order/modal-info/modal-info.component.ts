import { Component, Input } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../../data/model/order/order';

@Component({
  selector: 'app-modal-info',
  standalone: true,
  imports: [],
  providers: [NgbModalConfig, NgbModal],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.css'
})
export class ModalInfoComponent {
  @Input() order: Order | null = null;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

  open(content: any) {
		this.modalService.open(content);
	}
}
