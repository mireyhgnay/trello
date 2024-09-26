import React from 'react';
import ReactDOM from 'react-dom/client';

import router from './Router';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </RecoilRoot>
  // </React.StrictMode>
);
