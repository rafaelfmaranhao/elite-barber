import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Luzes } from './luzes';

describe('Luzes', () => {
  let component: Luzes;
  let fixture: ComponentFixture<Luzes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Luzes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Luzes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
