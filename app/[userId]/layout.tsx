import { PropsWithChildren } from 'react';
import { ILayoutProps } from './layout.props';
import SocketProvider from './socket-provider';

export default function Layout({ children, params }: PropsWithChildren<ILayoutProps>) {
    return (
        <SocketProvider userId={params.userId}>
            {children}
        </SocketProvider>
    )
}