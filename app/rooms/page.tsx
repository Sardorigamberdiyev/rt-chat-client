'use client';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import Link from 'next/link';

import { IHTTPResponseError } from '../service/http-response-error.interface';
import ChatServiceContext from '../context/chat-service.context';
import styles from './page.module.scss';

export default function RoomsPage() {
    const [roomName, setRoomName] = useState('');

    const chatSrvice = useContext(ChatServiceContext);

    function addRoom() {
        chatSrvice.addRoom(roomName)
        .then(() => toast.success(`Комната ${roomName} успешно добавлено`))
        .then(() => setRoomName(''))
        .catch((error: AxiosError<IHTTPResponseError>) => (
            toast.error(error.response?.data.message)
        ));
    }

    return (
        <div className={styles.main}>
            <h1>Добавить группу</h1>
            <div className={styles.container}>
                <div className={styles.roomForm}>
                    <input 
                    type="text"
                    placeholder="Введите название круппу"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)} />
                    <div className={styles.backLink}>
                        <Link href="/">Назад</Link>
                    </div>
                    <button onClick={addRoom}>Добавить</button>
                </div>
            </div>
        </div>
    )
}