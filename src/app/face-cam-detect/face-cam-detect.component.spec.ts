import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceCamDetectComponent } from './face-cam-detect.component';

describe('FaceCamDetectComponent', () => {
  let component: FaceCamDetectComponent;
  let fixture: ComponentFixture<FaceCamDetectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceCamDetectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceCamDetectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
