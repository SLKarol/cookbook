import { createContext, useMemo } from 'react';
import { enableStaticRendering } from 'mobx-react-lite';

import { User } from './user';
import { Recipe } from './recipe';

enableStaticRendering(typeof window === 'undefined');

let store: RootStore;

export class RootStore {
	user: User;
	recipe: Recipe;

	constructor() {
		this.user = new User(this);
		this.recipe = new Recipe(this);
	}
}

const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;

function initializeStore() {
	const _store = store ?? new RootStore();
	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store;
	// Create the store once in the client
	if (!store) store = _store;

	return _store;
}

export const useStore = () => {
	const store = useMemo(() => initializeStore(), []);
	return store;
};
