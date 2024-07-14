const Select: React.FC<{
  children: React.JSX
  title: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}> = ({ children, title, className = '', onChange = () => {} }) => {
  return (
    <select
      name=''
      id=''
      className={
        'border min-h-8 border-gray-300 border-solid rounded-sm focus:outline-none items-center ' +
        className
      }
      onChange={onChange}
    >
      <option value='default' hidden selected disabled>
        {title}
      </option>
      {children}
    </select>
  )
}

export default Select
