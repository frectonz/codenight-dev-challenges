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
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from "@rgossiaux/svelte-headlessui";
  import {
    ChevronRightIcon,
    ArrowCircleUpIcon,
  } from "@rgossiaux/svelte-heroicons/solid";

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
        <Disclosure class="border border-black p-2 mt-4" let:open>
          <DisclosureButton
            class="flex justify-between items-center w-full bg-black text-white px-4 py-2"
            >Create Challenge

            <ChevronRightIcon
              class="w-8 h-8"
              style={open ? "transform: rotate(90deg);" : ""}
            />
          </DisclosureButton>

          <DisclosurePanel class="mt-4 grid grid-cols-1 gap-3">
            <h1>
              <span class="text-red-500 font-bold">const</span>
              <span>challenge</span>
              <span> = </span>
              <span class="font-bold text-red-500">{"{"}</span>
            </h1>

            <div class="ml-5">
              <span class="font-bold">title</span>
              <span>: </span>"<input
                type="text"
                class="bg-transparent border border-black w-[70%] outline-none p-1"
              />",
            </div>

            <div class="ml-5 flex items-start">
              <span class="font-bold">description</span>
              <span class="mr-4">:</span>
              <span>"</span>
              <textarea
                type="text"
                rows="5"
                class="bg-transparent border border-black w-[70%] outline-none p-1"
              />
              <span>",</span>
            </div>

            <div class="ml-5 flex items-start">
              <span class="font-bold">image?</span>
              <span class="mr-4">:</span>
              <span>"</span>
              <input type="file" accept="image/*" />
              <span>",</span>
            </div>

            <h1><span class="text-red-500">{"}"}</span>;</h1>

            <button class="bg-black text-white px-4 py-2 mt-4 hover:scale-95">
              <span class="text-red-500 font-bold">submitChallenge</span>(<span
                >challenge</span
              >);
            </button>
          </DisclosurePanel>
        </Disclosure>

        {#each challenges as challenge}
          <div
            class="p-2 md:p-4 flex flex-col md:flex-row gap-5 border border-black my-5"
          >
            <button class="w-10 h-10 rounded-sm md:mb-auto hover:scale-90">
              <ArrowCircleUpIcon />
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
              <h1 class="text-red-500 font-bold">{"}"}</h1>
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
