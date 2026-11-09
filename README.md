# Randomizador · Briefing de buceo

Web app de formación para sortear temas de buceo entre participantes y organizar exposiciones rápidas.

## Funciones

- **Participantes:** introduce nombres uno a uno o pega una lista separada por líneas, comas o punto y coma. Se eliminan duplicados.
- **Banco de temas:** más de 100 temas sobre seguridad, fisiología, equipos, operaciones, emergencias, física, medioambiente y cultura del buceo. Selecciona categorías y añade tus propios temas.
- **Sorteo:** asigna un tema a cada participante y también aleatoriza el orden de intervención. Evita repetir temas mientras queden sin usar en el banco activo.
- **Modo colectivo:** todos preparan durante **15:00** y, después, cada participante dispone de **01:00** para explicar su tema.
- **Modo individual:** cada participante pasa por una preparación propia de **15:00** y una exposición de **01:00**, antes de pasar al siguiente.
- **Cronómetros:** iniciar, pausar, reanudar, reiniciar y pasar de fase. Aviso sonoro opcional al agotarse el tiempo.
- **Recuperación:** nombres, temas personalizados, filtros, sorteo y cronómetro se conservan en el navegador, incluso tras recargar.
- **Exportación:** descarga el reparto en CSV.
- **Instalable:** web app (PWA), con caché para usarla sin conexión tras la primera visita en línea.

Los datos se almacenan **solo en el navegador** del dispositivo (`localStorage`). No hay registro, base de datos ni envío de nombres a servidores.

## Publicar gratis en GitHub Pages

1. Entra en [github.com/new](https://github.com/new), crea un repositorio **público** llamado `randomizador` (puedes dejarlo sin README inicial).
2. En el repositorio, elige **Add file → Upload files** y sube **los archivos que están dentro** de la carpeta `randomizador`, no el ZIP sin extraer. Deben quedar `index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.webmanifest`, `icon.svg`, `icon-192.png`, `icon-512.png` y `.nojekyll` en la raíz.
3. En **Settings → Pages**, en *Build and deployment*, selecciona **Deploy from a branch**, rama **main**, carpeta **/(root)** y guarda.
4. La web estará en `https://TU-USUARIO.github.io/randomizador/` cuando GitHub termine la publicación. En algunos casos hay que esperar unos minutos y refrescar.

Para actualizar los temas y el diseño después, cambia los archivos del repositorio. El navegador puede necesitar una recarga para incorporar la nueva versión de la aplicación.

## Abrir en local

Puedes abrir `index.html` directamente para utilizar el sorteo. Para probar la instalación como web app y el funcionamiento sin conexión, debe servirse por `https://` o `http://localhost`. Por ejemplo:

```bash
python -m http.server 8000
```

Después, entra en `http://localhost:8000`.

## Editar el banco de temas

Puedes añadir o eliminar **temas personalizados** desde la propia web. Si quieres modificar los temas incorporados de fábrica, edita la constante `TOPIC_DATA` en `app.js`. Cada entrada contiene `[categoría, título, pregunta guía]`.

## Advertencia

Esta aplicación es un recurso didáctico. Las preguntas y los temporizadores no constituyen procedimientos de buceo ni sustituyen la normativa, la formación certificada o los planes de seguridad aplicables.

## Archivos

- `index.html`: estructura accesible de la página.
- `styles.css`: diseño y adaptación a móviles.
- `app.js`: banco de temas, sorteos, sesiones y cronómetros.
- `manifest.webmanifest`, `icon.svg`, `icon-192.png` e `icon-512.png`: instalación como web app.
- `sw.js`: caché para funcionamiento sin conexión.
- `.nojekyll`: publicación estática en GitHub Pages.

Proyecto independiente inspirado en el formato de dinámicas de «15 minutos después».