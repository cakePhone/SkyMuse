<script>
	import { geolocation } from './../../libs/geolocation';
	import { settings } from '../../stores/stores';
	import { LightSwitch, SlideToggle } from '@skeletonlabs/skeleton';

	let results;

	let themeGroupValue = $settings.theme;

	function setCity(long, lat, name, country) {
		settings.update((value) => {
			return {
				...value,
				city: {
					...value.city,
					name: name,
					country: country,
					longitude: long,
					latitude: lat
				}
			};
		});

		results = null;
	}

	function setTheme(theme) {
		settings.update((value) => {
			return {
				...value,
				theme: theme
			};
		});
	}

	async function getResults() {
		results = await geolocation.getInfo($settings.city.name);
	}

	$: setTheme(themeGroupValue);
</script>

<div class="space-y-6">
	<div class="relative space-y-2">
		<label class="label">
			<span class="h3">Select a City</span>
			<input
				class="input p-2"
				type="text"
				placeholder="City"
				bind:value={$settings.city.name}
				on:input={() => {
					getResults();
				}}
			/>
		</label>

		{#if results}
			<div
				class="top-30 container bg-surface-200-700-token border-surface-400-500-token absolute z-[99999999] p-2 border-token rounded-token"
			>
				<ul class="space-y-2">
					{#each results as result}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li
							class="container bg-surface-300-600-token p-2 rounded-token"
							on:click={setCity(result.longitude, result.latitude, result.name, result.country)}
						>
							{result.name}, {result.country}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
	<div class="flex place-content-between items-center">
		<h3 class="h3">Units</h3>
		<span class="opacity-50">{$settings.units}</span>
		<SlideToggle
			name="slide"
			active="bg-primary-500"
			checked={$settings.units === 'Metric'}
			size="sm"
			on:click={settings.update((value) => {
				return {
					...value,
					units: $settings.units === 'Metric' ? 'Imperial' : 'Metric'
				};
			})}
		/>
	</div>

	<div class="flex place-content-between items-center">
		<h3 class="h3">Theme</h3>
		<select class="select w-48" bind:value={themeGroupValue}>
			<option value={0}>Default</option>
			<option value={1}>Spring</option>
			<option value={2}>Summer</option>
			<option value={3}>Autumn</option>
			<option value={4}>Winter</option>
		</select>
	</div>

	<div class="flex place-content-between items-center">
		<h3 class="h3">Light Mode</h3>
		<LightSwitch />
	</div>
</div>

<footer class="card mt-10 space-y-2 p-4">
	<div>
		<strong> © Copyright 2023 - Miguel Santos </strong>
		<p>
			You <strong>should</strong> have received a copy of the MIT license when downloading the app,
			if not, it can be found <a class="anchor" href="https://github.com/cakePhone/SkyMuse/blob/main/LICENSE">here</a>.
		</p>
	</div>
	<div>
		<strong>Thanks to <a href="https://open-meteo.com/" class="anchor">Open-Meteo.com</a></strong>
		<p>
			All of the weather data used in the app is taken from Open-Meteo's geolocation and forecast
			APIs, for non-commercial use. The app and the dev are in no way related to Open-Meteo.
		</p>
	</div>
</footer>
