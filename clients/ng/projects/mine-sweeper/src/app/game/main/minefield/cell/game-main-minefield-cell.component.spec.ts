import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMainMinefieldCellComponent } from './game-main-minefield-cell.component';

describe('GameMainMinefieldCellComponent', () => {
  let component: GameMainMinefieldCellComponent;
  let fixture: ComponentFixture<GameMainMinefieldCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameMainMinefieldCellComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMainMinefieldCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
