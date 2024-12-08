import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobAppliedComponent } from './view-job-applied.component';

describe('ViewJobAppliedComponent', () => {
  let component: ViewJobAppliedComponent;
  let fixture: ComponentFixture<ViewJobAppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewJobAppliedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJobAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
