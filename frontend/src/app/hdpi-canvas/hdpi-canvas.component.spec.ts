import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdpiCanvasComponent } from './hdpi-canvas.component';

describe('HdpiCanvasComponent', () => {
  let component: HdpiCanvasComponent;
  let fixture: ComponentFixture<HdpiCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HdpiCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HdpiCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
