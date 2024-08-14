import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangementsituationComponent } from './changementsituation.component';

describe('ChangementsituationComponent', () => {
  let component: ChangementsituationComponent;
  let fixture: ComponentFixture<ChangementsituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangementsituationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangementsituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
