import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerChamadosComponent } from './ver-chamados.component';

describe('VerChamadosComponent', () => {
  let component: VerChamadosComponent;
  let fixture: ComponentFixture<VerChamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerChamadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
