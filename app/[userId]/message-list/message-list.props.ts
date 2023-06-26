import { IMessageModel } from '@/app/models/message.model';

export interface IMessageListProps {
    messages: IMessageModel[];
    userId?: number;
}