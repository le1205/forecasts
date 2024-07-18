import { ThemeProvider } from 'styled-components';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { themes } from './theme/themes';
import { CurrentForecast, FiveDaysForecast } from 'pages';
import { Header, CityButtonLayout } from 'components';
import { GlobalStyle } from './theme/global-styles';
import { useStore } from './store/store';
import { ThemeTypes } from './store';
import queryClient from './queryClient';
import { PageWrapper } from 'styledComponents/styled';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CurrentForecast />,
  },
  {
    path: "/5days",
    element: <FiveDaysForecast />,
  },
]);

function App() {
  const theme = useStore((state) => state.theme)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme === ThemeTypes.Light ? themes.light : themes.dark}>
        <PageWrapper>
          <Header />
          <RouterProvider router={router} />
          <GlobalStyle />
          <CityButtonLayout/>
        </PageWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
