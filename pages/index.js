import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.scss"
import Banner from "../components/banner"
import Card from "../components/card"
import coffeeStoresData from "../data/coffee-stores.json"

export async function getStaticProps(context) {
  console.log("Hi getStaticProps");
  return {
    props: {
      coffeeStores: coffeeStoresData,
    }, 
  }
}

export default function Home({coffeeStores}) {

  console.log(coffeeStores);

  const handleOnBannerButtonClick = () => {
    console.log("Hi, banner button")
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Discover your local coffee shops!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner  
          buttonText="View stores nearby" 
          handleOnClick={handleOnBannerButtonClick}
        />
        <div className={styles.heroImage}>
        <Image src="/static/hero-image.png" 
          width={700} 
          height={400}
        />
        </div>
        {coffeeStores.length > 0 && 
        <>
          <h2 className={styles.heading2}>Toronto stores</h2>
          <div className={styles.cardLayout}>
          {coffeeStores.map((coffeeStore) => {
            const {name, imgUrl, id} = coffeeStore;
            return(
              <Card 
                key={id}
                name={name} 
                imgUrl={imgUrl} 
                href={`/coffee-store/${id}`} 
              />
            )
          })}
          </div>
        </>}
      </main>

    </div>
  )
}
