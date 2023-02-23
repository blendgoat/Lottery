import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "m777u60f",
  dataset: "production",
  apiVersion: "2022-03-25",
  token: `${process.env.NEXT_PUBLIC_SANTOKEN}`,
  useCdn: false,
});
