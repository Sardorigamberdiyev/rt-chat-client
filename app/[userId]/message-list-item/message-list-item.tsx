'use client';
import { motion } from 'framer-motion';
import { IMessageListItemProps } from './message-list-item.props';
import moment from 'moment';
import styles from './message-list-item.module.scss';
import 'moment/locale/ru';

export default function MessageListItem({ message, isMe }: IMessageListItemProps) {
    const { username, msg, create_at } = message;
    const meClassName = isMe ? ' ' + styles.me : '';

    const messageDate = moment(create_at).fromNow();

    return (
        <motion.li 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.main + meClassName}>
            <div className={styles.message + meClassName}>
                <div className={styles.message__sender}>{username}</div>
                <div className={styles.message__content + meClassName}>
                    <p className={styles.message__text}>{msg}</p>
                    <div className={styles.message__time + meClassName}>{messageDate}</div>
                </div>
            </div>
        </motion.li>
    )
}