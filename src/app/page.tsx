import { Hero } from "@/components/hero/hero";
import { SkillsTicker } from "@/components/skills-ticker";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { ProjectsSection } from "@/components/sections/projects";
import { FooterCTA } from "@/components/sections/footer-cta";
import { StickyProgressClient } from "@/components/sticky-progress-client";
import { SectionLotties } from "@/components/section-lotties";
import { lottiePaths } from "@/data/content";

export default function Home() {

  return (
    <>
      <main className="bg-background text-foreground">
        <div className="relative">
          <Hero />
          <SectionLotties
            lottiePaths={lottiePaths}
            positions={[
              // Left side (2)
              { top: "10%", left: "3%", size: 90 },
              { top: "55%", left: "6%", size: 80 },
              // Right side (2) - positioned to avoid music widget
              { top: "40%", right: "4%", size: 85 },
              { top: "75%", right: "8%", size: 75 },
            ]}
          />
        </div>

        <div className="relative">
          <SkillsTicker />
          <SectionLotties
            lottiePaths={lottiePaths}
            positions={[
              // Left side (2)
              { top: "15%", left: "4%", size: 85 },
              { top: "60%", left: "8%", size: 80 },
              // Right side (2)
              { top: "25%", right: "3%", size: 90 },
              { top: "70%", right: "6%", size: 75 },
            ]}
          />
        </div>

        <div className="relative">
          <ExperienceSection />
          <SectionLotties
            lottiePaths={lottiePaths}
            positions={[
              // Left side (2)
              { top: "12%", left: "2%", size: 85 },
              { top: "45%", left: "5%", size: 90 },
              // Right side (2)
              { top: "28%", right: "3%", size: 80 },
              { top: "68%", right: "6%", size: 95 },
            ]}
          />
        </div>

        <div className="relative">
          <EducationSection />
          <SectionLotties
            lottiePaths={lottiePaths}
            positions={[
              // Left side (2)
              { top: "18%", left: "4%", size: 80 },
              { top: "55%", left: "7%", size: 85 },
              // Right side (2)
              { top: "30%", right: "5%", size: 90 },
              { top: "72%", right: "3%", size: 80 },
            ]}
          />
        </div>

        <div className="relative">
          <ProjectsSection />
          <SectionLotties
            lottiePaths={lottiePaths}
            positions={[
              // Left side (2)
              { top: "15%", left: "3%", size: 85 },
              { top: "50%", left: "6%", size: 80 },
              // Right side (2)
              { top: "25%", right: "4%", size: 90 },
              { top: "65%", right: "5%", size: 85 },
            ]}
          />
        </div>

        <div className="relative">
          <FooterCTA />
          <SectionLotties
            lottiePaths={lottiePaths}
            positions={[
              // Left side (2)
              { top: "12%", left: "5%", size: 80 },
              { top: "55%", left: "3%", size: 85 },
              // Right side (2)
              { top: "25%", right: "6%", size: 90 },
              { top: "70%", right: "4%", size: 80 },
            ]}
          />
        </div>
      </main>
      <StickyProgressClient />
    </>
  );
}
