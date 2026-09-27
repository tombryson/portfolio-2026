import Image from "next/image";
import { ElasticDots } from "@/components/ui/ElasticDots";
import { PortraitSurface } from "@/components/ui/PortraitSurface";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <ElasticDots />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="hero-name" className={styles.name}>
            <span className={styles.firstName}>
              Tom
              <span className={styles.bolt} aria-hidden="true">
                <Image
                  src="/personality/lightning.png"
                  alt=""
                  fill
                  sizes="(max-width: 600px) 64px, 96px"
                  className={styles.boltImage}
                />
              </span>
            </span>
            <span className={styles.surname}>Bryson.</span>
          </h1>
          <p className={styles.role}>Software engineer. Dev Ops. AI.</p>
          <p className={styles.intro}>
            Turning complicated ideas into clear, usable software&mdash;from
            portfolio analysis to children&rsquo;s language learning.
          </p>
          <div className={styles.actions}>
            <a href="#projects" className={styles.workButton}>
              Explore my work <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className={styles.portraitSlot} data-portrait-anchor>
          <figure className={styles.portrait}>
            <PortraitSurface className={styles.photo}>
              <Image
                src="/portrait-tom-bryson3.png"
                alt="Tom Bryson smiling"
                fill
                preload
                sizes="(max-width: 420px) 85vw, (max-width: 760px) 360px, (max-width: 1280px) 36vw, 440px"
                className={styles.portraitImage}
              />
            </PortraitSurface>
          </figure>
        </div>
      </div>
    </section>
  );
}
