import { RouterProvider } from 'react-router-dom'
import './App.css'
import { AppProvider } from './provider/AppProvider'
import { router } from './rotas/Index';

function App() {
  return (
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
  )
}

export default App
