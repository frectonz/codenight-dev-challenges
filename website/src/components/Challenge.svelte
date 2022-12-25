<script lang="ts">
  import { ArrowCircleUpIcon } from "@rgossiaux/svelte-heroicons/solid";

  export let challenge: {
    image: string;
    title: string;
    description: string;
    votes: number;
    claims: number;
    createdAt: Date;
  };

  const numberFormatter = new Intl.NumberFormat("en-US");
  const relativeTimeFormatter = new Intl.RelativeTimeFormat("en-US", {
    numeric: "auto",
  });
</script>

<div class="p-2 md:p-4 border border-black">
  <div class="flex flex-col md:flex-row gap-5">
    <img class="w-fit" src={challenge.image} alt="" />
    <div>
      <h1 class="text-red-500 font-bold">{"{"}</h1>
      <p class="ml-5">
        <span class="font-bold">title</span> : "{challenge.title}",
      </p>
      <p class="ml-5">
        <span class="font-bold">description</span> : "{challenge.description}",
      </p>
      <p class="ml-5">
        <span class="font-bold">votes</span> : "{numberFormatter.format(
          challenge.votes
        )}",
      </p>
      <p class="ml-5">
        <span class="font-bold">claims</span> : "{numberFormatter.format(
          challenge.claims
        )}",
      </p>
      <p class="ml-5">
        <span class="font-bold">created</span> : "{relativeTimeFormatter.format(
          challenge.createdAt.getTime() - Date.now(),
          "seconds"
        )}",
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
