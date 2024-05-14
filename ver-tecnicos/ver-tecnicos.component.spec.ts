import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTecnicosComponent } from './ver-tecnicos.component';

describe('VerTecnicosComponent', () => {
  let component: VerTecnicosComponent;
  let fixture: ComponentFixture<VerTecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTecnicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
