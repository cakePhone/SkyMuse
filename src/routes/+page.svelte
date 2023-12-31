<script>
	import TodayCards from './../components/todayCards.svelte';
	import HourlyWeather from '../components/hourlyWeather.svelte';
	import CurrentWeather from './../components/currentWeather.svelte';
	import DailyWeather from '../components/dailyWeather.svelte';

	import { modalStore } from '@skeletonlabs/skeleton';
	import { Network } from '@capacitor/network';
	import { getWeatherData } from '../libs/forecast';
	import { settings } from '../stores/stores';
	import { onMount } from 'svelte';
	import { SplashScreen } from '@capacitor/splash-screen';
	import { locales } from '../libs/locales';

	let weatherInfo;

	function alertModal(text) {
		modalStore.trigger({
			type: 'alert',
			title: 'Something went wrong!',
			body: text
		});
	}

	Network.addListener('networkStatusChange', async (status) => {
		if (status.connected) {
			fetchInfo(status.connected);
		}
	});

	async function fetchInfo(connected) {
		let tries = 0;

		// Attempt to fetch information while connected
		while (!weatherInfo && tries < 5 && connected) {
			weatherInfo = await getWeatherData(
				$settings.city.latitude,
				$settings.city.longitude,
				$settings.units
			);

			// Wait 5 seconds before retrying
			if (!weatherInfo) {
				await new Promise((resolve) => setTimeout(resolve, 5000));
			} else {
				SplashScreen.hide();
			}
		}

		if (!weatherInfo && tries === 5) {
			alertModal("API didn't respond, try again later!");
		}
	}

	onMount(() => {
		let delay = 0; // Delay is 0 to avoid waiting for first run

		setInterval(async () => {
			let status = await Network.getStatus();
			if (!status.connected) {
				alertModal("SkyMuse couldn't fetch the weather, check your network connection!");
			}

			delay = 3600000; // set delay to 1 hour

			fetchInfo(status.connected);
		}, delay);
	});
</script>

{#if $settings.language}
	<div class="space-y-6">
		<div class="space-y-4">
			<div class="flex place-content-between items-end">
				<h1 class="h1">{locales[$settings.language].weekDays.today}</h1>
				<a class="anchor text-sm opacity-50" href="https://open-meteo.com/"
					>{locales[$settings.language].dataByOpenMeteo}</a
				>
			</div>
			<CurrentWeather currentWeatherInfo={weatherInfo ? weatherInfo.currentWeather : null} />

			<HourlyWeather hourlyWeatherInfo={weatherInfo ? weatherInfo.hourlyWeather : null} />

			<TodayCards todayWeatherInfo={weatherInfo ? weatherInfo.dailyWeather[1] : null} />
		</div>

		<div class="space-y-4">
			<h1 class="h1">{locales[$settings.language].homePage.dailyWeather}</h1>
			<DailyWeather dailyWeatherInfo={weatherInfo ? weatherInfo.dailyWeather : null} />
		</div>
	</div>
{/if}
