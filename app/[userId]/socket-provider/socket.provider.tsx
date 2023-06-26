'use client';
import { PropsWithChildren, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client';
import { toast } from 'react-toastify';
import { ISocketProviderProps } from './socket.provider.props';
import SocketContext from '../socket-context';

export function SocketProvider({ children, userId }: PropsWithChildren<ISocketProviderProps>) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketClient = io('http://localhost:5000', {
            auth: { userId }
        });

        socketClient.on('connect', () => {
            toast.info('Вы присоеденились к серверу')
        });

        socketClient.on('disconnect', () => {
            toast.warn('Вы отсоеденились от сервера');
        });

        setSocket(socketClient);
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}