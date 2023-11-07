# ETAPA 3 (FINAL)

import json
from get_postman import id, date_time # Import das infos necessarias
from get_banco import verifica_date_time, verifica_id # Import das funcoes necessarias
from modulo import post_novo_id, post_nova_passagem

print('=-'*10 + 'POST BANCO' + '=-'*10)

informacoes = {
    "id" : id, 
    "date_time" : date_time
    }

# Transforma informacoes em JSON
informacoesJson = json.dumps(informacoes)


# If para evitar que verifica_date_time() seja executada desnecessariamente (pode dar erro se o ID for diferente dos que ja existem no banco)
if verifica_id == True:
    post_novo_id(informacoesJson)
elif verifica_date_time == True: 
    post_nova_passagem(informacoesJson)
else:
    print('Post nao realizado pois nao existem novas passagens.')
