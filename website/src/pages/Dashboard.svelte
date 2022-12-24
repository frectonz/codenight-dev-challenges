<script lang="ts">
  import type { Link } from "../lib/types";

  import { user } from "../lib/store";
  import { auth } from "../lib/firebase";
  import NavBar from "../components/NavBar.svelte";
  import FunctionContainer from "../components/FunctionContainer.svelte";

  import {
    Tab,
    TabList,
    TabGroup,
    TabPanel,
    TabPanels,
  } from "@rgossiaux/svelte-headlessui";
  import GoArrowUp from "svelte-icons/go/GoArrowUp.svelte";

  const navLinks: Link[] = [
    {
      type: "button",
      name: "logOut();",
      onClick: () => {
        auth.signOut();
      },
    },
  ];

  const tabs = ["challenges", "projects", "rewards"];

  const challenges = [
    {
      id: "1",
      title: "Challenge 1",
      description: "This is a challenge",
      image: "https://picsum.photos/200",
      votes: 100,
      createdAt: new Date(Date.now() - 10000),
      updatedAt: new Date(Date.now() - 100),
      claims: 24,
    },
  ];

  const numberFormatter = new Intl.NumberFormat("en-US");
  const relativeTimeFormatter = new Intl.RelativeTimeFormat("en-US", {
    numeric: "auto",
  });
</script>

<NavBar links={navLinks} avatarUrl={$user.photoURL} />

<h1 class="mx-2 md:mx-5 p-4 text-xl">
  <span class="text-red-500 font-bold">sayHi</span>("{$user.displayName}");
</h1>

<TabGroup class="mx-2 md:mx-5">
  <TabList class="py-4 grid grid-cols-1 md:grid-cols-3">
    {#each tabs as tab}
      <Tab
        class={({ selected }) =>
          `border border-black px-2 py-4 ${selected && "bg-black text-white"}`}
      >
        <span class="text-red-500 font-bold">{tab}</span>();
      </Tab>
    {/each}
  </TabList>
  <TabPanels class="p-4 border border-black">
    <TabPanel>
      <FunctionContainer name="challenges">
        {#each challenges as challenge}
          <div
            class="p-2 md:p-4 flex flex-col md:flex-row gap-5 border border-black my-5"
          >
            <button
              class="w-10 h-10 bg-black text-red-500 rounded-sm md:mb-auto hover:scale-90"
            >
              <GoArrowUp />
            </button>
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
              <p class="ml-5">
                <span class="font-bold">updated</span> : "{relativeTimeFormatter.format(
                  challenge.updatedAt.getTime() - Date.now(),
                  "seconds"
                )}",
              </p>
              <h1 class="text-red-500 font-bold">{"{"}</h1>
            </div>
          </div>
        {/each}
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
