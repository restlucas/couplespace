import { PageOptions } from "./page-options";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Couplespace | Dashboard",
  description: "Guarde seu amor!",
};

export default async function Dashboard() {
  return <PageOptions />;
}
