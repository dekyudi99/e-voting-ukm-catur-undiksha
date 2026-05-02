import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#2563eb', // Warna biru Tailwind (blue-600)
            },
          }}
        >
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)