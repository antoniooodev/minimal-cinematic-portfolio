import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProjectList } from "@/components/ProjectList";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects in machine learning, computer vision and web development.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        index="03"
        title="Selected"
        accent="projects"
        lede="Things I have designed, trained and shipped. Filter by technology or open a project to read the code."
        count={projects.length}
      />
      <ProjectList projects={projects} />
    </>
  );
}
