<script lang="ts">
  import { user } from "../lib/store";
</script>

<main class="font-mono">
  <h1 class="text-2xl mx-2 my-10 md:mx-5 xl:mx-20">
    <span class="text-red-500 font-bold">sayHi</span>("{$user.displayName}");
  </h1>
</main>
