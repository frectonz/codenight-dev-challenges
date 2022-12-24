export type Link =
  | { type: "link"; name: string; href: string }
  | { type: "button"; name: string; onClick: () => void };