


const SectionHeading = ({ title, icon }: { title: string; icon: React.ReactNode }) => {
  return (
    <div className='heading flex ml-3 items-center'>
      <small className='bg-third p-0.5 mr-1 flex justify-center items-center w-[25px] aspect-square text-center text-white rounded-md'>
        {icon}
      </small>
      <p className='font-light'>{title}</p>
    </div>
  )
}

export default SectionHeading
