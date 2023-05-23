from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/obtener_clima', methods=['POST'])
def obtener_clima():
    # Obtener las coordenadas de latitud y longitud del cliente
    latitud = request.json['latitude']
    longitud = request.json['longitude']

    # Obtener el clima utilizando OpenWeatherMap
    api_key = "b64adc30c1f48fab515ab9bbc5a50921"
    url_clima = f"http://api.openweathermap.org/data/2.5/weather?lat={latitud}&lon={longitud}&lang=es&units=metric&appid={api_key}"
    response_clima = requests.get(url_clima)
    data_clima = response_clima.json()

    # Obtener la temperatura actual, ciudad y descripción del clima
    temperatura = data_clima['main']['temp']
    temperatura_max = data_clima['main']['temp_max']
    temperatura_min = data_clima['main']['temp_min']
    ciudad = data_clima['name']
    icono_code = data_clima['weather'][0]['icon']
    descripcion = data_clima['weather'][0]['description']

    # Crear un diccionario con los datos del clima
    clima = {
        'temperatura': temperatura,
        'ciudad': ciudad,
        'descripcion': descripcion,
        'temperatura_max': temperatura_max,
        'temperatura_min': temperatura_min,
        'icono': icono_code,
    }

    # Devolver la respuesta en formato JSON
    return jsonify(clima)

if __name__ == '__main__':
    app.run()
