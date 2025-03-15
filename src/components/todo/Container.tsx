type TContainerProps = {
    children: React.ReactNode,
}


const Container = ({children}: TContainerProps) => {
  return (
    <div className="w-full h-full max-w-7xl mx-auto">{children}</div>
  )
}

export default Container;