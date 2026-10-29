import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectList } from "@/components/ui/ProjectList";
import { projects } from "@/content/site";
import { pad } from "@/lib/format";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects: products, open source and experiments.",
};

export default function ProjectsPage() {
  const years = projects.map((project) => Number(project.year));
  const categories = new Set(projects.map((project) => project.category)).size;

  return (
    <>
      <PageHeader
        index="03"
        label="Projects"
        title="Selected"
        accent="work"
        lede="Products, open-source libraries and experiments. Filter by category, switch layout, and hover a project to preview it."
        meta={[
          { label: "Projects", value: pad(projects.length) },
          { label: "Categories", value: pad(categories) },
          { label: "Years", value: `${Math.min(...years)}–${String(Math.max(...years)).slice(2)}` },
        ]}
      />
      <ProjectList projects={projects} />
    </>
  );
}
