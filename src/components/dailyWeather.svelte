<script>
	import DailyCard from './dailyCard.svelte';

	export let dailyWeatherInfo;
</script>

<div class="card p-4">
	<ul class="space-y-2">
		{#if dailyWeatherInfo}
			{#each dailyWeatherInfo as day}
				<DailyCard {day} />
			{/each}
		{:else}
			<div class="placeholder h-24 animate-pulse" />
			<div class="placeholder h-24 animate-pulse" />
			<div class="placeholder h-24 animate-pulse" />
			<div class="placeholder h-24 animate-pulse" />
			<div class="placeholder h-24 animate-pulse" />
			<div class="placeholder h-24 animate-pulse" />
		{/if}
	</ul>
</div>
