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

    url_clima = f"https://api.open-meteo.com/v1/forecast?latitude={latitud}&longitude={longitud}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,weathercode,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_hours,precipitation_probability_max&current_weather=true&timeformat=unixtime&forecast_days=3&timezone=America%2FNew_York"
    response_clima = requests.get(url_clima)
    data_clima = response_clima.json()

    codigo_clima = data_clima['hourly']['weathercode'][0]
    descripcion = obtener_descripcion_clima(str(codigo_clima))
    humedad_relativa = data_clima['hourly']['relativehumidity_2m'][-1]
    nubosidad = data_clima['hourly']['cloudcover'][0]
    probabilidad_lluvia = data_clima['hourly']['precipitation_probability'][-1]
    temperatura = round(data_clima['current_weather']['temperature'])
    temperatura_min = round(data_clima['daily']['temperature_2m_min'][0]) 
    temperatura_max = round(data_clima['daily']['temperature_2m_max'][0]) 
    uv_index_max = data_clima['daily']['uv_index_max'][0]
    uv_index_actual = data_clima['hourly']['uv_index'][-1]

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

    }

    return jsonify(clima)

if __name__ == '__main__':
    app.run(debug=True)
