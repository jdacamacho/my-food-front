import { Component } from '@angular/core';
import { Product } from '../../data/model/inventory/Product';
import { InventoryService } from '../../data/services/inventory/inventory.service';
import { ApiError } from '../../data/model/inventory/ApiError';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  
  products:Product[] = [];

  constructor(private inventoryService: InventoryService){}

  ngOnInit():void{
    this.loadInventory();
  }

  public loadInventory():void{
    this.inventoryService.getProductsWithExistences().subscribe(
      data => this.products = data,
      error => {
        console.log("Error: ", error);
        this.products = [];
      }
    );
  }

  public loadProducts():void{
    this.inventoryService.getProducts().subscribe(
      data => this.products = data,
      error => {
        console.log("Error: ", error);
        this.products = [];
      }
    );
  }

  public loadExpired():void{
    this.inventoryService.getProductsExpired().subscribe(
      data => this.products = data,
      error => {
        console.log("Error: ", error);
        this.products = [];
      }
    );
  }

  public loadNearToExpire():void{
    this.inventoryService.getProductsNearToExpire().subscribe(
      data => this.products = data,
      error =>{
        console.log("Error: ", error);
        this.products = [];
      }
    );
  }

  public createProduct(product:Product){
    //TODO: Implementar
    console.log("Implementar");
  }

}
