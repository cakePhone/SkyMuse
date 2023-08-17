<script>
	import Icon from '@iconify/svelte';

	export let day;
</script>

<li class="card bg-surface-200-700-token flex flex-col place-content-between space-y-1 p-4">
	<div class="flex place-content-between">
		<h5 class="h5">{day.weather.string}</h5>
		<h5 class="h5 opacity-50">{day.date}</h5>
	</div>
	<div class="flex place-content-between items-center space-x-4">
		<Icon icon={day.weather.icon} class="h-10 w-10 flex-shrink-0" />

		<div class="flex flex-wrap place-content-end space-x-2">
			<!-- First Line of Items-->
			<div class="flex place-content-between space-x-2">
				<div class="flex items-center space-x-1">
					<Icon icon="mdi:arrow-up" class="h-full w-5 text-red-500" />
					<p>{day.maxTemp}</p>
				</div>
				<div class="flex items-center space-x-1">
					<Icon icon="mdi:arrow-down" class="h-full w-5 text-blue-700" />
					<p>{day.minTemp}</p>
				</div>
			</div>

			<!-- Second Line of Items -->
			<div class="flex place-content-between space-x-2">
				<div class="flex items-center space-x-1">
					<Icon icon="material-symbols:rainy-light" class="h-full w-5 text-blue-700" />
					<p>{day.precipitation}</p>
				</div>
				<div class="flex items-center space-x-1">
					<Icon icon="mdi:uv-ray" class="h-full w-5 text-yellow-500" />
					<p>{day.uvIndex}</p>
				</div>
			</div>
		</div>
	</div>
</li>
