import type { Metadata } from "next";
import { EntryList } from "@/components/ui/EntryList";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { experience, toolbox } from "@/content/site";
import { formatPeriod } from "@/lib/format";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work experience, roles and the tools used along the way.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        label="Experience"
        title="Work *experience*"
        lede="Where I have worked, what I was responsible for and the tools I used to get it done."
      />

      <EntryList
        entries={experience.map((item) => ({
          key: `${item.company}-${item.role}`,
          period: formatPeriod(item.start, item.end),
          meta: `${item.type} · ${item.location}`,
          title: item.role,
          org: item.company,
          orgUrl: item.companyUrl,
          summary: item.summary,
          highlights: item.highlights,
          tags: item.stack,
        }))}
      />

      <Section label="Toolbox">
        <dl className={styles.toolbox}>
          {toolbox.map((group, i) => (
            <div key={group.group} className={styles.group} data-reveal style={{ "--d": i } as React.CSSProperties}>
              <dt className="label">{group.group}</dt>
              <dd className={styles.tools}>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
