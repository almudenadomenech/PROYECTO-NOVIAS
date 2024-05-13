import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestidosDetailComponent } from './vestidos-detail.component';

describe('VestidosDetailComponent', () => {
  let component: VestidosDetailComponent;
  let fixture: ComponentFixture<VestidosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestidosDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VestidosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
