import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageCreationComponent } from './chat-message-creation.component';

describe('ChatMessageCreationComponent', () => {
  let component: ChatMessageCreationComponent;
  let fixture: ComponentFixture<ChatMessageCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatMessageCreationComponent]
    });
    fixture = TestBed.createComponent(ChatMessageCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
