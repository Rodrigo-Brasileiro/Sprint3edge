import "./Hospitais.scss";
import {useState, useEffect, useContext} from "react";
import {FaLocationDot as LocalizacaoIcon} from 'react-icons/fa6'
import haversine from 'haversine-distance';
import {Link} from "react-router-dom";
import { DadosParaRotaContext } from "../../Context/DadosParaRota";



export default function Hospitais() {
document.title = 'Hospitais'

const [userLocation, setUserLocation] = useState(null);
const {toggleDados} = useContext(DadosParaRotaContext)
 
 
useEffect(() => {
  // Função para obter a localização do usuário
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
 
        setUserLocation(userCoords);
      });
    }
  };
 
  getUserLocation();
}, []);  
  const [hospitais, setHospitais] = useState([]);
 
  useEffect(() => {
    if (!userLocation) {
      return;
    }
 
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAsBhXcnErJepuDKf6qyO3yAyToVXsxXxc&libraries=places`;
    script.async = true;
    script.defer = true;
 
    script.onload = () => {
      const service = new window.google.maps.places.PlacesService(document.createElement("div"));
      service.nearbySearch(
        {
          location: userLocation,
          radius: 5000, //raio em metros para busca
          type: "hospital", // Tipo de lugar a ser pesquisado
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const hospitalsWithDistance = results.map((hospital) => {
              const hospitalCoords = {
                lat: hospital.geometry.location.lat(),
                lng: hospital.geometry.location.lng(),
              };
              const distance = haversine(userLocation, hospitalCoords);
 
              // Condicionando a unidade de medida
              const formattedDistance = distance+300
     
              // Adicionando a distância ao objeto do hospital
              return {
                ...hospital,
                distance: formattedDistance,
              };
            });
     
            setHospitais(hospitalsWithDistance);
            console.log(hospitalsWithDistance);
            console.log('Hospitais capturados');
          } else {
            console.error('Erro ao buscar hospitais:', status);
          }
        }
      );
    };
 
    document.head.appendChild(script);
  }, [userLocation]);
 
  const hospitaisOrdenados = hospitais.sort((a, b) => a.distance - b.distance);
 
  if(sessionStorage.getItem("token-user") || localStorage.getItem("token-user")){
    return (
      <div className="container">
        <div className="cabecalho">
        <div className="titulo">
        <p><LocalizacaoIcon/> São Paulo</p>
        <h1>Hospitais Próximos</h1>
        </div>
        <div className="raioDeBusca">
        </div>
        </div>
        <ul>
          {hospitaisOrdenados.map((hospital) => (
            <li key={hospital.place_id}>
              <strong>{hospital.name} | <LocalizacaoIcon/>{
                hospital.distance>= 1000 ? `${((hospital.distance) / 1000).toFixed(2)} km` : `${Math.round(hospital.distance)} m`}</strong>
              <p>{hospital.vicinity}</p>
              <Link to='/' ><button onClick={() => toggleDados(hospital.name, hospital.geometry.location.lat(), hospital.geometry.location.lng())}>Definir Destino</button></Link>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    window.location = "/login"
  }
} 