import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMainMinefieldComponent } from './game-main-minefield.component';

describe('GameMainMinefieldComponent', () => {
  let component: GameMainMinefieldComponent;
  let fixture: ComponentFixture<GameMainMinefieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameMainMinefieldComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMainMinefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
