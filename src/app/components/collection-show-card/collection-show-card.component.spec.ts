import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionShowCardComponent } from './collection-show-card.component';

describe('CollectionShowCardComponent', () => {
  let component: CollectionShowCardComponent;
  let fixture: ComponentFixture<CollectionShowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionShowCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionShowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
