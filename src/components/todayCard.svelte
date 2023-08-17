<div
	class="card flex min-h-[11rem] w-full flex-col place-content-between items-center space-y-3 p-4 text-center"
>
	<slot name="title">
		<div class="placeholder h-8 flex-shrink-0 animate-pulse" />
	</slot>
	<slot>
		<div class="placeholder h-48 w-36 animate-pulse" />
	</slot>
</div>
