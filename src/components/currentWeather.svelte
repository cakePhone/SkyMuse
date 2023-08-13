<script>
	import Icon from '@iconify/svelte';

	export let currentWeatherInfo;
</script>

<div class="card relative flex place-content-between items-center gap-4 p-4">
	{#if currentWeatherInfo}
		<Icon icon={currentWeatherInfo.weather.icon} class="h-[5.5rem] w-[5.5rem]" />
		<div class="text-right">
			<h2 class="h2 text-6xl">{currentWeatherInfo.temp}</h2>
			<h3 class="h3 opacity-50">{currentWeatherInfo.weather.string}</h3>
		</div>
	{:else}
		<div class="placeholder aspect-square h-[5.5rem] animate-pulse" />
		<div class="flex flex-col items-end gap-1">
			<div class="placeholder h-[3.75rem] w-32 animate-pulse" />
			<div class="placeholder h-6 w-24 animate-pulse" />
		</div>
	{/if}
</div>
