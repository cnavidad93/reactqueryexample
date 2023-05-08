import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import WebsocketView from './components/WebsocketView';
import Home from './components/Home';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.css'; // core css
import 'primeicons/primeicons.css'; // icons
import 'primeflex/primeflex.css'; // css utility
import './index.css';
import Playground from './components/Playground';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        {/* <Home /> */}
        <Playground />
        {/* <WebsocketView /> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
);
