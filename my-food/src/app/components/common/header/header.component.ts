import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderComponent } from '../../order/order.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbNavModule, OrderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  active = 1;
}
