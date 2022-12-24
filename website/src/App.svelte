<script lang="ts">
  import { user } from "./lib/store";
  import { auth } from "./lib/firebase";
  import Home from "./pages/Home.svelte";
  import Dashboard from "./pages/Dashboard.svelte";

  auth.onAuthStateChanged((u) => {
    console.log(u);
    $user = u;
  });
</script>

<main class="font-mono">
  {#if $user}
    <Dashboard />
  {:else}
    <Home />
  {/if}
</main>
