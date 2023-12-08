import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioProcessorComponent } from './audio-processor.component';

describe('AudioProcessorComponent', () => {
  let component: AudioProcessorComponent;
  let fixture: ComponentFixture<AudioProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioProcessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
