import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QannabisMapComponent } from './qannabis-map.component';

describe('QannabisMapComponent', () => {
  let component: QannabisMapComponent;
  let fixture: ComponentFixture<QannabisMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QannabisMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QannabisMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
