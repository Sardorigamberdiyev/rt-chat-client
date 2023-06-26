import { createContext } from 'react';
import { IChatService } from '../service/chat-service.interface';
import { ChatService } from '../service/chat-service';

const ChatServiceContext = createContext<IChatService>(new ChatService());

export default ChatServiceContext;