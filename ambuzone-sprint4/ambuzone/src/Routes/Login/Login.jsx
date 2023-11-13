import "./Login.scss"
import logo from "../../../public/img/ambuzone.png"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";


export default function Login(){
    document.title = "Login";

    const navigate = useNavigate();

    const [spanErroVisible, setSpanErroVisible] = useState(false)

    const [login, setLogin] = useState({
        usuario: "",
        senha: ""
    });

    const [manterConectado, setManterConectado] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevLogin) => {
            const updatedLogin = { ...prevLogin, [name]: value };
            console.log(updatedLogin);
            return updatedLogin;
        });
    };

    const handleCheckboxChange = () => {
        setManterConectado(!manterConectado);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let users;
        let user;
        try {
            const response = await fetch("http://localhost:5001/usuarios");
            users = await response.json();

        } catch (error) {
            alert("Ocorreu um erro no processamento da sua solicitação!");
        }

        for (let x = 0; x < users.length; x++) {
            user = users[x];

            if (user.email === login.usuario && user.senha === login.senha || user.usuario === login.usuario && user.senha === login.senha) {
                alert("Login realizado com SUCESSO!");

                const tokenUser = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);
                console.log(tokenUser);

                const userWithoutPassword = { ...user };
                delete userWithoutPassword.senha;
    
                const storage = manterConectado ? localStorage : sessionStorage;
    
                // Armazenar no sessionStorage
                storage.setItem("token-user", tokenUser);
                storage.setItem("data-user", JSON.stringify(userWithoutPassword));
    
                navigate("/");
                return;
            }
        }

        setSpanErroVisible(true)
        setLogin({
            usuario: "",
            senha: ""
        });
    };

    return(
        <>
        <div className="container-login">
            <div className="box-azul">
                <img src={logo} alt="Logo Ambuzone" />
                <p>Bem Vindo(a) !</p>
            </div>

            <div className="box-branca">
                <div className="titulo">
                    <p>Login</p>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="usuario">
                        <label htmlFor="usuario">Usuário</label>
                        <input className={spanErroVisible ? "erroinput" : ""} type="text" name="usuario" placeholder="Digite o email ou usuário" value={login.usuario} onChange={handleChange} />
                    </div>

                    <div className="senha">
                        <label htmlFor="senha">Senha</label>
                        <input className={spanErroVisible ? "erroinput" : ""} type="password" name="senha" placeholder="Digite sua senha"  value={login.senha} onChange={handleChange}/>
                    </div>

                    <div className="manter-conectado">
                        <div className="checkbox">
                            <input type="checkbox" name="conectado" checked={manterConectado} onChange={handleCheckboxChange}/>
                            <label htmlFor="conectado">Manter conectado</label>
                        </div>
                        <p>Esqueci a senha</p>
                    </div>
                            <div className="box-span">
                                <span className={spanErroVisible ? "errospan" : "spanescondido"}>Usuário ou senha incorretos!</span>
                            </div>
                    <button type="submit" className="entrar">Entrar</button>

                    <div className="frase-cadastro">
                        <p>Ainda não tem uma conta ? <Link to="/cadastro" className="cadastro">Cadastre-se agora</Link></p>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}