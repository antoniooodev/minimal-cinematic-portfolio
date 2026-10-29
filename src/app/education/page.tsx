import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Timeline } from "@/components/Timeline";
import { education } from "@/content/site";
import { formatPeriod } from "@/lib/format";

export const metadata: Metadata = {
  title: "Education",
  description: "Degrees, schools and the subjects that shaped the way I work.",
};

export default function EducationPage() {
  return (
    <>
      <PageHeader
        index="02"
        title="Education"
        accent="& study"
        lede="The degrees and courses behind my work, and what I focused on along the way."
        count={education.length}
      />
      <Timeline
        items={education.map((item) => ({
          key: `${item.school}-${item.degree}`,
          period: formatPeriod(item.start, item.end),
          title: item.degree,
          org: item.school,
          orgUrl: item.schoolUrl,
          location: item.location,
          summary: item.summary,
          highlights: item.highlights,
        }))}
      />
    </>
  );
}
