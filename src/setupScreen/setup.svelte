<script>
	import { settings } from '../stores/stores';
	import { locales } from '../libs/locales';
	import { geolocation } from '../libs/geolocation';

	let language = $settings.language ? $settings.language : 'English';

	let metRequirements;

	let results;

	function setLanguage(language) {
		settings.update((value) => {
			return {
				...value,
				language: language
			};
		});
	}

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
		metRequirements = true;
	}

	async function getResults() {
		results = await geolocation.getInfo($settings.city.name);
	}

	function checkSetup() {
		if ($settings.city.country && $settings.city.latitude && $settings.city.longitude)
			$settings.setup = true;
	}

	$: setLanguage(language);
</script>

<div class="bg-surface-50-900-token flex h-full w-full flex-col place-content-between p-4 pt-10">
	<div class="flex flex-col gap-4">
		<!-- Welcome Card -->
		<div class="mb-6 space-y-2 text-center">
			<h1 class="h1">{locales[language].setupPage.welcomeToSkyMuse}</h1>
			<p>{locales[language].setupPage.letsSetup}</p>
		</div>
		<!-- Language Card -->
		<div class="card space-y-2 p-4">
			<h2 class="h2">{locales[language].settingsPage.language}</h2>
			<p>{locales[language].setupPage.skyMuseLanguages}</p>
			<div class="flex place-content-between items-center">
				<h3 class="h3">{locales[language].settingsPage.language}</h3>
				<select class="select w-48" bind:value={language}>
					<option value="English">English</option>
					<option value="Português Europeu">Português Europeu</option>
					<option value="Македонски">Македонски</option>
				</select>
			</div>
		</div>

		<!-- Location -->
		<div class="card space-y-2 p-4">
			<h2 class="h2">{locales[language].setupPage.location}</h2>
			<p>{locales[language].setupPage.locationParagraph}</p>
			<div class="relative space-y-2">
				<label class="label">
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
		</div>

		<!-- Themes card -->
		<div class="card space-y-2 p-4">
			<h2 class="h2">{locales[language].setupPage.themes}</h2>
			<p>{locales[language].setupPage.chooseTheme}</p>

			<div class="flex place-content-between items-center">
				<h3 class="h3">{locales[language].settingsPage.themes.theme}</h3>
				<select class="select w-48" bind:value={$settings.theme}>
					<option value={0}>{locales[language].settingsPage.themes.default}</option>
					<option value={1}>{locales[language].settingsPage.themes.spring}</option>
					<option value={2}>{locales[language].settingsPage.themes.summer}</option>
					<option value={3}>{locales[language].settingsPage.themes.autumn}</option>
					<option value={4}>{locales[language].settingsPage.themes.winter}</option>
				</select>
			</div>
		</div>
	</div>

	<div class="flex place-self-end">
		<button
			class="btn w-24"
			class:variant-soft-primary={!metRequirements}
			class:variant-filled-primary={metRequirements}
			on:click={() => {
				checkSetup();
			}}>{locales[language].setupPage.done}</button
		>
	</div>
</div>
