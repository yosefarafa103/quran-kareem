import { createRoot } from 'react-dom/client'
import App from "@/App.js"
import ThemeWrapper from '@/context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <ThemeWrapper>
    <App />
  </ThemeWrapper>
)
