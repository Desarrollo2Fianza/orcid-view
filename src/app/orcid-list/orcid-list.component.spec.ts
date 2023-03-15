import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcidListComponent } from './orcid-list.component';

describe('OrcidListComponent', () => {
  let component: OrcidListComponent;
  let fixture: ComponentFixture<OrcidListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrcidListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
