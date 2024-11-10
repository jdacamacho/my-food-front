import { Component, OnInit } from '@angular/core';
import { Menu } from '../../data/model/menu/menu';
import { MenuService } from '../../data/services/menu/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  menus: Menu[] = [];
  
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    console.log("inicia");
    this.loadMenus();
  }
  loadMenus(): void {
    this.menuService.getMenus().subscribe(
      data => this.menus = data,
      error => console.log('error: ', error)
    );
  }
  createMenu(): void {
    this.menuService.createMenu().subscribe(
      response => {
        console.log('succes ' + response)

        Swal.fire({
          title: 'Succes!',
          text: 'Menu was created....',
          icon: 'success',
          confirmButtonText: 'Accept'
        });
      },
      error => {
        console.log('error ' + error)
      }
    );
  }

}
