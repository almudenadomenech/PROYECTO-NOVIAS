import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestidosFiestaFormComponent } from './vestidos-fiesta-form.component';

describe('VestidosFiestaFormComponent', () => {
  let component: VestidosFiestaFormComponent;
  let fixture: ComponentFixture<VestidosFiestaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestidosFiestaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VestidosFiestaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
