import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveDetailsComponent } from './move-details.component';

describe('MoveDetailsComponent', () => {
  let component: MoveDetailsComponent;
  let fixture: ComponentFixture<MoveDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
