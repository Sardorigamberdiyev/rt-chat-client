'use client';
import { IMessageListProps } from './message-list.props';
import MessageListItem from '../message-list-item';
import styles from './message-list.module.scss';

export default function MessageList({ messages, userId }: IMessageListProps) {
    return (
        <ul className={styles.main}>
            {
                messages.map((message) => (
                    <MessageListItem
                    key={message.id}
                    message={message}
                    isMe={userId === message.user_id} />       
                ))
            }
        </ul>
    )
}