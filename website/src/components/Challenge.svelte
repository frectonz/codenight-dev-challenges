<script lang="ts">
  import type { ChallengeData } from "../lib/validators";
  import { ArrowCircleUpIcon } from "@rgossiaux/svelte-heroicons/solid";

  export let challenge: ChallengeData;
</script>

<div class="p-2 md:p-4 border border-black">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    <div class="flex justify-center items-center">
      <img src={challenge.image} class="w-[300px] border border-black" alt="" />
    </div>
    <div class="flex flex-col justify-center gap-2">
      <h1 class="text-red-500 font-bold">{"{"}</h1>
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
        <img
          src={challenge.createdBy.photoURL}
          class="w-8 h-8 rounded-full"
          alt=""
        />
        "{challenge.createdBy.name}",
      </div>
      <p class="md:ml-5">
        <span class="font-bold">difficulty</span> : "{challenge.difficulty}",
      </p>
      <h1 class="text-red-500 font-bold">{"}"}</h1>
    </div>
  </div>

  <div class="flex flex-row justify-end">
    <button class="w-10 h-10 rounded-sm md:mb-auto hover:scale-90">
      <ArrowCircleUpIcon />
    </button>
  </div>
</div>
