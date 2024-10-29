import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInventoryComponent } from './modal-inventory.component';

describe('ModalInventoryComponent', () => {
  let component: ModalInventoryComponent;
  let fixture: ComponentFixture<ModalInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
