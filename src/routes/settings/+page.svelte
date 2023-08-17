<script>
	import { geolocation } from './../../libs/geolocation';
	import { settings } from '../../stores/stores';
	import { LightSwitch, SlideToggle } from '@skeletonlabs/skeleton';
	import { locales } from '../../libs/locales';
	import SvelteMarkdown from 'svelte-markdown';

	let results;

	let themeGroupValue = $settings.theme;
	let language = $settings.language;

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

	function setLanguage(language) {
		settings.update((value) => {
			return {
				...value,
				language: language
			};
		});
	}

	async function getResults() {
		results = await geolocation.getInfo($settings.city.name);
	}

	$: setTheme(themeGroupValue);
	$: setLanguage(language);
</script>

{#if language}
	<div class="space-y-6">
		<div class="relative space-y-2">
			<label class="label">
				<span class="h3">{locales[language].settingsPage.selectACity}</span>
				<input
					class="input p-2"
					type="text"
					placeholder={locales[language].settingsPage.localityPlaceholder}
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
			<h3 class="h3">{locales[language].settingsPage.units}</h3>
			<span class="opacity-50"
				>{$settings.units === 'Metric'
					? locales[language].settingsPage.metric
					: locales[language].settingsPage.imperial}</span
			>
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
			<h3 class="h3">{locales[language].settingsPage.themes.theme}</h3>
			<select class="select w-48" bind:value={themeGroupValue}>
				<option value={0}>{locales[language].settingsPage.themes.default}</option>
				<option value={1}>{locales[language].settingsPage.themes.spring}</option>
				<option value={2}>{locales[language].settingsPage.themes.summer}</option>
				<option value={3}>{locales[language].settingsPage.themes.autumn}</option>
				<option value={4}>{locales[language].settingsPage.themes.winter}</option>
			</select>
		</div>

		<div class="flex place-content-between items-center">
			<h3 class="h3">{locales[language].settingsPage.lightMode}</h3>
			<LightSwitch />
		</div>

		<div class="flex place-content-between items-center">
			<h3 class="h3">{locales[language].settingsPage.language}</h3>
			<select class="select w-48" bind:value={language}>
				<option value="English">English</option>
				<option value="Português Europeu">Português Europeu</option>
				<option value="Македонски">Македонски</option>
			</select>
		</div>
	</div>

	<footer class="card mt-10 space-y-2 p-4">
		<div>
			<SvelteMarkdown source="**© 2023 - Miguel Santos**" />
			<SvelteMarkdown source={locales[language].settingsPage.copyright.firstParagraph} />
		</div>
		<div>
			<strong
				>{locales[language].settingsPage.copyright.thanksToOpenMeteo}
				<a href="https://open-meteo.com/"
					>{locales[language].settingsPage.copyright.thanksToOpenMeteoAnchor}</a
				></strong
			>
			<p>{locales[language].settingsPage.copyright.notRelatedParagraph}</p>
		</div>
	</footer>
{/if}
