<div class="card flex h-fit flex-col place-content-between items-center space-y-2 p-4 text-center">
	<slot name="title">
		<div class="placeholder h-8 w-full flex-shrink-0 animate-pulse" />
	</slot>
	<slot>
		<div class="placeholder h-48 w-36 animate-pulse" />
	</slot>
</div>
