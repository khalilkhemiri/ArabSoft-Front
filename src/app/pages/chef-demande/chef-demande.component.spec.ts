import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefDemandeComponent } from './chef-demande.component';

describe('ChefDemandeComponent', () => {
  let component: ChefDemandeComponent;
  let fixture: ComponentFixture<ChefDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefDemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
