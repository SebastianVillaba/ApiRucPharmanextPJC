import fs from "fs";

/**
 * Función para leer el contenido de un archivo de forma síncrona.
 * Se especifica la codificación 'utf8' para obtener directamente el string.
 */
const readFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data;
  } catch (error) {
    console.error(`Error al leer el archivo: ${error.message}`);
  }
}

/**
 * Función que utiliza una expresión regular para extraer las etiquetas y sus valores.
 * Se valida que la etiqueta de apertura y cierre coincidan.
 */
const parseConfig = (data) => {
  const regex = /<([^>]+)>(.*?)<\/\1>/gs;
  const config = {};
  let match;

  while ((match = regex.exec(data)) !== null) {
    const tag = match[1];
    const value = match[2].trim();
    config[tag] = value;
  }
  return config;
}


export const getInformacion = () => {

try {

    const configData = readFile("C:/FacturaElectronica/configFactura_FarmaceuticaDelEste.txt");
    if (!configData) {
      throw new Error("No se pudo leer el archivo de configuración.");
    }
    
    // Obtiene un objeto con los datos, por ejemplo:
    // { servidor: "192.168.1.190", nombreFirma: "c:\FacturaElectronica\PEDRO_...", ... }
    const config = parseConfig(configData);
    //console.log(config)
    // Extrae los campos que te interesan
    const servidor = config["servidor"];
    const nombreDB = config["nombreDB"];
    const usuario = config["usuario"];
    const claveBd = config["claveBd"];
    const puerto = config["puerto"];
    const firma = config["nombreFirma"];
    const claveFirma = config["claveFirma"];

    //console.log(servidor, nombreDB, usuario, claveBd, puerto, firma, claveFirma)

    //console.log(`Respuesta: ` + servidor);


    // Aquí puedes continuar con el procesamiento o devolver los valores
    return {  
      servidor,
      nombreDB,
      usuario,
      claveBd,
      puerto,
      firma,
      claveFirma
    };
  } catch (err) {
    console.error("Error en getInformacion:", err);
  }
};
