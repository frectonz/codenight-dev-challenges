<script lang="ts">
  export let links: { name: string; href: string }[];
</script>

<header
  class="mx-2 md:mx-5 p-4 flex justify-between items-center flex-wrap gap-5 border-b border-black"
>
  <h1 class="text-xl md:text-2xl">
    <span class="text-red-500 font-bold">CodeNightDevChallenges</span>();
  </h1>
  <nav class="flex flex-wrap gap-5">
    {#each links as link}
      <a href={link.href} class="px-4 py-2 bg-black text-white hover:scale-90"
        >{link.name}</a
      >
    {/each}
  </nav>
</header>
