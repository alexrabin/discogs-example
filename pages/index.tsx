import { GetStaticProps } from "next";
import Image from "next/image";
import DiscogRecord from "../models/DiscogRecord";
import DiscogResponse from "../models/DiscogResponse";
import styles from "../styles/Home.module.css";

interface PageProps {
  records: DiscogRecord[];
}

export default function Home({ records }: PageProps) {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.grid}>
          {records.map((record, i) => {
            return (
              <a
                key={i}
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2>
                  {record.basic_information.title} -{" "}
                  {record.basic_information.artists[0].name}
                </h2>
                <div className={styles.imageContainer}>
                  <Image
                    src={record.basic_information.cover_image}
                    alt={record.basic_information.title}
                    fill
                    priority
                  />
                </div>
              </a>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch(
      `https://api.discogs.com/users/alexrabin/collection/folders/0/releases?token=${process.env.DISCOG_TOKEN}&per_page=100&sort=artist`
    );

    const data = (await response.json()) as DiscogResponse;
    return {
      props: {
        records: data.releases,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
};
