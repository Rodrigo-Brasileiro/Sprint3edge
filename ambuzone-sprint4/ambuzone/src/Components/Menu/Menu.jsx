import './Menu.scss'
import {BiSolidLocationPlus as IrIcon} from 'react-icons/bi'
import {LuStethoscope as HospitaisIcon} from 'react-icons/lu'
import {PiSirenDuotone as AmbulanciasIcon} from 'react-icons/pi'
import {BsClipboardPlusFill as DiagnosticoIcon} from 'react-icons/bs'
import {CgProfile as PerfilIcon} from 'react-icons/cg'
import { Link, useLocation } from 'react-router-dom';

export default function Menu(){

    const rotaAtual = useLocation();



    return(
        <nav>


                 <div className="menuLinks"> 
                 <Link to='/' className={rotaAtual.pathname == "/" ? "active" : ""}>
                     <IrIcon/>
                     <p>Ir</p>
                 </Link>
                 <Link  to='/hospitais' className={rotaAtual.pathname == "/hospitais" ? "active" : ""}>
                     <HospitaisIcon/>
                     <p>Hospitais</p>
                 </Link>
                 <Link to='/ambulancias' className={rotaAtual.pathname == "/ambulancias" ? "active" : ""}>
                     <AmbulanciasIcon/>
                     <p>Ambulâncias</p>
                 </Link>
                 <Link to='/diagnostico' className={rotaAtual.pathname == "/diagnostico" ? "active" : ""}>
                     <DiagnosticoIcon/>
                     <p>Diagnóstico</p>
                 </Link>
                 <Link to='/perfil' className={rotaAtual.pathname == "/perfil" ? "active" : ""}>
                     <PerfilIcon/>
                     <p>Perfil</p>
                 </Link> 
             </div>
        </nav>
    )
}