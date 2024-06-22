import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFiestaComponent } from './category-fiesta.component';

describe('CategoryFiestaComponent', () => {
  let component: CategoryFiestaComponent;
  let fixture: ComponentFixture<CategoryFiestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFiestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryFiestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
