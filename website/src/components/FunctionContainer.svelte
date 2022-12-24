<script lang="ts">
  export let name: string;
</script>

<main>
  <h1>
    <span class="text-red-500 font-bold">function </span>
    <span class="font-bold">{name}()</span>
    <span class="text-red-500 font-bold">{"{"}</span>
  </h1>
  <section class="ml-3 md:ml-10">
    <slot />
  </section>
  <h1 class="text-red-500 font-bold">{"}"}</h1>
</main>
