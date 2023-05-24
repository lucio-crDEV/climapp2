# app.py
from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

def obtener_descripcion_clima(clima_actual):
    descripcion_clima = {
        '0': 'Despejado',
        '1': 'Principalmente despejado',
        '2': 'Parcialmente nublado',
        '3': 'Nublado',
        '45': 'Niebla',
        '48': 'Niebla con escarcha',
        '51': 'Llovizna ligera',
        '53': 'Llovizna moderada',
        '55': 'Llovizna densa',
        '56': 'Llovizna densa',
        '57': 'Llovizna densa',
        '61': 'Lluvia ligera',
        '63': 'Lluvia moderada',
        '65': 'Lluvia fuerte',
        '66': 'Lluvia helada ligera',
        '67': 'Lluvia helada fuerte',
        '71': 'Nieve ligera',
        '73': 'Nieve moderada',
        '75': 'Nieve fuerte',
        '77': 'Granos de nieve o cinarra',
        '80': 'Lluvia leve',
        '81': 'Lluvia moderada',
        '82': 'Lluvia violenta',
        '85': 'Chubascos de nieve leves',
        '86': 'Chubascos de nieve fuertes',
    }
    return descripcion_clima.get(clima_actual, 'Desconocido')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/obtener_clima', methods=['POST'])
def obtener_clima():
    latitud = request.json['latitude']
    longitud = request.json['longitude']

    url_geocodificacion = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={latitud}&lon={longitud}"
    response_geocodificacion = requests.get(url_geocodificacion)
    data_geocodificacion = response_geocodificacion.json()
    ciudad = data_geocodificacion['address']['city']

    url_clima = f"https://api.open-meteo.com/v1/dwd-icon?latitude={latitud}&longitude={longitud}&hourly=temperature_2m,apparent_temperature,precipitation,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_hours&timezone=America%2FNew_York"
    response_clima = requests.get(url_clima)
    data_clima = response_clima.json()
    codigo_clima = data_clima['hourly']['weathercode'][0]
    descripcion = obtener_descripcion_clima(str(codigo_clima))
    temperatura = data_clima['hourly']['temperature_2m'][0]
    temperatura_min = data_clima['daily']['temperature_2m_min'][0]
    temperatura_max = data_clima['daily']['temperature_2m_max'][0]

    clima = {
        'ciudad': ciudad,
        'descripcion': descripcion,
        'temperatura': temperatura,
        'temperatura_min': temperatura_min,
        'temperatura_max': temperatura_max
    }

    return jsonify(clima)

if __name__ == '__main__':
    app.run(debug=True)
