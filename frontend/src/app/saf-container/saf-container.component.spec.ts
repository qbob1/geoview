import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafContainerComponent } from './saf-container.component';

describe('SafContainerComponent', () => {
  let component: SafContainerComponent;
  let fixture: ComponentFixture<SafContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
