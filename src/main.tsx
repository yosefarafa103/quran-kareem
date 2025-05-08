import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ThemeWrapper from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeWrapper>
    <App />
  </ThemeWrapper>
)
