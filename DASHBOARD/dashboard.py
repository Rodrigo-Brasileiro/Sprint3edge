#-------------------------------- APENAS TESTE ------------------------------
from dash import Dash, html, dcc
import plotly.express as px
import pandas as pd
from modulo import get_banco_function, url_banco_de_dados

# GET nas informacoes do banco de dados e armazena em DATA
data = get_banco_function(url_banco_de_dados)


# ------------------------ TODAS AS PASSAGENS REGISTRADAS NO BANCO DE DADOS ----------------------------------
total_veiculos = 0
for keys in data.keys():
    total_veiculos +=1

# ------------------------ TODAS AS PASSAGENS REGISTRADAS NO BANCO DE DADOS POR ID ----------------------------------
passagens_por_id = {}

for keys, values in data.items():
    id_veiculo = values['id']


    if id_veiculo in passagens_por_id:
        passagens_por_id[id_veiculo] +=1
    else:
        passagens_por_id[id_veiculo] = 1


# ------------------------ QUANTIDADE PASSAGENS POR DIA ------------------------------------------------------
passagens_por_dia = {}

for keys, values in data.items():
    date_time_banco = values['date_time']
    date = date_time_banco.split('T')[0]    # Separa pelo T pois as datas vem em formato ISO e salva a primeira parte da separacao

    if date in passagens_por_dia:
        passagens_por_dia[date] += 1
    else:
        passagens_por_dia[date] = 1



# ------------------------------- DEFININDO DATAFRAME ---------------------------------------------------------
df = pd.DataFrame(list(passagens_por_dia.items()), columns=["Dias", "Quantidade de veiculos"])
df2 = pd.DataFrame(list(passagens_por_id.items()), columns=['ID', 'Passagens'])

# ------------------------------- CRIANDO GRAFICO A PARTIR DO DATAFRAME----------------------------------------
df['Data'] = df['Dias'].astype('category')
df2['Data'] = df2['ID'].astype('category')
custom_color_scale = ['#FF7F7F','#6495ED']

# Grafico bars
fig = px.bar(df, x="Dias", y="Quantidade de veiculos", barmode="group", color="Data", color_discrete_sequence=custom_color_scale)

# Ajustar o tamanho das barras usando bargap
fig.update_layout(bargap=0.8) # Ajusta o tamanho das barras alterando o bargap

# Ajustar o formato dos rótulos no eixo x para exibir apenas os dias
fig.update_xaxes(type='category') # Define o tipo de eixo x como 'category'

# Grafico pie
fig2 = px.pie(df2, values='Passagens', names='ID', title='Passagens por ID', color_discrete_sequence=custom_color_scale)
# -------------------------------------------- LAYOUT ---------------------------------------------------------

app = Dash(__name__)

app.layout = html.Div(children=[
    html.Div(
        children=[
            html.H1(
                children='AmbuZone Dashboard!',
                style={'font-size' : '100px',
                       'margin' : '0px'}
                ),
        ],
        style={
            'width' : '100%',
            'padding' : '0px',
            'margin' : '0px',
            'display' : 'flex',
            'align-items' : 'center',
            'justify-content' : 'center',
            'background': 'linear-gradient(to right, #FF7F7F, #ADD8E6)',
            'box-shadow': '5px 5px 10px rgba(0, 0, 0, 0.3)',
            'border-radius': '15px'
        }
    ),
    html.Div(
        children=[
            html.H2(children='Passagens de veiculos de emergencia total.',
            style={
                'font-size' : '35px',
                'margin' : '0',
                'padding' : '0'
            }),
        ],
        style={
            'width' : '100%',
            'padding' : '0px',
            'margin' : '0px',
            'margin-top' : '15px',
            'display' : 'flex',
            'align-items' : 'center',
            'justify-content' : 'center',
        }
    ),


    html.Div(children='''
        O numero representa a quantidade total de veiculos de emergencia que ja passaram pelo leitor.
    ''',
    style={
            'width' : '100%',
            'padding' : '0px',
            'margin' : '0px',
            'display' : 'flex',
            'align-items' : 'center',
            'justify-content' : 'center',
            'font-size' : '20px'
        }),

     html.Div(
        children=[
            html.Div(
                children=[
                    html.H1(
                        children=total_veiculos,
                        style={
                            'font-size': '40px',
                            'margin': '15px',
                            'background-color': '#FF7F7F',
                            'border-radius': '50%',
                            'text-align': 'center',
                            'width': '100px',
                            'height': '100px',
                            'line-height': '100px',
                            'border': '8px solid #ADD8E6',
                            'box-shadow': '5px 5px 10px rgba(0, 0, 0, 0.3)'
                        }
                    ),
                dcc.Graph(
                    id='veiculos_total',
                    figure=fig2
                ),
                ],
                style={
                    'display': 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                }
            ),
        ],
        style={
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
            'justify-content': 'center',
            'width': '100%',
            'height': '100%',
        }
    ),
    html.Div(
        children=[
            html.H2(children='Passagens de veiculos de emergencia por dia.',
            style={
                'font-size' : '35px',
                'margin' : '0',
                'padding' : '0'
            }),
        ],
        style={
            'width' : '100%',
            'padding' : '0px',
            'margin' : '0px',
            'margin-top' : '15px',
            'display' : 'flex',
            'align-items' : 'center',
            'justify-content' : 'center',
        }
    ),


    html.Div(children='''
        O grafico apresenta a passagem de veiculos de emergencia por dia. Ele considera veiculos de emergencia com qualquer ID
    ''',
    style={
            'width' : '100%',
            'padding' : '0px',
            'margin' : '0px',
            'display' : 'flex',
            'align-items' : 'center',
            'justify-content' : 'center',
            'font-size' : '20px'
        }),

    dcc.Graph(
        id='veiculos_por_dia',
        figure=fig
    )
    

])




if __name__ == '__main__':
    app.run(debug=True)
