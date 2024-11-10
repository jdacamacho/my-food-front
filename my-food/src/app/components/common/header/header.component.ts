import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderComponent } from '../../order/order/order.component';
import { InventoryComponent } from "../../inventory/inventory.component";
import { WasteComponent  } from '../../waste/waste.component';
import { MenuComponent } from '../../menu/menu.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbNavModule, OrderComponent, InventoryComponent, WasteComponent, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  active = 1;
}
