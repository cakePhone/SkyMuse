<script>
	import TodayCard from './todayCard.svelte';
	import Icon from '@iconify/svelte';
	import { settings } from '../stores/stores';
	import { locales } from '../libs/locales';

	export let todayWeatherInfo;
</script>

{#if $settings.language}
	<div class="grid grid-cols-1 gap-4">
		<TodayCard>
			<h3 class="h3" slot="title">{locales[$settings.language].homePage.daylightCycle}</h3>
			{#if todayWeatherInfo}
				<div class="grid h-full w-full grid-cols-2 gap-2">
					<div
						class="card bg-surface-200-700-token flex flex-col items-center justify-center space-y-2 p-2"
					>
						<h4 class="h4">{locales[$settings.language].homePage.sunrise}</h4>
						<Icon icon="tabler:sunrise" class="h-10 w-10" />
						<p>{todayWeatherInfo.sunrise}</p>
					</div>
					<div
						class="card bg-surface-200-700-token flex flex-col items-center justify-center space-y-2 p-2"
					>
						<h4 class="h4">{locales[$settings.language].homePage.sunset}</h4>
						<Icon icon="tabler:sunset" class="h-10 w-10" />
						<p>{todayWeatherInfo.sunset}</p>
					</div>
				</div>
			{/if}
		</TodayCard>
		<TodayCard>
			<h3 class="h3" slot="title">{locales[$settings.language].homePage.atmosphere}</h3>
			{#if todayWeatherInfo}
				<div class="grid h-full w-full grid-cols-2 gap-2">
					<div
						class="card bg-surface-200-700-token flex flex-col items-center justify-center space-y-2 p-2"
					>
						<h4 class="h4">{locales[$settings.language].homePage.visibility}</h4>
						<Icon icon="mdi:eye" class="min-h-[2.5rem] w-full" />
						<p>{todayWeatherInfo.today.visibility}</p>
					</div>

					<div
						class="card bg-surface-200-700-token flex flex-col items-center justify-center space-y-2 p-2"
					>
						<h4 class="h4">{locales[$settings.language].homePage.wind}</h4>
						<div
							class="flex aspect-square h-10 items-center justify-center rounded-full border-2 border-primary-500"
						>
							<Icon
								icon="mdi:arrow-up"
								class="h-5 w-5"
								style="transform: rotate({todayWeatherInfo.today.windDirection}deg)"
							/>
						</div>
						<div class="flex items-baseline">
							<p class="flex-shrink-0">
								{todayWeatherInfo.today.windSpeed}
							</p>
						</div>
					</div>
				</div>
			{/if}
		</TodayCard>
	</div>
{/if}
