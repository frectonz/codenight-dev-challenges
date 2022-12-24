<script lang="ts">
  import type { Link } from "../lib/types";
  export let links: Link[];
  export let avatarUrl: string | undefined = undefined;
</script>

<header
  class="mx-2 md:mx-5 p-4 flex justify-between items-center flex-wrap gap-5 border-b border-black"
>
  <a href="/" class="text-xl md:text-2xl">
    <span class="text-red-500 font-bold">CodeNightDevChallenges</span>();
  </a>
  <nav class="flex flex-wrap gap-5">
    {#each links as link}
      {#if link.type === "link"}
        <a href={link.href} class="px-4 py-2 bg-black text-white hover:scale-90"
          >{link.name}</a
        >
      {:else if link.type === "button"}
        <button
          class="px-4 py-2 bg-black text-white hover:scale-90"
          on:click={link.onClick}>{link.name}</button
        >
      {/if}
    {/each}

    {#if avatarUrl}
      <img src={avatarUrl} alt="avatar" class="w-10 h-10 rounded-full" />
    {/if}
  </nav>
</header>
