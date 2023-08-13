<script>
	import Icon from '@iconify/svelte';

	export let hourlyWeatherInfo;
</script>

<div class="card h-[9.5rem] p-4">
	<div
		class="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth rounded-token"
	>
		{#if hourlyWeatherInfo}
			{#each hourlyWeatherInfo as item}
				<div class="flex-shrink-0 snap-start space-y-2 text-center">
					<div
						class="card bg-surface-200-700-token flex h-24 w-20 flex-col place-content-between items-center justify-center gap-2 p-2"
					>
						<Icon icon={item.weather.icon} class="h-10 w-10 flex-shrink-0" />
						<p>{item.temp}</p>
					</div>
					<p>{item.time.toString().slice(-5)}</p>
				</div>
			{/each}
		{:else}
			<div class="flex flex-col items-center space-y-2">
				<div class="placeholder h-24 w-20 flex-shrink-0 animate-pulse" />
				<div class="placeholder h-4 w-12 animate-pulse" />
			</div>
			<div class="flex flex-col items-center space-y-2">
				<div class="placeholder h-24 w-20 flex-shrink-0 animate-pulse" />
				<div class="placeholder h-4 w-12 animate-pulse" />
			</div>
			<div class="flex flex-col items-center space-y-2">
				<div class="placeholder h-24 w-20 flex-shrink-0 animate-pulse" />
				<div class="placeholder h-4 w-12 animate-pulse" />
			</div>
			<div class="flex flex-col items-center space-y-2">
				<div class="placeholder h-24 w-20 flex-shrink-0 animate-pulse" />
				<div class="placeholder h-4 w-12 animate-pulse" />
			</div>
			<div class="flex flex-col items-center space-y-2">
				<div class="placeholder h-24 w-20 flex-shrink-0 animate-pulse" />
				<div class="placeholder h-4 w-12 animate-pulse" />
			</div>
			<div class="flex flex-col items-center space-y-2">
				<div class="placeholder h-24 w-20 flex-shrink-0 animate-pulse" />
				<div class="placeholder h-4 w-12 animate-pulse" />
			</div>
			<div class="flex flex-col items-center space-y-2">
				<div class="placeholder h-24 w-20 flex-shrink-0 animate-pulse" />
				<div class="placeholder h-4 w-12 animate-pulse" />
			</div>
		{/if}
	</div>
</div>
