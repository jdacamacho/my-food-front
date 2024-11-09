import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WasteService } from '../../data/services/waste/waste.service';
import { CauseWasteConstants } from '../../data/model/waste/CauseWasteConstants';
import Swal from 'sweetalert2';
import { Waste } from '../../data/model/waste/Waste';
import { CauseWaste } from '../../data/model/waste/CauseWaste';

@Component({
  selector: 'app-waste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.css']
})
export class WasteComponent implements OnInit {

  newWaste: Waste = new Waste();
  wastes: Waste[] = [];
  causes: string[] = CauseWasteConstants.getAllCauses();
  additionalWasteQuantity: number = 0;
  wasteIdToAdd: string = '';

  @ViewChild('createWasteModal') createWasteModal!: TemplateRef<any>;
  @ViewChild('addWasteModal') addWasteModal!: TemplateRef<any>;

  constructor(private wasteService: WasteService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadWastes();
    console.log(this.causes);
  }

  loadWastes(): void {
    this.wasteService.getAllWastes().subscribe({
      next: (data) => this.wastes = data,
      error: (error) => {
        console.log("Error: ", error);
        this.wastes = [];
      }
    });
  }

  openAddWasteModal(wasteId: string) {
    this.wasteIdToAdd = wasteId; // Guarda el ID del desperdicio
    this.modalService.open(this.addWasteModal); // Abre el modal
  }

  addWaste(): void {
    if (this.additionalWasteQuantity > 0) {
      this.wasteService.registerAdditionalWaste(this.wasteIdToAdd, this.additionalWasteQuantity).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Waste Added',
            text: 'Additional waste has been registered'
          });
          this.loadWastes(); // Recarga la lista de desperdicios
          this.modalService.dismissAll(); // Cierra el modal
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Could not register additional waste'
          });
          console.log("Error: ", error);
        }
      });
    }
  }

  loadWastesByCause(cause: string): void {
    this.wasteService.getWasteByCause(cause).subscribe({
      next: (data) => this.wastes = data,
      error: (error) => {
        console.log("Error: ", error);
        this.wastes = [];
      }
    });
  }

  loadWastesByProduct(productId: string): void {
    this.wasteService.getWasteByProductId(productId).subscribe({
      next: (data) => this.wastes = data,
      error: (error) => {
        console.log("Error: ", error);
        this.wastes = [];
      }
    });
  }

  getTotalWasteForProduct(productId: string): void {
    this.wasteService.getTotalWasteByProductId(productId).subscribe({
      next: (total) => {
        Swal.fire({
          title: 'Total Waste',
          text: `Total waste for product: ${total}`,
          icon: 'info'
        });
      },
      error: (error) => console.log("Error: ", error)
    });
  }

  suggestReductionMeasures(productId: string): void {
    this.wasteService.suggestReductionMeasures(productId).subscribe({
      next: (measures) => {
        const measuresText = Array.isArray(measures) ? measures.join(', ') : String(measures);
        Swal.fire({
          title: 'Reduction Measures',
          text: measuresText,
          icon: 'info'
        });
      },
      error: (error) => console.log("Error: ", error)
    });
  }

  openCreateWasteModal() {
    this.newWaste = { // Inicializa el objeto cuando abres el modal
      idWaste: '', // Este campo podría ser opcional ya que el backend genera un ID
      product: {
        id: '', // Asegúrate de que el ID del producto esté correctamente asignado
        name: '',
        category: '',
        stock: 0
      },
      cause: {
        id: '', // Asegúrate de que el ID de la causa esté correctamente asignado
        description: ''
      },
      quantityWaste: {
        id: '', // Este campo podría ser opcional ya que el backend genera un ID
        wasteQuantity: 0,
        totalWasteQuantity: 0
      },
      dateRegister: new Date() // Asigna la fecha actual
    };
    this.modalService.open(this.createWasteModal);
  }

  createWaste(): void {
    this.newWaste.dateRegister = new Date(); // Asegúrate de que la fecha se asigne correctamente

    this.wasteService.createWaste(this.newWaste).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Waste Created',
          text: 'The waste has been successfully created'
        });
        this.loadWastes(); // Recarga la lista de desperdicios
        this.modalService.dismissAll(); // Cierra el modal
      },
      error: (error) => {
        console.error("Error: ", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was a problem creating the waste.'
        });
      }
    });
  }

  registerAdditionalWaste(wasteId: string, quantity: number): void {
    this.wasteService.registerAdditionalWaste(wasteId, quantity).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Waste Registered',
          text: 'Additional waste has been registered'
        });
        this.loadWastes(); // Recarga la lista de desperdicios
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not register additional waste'
        });
        console.log("Error: ", error);
      }
    });
  }

  getCauseDescription(cause: string): string {
    return CauseWasteConstants.getCauseDescription(cause);
  }
}
