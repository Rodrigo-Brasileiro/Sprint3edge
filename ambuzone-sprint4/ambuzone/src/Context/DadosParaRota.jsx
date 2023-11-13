import {createContext, useState} from "react"

export const DadosParaRotaContext = createContext()

export const DadosParaRotaProvider = ({children}) => {
    const [dados, setDados] = useState({
        nome: 'nome',
        lat: 'lat',
        lng : 'lng'
    })
    function toggleDados(nome, lat, lng){
        setDados({ nome, lat, lng })
    }
    return (
        <DadosParaRotaContext.Provider value={{dados, toggleDados}}>
            {children}
        </DadosParaRotaContext.Provider>
    )
}