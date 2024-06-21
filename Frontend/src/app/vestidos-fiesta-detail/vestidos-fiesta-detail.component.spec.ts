import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestidosFiestaDetailComponent } from './vestidos-fiesta-detail.component';

describe('VestidosFiestaDetailComponent', () => {
  let component: VestidosFiestaDetailComponent;
  let fixture: ComponentFixture<VestidosFiestaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestidosFiestaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VestidosFiestaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
