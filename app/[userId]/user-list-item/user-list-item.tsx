import { IUserListItemProps } from './user-list-item.props';
import { motion } from 'framer-motion';
import styles from './user-list-item.module.scss';

export default function UserListItem({ user }: IUserListItemProps) {
    const {
        username,
        is_online,
    } = user;
    const offlineClassName = is_online ? '' : ' ' + styles.offline;
    return (
        <motion.li 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={styles.main}>
            <span>{username}</span>
            <div className={styles.status + offlineClassName} />
        </motion.li>
    )
}