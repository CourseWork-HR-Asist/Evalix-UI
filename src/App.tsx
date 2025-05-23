import { ThemeProvider } from "./components/themes/context/ThemeContext"
import BasicDataRouter from "./routes/BasicDataRouter"

function App() {
  return (
    <ThemeProvider>
      <BasicDataRouter />
    </ThemeProvider>
  )
}

export default App
