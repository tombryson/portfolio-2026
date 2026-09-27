import { ContainerScroll } from "@/components/ui/ContainerScroll";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import styles from "./AlphaEdgeShowcase.module.css";

const tags = ["Go", "React", "TradingView API", "SQLite", "Google Apps Script"];

export function AlphaEdgeShowcase() {
  return (
    <section id="featured-project" className={styles.section} aria-labelledby="alpha-edge-title">
      <ContainerScroll
        titleComponent={
          <div className={styles.heading}>
            <p className={styles.label}>Featured project</p>
            <h2 id="alpha-edge-title" className={styles.title}>Alpha Edge</h2>
            <p className={styles.description}>
              Investment research, real-time signals and portfolio tracking,
              brought together in one place.
            </p>
            <p className={styles.stack}>{tags.join(" · ")}</p>
          </div>
        }
      >
        <VideoPlayer
          poster="/projects/alpha-edge/demo-poster.webp"
          posterAlt="Alpha Edge Positions view: ASX holdings grouped by sector with trend, value and profit-and-loss columns, an alert stack down the left, and ETF allocation and portfolio summary panels on the right."
          sources={[{ src: "/projects/alpha-edge/demo.mp4", type: "video/mp4" }]}
          label="Watch the Alpha Edge tour"
          duration="2 min"
          width={1920}
          height={1080}
        />
      </ContainerScroll>
    </section>
  );
}
