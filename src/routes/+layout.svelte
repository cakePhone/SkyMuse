<script>
	import { settings } from './../stores/stores.ts';
  
  // Literally fixes vite imports for some reason
  function getThemeURL(name) {
    return new URL(`../themes/${name}.postcss`, import.meta.url).href;
  }

  // Skeleton Styles
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	// Libs
	import { page } from '$app/stores';

	// Components
	import { AppShell, AppBar, TabGroup, TabAnchor, Modal } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
</script>

<!-- Themes -->
<svelte:head>
	{#if $settings.theme === 1}
		<link rel="stylesheet" href={getThemeURL('spring')} />
	{:else if $settings.theme === 2}
		<link rel="stylesheet" href={getThemeURL('summer')} />
	{:else if $settings.theme === 3}
		<link rel="stylesheet" href={getThemeURL('autumn')} />
	{:else if $settings.theme === 4}
		<link rel="stylesheet" href={getThemeURL('winter')} />
	{:else}
		<link rel="stylesheet" href={getThemeURL('default')} />
	{/if}
</svelte:head>

<Modal />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			{#if $page.url.pathname === '/'}
				{#if $settings.city.name}
					<h1 class="h1">
						{$settings.city.name.length > 13
							? $settings.city.name.substring(0, 10) + '...'
							: $settings.city.name}<span class="h4 ml-2 opacity-50">{$settings.city.country}</span>
					</h1>
				{:else}
					<h1 class="h1">Home</h1>
				{/if}
			{:else}
				<h1 class="h1">Settings</h1>
			{/if}
		</AppBar>
	</svelte:fragment>

	<div class="p-4">
		<slot />
	</div>

	<svelte:fragment slot="footer">
		<TabGroup
			justify="justify-evenly"
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			border=""
			rounded=""
			class="bg-surface-100-800-token w-full p-4"
		>
			<TabAnchor href="/" selected={$page.url.pathname === '/'} class="rounded-container-token">
				<svelte:fragment slot="lead">
					<Icon icon="mdi:home" class="h-7 w-9" />
				</svelte:fragment>
			</TabAnchor>

			<TabAnchor
				href="/settings"
				selected={$page.url.pathname === '/settings'}
				class="rounded-container-token"
			>
				<svelte:fragment slot="lead">
					<Icon icon="mdi:cog" class="h-7 w-9" />
				</svelte:fragment>
			</TabAnchor>
		</TabGroup>
	</svelte:fragment>
</AppShell>
