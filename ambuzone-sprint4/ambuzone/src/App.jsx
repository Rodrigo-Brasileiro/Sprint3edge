import { Outlet } from 'react-router-dom'
import Menu from './Components/Menu/Menu'
import { DadosParaRotaProvider } from './Context/DadosParaRota'
import "./styles/main.scss"
export default function App() {
  

  return (
    <>
    <DadosParaRotaProvider>
      <Outlet/>
    </DadosParaRotaProvider>
    <Menu></Menu>
    </>
  )
}
