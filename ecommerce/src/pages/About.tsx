import PageHeading from '../components/PageHeading'
import { MdPeopleOutline } from 'react-icons/md'
import { TfiMapAlt } from 'react-icons/tfi'
import { TiWorldOutline } from 'react-icons/ti'
import { FaCity } from 'react-icons/fa'
import Reveal from '../UI/Reveal'

const Box = ({
  title,
  desc,
  Icon,
}: {
  title: string
  desc: string
  Icon: React.ReactElement
}) => {
  return (
    <Reveal>
      <li className='box w-[300px] p-3 border border-solid border-main flex items-center'>
        <div className='icon'>
          <Icon className=' text-[60px] text-main mr-2' />
        </div>
        <div className='details'>
          <h5 className=' leading-none font-light'>{title}</h5>
          <h4 className='font-bold text-2xl'>{desc}</h4>
        </div>
      </li>
    </Reveal>
  )
}

const About = () => {
  return (
    <section className='container'>
      <PageHeading title='About' />
      <Reveal>
        <h1 className='text-3xl font-bold ml-3'>Who We are?</h1>
      </Reveal>

      <div className='px-3 infos'>
        <Reveal>
          <p>
            At <b>IZOURNE</b>, we're passionate about bringing you the latest
            and greatest in tech products, from cutting-edge laptops to sleek
            smartphones and immersive headphones. With a curated selection of
            top brands and products, we strive to cater to every tech
            enthusiast's needs and preferences. Our mission is simple: to
            provide you with a seamless shopping experience, where quality,
            affordability, and convenience converge. Whether you're a
            professional seeking powerful computing solutions, a music
            aficionado in search of the perfect sound experience, or a gadget
            lover eager to explore the newest tech innovations, we've got you
            covered.
          </p>
        </Reveal>
        <Reveal>
          <p className='mt-10'>
            Backed by a team of tech enthusiasts and industry experts, we're
            committed to delivering unparalleled customer service and support.
            From product recommendations to technical assistance, our
            knowledgeable team is here to assist you every step of the way,
            ensuring that your shopping journey with us is nothing short of
            exceptional.
          </p>
        </Reveal>
        <Reveal>
          <p className='my-10'>
            Join us at <b>IZOURNE</b> and embark on a journey of innovation and
            exploration. Discover the endless possibilities that tech products
            have to offer, and let us be your trusted partner in elevating your
            tech lifestyle. Welcome to the future of shopping for all your tech
            desires!
          </p>
        </Reveal>
        <ul className='us sm:w-[620px] grid place-content-center sm:grid-cols-2 mx-auto gap-y-3 mb-36'>
          <Box
            title='Total Guests'
            Icon={MdPeopleOutline}
            desc='200,000,000+'
          />
          <Box title='Countries' Icon={TiWorldOutline} desc='191+' />
          <Box title='Cities' Icon={FaCity} desc='5+' />
          <Box title='Continents' Icon={TfiMapAlt} desc='65,000+' />
          {/* <li className='box w-[300px] p-3 border border-solid border-main flex items-center'>
            <div className='icon'>
              <MdPeopleOutline className=' text-[60px] text-main mr-2' />
            </div>
            <div className='details'>
              <h4>Total Guests</h4>
              <p className='font-bold text-2xl'>200,000,000+</p>
            </div>
          </li> */}
        </ul>
      </div>
    </section>
  )
}

export default About
