from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route('/')
def clima():
    # Obtener la geolocalización del usuario utilizando ip-api.com
    response_geo = requests.get('http://ip-api.com/json/')
    data_geo = response_geo.json()

    # Obtener las coordenadas de latitud y longitud
    latitud = data_geo['lat']
    longitud = data_geo['lon']

    # Obtener el clima utilizando OpenWeatherMap
    api_key = "b64adc30c1f48fab515ab9bbc5a50921"
    url_clima = f"http://api.openweathermap.org/data/2.5/weather?lat={latitud}&lon={longitud}&lang=es&units=metric&appid={api_key}"
    response_clima = requests.get(url_clima)
    data_clima = response_clima.json()

    # Obtener la temperatura actual
    temperatura = data_clima['main']['temp']
    ciudad = data_clima['name']
    description = data_clima['weather'][0]['description']

    # Renderizar el template con los datos del clima
    return render_template('index.html', temperatura=temperatura, ciudad=ciudad, description=description)


# Punto de entrada para ejecutar la aplicación
if __name__ == '__main__':
    app.run()
