import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestidosFormComponent } from './vestidos-form.component';

describe('VestidosFormComponent', () => {
  let component: VestidosFormComponent;
  let fixture: ComponentFixture<VestidosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestidosFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VestidosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
