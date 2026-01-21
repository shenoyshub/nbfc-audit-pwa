import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auditors } from './auditors';

describe('Auditors', () => {
  let component: Auditors;
  let fixture: ComponentFixture<Auditors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Auditors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Auditors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
