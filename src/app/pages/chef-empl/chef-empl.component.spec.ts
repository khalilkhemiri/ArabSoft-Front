import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefEmplComponent } from './chef-empl.component';

describe('ChefEmplComponent', () => {
  let component: ChefEmplComponent;
  let fixture: ComponentFixture<ChefEmplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefEmplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefEmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
