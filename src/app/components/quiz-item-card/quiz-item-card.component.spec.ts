import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizItemCardComponent } from './quiz-item-card.component';

describe('QuizItemCardComponent', () => {
  let component: QuizItemCardComponent;
  let fixture: ComponentFixture<QuizItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizItemCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
