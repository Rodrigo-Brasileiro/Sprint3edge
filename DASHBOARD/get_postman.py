# ETAPA 1
from modulo import get_postman_function, url

print('=-'*10 + 'GET POSTMAN' + '=-'*10)

# Parametros definidos pelo PostMan
headers = {
    'fiware-service': 'smart' ,
    'fiware-servicepath': '/' ,
    'accept': 'application/json'
}

data = get_postman_function(url, headers)
# Informacoes necessarias
try:
    id = data['value'] # ID da da ambulancia
    date_time = data['metadata']['TimeInstant']['value'] # Horario da passagem
except:
    print('Nao foi possivel acessar os dados do POSTMAN.')
