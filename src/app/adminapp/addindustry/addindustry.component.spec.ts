import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddindustryComponent } from './addindustry.component';

describe('AddindustryComponent', () => {
  let component: AddindustryComponent;
  let fixture: ComponentFixture<AddindustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddindustryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddindustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
