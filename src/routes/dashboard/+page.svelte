<script lang="ts">
	import type { Link } from '$lib/types';
	import type { ChallengeData } from '$lib/validators';
	import type { User } from 'firebase/auth';

	import { validateChallenge } from '$lib/validators';

	import NavBar from '$lib/components/NavBar.svelte';
	import Challenge from '$lib/components/Challenge.svelte';
	import NewChallengeForm from '$lib/components/NewChallengeForm.svelte';
	import FunctionContainer from '$lib/components/FunctionContainer.svelte';

	import {
		Tab,
		TabList,
		TabGroup,
		TabPanel,
		TabPanels,
		Disclosure,
		DisclosureButton,
		DisclosurePanel
	} from '@rgossiaux/svelte-headlessui';
	import { ChevronRightIcon } from '@rgossiaux/svelte-heroicons/solid';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const navLinks: Link[] = [
		{
			type: 'button',
			name: 'logOut();',
			onClick: async () => {
				const { auth } = await import('$lib/firebase');
				auth.signOut();
			}
		}
	];

	const tabs = ['challenges', 'projects', 'rewards'];

	async function challenges(): Promise<ChallengeData[]> {
		const { getChallenges } = await import('$lib/firebase');
		const challenges = await getChallenges();
		const output: ChallengeData[] = [];

		for (const challenge of challenges) {
			const res = validateChallenge.safeParse(challenge);
			if (res.success) {
				output.push(res.data);
			}
		}

		return output;
	}

	let user: User | null = null;
	onMount(async () => {
		const { auth } = await import('$lib/firebase');
		auth.onAuthStateChanged((u) => {
			if (!u) {
				goto('/dashboard');
			} else {
				user = u;
			}
		});
	});
</script>

<NavBar links={navLinks} avatarUrl={user?.photoURL} />

<h1 class="mx-2 md:mx-5 p-4 text-xl">
	<span class="text-red-500 font-bold">sayHi</span>("{user?.displayName}");
</h1>

<TabGroup class="mx-2 md:mx-5 lg:mx-auto lg:container">
	<TabList class="py-4 grid grid-cols-1 md:grid-cols-3">
		{#each tabs as tab}
			<Tab
				class={({ selected }) =>
					`border border-black px-2 py-4 ${selected && 'bg-black text-white'}`}
			>
				<span class="text-red-500 font-bold">{tab}</span>();
			</Tab>
		{/each}
	</TabList>
	<TabPanels class="p-2 md:p-4 border border-black">
		<TabPanel>
			<FunctionContainer name="challenges">
				<Disclosure class="border border-black p-2 mt-4" let:open>
					<DisclosureButton
						class="flex justify-between items-center w-full bg-black text-white px-4 py-2"
						>Create Challenge
						<ChevronRightIcon class="w-8 h-8" style={open ? 'transform: rotate(90deg);' : ''} />
					</DisclosureButton>

					<DisclosurePanel class="mt-4 grid grid-cols-1 gap-3">
						<NewChallengeForm />
					</DisclosurePanel>
				</Disclosure>

				<section class="grid grid-cols-1 gap-2 mt-5">
					{#await challenges() then challenges}
						{#each challenges as challenge}
							<Challenge {challenge} />
						{/each}
					{/await}
				</section>
			</FunctionContainer>
		</TabPanel>
		<TabPanel>
			<FunctionContainer name="projects">
				<p>projects go here</p>
			</FunctionContainer>
		</TabPanel>
		<TabPanel>
			<FunctionContainer name="rewards">
				<p>rewards go here</p>
			</FunctionContainer>
		</TabPanel>
	</TabPanels>
</TabGroup>
