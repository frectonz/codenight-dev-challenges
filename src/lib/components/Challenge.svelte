<script lang="ts">
	import type { ChallengeData } from '$lib/validators';
	import { ArrowCircleUpIcon } from '@rgossiaux/svelte-heroicons/solid';

	export let challenge: ChallengeData;
	let upvoteStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

	async function handleUpvote() {
		const { upvoteChallenge } = await import('$lib/firebase');
		upvoteStatus = 'loading';
		upvoteChallenge(challenge.id)
			.then(() => {
				upvoteStatus = 'success';
			})
			.catch(() => {
				upvoteStatus = 'error';
			});
	}
</script>

<div class="border border-black grid grid-cols-1 md:grid-cols-2 gap-5">
	<div
		class="flex justify-center items-center min-h-[300px]"
		style="background-image: url({challenge.image}); background-size: cover; background-position: center; background-repeat: no-repeat;"
	/>

	<div class="flex flex-col justify-center gap-2 p-2 md:p-4">
		<h1 class="text-red-500 font-bold">{'{'}</h1>
		<p class="md:ml-5">
			<span class="font-bold">title</span> :
			<span class="break-words">"{challenge.title}"</span>,
		</p>

		<p class="md:ml-5">
			<span class="font-bold">description</span> :
			<span class="break-words">"{challenge.description}"</span>,
		</p>
		<div class="md:ml-5 flex flex-row items-center gap-2 flex-wrap">
			<span class="font-bold">createdBy</span> :
			<img src={challenge.createdBy.photoURL} class="w-8 h-8 rounded-full" alt="" />
			"{challenge.createdBy.name}",
		</div>
		<p class="md:ml-5">
			<span class="font-bold">difficulty</span> : "{challenge.difficulty}",
		</p>
		<h1 class="text-red-500 font-bold">{'}'}</h1>
	</div>
</div>

<div class="flex flex-row justify-end">
	<button
		class="hover:scale-90 flex flex-row gap-2 bg-black px-4 py-1 text-white items-center justify-center uppercase text-sm disabled:opacity-50"
		on:click={handleUpvote}
		disabled={upvoteStatus === 'loading'}
	>
		<span
			>{upvoteStatus === 'loading'
				? 'Loading...'
				: upvoteStatus === 'success'
				? 'Success!'
				: upvoteStatus === 'error'
				? 'Error!'
				: 'Upvote'}</span
		>
		<span class="w-8 h-8">
			<ArrowCircleUpIcon />
		</span>
	</button>
</div>
