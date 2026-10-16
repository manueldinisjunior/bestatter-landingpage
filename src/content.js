import {
  Leaf,
  Fire,
  Waves,
  HandsPraying,
  Heart,
  Handshake,
} from "@phosphor-icons/react";

export const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo eget magna fermentum iaculis. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const exampleNames = [
  "Anna Müller",
  "Thomas Schmidt",
  "Sabine Schneider",
  "Michael Fischer",
  "Claudia Weber",
  "Andreas Hoffmann",
];
const exampleTexts = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante, etiam sit amet orci eget eros.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Mauris sollicitudin fermentum libero. Praesent nonummy mi in odio. Pellentesque auctor neque nec urna, aenean viverra rhoncus pede.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  "Curabitur ullamcorper ultricies nisi. Nam eget dui, etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.",
  "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum, aenean imperdiet.",
  "Integer tincidunt. Cras dapibus, vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet.",
];
const exampleRatings = [4, 4.5, 5, 4, 5, 4.5];
export const testimonials = exampleNames.map((name, index) => ({
  name,
  text: exampleTexts[index],
  rating: exampleRatings[index],
}));
export const services = [
  {
    title: "Allgemeine Beratung",
    Icon: Handshake,
    text: "Integer tincidunt. Cras dapibus, vivamus elementum semper nisi. Aenean vulputate eleifend tellus.",
  },
  {
    title: "Erdbestattung",
    Icon: Leaf,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae sapien ut libero venenatis faucibus.",
  },
  {
    title: "Feuerbestattung",
    Icon: Fire,
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Seebestattung",
    Icon: Waves,
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Bestattungsvorsorge",
    Icon: HandsPraying,
    text: "Curabitur ullamcorper ultricies nisi. Nam eget dui, etiam rhoncus. Maecenas tempus, tellus eget condimentum.",
  },
  {
    title: "Trauerfeier",
    Icon: Heart,
    text: "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
  },
];
