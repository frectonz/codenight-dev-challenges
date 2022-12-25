<script lang="ts">
  import type { ChallengeErrors } from "../lib/validators";

  import { addChallenge } from "../lib/firebase";
  import { validateChallengeMetadata } from "../lib/validators";

  import FormErrors from "./FormErrors.svelte";

  let challenge = {
    title: "",
    description: "",
    difficulty: "",
  };
  let files;
  let error: ChallengeErrors | null = null;
  let imageError: string | null = null;
  let status: "idle" | "submitting" | "success" | "error" = "idle";

  function submitChallenge() {
    const challengeMetadata = validateChallengeMetadata.safeParse(challenge);

    if (challengeMetadata.success === false) {
      error = challengeMetadata.error.format();

      if (!files || files.length === 0) {
        imageError = "Please upload an image";
      }

      return;
    }

    if (!files || files.length === 0) {
      imageError = "Please upload an image";
      error = null;
      return;
    }

    error = null;
    imageError = null;

    const image = files[0];
    const data = challengeMetadata.data;

    status = "submitting";
    addChallenge(
      {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
      },
      image
    )
      .then(() => {
        status = "success";
        files = null;
        challenge = {
          title: "",
          description: "",
          difficulty: "",
        };
      })
      .catch((err) => {
        status = "error";
        console.error(err);
      });
  }
</script>

<h1>
  <span class="text-red-500 font-bold">const</span>
  <span>challenge</span>
  <span> = </span>
  <span class="font-bold text-red-500">{"{"}</span>
</h1>

<div class="ml-5 flex items-start md:flex-row flex-col">
  <span class="font-bold">title:</span>
  <div class="md:w-[80%] w-full">
    <input
      bind:value={challenge.title}
      type="text"
      class="bg-transparent border border-black w-full outline-none p-1"
    />
    {#if error?.title}
      <FormErrors errors={error.title?._errors} />
    {/if}
  </div>
</div>

<div class="ml-5 flex items-start md:flex-row flex-col">
  <span class="font-bold">description:</span>
  <div class="md:w-[80%] w-full">
    <textarea
      bind:value={challenge.description}
      rows="5"
      class="bg-transparent border border-black w-full outline-none p-1"
    />
    {#if error?.description}
      <FormErrors errors={error.description?._errors} />
    {/if}
  </div>
</div>

<div class="ml-5 flex items-start md:flex-row flex-col">
  <span class="font-bold">difficulty:</span>
  <div class="md:w-[80%] w-full">
    <select
      bind:value={challenge.difficulty}
      class="bg-transparent border border-black w-full outline-none p-1"
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
    {#if error?.difficulty}
      <FormErrors errors={error.difficulty?._errors} />
    {/if}
  </div>
</div>

<div class="ml-5 flex items-start md:flex-row flex-col">
  <span class="font-bold">image?:</span>
  <div>
    <input bind:files type="file" accept="image/png, image/jpeg" />
    {#if imageError}
      <FormErrors errors={[imageError]} />
    {/if}
  </div>
</div>

<h1><span class="text-red-500">{"}"}</span>;</h1>

<h1>
  <span class="font-bold text-red-500">const</span>
  <span class="font-bold"> status</span>
  <span> = </span>
  <span
    class={status === "success"
      ? "text-green-500"
      : status === "error"
      ? "text-red-600"
      : ""}>"{status}"</span
  >
</h1>

<button
  class="bg-black text-white px-4 py-2 mt-4 hover:scale-95 disabled:opacity-50"
  on:click={submitChallenge}
  disabled={status === "submitting"}
>
  <span class="text-red-500 font-bold">submitChallenge</span>(<span
    >challenge</span
  >);
</button>
