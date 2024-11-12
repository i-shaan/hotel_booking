import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './context/AuthContext'
const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      retry:0,
    }
  }
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
    <App />
    </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
