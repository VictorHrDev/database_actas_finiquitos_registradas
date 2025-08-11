// =================================================================
// ARCHIVO PRINCIPAL: Código.gs
// =================================================================

// --- CONFIGURACIÓN PRINCIPAL ---
// RECUERDA: Reemplaza el texto con el ID real de tu Unidad Compartida donde se guardarán las carpetas.
const ID_UNIDAD_COMPARTIDA = 'UbicaAquíElIDDeTuUnidadCompartida';

// =================================================================
// FUNCIONES DE LA APLICACIÓN WEB
// =================================================================

/**
 * Esta función especial se ejecuta cuando alguien visita la URL de la aplicación.
 * Su único trabajo es mostrar el formulario HTML.
 * @returns {HtmlOutput} La página web para mostrar.
 */
function doGet() {
  return HtmlService.createTemplateFromFile('WebAppForm').evaluate()
      .setTitle("Aplicación de Registro de Finiquitos")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

/**
 * Esta es la función donde se recibe los datos y archivos del formulario web.
 * @param {Object} formulario - El objeto del formulario enviado desde el HTML.
 * @returns {Object} Un objeto con un mensaje de éxito.
 * @throws {Error} Si algo sale mal durante el proceso.
 */
function procesarFiniquitoDesdeFormulario(formulario) {
  try {
    const hojaActiva = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RegistroFiniquitos');
    
    // --- 1. CREAMOS LA ESTRUCTURA DE CARPETAS CON LA LÓGICA CORREGIDA ---
    const nroActa = formulario.nroActaFiniquito;
    const cedula = formulario.cedula;
    const nombres = formulario.nombres;
    const empresa = formulario.empresa;
    
    const fechaSalida = new Date(formulario.fechaSalida);
    const anio = fechaSalida.getFullYear().toString();
    
    const nombreCarpetaFinal = `${nroActa}_${cedula}_${nombres}`;

    const carpetaRaiz = DriveApp.getFolderById(ID_UNIDAD_COMPARTIDA);
    const carpetaEmpresa = obtenerOCrearCarpeta(carpetaRaiz, empresa);
    const carpetaAnio = obtenerOCrearCarpeta(carpetaEmpresa, anio);
    const carpetaFiniquitos = obtenerOCrearCarpeta(carpetaAnio, 'FINIQUITOS');
    const carpetaEmpleado = obtenerOCrearCarpeta(carpetaFiniquitos, nombreCarpetaFinal);
    const urlCarpeta = carpetaEmpleado.getUrl();

    // --- 2. SUBIMOS LOS ARCHIVOS ---
    const archivoActa = formulario.archivoActa;
    const archivoComprobante = formulario.archivoComprobante;
    const archivoConfirmacion = formulario.archivoConfirmacion;
    
    carpetaEmpleado.createFile(archivoActa).setName(`ActaFiniquito_${nroActa}.pdf`);
    carpetaEmpleado.createFile(archivoComprobante).setName(`ComprobantePago_${nroActa}.pdf`);
    carpetaEmpleado.createFile(archivoConfirmacion).setName(`CorreoConfirmacion_${nroActa}.pdf`);

    // --- 3. AÑADIMOS LA FILA A GOOGLE SHEETS ---
    hojaActiva.appendRow([
      empresa,
      nroActa,
      "'" + cedula, // <-- CAMBIO CLAVE AQUÍ: Se añade un apóstrofo para forzar el formato de texto.
      nombres,
      new Date(formulario.fechaEntrada),
      fechaSalida, 
      parseFloat(formulario.netoRecibir),
      formulario.hashActa,
      formulario.hashComprobante,
      urlCarpeta,
      "REGISTRADO VÍA WEB"
    ]);

    // --- 4. DEVOLVEMOS UNA RESPUESTA DE ÉXITO ---
    return { message: `Finiquito ${nroActa} para ${nombres} registrado exitosamente.` };

  } catch (e) {
    Logger.log(e.toString());
    throw new Error("Ocurrió un error en el servidor. Revisa los registros para más detalles.");
  }
}


// =================================================================
// FUNCIÓN AUXILIAR
// =================================================================

/**
 * Revisa si una subcarpeta ya existe dentro de una carpeta padre.
 * Si existe, la devuelve. Si no, la crea y luego la devuelve.
 * @param {Folder} carpetaPadre - La carpeta donde se buscará o creará la subcarpeta.
 * @param {String} nombreSubcarpeta - El nombre de la subcarpeta deseada.
 * @returns {Folder} La carpeta encontrada o recién creada.
 */
function obtenerOCrearCarpeta(carpetaPadre, nombreSubcarpeta) {
  const subcarpetas = carpetaPadre.getFoldersByName(nombreSubcarpeta);
  if (subcarpetas.hasNext()) {
    return subcarpetas.next();
  } else {
    return carpetaPadre.createFolder(nombreSubcarpeta);
  }
}