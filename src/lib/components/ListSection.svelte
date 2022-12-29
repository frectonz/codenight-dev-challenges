<script lang="ts">
	export let listName: string;
	export let list: object[];

	$: keyValuePairs = list.map((feature) => {
		return Object.entries(feature).map(([key, value]) => {
			return { key, value };
		});
	});
</script>

<section id={listName} class="mx-2 my-20 md:mx-5 xl:mx-20">
	<h1 class="text-xl mb-5">
		<span class="text-red-500 font-bold">const</span>
		<span class="font-bold"> {listName} </span>
		=
		<span class="text-red-500 font-bold">{'[]'}</span>;
	</h1>

	<div class="grid grid-cols-1 gap-2 lg:grid-cols-3">
		{#each keyValuePairs as element}
			<div class="border border-black p-4 flex flex-col gap-2">
				<h1>
					<span class="font-bold">{listName}</span>.<span class="text-red-500 font-bold">push</span
					>(<span class="text-red-500 font-bold">{'{'}</span>
				</h1>

				{#each element as pair}
					<p class="ml-5">
						<span class="text-red-500 font-bold">{pair.key}</span> :
						<span class="font-bold">"{pair.value}"</span>,
					</p>
				{/each}

				<h1>
					<span class="text-red-500 font-bold">{'}'}</span>);
				</h1>
			</div>
		{/each}
	</div>
</section>
