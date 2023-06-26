'use client';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { IPageProps } from './page.props';
import { IUserModel } from '../models/user.model';
import { IRoomModel } from '../models/room.model';
import { IMessageModel } from '../models/message.model';
import ChatServiceContext from '../context/chat-service.context';
import SocketContext from './socket-context';
import MessageList from './message-list/message-list';
import UserList from './user-list/user-list';
import styles from './page.module.scss';

export default function Page(props: IPageProps) {
    const {
        params: { userId },
        searchParams: { roomId }
    } = props;
    // useState
    const [user, setUser] = useState<IUserModel | null>(null);
    const [room, setRoom] = useState<IRoomModel | null>(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [messageText, setMessageText] = useState('');
    const [users, setUsers] = useState<IUserModel[]>([]);
    const [messageList, setMessageList] = useState<IMessageModel[]>([]);
    // useRef
    const scrollDownEl = useRef<HTMLDivElement>(null);
    // useContext
    const socket = useContext(SocketContext);
    const chatService = useContext(ChatServiceContext);
    // useRouter
    const router = useRouter();

    useEffect(() => {
        registerListeners();
        getData();
        return () => {
            socket?.emit('rooms:leave', roomId);
            socket?.disconnect()
        }
    }, [socket]);

    useEffect(() => {
        // При каождом новом сообщение пролистывать вниз
        scrollDownEl.current?.scrollIntoView();
    }, [messageList])

    async function getData() {
        try {
            if (roomId === undefined) 
                throw new Error();
            // Получаем данные в начале при первом рендеринге
            const userData = await chatService.getUserById(+userId);
            const roomData = await chatService.getRoomById(+roomId);
            const messagesData = await chatService.getMessages(roomData.id);
            // Присоединение к комнатам
            socket?.emit('rooms:join', roomData.id);
            // 
            setUser(userData);
            setRoom(roomData);
            setMessageList(messagesData);
        } catch (e) {
            leaveUser();
        }
    }

    function registerListeners() {
        // Получаем от пользователей новое сообщение
        socket?.on('message:get', (newMessage: IMessageModel) => {
            setMessageList((oldMessageList) => (
                [...oldMessageList, newMessage]
            ));
        });
        // Обновляем список пользователей при каждом присоеденение или разсоеденение пользователя
        socket?.on('refresh:users', (users: IUserModel[]) => {
            setUsers(
                users.filter((item) => item.id !== +userId)
            );
        });
        // Информируем текущего пользователя о присоеденение в группу другого пользователя
        socket?.on('rooms:user-joined', (joinedUser: IUserModel) => {
            toast.info(`${joinedUser.username} вошел в группу`);
        });
        // Информируем текущего пользователя о выходе из группы другого пользователя
        socket?.on('rooms:user-left', (leftUser: IUserModel) => {
            toast.info(`${leftUser.username} покинул группу`);
        });
    }

    function sendMessage() {
        if (!(room && user && socket) || isDisabled)
            return;
        // Отправляем новую сообщение на сервер
        socket.emit('message:new', messageText, room.id, user.username);
        // После сбрасываем значение по умолчянию
        setMessageText('');
        setIsDisabled(true);
    }

    function leaveUser() {
        // Покидаем текушую комнату
        socket?.emit('rooms:leave', roomId);
        // Разсоединяем пользователя от сервера
        socket?.disconnect();
        // Перенаправляем на главную страницу
        router.push('/');
    }

    function messageControl(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        // Если значение пустой то блокируем кнопку отправить
        setIsDisabled(!!!value.trim());
        setMessageText(value);
    }

    return (
        <div className={styles.main}>
            <div className={styles.containerWrapper}>
                <div className={styles.leftContainers}>
                    <div className={styles.profileContainer}>
                        <h3>Профиль</h3>
                        <div className={styles.profile}>
                            <span>{user?.username}</span>
                        </div>
                    </div>
                    <div className={styles.userContainer}>
                        <h3>Пользователи</h3>
                        <div className={styles.users}>
                            <UserList users={users} />
                        </div>
                    </div>
                </div>
                <div className={styles.rightContainers}>
                    <div className={styles.chatContainer}>
                        <div className={styles.chatInfo}>
                            <h3>Группа {room?.room_name}</h3>
                        </div>
                        <div className={styles.messages}>
                            <div className={styles.messages__wrapper}>
                                <MessageList 
                                messages={messageList}
                                userId={user?.id}/>
                                <div ref={scrollDownEl} />
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <input 
                            type="text"
                            placeholder="Введите сообщение"
                            value={messageText}
                            onChange={messageControl} />
                            <button
                            disabled={isDisabled}
                            onClick={sendMessage}>Отправить</button>
                        </div>
                    </div>
                    <button 
                    className={styles.leaveBtn}
                    onClick={leaveUser}>Покинуть группу</button>
                </div>
            </div>
        </div>
    )
}