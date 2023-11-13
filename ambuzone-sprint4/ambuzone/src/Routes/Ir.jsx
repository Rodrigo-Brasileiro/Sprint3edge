import {useState, useEffect, useContext} from "react";
import { DadosParaRotaContext } from "../Context/DadosParaRota";
import localizaco from "../../public/img/sua-localizacao-icon.png"
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";


const mapStyles = [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#7c93a3',
        },
        {
          lightness: '-10',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#a0a4a5',
        },
      ],
    },
    {
      featureType: 'administrative.province',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#62838e',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#dde3e3',
        },
      ],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#3f4a51',
        },
        {
          weight: '0.30',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'poi.attraction',
      elementType: 'all',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi.business',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.government',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'all',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi.place_of_worship',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.school',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.sports_complex',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          saturation: '-100',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#bbcacf',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          lightness: '0',
        },
        {
          color: '#bbcacf',
        },
        {
          weight: '0.50',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#a9b4b8',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [
        {
          invert_lightness: true,
        },
        {
          saturation: '-7',
        },
        {
          lightness: '3',
        },
        {
          gamma: '1.80',
        },
        {
          weight: '0.01',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#a3c7df',
        },
      ],
    },
  ];
 
    const markers = [
        {
          id: 1,
          name: "Sua Localização",
        }
      ];
 
export default function Ir(){
    document.title = 'Ir'
    console.log('Renderizando aba Ir')
    const {dados} = useContext(DadosParaRotaContext)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const hospitalDefinidoCoords = {lat: dados.lat,
                                    lng: dados.lng}
    console.log(dados)
    // const [directions, setDirections] = useState(null);
    // const [showOverlay, setShowOverlay] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    // const [response, setResponse] =
    // useState<window.google.maps.DistanceMatrixResponse | null>(null);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
      });
   
      const [activeMarker, setActiveMarker] = useState(null);
   
      const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
          return;
        }
        setActiveMarker(marker);
      };

  
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
     
      async function calculateRoute() {
        const directionsService = new window.google.maps.DirectionsService()
        const results = await directionsService.route({
          origin: userLocation,
          destination: hospitalDefinidoCoords,
          travelMode: window.google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
      }
      if(sessionStorage.getItem("token-user") || localStorage.getItem("token-user")){
        return(
            <>
          <div className="container">
            <div style={{ height: "100vh", width: "100vw" }}>
              {isLoaded ? (
                <GoogleMap
                  center={userLocation}
                  zoom={15}
                  onClick={() => setActiveMarker(null)}
                  mapContainerStyle={{ width: "100%", height: "100vh", overflow: "hidden" }}
                  options={{
                    disableDefaultUI: true, // Isso remove os controles padrão
                    styles: mapStyles // Aplicar as estilizações
                  }}
                >
                  {markers.map(({ id, name }) => (
                    <MarkerF
                      key={id}
                      position={userLocation}
                      onClick={() => handleActiveMarker(id)}
                      icon={{
                        url: {localizaco},
                        scaledSize: { width: 40, height: 40 }
                      }}
                      animation={window.google.maps.Animation.DROP}
                    >
                      {activeMarker === id ? (
                        <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                          <div>
                            <p>{name}</p>
                            <button onClick={calculateRoute}>Gerar Rota</button>
                          </div>
                        </InfoWindowF>
                      ) : null}
                    </MarkerF>
                  ))}
                  {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
              </GoogleMap>
              ) : null}
            </div>
          </div>
        </>
      );
} else {
  window.location = "/login";
}}