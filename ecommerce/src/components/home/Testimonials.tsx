import { Swiper, SwiperSlide } from 'swiper/react'
import person from '../../assets/person.jpg'
import { Autoplay, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import Reveal from '../../UI/Reveal'

const Testimonial = () => {
  return (
    <div className='relative testimonial text-center max-w-[300px] mx-auto min-h-[202px] flex flex-col justify-start items-center rounded-md bg-white'>
      <div
        className='absolute top-0 image-holder w-[81px] aspect-square rounded-full border-[0.5px]
        border-solid border-black overflow-hidden transform -translate-y-[50%]'
      >
        <img src={person} alt='' />
      </div>
      <div className='details mt-10'>
        <h3 className='font-bold mb-3 text-[14px] text-center mx-auto'>
          Mohamed Izourne
        </h3>
        <Reveal>
          <p className='text-[12px] text-grayish px-5'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's stand
          </p>
        </Reveal>
      </div>
    </div>
  )
}

const Testimonials = () => {
  return (
    <section className=' bg-third pt-20 pb-48'>
      <div className='container'>
        <h2 className='head text-center text-white text-4xl mb-16 font-bold tracking-tighter'>
          Testimonials
        </h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          // pagination={{ clickable: true }}
          navigation
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          spaceBetween={3}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            540: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide className='slide'>
            <Testimonial />
          </SwiperSlide>
          <SwiperSlide className='slide '>
            <Testimonial />
          </SwiperSlide>
          <SwiperSlide className='slide '>
            <Testimonial />
          </SwiperSlide>
          <SwiperSlide className='slide'>
            <Testimonial />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials
