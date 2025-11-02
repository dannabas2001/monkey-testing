# 🐒 Monkey Testing con Playwright

Este proyecto realiza pruebas automáticas de tipo _monkey testing_ sobre el sitio [losestudiantes.com](https://losestudiantes.com) utilizando **Playwright**.  
El objetivo es simular interacciones aleatorias de usuario (clics, llenado de inputs, selección de opciones, etc.) para verificar la estabilidad del sitio ante comportamientos impredecibles.

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd monkey-testing
```

### 2. Instalar dependencias

Asegúrate de tener Node.js (versión 18 o superior).
Luego ejecuta:

```
npm install
```

Esto instalará:

Playwright → Framework de pruebas.

@faker-js/faker → Generador de datos aleatorios para los inputs.

### 3. Instalar los navegadores de Playwright

Playwright necesita descargar los binarios de los navegadores compatibles (Chromium, Firefox y WebKit):

npx playwright install

### 4. Ejecución de las pruebas

En el archivo package.json se definen los siguientes scripts:

"scripts": {
"test": "playwright test",
"test:headed": "playwright test --headed",
"test:monkey": "playwright test monkey.spec.js",
"test:monkey:headed": "playwright test monkey.spec.js --headed",
"test:debug": "playwright test --debug"
}

Comandos disponibles
| Comando | Descripción |
|----------|-------------|
| `npm run test` | Ejecuta todas las pruebas en modo **headless** (sin interfaz gráfica). |
| `npm run test:headed` | Ejecuta todas las pruebas **con interfaz gráfica**. |
| `npm run test:monkey` | Ejecuta únicamente el test **monkey.spec.js** en modo **headless**. |
| `npm run test:monkey:headed` | Ejecuta **monkey.spec.js** en modo visual (**headed**). |
| `npm run test:debug` | Inicia el modo **debugger** de Playwright (útil para depurar fallos). |

## Consideraciones adicionales

Si el test falla por timeout, puedes aumentar el tiempo máximo en playwright.config.js:
```
module.exports = {
timeout: 120000, // 2 minutos
};
```

Para mayor estabilidad, asegúrate de:

Tener una buena conexión a internet (ya que el test depende de una página externa).

No tener bloqueadores de pop-ups activos.

Ajustar el número de eventos del monkey test en runMonkey(page, 20) según el tiempo deseado.

Puedes modificar la URL de destino cambiando la línea:
```
await page.goto("https://losestudiantes.com");
```
Estructura básica del proyecto

```
monkey-testing/
├── tests/
│   └── monkey.spec.js
├── package.json
├── playwright.config.js
└── README.md
```

### Tecnologías utilizadas

Playwright

Faker.js
