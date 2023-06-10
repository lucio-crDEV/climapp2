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

    url_clima = f"https://api.open-meteo.com/v1/forecast?latitude={latitud}&longitude={longitud}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,cloudcover,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max&current_weather=true&timezone=America%2FNew_York"

    response_clima = requests.get(url_clima)
    data_clima = response_clima.json()

    codigo_clima = data_clima['current_weather']['weathercode']
    descripcion = obtener_descripcion_clima(str(codigo_clima))
    humedad_relativa = data_clima['hourly']['relativehumidity_2m'][0]
    nubosidad = data_clima['hourly']['cloudcover'][0]
    probabilidad_lluvia = data_clima['hourly']['precipitation_probability'][0]
    temperatura =data_clima['current_weather']['temperature']
    temperatura_min = data_clima['daily']['temperature_2m_min'][0]
    temperatura_max = data_clima['daily']['temperature_2m_max'][0]
    uv_index_max = data_clima['daily']['uv_index_max'][0]
    uv_index_actual = data_clima['hourly']['uv_index'][0]

    # pronostico dia siguiente
    codigo_clima2 = data_clima['daily']['weathercode'][1]
    descripcion2 = obtener_descripcion_clima(str(codigo_clima))
    probabilidad_lluvia2 = data_clima['daily']['precipitation_probability_max'][1]
    temperatura_min2 = data_clima['daily']['temperature_2m_min'][1]
    temperatura_max2 = data_clima['daily']['temperature_2m_max'][1]
    uv_index_max2 = data_clima['daily']['uv_index_max'][1]

    clima = {
        'ciudad': ciudad,
        'descripcion': descripcion,
        'humedad_relativa': humedad_relativa,
        'nubosidad': nubosidad,
        'probabilidad_lluvia': probabilidad_lluvia,
        'temperatura': temperatura,
        'temperatura_min': temperatura_min,
        'temperatura_max': temperatura_max,
        'uv_index_max': uv_index_max,
        'uv_index_actual': uv_index_actual,
        'codigo_clima2': codigo_clima2,
        'descripcion2': descripcion2,
        'probabilidad_lluvia2': probabilidad_lluvia2,
        'temperatura_min2': temperatura_min2,
        'temperatura_max2': temperatura_max2,
        'uv_index_max2': uv_index_max2,
    }

    return jsonify(clima)


if __name__ == '__main__':
    app.run()
