import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageEditComponent } from './chat-message-edit.component';

describe('ChatMessageEditComponent', () => {
  let component: ChatMessageEditComponent;
  let fixture: ComponentFixture<ChatMessageEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatMessageEditComponent]
    });
    fixture = TestBed.createComponent(ChatMessageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
