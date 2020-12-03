import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSelectCardComponent } from './image-select-card.component';

describe('ImageSelectCardComponent', () => {
  let component: ImageSelectCardComponent;
  let fixture: ComponentFixture<ImageSelectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSelectCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSelectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
