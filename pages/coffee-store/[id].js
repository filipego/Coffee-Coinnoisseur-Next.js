import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from "../../Data/coffee-stores.json";
import Head from "next/head";

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      coffeeStore: coffeeStoresData.find(coffeeStore => {
        return coffeeStore.id.toString() === params.id;
    }),
    },
  };
}


export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) =>{
    return{
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return{
    paths,
    fallback: true
  }
}

function CoffeeStore({coffeeStore}) {
  const router = useRouter();
  console.log(router)


  if(router.isFallback){
    return(
      <div>Loading ..</div>
    )
  }

  const {address, name, neighbourhood } = coffeeStore;

  return (
    <div>
      <Head><title>{name}</title></Head>
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  )
}

export default CoffeeStore