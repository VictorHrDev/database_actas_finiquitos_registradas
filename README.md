# Sistema de Gestión de Actas de Finiquito

Este proyecto es una aplicación web construida sobre Google Apps Script, diseñada para automatizar y gestionar el proceso de registro de actas de finiquito en cumplimiento con las nuevas normativas del Ministerio del Trabajo de Ecuador.

## Contexto y Justificación

El **Acuerdo Ministerial Nro. MDT-2025-053** del Ministerio del Trabajo de Ecuador introduce cambios significativos en la gestión de las obligaciones del empleador. Las reformas más importantes incluyen:

* La generación de un **código Hash** para validar los documentos digitales.
* La obligación del empleador de **registrar las actas de finiquito y sus comprobantes de pago** en la plataforma del ministerio.
* La **responsabilidad exclusiva del empleador** de conservar y custodiar los archivos físicos y digitales, ya que el ministerio no los almacenará.
* La imposibilidad de descargar los documentos de la plataforma del ministerio después de un plazo de 12 meses, haciendo indispensable un sistema de archivo propio.

Esta herramienta fue creada para abordar directamente estas nuevas obligaciones, proveyendo una solución centralizada, automatizada y segura para garantizar el cumplimiento y la correcta gestión documental.

## ✨ Features Principales

* **Formulario Web Intuitivo:** Una interfaz web amigable para registrar toda la información del finiquito, incluyendo los códigos Hash y los documentos de respaldo.
* **Automatización de Archivos en Drive:** Creación automática de una estructura de carpetas organizada (`Empresa/Año/FINIQUITOS/Empleado`) para cada registro.
* **Carga Centralizada de Documentos:** Sube el Acta de Finiquito, el Comprobante de Pago y el Correo de Confirmación en un solo paso.
* **Base de Datos en Google Sheets:** Todos los registros se almacenan de forma ordenada en una hoja de cálculo, que actúa como base de datos central.
* **Cumplimiento Normativo:** Diseñada específicamente para cumplir con los requisitos del Acuerdo Ministerial MDT-2025-053.

## 🛠️ Componentes del Proyecto

1.  **Google Sheets (`Base de Datos de Finiquitos.gsheet`):**
    Actúa como la base de datos principal, registrando cada finiquito en una nueva fila con el siguiente orden de columnas: `Empresa`, `Nro. Acta Finiquito`, `Cédula`, `Nombre Empleado`, `Fecha Entrada`, `Fecha Salida`, `Neto a Recibir`, `Hash Acta`, `Hash Comprobante`, `URL Carpeta Drive` y `Estado`.

2.  **Google Apps Script (`Código.gs` y `WebAppForm.html`):**
    Es el motor de la aplicación.
    * `Código.gs`: Contiene toda la lógica del servidor (backend) escrita en JavaScript para procesar los datos, crear carpetas, subir archivos y escribir en la hoja de cálculo.
    * `WebAppForm.html`: Es la interfaz de usuario (frontend) que se presenta como una página web al usuario final.

3.  **Google Drive:**
    Funciona como el archivo digital seguro donde se almacenan todos los documentos PDF relacionados con cada finiquito, organizados en su respectiva carpeta.

## 🚀 Flujo de Trabajo

El uso de la aplicación es sencillo:

1.  **Acceder a la URL** de la aplicación web implementada.
2.  **Completar todos los campos** del formulario web.
3.  **Adjuntar los 3 archivos PDF** requeridos (Acta, Comprobante y Correo de Confirmación).
4.  **Hacer clic en "Registrar Finiquito"**.
5.  El sistema procesa la solicitud, crea la carpeta en Drive, sube los archivos y añade una nueva línea en el Google Sheet, todo en un solo paso.

## ⚖️ Justificación Legal (Según Acuerdo MDT-2025-053)

Esta herramienta responde directamente a las siguientes obligaciones:

* **Registro de Actas de Finiquito:** El empleador debe elaborar y registrar los datos del extrabajador en el sistema del Ministerio, cargando el acta y el comprobante de pago en formato PDF. La herramienta facilita la recopilación de esta información antes de su registro oficial.
* **Conservación de Documentos:** El empleador es el único responsable de la custodia y conservación de los documentos físicos y digitales. Nuestro sistema crea este archivo digital de forma automática y organizada.
* **Generación de Código Hash:** El sistema del Ministerio genera un código Hash para validar los documentos. Nuestro formulario incluye campos para registrar estos códigos y asociarlos permanentemente al registro del empleado.

## ⚙️ Configuración Inicial (Para Empezar)

1.  **Crear una copia** del archivo de Google Sheets (`Base de Datos de Finiquitos.gsheet`). El script está vinculado a la hoja, por lo que el código debe estar dentro del editor de scripts de la hoja.
2.  **Configurar el Script:** En el archivo `Código.gs`, actualizar la constante `ID_UNIDAD_COMPARTIDA` con el ID de la carpeta de Google Drive donde se almacenarán los registros.
3.  **Implementar la Aplicación:** Desde el editor de Apps Script, hacer clic en `Implementar` > `Nueva implementación`. Configurar como `Aplicación web` y establecer los permisos de acceso.
4.  **Guardar y usar la URL** generada por la implementación.

---
*Proyecto desarrollado por Víctor Suarez.*
