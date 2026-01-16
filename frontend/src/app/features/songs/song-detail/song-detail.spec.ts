import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDetail } from './song-detail';

describe('SongDetail', () => {
  let component: SongDetail;
  let fixture: ComponentFixture<SongDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
