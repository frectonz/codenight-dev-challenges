<script lang="ts">
  import { loginWithGitHub } from "./lib/firebase";
  import FunctionHero from "./components/FunctionHero.svelte";
  import ListSection from "./components/ListSection.svelte";

  const features = [
    {
      name: "Language Independent",
      icon: "🌐",
      description:
        "Write your code in any language you want. We support over 20 languages.",
    },
    {
      name: "Open Source",
      icon: "📖",
      description:
        "We are open source and always will be. You can contribute to the project on GitHub.",
    },
    {
      name: "Helps You Learn",
      icon: "📚",
      description: "We help you learn by providing you with a code playground.",
    },
  ];

  const challengeTypes = [
    {
      name: "Build Web Apps",
      icon: "🌐",
    },
    {
      name: "Build Mobile Apps",
      icon: "📱",
    },
    {
      name: "Build Desktop Apps",
      icon: "💻",
    },
    {
      name: "Build CLI Apps",
      icon: "⌨",
    },
    {
      name: "Build Games",
      icon: "🎮",
    },
    {
      name: "Build Telegram Bots",
      icon: "🤖",
    },
  ];
</script>

<main class="font-mono">
  <FunctionHero
    name="CodeNightDevChallenges"
    msg="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla
          qui aspernatur sunt facere. Qui minus animi ex nisi optio!"
    buttonLabel="Continue with GitHub"
    onClick={loginWithGitHub}
  />

  <ListSection listName="features" list={features} />
  <ListSection listName="challengeTypes" list={challengeTypes} />

  <h1
    class="mx-2 mt-10 mb-5 md:mx-5 xl:mx-20 text-2xl md:text-4xl font-extrabold"
  >
    <span class="font-bold text-red-500">explain</span>(<span
      >"How it works"</span
    >);
  </h1>

  <FunctionHero
    name="CrowdsourcedChallenges"
    msg="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla
          qui aspernatur sunt facere. Qui minus animi ex nisi optio!"
    buttonLabel="Submit a Challenge"
    onClick={() => console.log("Challenge submitted")}
  />
  <FunctionHero
    name="CrowdsourcedRewards"
    msg="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla
          qui aspernatur sunt facere. Qui minus animi ex nisi optio!"
    buttonLabel="Submit a Reward"
    onClick={() => console.log("Reward submitted")}
  />
</main>
