import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Barbas } from './barbas';

describe('Barbas', () => {
  let component: Barbas;
  let fixture: ComponentFixture<Barbas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Barbas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Barbas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
