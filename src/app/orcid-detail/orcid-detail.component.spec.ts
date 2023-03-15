import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcidDetailComponent } from './orcid-detail.component';

describe('OrcidDetailComponent', () => {
  let component: OrcidDetailComponent;
  let fixture: ComponentFixture<OrcidDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrcidDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcidDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
