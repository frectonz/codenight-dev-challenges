<script lang="ts">
  import type { Link } from "../lib/types";

  import { user } from "../lib/store";
  import { auth } from "../lib/firebase";
  import NavBar from "../components/NavBar.svelte";
  import FunctionContainer from "../components/FunctionContainer.svelte";
  import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from "@rgossiaux/svelte-headlessui";

  const navLinks: Link[] = [
    {
      type: "button",
      name: "Log Out",
      onClick: () => {
        auth.signOut();
      },
    },
  ];

  const tabs = ["challenges", "projects", "rewards"];
</script>

<NavBar links={navLinks} />

<h1 class="mx-2 md:mx-5 p-4 text-xl">
  <span class="text-red-500 font-bold">sayHi</span>("{$user.displayName}");
</h1>

<TabGroup class="mx-2 md:mx-5 p-4 border border-black">
  <TabList class="py-4 grid grid-cols-3 h-20">
    {#each tabs as tab}
      <Tab
        class={({ selected }) =>
          `border border-black ${selected && "bg-black text-white"}`}
      >
        <span class="text-red-500 font-bold">{tab}</span>();
      </Tab>
    {/each}
  </TabList>
  <TabPanels>
    <TabPanel>
      <FunctionContainer name="challenges">
        <p>challenges go here</p>
      </FunctionContainer>
    </TabPanel>
    <TabPanel>
      <FunctionContainer name="projects">
        <p>projects go here</p>
      </FunctionContainer>
    </TabPanel>
    <TabPanel>
      <FunctionContainer name="rewards">
        <p>rewards go here</p>
      </FunctionContainer>
    </TabPanel>
  </TabPanels>
</TabGroup>
