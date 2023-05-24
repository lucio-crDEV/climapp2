# Proyecto de Información del Clima

Este proyecto proporciona una aplicación web para obtener información del clima de una ubicación específica.
### Online: https://clima2day.herokuapp.com/

## Descripción

El objetivo de este proyecto es mostrar el pronóstico del clima actual y las temperaturas máximas y mínimas para una ubicación determinada. 
La aplicación utiliza la API de pronóstico del clima para obtener los datos necesarios.

## Instalación

1. Clona este repositorio en tu máquina local:
```
git clone https://github.com/lucio-crDEV/climapp2.git
```
3. Si no tienes instalado WSL (Windows Subsystem for Linux), puedes seguir la guía oficial de Microsoft para instalarlo:
- [Guía de instalación de WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

4. Abre WSL y navega hasta la carpeta del proyecto clonado.

5. Crea y activa un entorno virtual para el proyecto:
```
python3 -m venv venv
source venv/bin/activate
```
6. Instala las dependencias del proyecto ejecutando el siguiente comando:
```
pip install -r requirements.txt
```

## Uso

1. Ejecuta el archivo `app.py` para iniciar la aplicación:
```
python app.py
```

2. Abre un navegador web y accede a la dirección `http://localhost:5000`.

3. La aplicación te pedirá autorización para acceder a tu ubicación. Asegúrate de aceptarla para obtener los resultados del clima.

4. En la página principal, se mostrará el pronóstico del clima actual, incluyendo la descripción, temperatura actual, temperaturas máximas y mínimas.

5. Si no se puede obtener la información del clima debido a problemas de ubicación, se mostrará un mensaje de error con instrucciones para recargar la página.

## Contribución

Si deseas contribuir a este proyecto, sigue los siguientes pasos:

1. Realiza un fork de este repositorio.

2. Crea una nueva rama en tu repositorio local para realizar los cambios:
```
git checkout -b nombre-de-la-rama
```

3. Realiza los cambios y mejoras necesarios en la aplicación.

4. Realiza commits descriptivos para cada cambio realizado:
```
git commit -m "Descripción de los cambios"
```

5. Envía una solicitud de extracción (pull request) desde tu rama al repositorio principal.

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).

Si tienes alguna pregunta o sugerencia relacionada con este proyecto, no dudes en abrir un [issue](https://github.com/lucio-crDEV/climapp2/issues) en el repositorio.

¡Gracias por tu interés y contribuciones!
