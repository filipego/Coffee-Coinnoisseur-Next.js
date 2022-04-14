import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.scss"
import Banner from "../components/banner"
import Card from "../components/card"
import coffeeStoresData from "../data/coffee-stores.json"

export async function getStaticProps(context) {
  console.log("Hi getStaticProps");


  const response = await fetch('https://api.foursquare.com/v3/places/nearby?ll=43.65267326999575,-79.39545615725015&query=coffee stores&v=20220105', {
    "headers": {
      'Authorization': process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
    }
  })
  const data = await response.json();
   
  const transformedData = data?.results?.map((venue) => {
      return {
          id: venue.fsq_id,
          ...venue
      }}) || [];



  return {
    props: {
      coffeeStores: transformedData,
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
                imgUrl={imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'} 
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


