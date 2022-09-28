import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { getConfig, updateConfig } from "../services/db/config";
import { addPrice, getLastAddedPrice } from "../services/db/prices";
import styles from "../styles/Home.module.css";
import connectToDb from "../services/db/connectToDb";
import getGoldPrices from "../services/api/getGoldPrices";
import flags from "../constants/flags";

dayjs.extend(utc);
dayjs.extend(timezone);

type Price = {
  currency: string;
  ounce: string;
  gram: string;
};

type iProps = {
  prices: Price[];
  lastUpdate: string;
};

const Home: NextPage<iProps> = ({ prices, lastUpdate }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gold Price Today</title>
        <meta
          name="description"
          content="Global gold price, gold ounce, gold ounce price, gold price today"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Gold Price Today</h1>
        <p className={styles.subtitle}>{lastUpdate} (Saudi Arabia Time)</p>
        <div className={styles["grid-container"]}>
          <div className={styles.grid + " " + styles.centerContent}>
            <Image
              src="/coin.png"
              alt="Golden ounce"
              width={300}
              height={271}
            />
            <p>
              1 Gram <sub>(24 karat)</sub>
            </p>
            <div className={styles.pricesTableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>Currency</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {prices.map((el, ind) => (
                    <tr key={ind}>
                      <td>
                        {flags[el.currency]} {el.currency}
                      </td>
                      <td>{el.gram}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.grid + " " + styles.centerContent}>
            <Image
              src="/ounce.png"
              alt="Golden ounce"
              width={300}
              height={300}
            />
            <p>
              Ounce <sub>(31.1 grams)</sub>
            </p>
            <div className={styles.pricesTableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>Currency</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {prices.map((el, ind) => (
                    <tr key={ind}>
                      <td>
                        {flags[el.currency]} {el.currency}
                      </td>
                      <td>{el.ounce}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by Ashraf Ainia |
        <a
          className={styles.footerLogo}
          href="https://www.linkedin.com/in/ashraf-ainea"
        >
          <Image
            src="/linkedIn_logo.png"
            alt="linkedin logo"
            width={20}
            height={20}
          />
        </a>
        <a className={styles.footerLogo} href="https://github.com/ashraf-ainia">
          <Image
            src="/github_logo.png"
            alt="Github logo"
            className={styles.img}
            width={20}
            height={20}
          />
        </a>
      </footer>
    </div>
  );
};

export async function getServerSideProps() {
  let pricesResults = {};
  const client = await connectToDb();
  const config = await getConfig(client);

  // check if last data fetch is done before TIME_DELAY_IN_HOURS hours
  // adding 3 hours because of Asia/Riyadh timezone and vercel server is using utc
  const currentDate = dayjs(
    dayjs().add(3, "hours").format("YYYY/MMM/DD HH:mm")
  );

  const lastFetchDate = dayjs(config.lastModificationDate);
  const diff = currentDate.diff(lastFetchDate, "hour");

  if (diff >= parseInt(process.env.TIME_DELAY_IN_HOURS as string)) {
    const data = await getGoldPrices();
    if (!data) {
      return {
        redirect: {
          permanent: false,
          destination: "/error",
        },
      };
    }

    await updateConfig(client, config.id, currentDate.toDate());
    const newPrices: dbPrice = {
      usdOunce: data.rates.USD,
      sarOunce: data.rates.SAR,
      aedOunce: data.rates.AED,
      bhdOunce: data.rates.BHD,
      egpOunce: data.rates.EGP,
      createdAt: currentDate.toDate(),
    };
    addPrice(client, newPrices);
    pricesResults = newPrices;
  } else {
    const lastAddedPrice = await getLastAddedPrice(client);
    pricesResults = lastAddedPrice;
  }

  const prices: Price[] = [];
  Object.entries(pricesResults).forEach((el) => {
    if (el[0].match(/Ounce/g)) {
      prices.push({
        currency: el[0].toString().substr(0, 3),
        ounce: parseFloat(el[1] as string)
          .toFixed(2)
          .toString(),
        gram: ((el[1] as number) / 31.103).toFixed(2).toString(),
      });
    }
  });

  return {
    props: {
      prices,
      lastUpdate: lastFetchDate.format("YYYY/MMM/DD HH:mm"),
    },
  };
}

export default Home;
