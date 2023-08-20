<div
	class="card flex min-h-[11rem] w-full flex-col place-content-between items-center space-y-3 p-4 text-center"
>
	<slot name="title">
		<div class="placeholder h-8 flex-shrink-0 animate-pulse" />
	</slot>
	<slot name="content" />
</div>
