<script lang="ts">
	export let errors: string[];
</script>

{#each errors as error}
	<p class="text-red-500 text-sm">{error}</p>
{/each}
