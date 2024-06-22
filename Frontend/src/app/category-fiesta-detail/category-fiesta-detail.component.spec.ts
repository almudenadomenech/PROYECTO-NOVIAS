import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFiestaDetailComponent } from './category-fiesta-detail.component';

describe('CategoryFiestaDetailComponent', () => {
  let component: CategoryFiestaDetailComponent;
  let fixture: ComponentFixture<CategoryFiestaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFiestaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryFiestaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
