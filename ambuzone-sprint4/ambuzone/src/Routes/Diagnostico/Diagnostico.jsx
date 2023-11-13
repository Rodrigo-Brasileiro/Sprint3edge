import { useState } from 'react';
import style from './Diagnostico.module.css'
import { useEffect } from 'react';



export default function Diagnostico(){
    document.title = 'Diagnostico'
    const [spanErroDadosVisible, setSpanErroDadosVisible] = useState(false);
    const [spanErroSintomasVisible, setSpanErroSintomasVisible] = useState(false);
    const [spanErroProcedimentoVisible, setSpanErroProcedimentoVisible] = useState(false);
    const [spanErroRiscoVisible, setSpanErroRiscoVisible] = useState(false)

  

    const [id, setId] = useState(null);

    useEffect(() => {
      fetch("http://localhost:5001/usuarios")
        .then((response) => response.json())
        .then((response) => {
          setId(response[response.length - 1].id + 1);
        })
        .catch((error) => console.log(error));
    }, []);

    const [diagnostico, setDiagnostico] = useState({
      id: id,
      dados: "",
      sintomas: "",
      procedimento: "",
      obs: "",
      risco: ""
    });


    const handleDadosChange = (e) => {
      const { name, value } = e.target;
      setDiagnostico((prevDiagnostico) => {
        const updatedDiagnostico = { ...prevDiagnostico, [name]: value };
    
        if (updatedDiagnostico.dados.length < 3) {
          setSpanErroDadosVisible(true);
        } else {
          setSpanErroDadosVisible(false);
        }
        return updatedDiagnostico;
      });
    };
    

    const handleSintomasChange = (e) => {

      const { name, value } = e.target;
      setDiagnostico((prevDiagnostico) => {
        const updatedDiagnostico = { ...prevDiagnostico, [name]: value };

        if (updatedDiagnostico.sintomas.length < 3) {
          setSpanErroSintomasVisible(true);
        } else {
          setSpanErroSintomasVisible(false);
        }
        return updatedDiagnostico
    })
  };

    const handleProcedimentoChange = (e) => {

      const { name, value } = e.target;
      setDiagnostico((prevDiagnostico) => {
        const updatedDiagnostico = { ...prevDiagnostico, [name]: value };
  
        if (updatedDiagnostico.procedimento.length < 3) {
          setSpanErroProcedimentoVisible(true);
        } else {
          setSpanErroProcedimentoVisible(false);
        }
        return updatedDiagnostico
      });
    }
      
      
      const handleRiscoChange = (e) => {

        const { name, value } = e.target;
        setDiagnostico((prevDiagnostico) => {
          const updatedDiagnostico = { ...prevDiagnostico, [name]: value };
      
          if (
            updatedDiagnostico.risco !== "Não Urgente" &&
            updatedDiagnostico.risco !== "Pouco Urgente" &&
            updatedDiagnostico.risco !== "Urgente" &&
            updatedDiagnostico.risco !== "Muito Urgente" &&
            updatedDiagnostico.risco !== "Emergência"
          ) {
            setSpanErroRiscoVisible(true);
          } else {
            setSpanErroRiscoVisible(false);
          }
      
          return updatedDiagnostico;
    })}

      const handleChangeObs = (e) => {
        const { name, value } = e.target;
        setDiagnostico((prevDiagnostico) => {
          return { ...prevDiagnostico, [name]: value };

        })
      }
    function handleSubmit(e) {
      // Adicione o código para processar o envio aqui
      
      if (!diagnostico.risco || diagnostico.dados.length < 3 || diagnostico.sintomas.length < 3 || diagnostico.procedimento.length < 3) {
        e.preventDefault();
        // Pelo menos um campo está vazio ou inválido, não envie o formulário
        if (!diagnostico.risco) {
          setSpanErroRiscoVisible(true);
        } else {
          setSpanErroRiscoVisible(false);
        }
    
        if (diagnostico.dados.length < 3) {
          setSpanErroDadosVisible(true);
        } else {
          setSpanErroDadosVisible(false);
        }
    
        if (diagnostico.sintomas.length < 3) {
          setSpanErroSintomasVisible(true);
        } else {
          setSpanErroSintomasVisible(false);
        }
    
        if (diagnostico.procedimento.length < 3) {
          setSpanErroProcedimentoVisible(true);
        } else {
          setSpanErroProcedimentoVisible(false);
        }
      } else {
        fetch("http://localhost:5001/diagnostico",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(diagnostico)
        })
        .then((response)=> {
          console.log("Dados enviados com sucesso - STATUS CODE : " + response.status)
        })
        .catch((error)=> { 
          alert(`Occoreu um erro: ${error}`)
          setDiagnostico({
            dados: "",
            sintomas: "",
            proccedimento: "",
            obs: "",
            risco: ""
          })
        });
        alert("Diagnístico enviado !")
      }
  }

  if(sessionStorage.getItem("token-user") || localStorage.getItem("token-user")){

    return(
        <>
            <section className={style.container}>
                <div>
                    <form onSubmit={handleSubmit} className={style.form}>
                        <div className={style.dados}>
                            <label htmlFor="dados">Dados do Paciente*</label>
                            <input className={`${style.dadosinput} ${
                  spanErroDadosVisible ? style.erroinput : diagnostico.dados.length >= 3 ? style.certoinput : ''}`} type="text" id='dados' name='dados' placeholder='Digite os Dados do paciente...' value={diagnostico.dados} onChange={handleDadosChange} required />
                            <span id="span-dados"  className={spanErroDadosVisible ? style.errospan : style.spanescondido}>Dados insuficiente</span>
                        </div>

                        <div className={style.sintomas}>
                            <label htmlFor="sintomas">Sintomas*</label>
                            <textarea className={`${style.sintomasinput} ${
                  spanErroSintomasVisible ? style.erroinput : diagnostico.sintomas.length >= 3 ? style.certoinput : ''}`} id='sintomas' name='sintomas' placeholder='Digite os Sintomas do paciente...' cols="20" rows="5" value={diagnostico.sintomas} required onChange={handleSintomasChange} />
                            <span className={spanErroSintomasVisible ? style.errospan : style.spanescondido}>Mínimo de 3 carecteres</span>
                        </div>

                        <div className={style.procedimento}>
                            <label htmlFor="procedimento">Procedimento*</label>
                            <textarea className={`${style.procedimentoinput} ${
                  spanErroProcedimentoVisible ? style.erroinput : diagnostico.procedimento.length >= 3 ? style.certoinput : ''}`} id='procedimento' name='procedimento' placeholder='Digite o Pocedimento realizado...' value={diagnostico.procedimento} onChange={handleProcedimentoChange} required/>
                            <span className={spanErroProcedimentoVisible ? style.errospan : style.spanescondido}>Mínimo de 3 carecteres</span>
                        </div>

                        <div className={style.obs}>
                            <label htmlFor="obs">Observações</label>
                            <textarea className={style.obsinput}  id='obs' name='obs' placeholder='Digite as Observações...' value={diagnostico.obs} onChange={handleChangeObs}/>
                        </div>

                        <div className={style.risco}>
                          <span>Classificação de Risco*</span>
                          <input className={style.naourgente} type="radio" id="naourgente" name="risco" value="Não Urgente" checked={diagnostico.risco === "Não Urgente"} onChange={handleRiscoChange}/>
                          <label htmlFor="naourgente">1</label>

                          <input className={style.poucourgente} type="radio" id="poucourgente" name="risco" value="Pouco Urgente" checked={diagnostico.risco === "Pouco Urgente"} onChange={handleRiscoChange}/>
                          <label htmlFor="poucourgente">2</label>

                          <input className={style.urgente} type="radio"id="urgente"name="risco"value="Urgente"checked={diagnostico.risco === "Urgente"}onChange={handleRiscoChange} />
                          <label htmlFor="urgente">3</label>

                          <input className={style.muitourgente} type="radio" id="muitourgente" name="risco" value="Muito Urgente" checked={diagnostico.risco === "Muito Urgente"} onChange={handleRiscoChange}/>
                          <label htmlFor="muitourgente">4</label>

                          <input className={style.emergencia} type="radio" id="emergencia" name="risco" value="Emergência" checked={diagnostico.risco === "Emergência"} onChange={handleRiscoChange}/>
                          <label htmlFor="emergencia">5</label>
                          <span className={spanErroRiscoVisible ? style.errospan : style.spanescondido}>Selecione o nivél de risco!</span>
                        </div>

                        <button className={style.btn} type='submit'>Enviar</button>
                    </form>
                </div>
            </section>
        </>
    )
  } else {
    window.location = "/login"
  }
}
