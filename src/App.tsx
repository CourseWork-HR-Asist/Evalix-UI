import { ThemeProvider } from "./components/themes/context/ThemeContext"
import BasicDataRouter from "./routes/BasicDataRouter"
import GoogleAuthAppProvider from "./features/authorization/providers/GoogleAuthAppProvider"

function App() {
  return (
    <GoogleAuthAppProvider>
      <ThemeProvider>
        <BasicDataRouter />
      </ThemeProvider>
    </GoogleAuthAppProvider>
  )
}

export default App
