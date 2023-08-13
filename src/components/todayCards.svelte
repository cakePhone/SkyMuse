<script>
	import TodayCard from './todayCard.svelte';
	import Icon from '@iconify/svelte';

	export let todayWeatherInfo;
</script>

<div class="grid grid-cols-2 gap-4">
	<TodayCard>
		<h3 class="h3" slot="title">Daylight Cycle</h3>
		{#if todayWeatherInfo}
			<div class="grid h-full w-full grid-cols-2 gap-2">
				<div
					class="card bg-surface-200-700-token flex flex-col items-center justify-center space-y-2 p-2"
				>
					<Icon icon="tabler:sunrise" class="h-10 w-full" />
					<p>{todayWeatherInfo.sunrise}</p>
				</div>
				<div
					class="card bg-surface-200-700-token flex flex-col items-center justify-center space-y-2 p-2"
				>
					<Icon icon="tabler:sunset" class="h-10 w-full" />
					<p>{todayWeatherInfo.sunset}</p>
				</div>
			</div>
		{/if}
	</TodayCard>
	<TodayCard>
		<h3 class="h3" slot="title">Athmosphere</h3>
		{#if todayWeatherInfo}
			<div class="grid h-full w-full grid-cols-2 gap-2">
				<div
					class="card bg-surface-200-700-token flex flex-col items-center justify-center space-y-2 p-2"
				>
					<Icon icon="mdi:eye" class="h-10 w-full" />
					<p>{todayWeatherInfo.today.visibility}</p>
				</div>

				<div
					class="card bg-surface-200-700-token flex flex-col items-center justify-center space-y-1 p-2"
				>
					<div
						class="relative flex aspect-square w-10 items-center justify-center rounded-full border-2 border-secondary-500"
					>
						<Icon
							icon="mdi:arrow-up"
							class="h-5 w-5"
							style="transform: rotate({todayWeatherInfo.today.windDirection}deg)"
						/>
						<p class="bg-surface-200-700-token absolute -top-2.5 w-5 text-sm">N</p>
						<p class="bg-surface-200-700-token absolute -left-1 text-sm">W</p>
						<p class="bg-surface-200-700-token absolute -right-1 text-sm">E</p>
						<p class="bg-surface-200-700-token absolute -bottom-2.5 w-5 text-sm">S</p>
					</div>
					<p>
						{todayWeatherInfo.today.windSpeed.slice(0, -4)}<span class="text-xs"
							>{todayWeatherInfo.today.windSpeed.slice(-4)}</span
						>
					</p>
				</div>
			</div>
		{/if}
	</TodayCard>
</div>
