import { ThemeProvider } from "./components/themes/context/ThemeContext";
import BasicDataRouter from "./routes/BasicDataRouter";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import GoogleAuthAppProvider from "./features/authorization/providers/GoogleAuthAppProvider.tsx";
import { ToastProvider } from "./components/ui/toast";
import { UserProvider } from "./features/authorization/providers/UserProvider.tsx";

function App() {
  return (
    <GoogleAuthAppProvider>
      <Provider store={store}>
        <ToastProvider>
          <ThemeProvider>
            <UserProvider>
              <BasicDataRouter />
            </UserProvider>
          </ThemeProvider>
        </ToastProvider>
      </Provider>
    </GoogleAuthAppProvider>
  );
}

export default App;
