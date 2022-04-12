import Link from "next/link";
import { useRouter } from "next/router"

function CoffeeStore() {
  const router = useRouter();
  console.log(router)
  return (
    <div>Coffee Store Page {router.query.id}
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/dynamic">
        <a>Go to page dynamic</a>
      </Link>
    </div>
  )
}

export default CoffeeStore