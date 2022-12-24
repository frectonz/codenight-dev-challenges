<script lang="ts">
  import type { Link } from "../lib/types";

  import { user } from "../lib/store";
  import { auth } from "../lib/firebase";
  import NavBar from "../components/NavBar.svelte";

  const navLinks: Link[] = [
    {
      type: "button",
      name: "Log Out",
      onClick: () => {
        auth.signOut();
      },
    },
  ];
</script>

<NavBar links={navLinks} />

<h1 class="mx-2 md:mx-5 p-4 text-xl">
  <span class="text-red-500 font-bold">sayHi</span>("{$user.displayName}");
</h1>
