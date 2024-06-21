import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestidosFiestaListComponent } from './vestidos-fiesta-list.component';

describe('VestidosFiestaListComponent', () => {
  let component: VestidosFiestaListComponent;
  let fixture: ComponentFixture<VestidosFiestaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestidosFiestaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VestidosFiestaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
