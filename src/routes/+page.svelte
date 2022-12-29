<script lang="ts">
	import type { Link } from '$lib/types';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import NavBar from '$lib/components/NavBar.svelte';
	import ListSection from '$lib/components/ListSection.svelte';
	import FunctionHero from '$lib/components/FunctionHero.svelte';

	const navLinks: Link[] = [
		{
			type: 'link',
			name: 'Home',
			href: '#'
		},
		{
			type: 'link',
			name: 'Features',
			href: '#features'
		},
		{
			type: 'link',
			name: 'Challenges',
			href: '#challengeTypes'
		},
		{
			type: 'link',
			name: 'How does it work?',
			href: '#explain'
		}
	];

	const features = [
		{
			name: 'Language Independent',
			icon: '🌐',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, accusantium!'
		},
		{
			name: 'Open Source',
			icon: '📖',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, accusantium!'
		},
		{
			name: 'Helps You Learn',
			icon: '📚',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, accusantium!'
		}
	];

	const challengeTypes = [
		{
			name: 'Build Web Apps',
			icon: '🌐'
		},
		{
			name: 'Build Mobile Apps',
			icon: '📱'
		},
		{
			name: 'Build Desktop Apps',
			icon: '💻'
		},
		{
			name: 'Build CLI Apps',
			icon: '⌨'
		},
		{
			name: 'Build Games',
			icon: '🎮'
		},
		{
			name: 'Build Telegram Bots',
			icon: '🤖'
		}
	];

	let loginWithGitHub: () => void;
	onMount(async () => {
		const Firebase = await import('$lib/firebase');
		loginWithGitHub = Firebase.loginWithGitHub;

		Firebase.auth.onAuthStateChanged((u) => {
			if (u) goto('/dashboard');
		});
	});
</script>

<svelte:head>
	<title>CodeNightDevChallenges</title>
</svelte:head>

<NavBar links={navLinks} />

<FunctionHero
	name="CodeNightDevChallenges"
	msg="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla
          qui aspernatur sunt facere. Qui minus animi ex nisi optio!"
	buttonLabel="Continue with GitHub"
	onClick={loginWithGitHub}
/>

<ListSection listName="features" list={features} />
<ListSection listName="challengeTypes" list={challengeTypes} />

<h1 id="explain" class="mx-2 mt-10 mb-5 md:mx-5 xl:mx-20 text-xl md:text-4xl font-extrabold">
	<span class="font-bold text-red-500">explain</span>(<span>"How it works"</span>);
</h1>

<FunctionHero
	name="CrowdsourcedChallenges"
	msg="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla
          qui aspernatur sunt facere. Qui minus animi ex nisi optio!"
	buttonLabel="Submit a Challenge"
	onClick={() => console.log('Challenge submitted')}
/>
<FunctionHero
	name="CrowdsourcedRewards"
	msg="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla
          qui aspernatur sunt facere. Qui minus animi ex nisi optio!"
	buttonLabel="Submit a Reward"
	onClick={() => console.log('Reward submitted')}
/>

<style>
</style>
