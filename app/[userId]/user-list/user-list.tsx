import { IUserListProps } from './user-list.props';
import UserListItem from '../user-list-item';
import styles from './user-list.module.scss';

export default function UserList({ users }: IUserListProps) {
    return (
        <ul className={styles.main}>
            {
                users.map((user) => (
                    <UserListItem 
                    key={user.id}
                    user={user} />
                ))
            }
        </ul>
    )
}