'use client';
import { useContext, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { IRoomModel } from './models/room.model';
import ChatServiceContext from './context/chat-service.context';
import Select from 'react-select';
import styles from './page.module.scss';
import { AxiosError } from 'axios';
import { IHTTPResponseError } from './service/http-response-error.interface';
import Link from 'next/link';

type Option<T> = {
	label: string;
	value: T;
}

export default function Home() {
	const chatService = useContext(ChatServiceContext);
	const [rooms, setRooms] = useState<IRoomModel[]>([]);
	const [roomId, setRoomId] = useState(0);
	const [username, setUsername] = useState('');

	const router = useRouter();

	useEffect(() => {
		// Получаем список комнат
		chatService.getRooms()
		.then((data) => setRooms(data))
		.catch((err) => console.log(err));
	}, []);

	const roomsOptions: Option<number>[] = useMemo(() => (
		rooms.map((room) => ({
			label: room.room_name, 
			value: room.id 
		}))
	), [rooms]);

	const roomOption: Option<number> | null = useMemo(() => {
		const room = rooms.find((room) => room.id === roomId);
		return room ? (
			{
				label: room.room_name,
				value: room.id
			}
		) : null;
	}, [rooms, roomId]);

	async function connectChat() {
		try {
			const user = await chatService.connectUser(username, roomId);
			router.push(`/${user.id}?roomId=${roomId}`);
		} catch (e) {
			// Проверяем ошибку запроса
			if (e instanceof AxiosError) {
				const error: IHTTPResponseError = e.response?.data;
				toast.error(error.message);
			}
		}
	}

    return (
		<div className={styles.main}>
			<h1>RT - Чат</h1>
			<div className={styles.container}>
				<div className={styles.connectForm}>
					<input 
					type="text"
					placeholder="Введите имя"
					value={username}
					onChange={(e) => setUsername(e.target.value)} />
					<Select
					instanceId="select-id"
					className={styles.select}
					placeholder="Выберите группу" 
					options={roomsOptions}
					value={roomOption}
					onChange={(option) => setRoomId(option?.value || 0)} />
					<div className={styles.roomsLink}>
						<Link href="/rooms">Добавить группу</Link>
					</div>
					<div className={styles.btnWrapper}>
						<button 
						type="button"
						onClick={connectChat}>Подключиться</button>
					</div>
				</div>
			</div>
		</div>
    )
}
