import { useSelector } from 'react-redux'
import PageHeading from '../components/PageHeading'
import Products from '../components/Products'
// const prods = [...products.slice(0, 4)]

const WishList = () => {
  const wishList = useSelector((state) => state.wish)

  return (
    <section className='wishlist container'>
      <PageHeading title='Wishlist' />
      <Products title='Wish list' products={wishList.items} />
    </section>
  )
}

export default WishList
