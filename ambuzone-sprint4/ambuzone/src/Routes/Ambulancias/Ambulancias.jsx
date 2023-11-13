import "./Ambulancias.scss"
import logo from "../../../public/img/ambuzone.png"
 
export default function Ambulancias(){
 
  document.title = 'Ambulâncias'
  if(sessionStorage.getItem("token-user") || localStorage.getItem("token-user")){
    
    return(
      <>
        <div className="container">
          <div className="boxazul">
            <img src={logo} alt="" />
          </div>
          <div className="boxbranca">
            <div className="ambativas">
              <h1>Ambulâncias Ativas:</h1>
              <p>672 Ambulâncias.</p>
            </div>
            <div className="ambdisponiveis">
              <h1>Ambulâncias Disponíveis:</h1>
              <p>388 Ambulâncias.</p>
            </div>
            <div className="ambocorrencias">
              <h1>Em Ocorrência:</h1>
              <p>284 Ambulâncias.</p>
            </div>
            <div className="ocorrencias">
              <h1>Ocorrências do Dia:</h1>
              <p>427 Ocorrências.</p>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    window.location = "/login"
  }
}