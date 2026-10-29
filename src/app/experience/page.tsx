import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Timeline } from "@/components/Timeline";
import { experience } from "@/content/site";
import { formatPeriod } from "@/lib/format";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work experience, roles and the things built along the way.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        index="01"
        title="Work"
        accent="experience"
        lede="Where I have worked, what I was responsible for and the tools I used to get it done."
        count={experience.length}
      />
      <Timeline
        items={experience.map((item) => ({
          key: `${item.company}-${item.role}`,
          period: formatPeriod(item.start, item.end),
          title: item.role,
          org: item.company,
          orgUrl: item.companyUrl,
          location: item.location,
          summary: item.summary,
          highlights: item.highlights,
          tags: item.stack,
        }))}
      />
    </>
  );
}
