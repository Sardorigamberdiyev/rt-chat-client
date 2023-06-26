'use client';
import { PropsWithChildren } from 'react';
import { ChatService } from '../../service/chat-service';
import ChatServiceContext from '../../context/chat-service.context';

export function ChatServiceProvider({ children }: PropsWithChildren) {
    return (
        <ChatServiceContext.Provider value={new ChatService()}>{children}</ChatServiceContext.Provider>
    )
}