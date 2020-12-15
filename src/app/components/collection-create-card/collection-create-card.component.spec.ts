import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardComponent } from './collection-create-card.component';

describe('CollectionCreateCardComponent', () => {
  let component: CollectionCreateCardComponent;
  let fixture: ComponentFixture<CollectionCreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionCreateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
