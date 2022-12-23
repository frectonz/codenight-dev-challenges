<script lang="ts">
  export let name: string;
  export let msg: string;
  export let buttonLabel: string;
  export let onClick: () => void;
</script>

<section class="mx-2 my-10 md:mx-5 xl:mx-20 grid grid-cols-1 md:grid-cols-2">
  <div
    class="border border-black p-4 flex justify-center items-center min-h-[400px]"
  >
    <div class="flex flex-col gap-2 text-lg">
      <h1 class="font-bold text-xl">
        <span class="text-red-500">function</span> <span>{name}</span>
        <span class="text-red-500">{"{"}</span>
      </h1>

      <p class="ml-5">
        <span class="text-red-500 font-bold">const</span>
        <span class="font-bold">msg</span>
        <span class="font-bold italic"> = </span>
        "{msg}";
      </p>

      <p class="ml-5">
        <span class="text-red-500 font-bold">alert</span>(<span
          class="font-bold">msg</span
        >);
      </p>

      <p class="text-red-500">{"}"}</p>

      <button
        class="w-fit bg-black text-white px-4 py-2 text-sm"
        on:click={onClick}
      >
        {buttonLabel}
      </button>
    </div>
  </div>
  <div class="bg-stone-600 min-h-[200px]" />
</section>
