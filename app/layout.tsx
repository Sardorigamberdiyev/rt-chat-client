import { PropsWithChildren } from 'react';
import { ChatServiceProvider } from './components/providers/chat-service.provider';
import { ToastContainer } from 'react-toastify';
import styles from './layout.module.scss';

import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss';

export const metadata = {
	title: 'RT-CHAT',
	description: 'Real time chat for test task',
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<ChatServiceProvider>
					<div className={styles.container}>{children}</div>
					<ToastContainer />
				</ChatServiceProvider>
			</body>
		</html>
	)
}
