import "./Cadastro.scss"
import logo from "../../../public/img/ambuzone.png"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Cadastro(){
    document.title = "Cadastro";

    const navigate = useNavigate()

    const [spanErroNomeVisible, setSpanErroNomeVisible] = useState(false);
    const [spanErroUsuarioVisible, setSpanErroUsuarioVisible] = useState(false);
    const [spanErroEmailVisible, setSpanErroEmailVisible] = useState(false);
    const [spanErroSenhaVisible, setSpanErroSenhaVisible] = useState(false);
    const [spanErroSenhaNumeroVisible, setSpanErroSenhaNumeroVisible] = useState(
      false
    );
  
    // Adicionando o id automaticamente
    const [id, setId] = useState(null);
  
    useEffect(() => {
      fetch("http://localhost:5001/usuarios")
        .then((response) => response.json())
        .then((response) => {
          setId(response[response.length - 1].id + 1);
        })
        .catch((error) => console.log(error));
    }, []); // Adicione um array de dependências vazio para garantir que este efeito seja executado apenas uma vez
  
    const [cadastro, setCadastro] = useState({
      id: id,
      nome: "",
      usuario: "",
      email: "",
      senha: "",
    });

    
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
    
    const handleName = (e) => {
        const { name, value } = e.target;
        setCadastro((prevCadastro) => {
          const updatedCadastro = { ...prevCadastro, [name]: value };
          if (updatedCadastro.nome && updatedCadastro.nome.length < 3) {
            setSpanErroNomeVisible(true);
          } else {
            setSpanErroNomeVisible(false);
          }
          console.log(updatedCadastro.nome); // Move o console.log aqui
          return updatedCadastro;
        });
      };
      
      const handleUser = (e) => {
        const { name, value } = e.target;
        setCadastro((prevCadastro) => {
          const updatedCadastro = { ...prevCadastro, [name]: value };
          if (updatedCadastro.usuario && updatedCadastro.usuario.length < 3) {
            setSpanErroUsuarioVisible(true);
          } else {
            setSpanErroUsuarioVisible(false);
          }
          console.log(updatedCadastro.usuario); // Move o console.log aqui
          return updatedCadastro;
        });
      };
      
      const handleEmail = (e) => {
        const { name, value } = e.target;
        setCadastro((prevCadastro) => {
          const updatedCadastro = { ...prevCadastro, [name]: value };
          if (
            updatedCadastro.email &&
            !isValidEmail(updatedCadastro.email)
          ) {
            setSpanErroEmailVisible(true);
          } else {
            setSpanErroEmailVisible(false);
          }
          return updatedCadastro;
        });
      };
      
      const handlePassword = (e) => {
        const { name, value } = e.target;
        setCadastro((prevCadastro) => {
          const updatedCadastro = { ...prevCadastro, [name]: value };
          if (updatedCadastro.senha && updatedCadastro.senha.length < 5) {
            setSpanErroSenhaVisible(true);
          } else {
            setSpanErroSenhaVisible(false);
          }
          if (
            updatedCadastro.senha &&
            !/\d/.test(updatedCadastro.senha)
          ) {
            setSpanErroSenhaNumeroVisible(true);
          } else {
            setSpanErroSenhaNumeroVisible(false);
          }
          console.log(updatedCadastro.senha); // Move o console.log aqui
          return updatedCadastro;
        });
      };
    

      const handleSubmit = (e) =>{
        if (cadastro.nome.length < 3 || cadastro.usuario.length < 3 || !isValidEmail(cadastro.email) || cadastro.senha.length < 5 || !/\d/.test(cadastro.senha)){
            e.preventDefault();

            if (cadastro.nome.length < 3) {
                setSpanErroNomeVisible(true)
            } else {
                setSpanErroNomeVisible(false)
            }  
            
            if (cadastro.usuario.length < 3){
                setSpanErroUsuarioVisible(true)
            } else {
                setSpanErroUsuarioVisible(false)
            } 

            if (!isValidEmail(cadastro.email)) {
                setSpanErroEmailVisible(true)
            } else {
                setSpanErroEmailVisible(false)
            } 

            if (cadastro.senha.length < 5) {
                setSpanErroSenhaVisible(true)
            } else {
                setSpanErroSenhaVisible(false)
            } 

            if (!/\d/.test(cadastro.senha)) {
                setSpanErroSenhaNumeroVisible(true)
            } else {
                setSpanErroSenhaNumeroVisible(false)
            } 
        } 


        else {
            fetch("http://localhost:5001/usuarios",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify(cadastro)
            })
            .then((response)=> {
              console.log("Dados cadastrados com sucesso - STATUS CODE : " + response.status)
            })
            .catch((error)=> { 
              alert(`Occoreu um erro: ${error}`)
              setCadastro({
                nome: "",
                usuario: "",
                email: "",
                senha: "",
              })
            });
            alert("Usuário Cadastrado !")
            navigate("/login")
        }
     
        }

    return(
        <>
        <div className="container-cadastro">
            <div className="box-azul">
                <img src={logo} alt="Logo Ambuzone" />
            </div>

            <div className="box-branca">
                <div className="titulo">
                    <p>Cadastro</p>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="nome">
                        <label htmlFor="nome">Nome*</label>
                        <input className={spanErroNomeVisible ? "erroinput" : cadastro.nome.length >= 3 ? "certoinput" : ''} type="text" name="nome" placeholder="Digite seu nome completo" value={cadastro.nome} onChange={handleName} />
                        <span className={spanErroNomeVisible ? "errospan" : "spanescondido"}>Mínimo de 3 caracteres !</span>
                    </div>

                    <div className="usuario">
                        <label htmlFor="usuario">Usuário*</label>
                        <input className={spanErroUsuarioVisible ? "erroinput" : cadastro.usuario.length >= 3 ? "certoinput" : ''} type="text" name="usuario" placeholder="Digite um nome de usuário" value={cadastro.usuario} onChange={handleUser} />
                        <span className={spanErroUsuarioVisible ? "errospan" : "spanescondido"}>Mínimo de 3 caracteres !</span>
                    </div>

                    <div className="email">
                        <label htmlFor="email">Email*</label>
                        <input className={spanErroEmailVisible ? "erroinput" : isValidEmail(cadastro.email) ? "certoinput" : ''} type="email" name="email" placeholder="Digite seu email" value={cadastro.email} onChange={handleEmail}/>
                        <span className={spanErroEmailVisible ? "errospan" : "spanescondido"}>Email inválido</span>
                    </div>

                    <div className="senha">
                        <label htmlFor="senha">Senha*</label>
                        <input className={spanErroSenhaVisible || spanErroSenhaNumeroVisible ? "erroinput" : cadastro.senha.length >= 5 && /\d/.test(cadastro.senha) ? "certoinput" : ''} type="password" name="senha" placeholder="Digite sua senha" value={cadastro.senha} onChange={handlePassword} />
                        <span className={spanErroSenhaVisible ? "errospan" : "spanescondido"}>Mínimo de 5 caracteres !</span>
                        <span className={spanErroSenhaNumeroVisible ? "errospan" : "spanescondido"}>Precisa conter 1 número no mínimo</span>
                    </div>

                    <button type="submit" className="entrar">Cadastrar</button>

                    <div className="frase">
                        <p>Ao criar uma conta, declaro que li e aceito os Termos de Uso e a Política de Privacidade</p>
                    </div>

                </form>
            </div>
        </div>
        </>
    )
}