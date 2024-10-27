import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDishComponent } from './modal-dish.component';

describe('ModalDishComponent', () => {
  let component: ModalDishComponent;
  let fixture: ComponentFixture<ModalDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
