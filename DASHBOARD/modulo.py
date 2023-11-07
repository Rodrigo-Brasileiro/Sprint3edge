import requests

# --------------------------------------- DECLARANDO URL's -----------------------------------
# URL do endpoint no Postman
url = 'http://46.17.108.113:1026/v2/entities/urn:ngsi-ld:Rfid:008/attrs/identity'

# URL do banco de dados AmbuZone
url_banco_de_dados = 'https://ambuzone-7fd96-default-rtdb.firebaseio.com/.json'




# -------------------------------------------- FUNCOES GET ----------------------------------------------------------
def get_postman_function(url : str, headers : dict) -> dict:
        # Fazendo a solicitação GET
    try:
        response = requests.get(url, headers=headers)

    # Verifica se a solicitação foi bem-sucedida (código de status 200)
        if response.status_code == 200:
            print('Solicitação GET realizada com sucesso!')
            # Conteúdo da resposta
            data = response.json()  # Para decodificar JSON
            print(f"Veiculo : {data['value']} \nUltima passagem : {data['metadata']['TimeInstant']['value']}")
            return data

        else:
            print("Falha na solicitação GET. Código de status:", response.status_code)
            raise ValueError
        
    except ValueError:
        pass
    except:
        print('Ocorreu um erro desconhecido, tente novamente')

def get_banco_function(url_banco_de_dados: str) -> dict:
    '''Realiza solicitacao GET no banco de dados'''
    try:
        response = requests.get(url_banco_de_dados)

    # Verifica se a solicitação foi bem-sucedida (código de status 200)
        if response.status_code == 200:
            # Conteúdo da resposta
            data = response.json()  # Para decodificar JSON
            return data
        else:
            print("Falha na solicitação GET. Código de status:", response.status_code)
            raise ValueError
        
    except ValueError:
        print('Fim do programa')
    except:
        print('Ocorreu um erro desconhecido, tente novamente')



# -------------------------------------------- FUNCOES POST ----------------------------------------------------------

def post_novo_id(informacoesJson : dict):
    '''Realiza post para novo veiculo de emergencia'''
    try:
        requisicao = requests.post('https://ambuzone-7fd96-default-rtdb.firebaseio.com/.json', data=informacoesJson)

    # Verifica se a solicitação foi bem-sucedida (código de status 200)
        if requisicao.status_code == 200:
            # Conteúdo da resposta
            print(informacoesJson)
            name = requisicao.json()
            print('Novo veículo de emergência registrado com sucesso!')
            print(f'Id da solicitacao: {name}')    # Print do NAME da ultima solicitacao gerada no banco de dados
            
        else:
            print("Falha na solicitação POST. Código de status:", requisicao.status_code)
            print('Veículo de emergência não foi registrado.')
            raise ValueError
    except ValueError:
        print('Fim do programa')
    except:
        print('Ocorreu um erro desconhecido, tente novamente')


def post_nova_passagem(informacoesJson : dict):
    try:
        requisicao = requests.post('https://ambuzone-7fd96-default-rtdb.firebaseio.com/.json', data=informacoesJson)

    # Verifica se a solicitação foi bem-sucedida (código de status 200)
        if requisicao.status_code == 200:
            # Conteúdo da resposta
            print(informacoesJson)
            name = requisicao.json()
            print(f'Id da solicitacao: {name}')    # Print do NAME da ultima solicitacao gerada no banco de dados
                
        else:
            print("Falha na solicitação POST. Código de status:", requisicao.status_code)
            raise ValueError
    except ValueError:
        print('Fim do programa')
    except:
        print('Ocorreu um erro desconhecido, tente novamente')



# -------------------------------------------- FUNCOES DE VERIFICACAO ----------------------------------------------------------
       
def verifica_id(data : dict, id : str) -> bool:
    '''verifica se o id ja esta registrado no banco de dados'''
    ids_registrados = []
    for values in data.values():
        ids_registrados.append(values['id'])    # Armazena todos os IDs do banco de dados em uma lista

    if id not in ids_registrados:    # Verifica se ID ja estava registrado no banco
        print('Novo veiculo de emergencia a ser registrado!')
        return True
    else:
        print('Nenhum novo veículo de emergência para ser registrado')
        return False

def verifica_date_time(id : str, data: dict, date_time : str) -> bool:
    '''verifica se houve alguma outra passagem de veiculo de emergencia com base no horario da ultima passagem'''

    # Pegando ultima passagem registrada para aquele ID do ultimo GET_POSTMAN.
    for keys, values in reversed(data.items()):   # Percorre dicionario de tras para frente
        if values.get('id') == id:
            ultimo_name = keys
            break

    date_time_ultima_passagem = data[ultimo_name]['date_time']

    # Compara date_time da ultima passagem registrada no banco de dados com date_time da ultima solicitacao GET_POSTMAN
    if date_time_ultima_passagem == date_time:
        print('Nenhuma nova passagem!')
        return False
    if date_time_ultima_passagem != date_time:
        print('Uma nova passagem detectada!')
        return True