import { AiOutlineMinus } from 'react-icons/ai'
import PageHeading from '../components/PageHeading'
import { IoAdd } from 'react-icons/io5'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getSwiperSlidesNumber } from '../utils'
import Product from '../components/Product'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../store/cart-slice'
import useHttp from '../hooks/useHttp'
import { RootState } from '../store'
import { productType } from '../App'

const ProductDetails = () => {
  const { prodId } = useParams()
  const products = useSelector((state: RootState) => state.prods.products)
  const [similarProds, setSimilarProds] = useState<productType[]>([])
  const product = products.find((product) => product._id.toString() === prodId)
  const [mainImage, setMainImage] = useState(product?.imageURL)
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const { sendData } = useHttp()
  useEffect(() => {
    const options = {
      method: 'GET',
    }

    sendData<productType[]>(
      `similar/${prodId}?cat=${product?.category.name}`,
      options,
      (res) => {
        if(res) {
          setSimilarProds(res)
        }
      }
    )
  }, [])

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => prev - 1)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const active = document.querySelector('.slide.active')
    active?.classList.remove('active')
    e.currentTarget.classList.add('active')
    setMainImage(e.currentTarget.getAttribute('id') || '')
  }

  return (
    <section className='container mb-16'>
      <PageHeading title='Product details' />
      <div className='product flex flex-col items-center lg:flex-row lg:items-start'>
        <div className='w-full sm:w-auto flex flex-col-reverse sm:flex-row '>
          {product?.images && product?.images.length > 0 && (
            <div className='w-full sm:w-[100px] slider col-span-1 overflow-hidden'>
              <Swiper
                // direction='horizontal'
                className='h-[100px] sm:h-[448px]'
                modules={[Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={4}
                spaceBetween={5}
                breakpoints={{
                  0: {
                    direction: 'horizontal',
                  },
                  640: {
                    direction: 'vertical',
                  },
                }}
              >
                {product.images.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    id={image}
                    className='slide flex justify-center items-center bg-secondary'
                    onClick={handleClick}
                  >
                    <img
                      className='w-full h-full object-cover'
                      src={import.meta.env.VITE_SERVER_API + image}
                      alt=''
                    />
                  </SwiperSlide>
                ))}
                {/* <SwiperSlide
                className='slide flex justify-center items-center bg-secondary'
                onClick={handleClick}
              >
                <img src={laptop} alt='' />
              </SwiperSlide>
              <SwiperSlide
                className='slide flex justify-center items-center bg-secondary'
                onClick={handleClick}
              >
                <img src={laptop} alt='' />
              </SwiperSlide>
              <SwiperSlide
                className='slide flex justify-center items-center bg-secondary'
                onClick={handleClick}
              >
                <img src={laptop} alt='' />
              </SwiperSlide>
              <SwiperSlide
                className='slide flex justify-center items-center bg-secondary'
                onClick={handleClick}
              >
                <img src={laptop} alt='' />
              </SwiperSlide>
              <SwiperSlide
                className='slide flex justify-center items-center bg-secondary'
                onClick={handleClick}
              >
                <img src={laptop} alt='' />
              </SwiperSlide> */}
              </Swiper>
            </div>
          )}
          <div className='image-holder w-full sm:w-[448px] aspect-square bg-[#D9D9D9] overflow-hidden'>
            <img
              className='w-full'
              src={import.meta.env.VITE_SERVER_API + mainImage}
              alt=''
            />
          </div>
        </div>
        <div className='flex-grow ml-3 mt-5'>
          <h1 className=' text-4xl font-bold tracking-tighter mb-5'>
            {product?.title}
          </h1>
          <p>
            <span className='font-bold text-xl'>State: </span>
            <span className='font-bold ml-10 text-[#959595]'>
              {product?.state}
            </span>
          </p>
          <hr className='border-[#EEEEE] my-3' />
          <p className=''>
            <span className='text-xl font-bold'>${product?.price} </span>
            <small className='line-through text-xs text-[#959595]'>
              ${product && product.price + 0.4 * product.price}
            </small>
          </p>
          <p className='max-w-[320px] text-[#7A7A7A] mb-5'>
            “{product?.description}”
          </p>
          <hr />
          <div className='flex items-start  mt-4 flex-col md:flex-row flex-wrap sm:items-center gap-y-2'>
            <div className='flex items-center p-2'>
              <AiOutlineMinus
                onClick={decrementQuantity}
                className='font-bold cursor-pointer'
              />
              <input
                type='text'
                value={quantity}
                className='w-[40px] h-[40px] text-center border border-solid border-[#E0E0E0] mx-1 focus:outline-none'
              />
              <IoAdd
                onClick={incrementQuantity}
                className='font-bold cursor-pointer'
              />
            </div>
            <button
              className='block bg-main hover:bg-white w-[200px] h-[54px] text-white hover:text-main font-bold 
            text-xl cursor-pointer rounded-sm text-left pl-5 border border-solid border-main duration-200'
              onClick={() =>
                dispatch(cartActions.addItemToCart({ product, quantity }))
              }
            >
              Add to cart
            </button>
            <button
              className='block bg-white hover:bg-main w-[239px] h-[54px] text-main hover:text-white 
            font-bold text-xl cursor-pointer rounded-sm border border-main border-solid text-left pl-5 sm:ml-5 duration-200'
            >
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
      {similarProds.length > 0 && (
        <>
          <h1 className='text-4xl font-bold mt-16 mb-3'>You may also like</h1>
          <div className='swiper md:pr-20'>
            <Swiper
              modules={[Navigation, Autoplay]}
              className='mb-5'
              // slidesPerView={5}
              // spaceBetween={0}
              navigation
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: getSwiperSlidesNumber(similarProds.length, 1),
                },
                440: {
                  slidesPerView: getSwiperSlidesNumber(similarProds.length, 2),
                },
                768: {
                  slidesPerView: getSwiperSlidesNumber(similarProds.length, 3),
                },
                1024: {
                  slidesPerView: getSwiperSlidesNumber(similarProds.length, 4),
                },
                1280: {
                  slidesPerView: getSwiperSlidesNumber(similarProds.length, 5),
                },
              }}
              //   autoplay
            >
              {similarProds.map((product) => (
                <SwiperSlide>
                  <Product product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </section>
  )
}

export default ProductDetails
