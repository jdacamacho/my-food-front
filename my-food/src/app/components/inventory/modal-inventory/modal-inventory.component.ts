import { Component } from '@angular/core';
import { Category } from '../../../data/model/inventory/Category';
import { Units } from '../../../data/model/inventory/Units';
import { Product } from '../../../data/model/inventory/Product';
import { InventoryService } from '../../../data/services/inventory/inventory.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-inventory',
  standalone: true,
  imports: [FormsModule],
  providers: [NgbModalConfig, NgbModal],
  templateUrl: './modal-inventory.component.html',
  styleUrl: './modal-inventory.component.css'
})
export class ModalInventoryComponent {

  constructor(private inventoryService:InventoryService, config: NgbModalConfig, private modalService:NgbModal){
    config.backdrop = 'static';
    config.keyboard = false;
  }

  product:Product = new Product();
  productName:string = "";
  category:Category = Category.EMPTY;
  stock:number=0;
  units:Units = Units.EMPTY;
  usefulLife:Date|null = null;

  open(content: any) {
		this.modalService.open(content);
	}
  
  private verifyForm():boolean{
    if(this.productName.length < 0){
      Swal.fire({
          icon: 'error',
          title: 'Error! Bad format',
          text: "The name can't be empty..."
      });
      return false;
    }
    if(this.category == Category.EMPTY)
      {
        Swal.fire({
            icon: 'error',
            title: 'Error! Bad format',
            text: "The category can't be empty..."
        });
        return false;
      }
    if(this.stock < 0)
      {
        Swal.fire({
            icon: 'error',
            title: 'Error! Bad format',
            text: "The stock must be greater or equal than 0..."
        });
        return false;

      }
    if(this.units == Units.EMPTY)
      {
        Swal.fire({
            icon: 'error',
            title: 'Error! Bad format',
            text: "The units can't be empty..."
        });
        return false;

      }
    if(this.usefulLife != null && this.usefulLife.valueOf()<Date.now())
    {
        Swal.fire({
            icon: 'error',
            title: 'Error! Bad format',
            text: "The useful life can't be on the past+..."
        });
        return false;

    }
    return true;
  }

  private setProduct():void{
    this.product.name = this.productName;
    this.product.stock = this.stock;
    this.product.category = this.category;
    this.product.units = this.units;
    this.product.usefulLife =this.usefulLife;
  }

  private defineCategory(value:string):Category{
    return Category[value as keyof typeof Category];
  }

  private defineUnits(value:string):Units{
    return Units[value as keyof typeof Units];
  }

  resetFormCreate():void{
    this.productName = "";
    this.category = Category.EMPTY;
    this.stock = 0;
    this.units = Units.EMPTY;
    this.usefulLife = null;

  }

  resetFormUpdate():void{
    this.productName = this.product.name;
    this.category =  this.defineCategory(this.product.category)
    this.stock = this.product.stock
    this.units = this.defineUnits(this.product.units)
    this.usefulLife = this.product.usefulLife;
  }

  resetForm():void{
    this.product.id == "" ? this.resetFormCreate() : this.resetFormUpdate();
  }

  createProduct():void{
    if(this.verifyForm())
      return;
    this.setProduct();
    this.inventoryService.createProduct(this.product).subscribe(
      response => {
        console.log("succes: ", response);
        Swal.fire({
          icon: 'success',
          title: 'Product Added!',
          text: `The product ${this.productName} has been added successfully.`,
        });
        this.resetForm(); 
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was a problem saving the product.',
      });
      console.error('Error saving product:', error);
    }
  )
  }

  updateProduct():void{
    if(this.verifyForm())
      return;
    this.setProduct();
    this.inventoryService.updateProduct(this.product).subscribe(
      response => {
        console.log("succes: ", response);
        Swal.fire({
          icon: 'success',
          title: 'Product saved!',
          text: `The product ${this.productName} has been saved successfully.`,
        });
        this.resetForm(); 
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was a problem saving the product.',
      });
      console.error('Error saving product:', error);
    }
  )
  }

  saveProduct():void{
    this.product.id == "" ? this.createProduct() : this.updateProduct;
  }
  
}
