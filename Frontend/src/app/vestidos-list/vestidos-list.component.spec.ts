import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestidosListComponent } from './vestidos-list.component';

describe('VestidosListComponent', () => {
  let component: VestidosListComponent;
  let fixture: ComponentFixture<VestidosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestidosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VestidosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
