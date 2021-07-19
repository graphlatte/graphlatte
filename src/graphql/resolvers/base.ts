import { sleep } from "@/library/sleep";
import { queryField } from "nexus";

export const hello = queryField("hello", {
  type: "String",
  async resolve() {
    // simulate database delay
    await sleep(1000);

    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc semper vitae enim feugiat imperdiet. Aenean feugiat dapibus consectetur. Nunc et ante elementum, tempor risus ac, laoreet odio. In hac habitasse platea dictumst.";
  },
});

export const random = queryField("random", {
  type: "Int",
  async resolve() {
    return Math.floor(Math.random() * 100_000_000);
  },
});
