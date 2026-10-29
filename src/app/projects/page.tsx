import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectList } from "@/components/ui/ProjectList";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects: products, open source and experiments.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        label="Projects"
        title="Selected *work*"
        lede="Products, open-source libraries and experiments, from the most recent."
      />
      <div className="container">
        <ProjectList projects={projects} filterable />
      </div>
    </>
  );
}
