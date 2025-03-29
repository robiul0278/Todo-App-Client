import { ThemeProvider } from "@/components/theme-provider"

type TContainerProps = {
  children: React.ReactNode,
}


const Container = ({ children }: TContainerProps) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full h-full max-w-7xl mx-auto">{children}</div>
    </ThemeProvider>

  )
}

export default Container;