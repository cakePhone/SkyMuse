import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const settings: Writable<App.Settings> = localStorageStore('settings', {
	city: {
		name: '',
		country: '',
		longitude: 0,
		latitude: 0
	},
	units: 'Metric',
	theme: 0,
	language: 'English'
});
