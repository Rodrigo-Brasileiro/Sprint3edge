import "./Perfil.scss"
import {IoMdSettings as SettingsIcon} from 'react-icons/io' 
import { Link } from 'react-router-dom'
import {BiSolidUser as DadosPessoaisIcon} from 'react-icons/bi'
import {MdNotificationsActive as NotificacoesIcon} from 'react-icons/md'
import {PiSirenFill as MinhasOcorrenciasIcon} from 'react-icons/pi'
import {BiSolidMessageAdd as MinhasConversasIcon} from 'react-icons/bi'
import {AiFillQuestionCircle as PerguntasFrequentesIcon} from 'react-icons/ai'
import {TbArrowBadgeRightFilled as SetaIcon} from 'react-icons/tb'
import logo from "../../../public/img/ambuzone.png"
import { useEffect, useState } from 'react'



export default function Perfil(){
    document.tile = 'Perfil'
    const [storedData, setStoredData] = useState({
        nome: "",
        email: "",
    })
    
    
    useEffect(() => {
        const dataFromStorage =
        JSON.parse(sessionStorage.getItem("data-user")) ||
        JSON.parse(localStorage.getItem("data-user"));
        
        if (dataFromStorage) {
            setStoredData(dataFromStorage);
        }
    }, [])
    
    const handleClick = ()=> {
        sessionStorage.removeItem("token-user") || localStorage.removeItem("token-user")
        sessionStorage.removeItem("data-user") || localStorage.removeItem("data-user")
        window.location.reload();
    }



    if(sessionStorage.getItem("token-user") || localStorage.getItem("token-user")){
        
        return(
            <main>
                <div className="configuracoes" >
                    <SettingsIcon />
                </div>
                <div className="conta">
                    <div className="logo">
                        <img src={logo} alt="Ambuzone Logo" />
                    </div>
                    <hr/>
                    <div className="informacoesPessoais">
                        <div className="fotoPerfil"><DadosPessoaisIcon/></div>
                        <p className="nomeUsuario">{storedData.nome}</p>
                        <p className="emailUsuario">{storedData.email}</p>
                    </div>
                </div>
                <div className="containerOpcoesPerfil">
                    <h1>Minha Conta</h1>
                    <div className="opcoesPerfil">
                        <div className="conteudoOpcoesPerfil">
                            <div className="descricaoConteudoOpcoesPerfil">
                                <DadosPessoaisIcon/>
                                <p>Dados Pessoais</p>
                            </div>
                            <Link className='seta'><SetaIcon/></Link>
                        </div>
                        <hr />
                    </div>
                    <div className="opcoesPerfil">
                        <div className="conteudoOpcoesPerfil">
                            <div className="descricaoConteudoOpcoesPerfil">
                                <NotificacoesIcon/>
                                <p>Notificações</p>
                            </div>
                            <Link className='seta'><SetaIcon/></Link>
                        </div>
                        <hr />
                    </div>
                    <div className="opcoesPerfil">
                        <div className="conteudoOpcoesPerfil">
                            <div className="descricaoConteudoOpcoesPerfil">
                                <MinhasOcorrenciasIcon/>
                                <p>Minhas Ocorrências</p>
                            </div>
                            <Link className='seta'><SetaIcon/></Link>
                        </div>
                        <hr />
                    </div>
                    <div className="opcoesPerfil">
                        <div className="conteudoOpcoesPerfil">
                            <div className="descricaoConteudoOpcoesPerfil">
                                <MinhasConversasIcon/>
                                <p>Minhas Conversas</p>
                            </div>
                            <Link className='seta'><SetaIcon/></Link>
                        </div>
                        <hr />
                    </div>
                    <h1>Ajuda</h1>
                    <div className="opcoesPerfil">
                        <div className="conteudoOpcoesPerfil">
                            <div className="descricaoConteudoOpcoesPerfil">
                                <PerguntasFrequentesIcon/>
                                <p>Dados Pessoais</p>
                            </div>
                            <Link className='seta'><SetaIcon/></Link>
                        </div>
                        <hr />
                        <div className="logout"  onClick={handleClick}>
                            <h1>Sair</h1>
                        </div>
                    </div>
                </div>
            </main>
        )
    } else {
        window.location = "/login"
    }
}