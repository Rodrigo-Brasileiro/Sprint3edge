# ETAPA 2

from get_postman import id, date_time # Import das infos necessarias
from modulo import verifica_date_time, verifica_id, get_banco_function, url_banco_de_dados # Importa funcoes de verificacao

print('=-'*10 + 'GET BANCO' + '=-'*10)



data = get_banco_function(url_banco_de_dados)
verifica_id = verifica_id(data, id)
if verifica_id != True:
    verifica_date_time = verifica_date_time(id, data, date_time)