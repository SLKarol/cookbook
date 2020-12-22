import { AppProps } from 'next/app';

import { RootStoreProvider, useStore } from 'store';

import 'styles/global.css';
import 'styles/layout.css';

export default function App({ Component, pageProps }: AppProps) {
	const rootStore = useStore();
	return (
		<RootStoreProvider value={rootStore}>
			<Component {...pageProps} />
		</RootStoreProvider>
	);
}
