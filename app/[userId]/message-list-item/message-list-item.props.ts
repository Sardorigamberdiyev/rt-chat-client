import { IMessageModel } from '@/app/models/message.model';

export interface IMessageListItemProps {
    message: IMessageModel;
    isMe: boolean;
}