import setApi from "facturacionelectronicapy-setapi";
import path from "path";
import fs from "fs";
import { configGlobal } from "../utils/configGlobal";

const __dirname = path.resolve();

const askRuc = async (req, res) => {
  try {
    const { id, ruc } = req.query;

    if (!id || !ruc) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id y ruc" });
    }

    // Ruta absoluta del certificado
    const certPath = 'C:/FacturaElectronica/OSCAR IVAN SIMON ALVISO.p12'
    if (!fs.existsSync(certPath)) {
      return res.status(500).json({ error: "Certificado no encontrado" });
    }

    const certPassword = configGlobal.claveFirma;
    const environment = process.env.ENV || "test";

    const result = await setApi.default.consultaRUC(
      parseInt(id),
      ruc,
      environment,
      certPath,
      certPassword,
      { debug: true, timeout: 90000 } // Configuración adicional
    );

    res.json({
      mensaje: "Consulta exitosa",
      datos: result,
    });
  } catch (error) {
    console.error("Error detallado:", error);
    res.status(500).json({
      error: "Error al consultar el RUC",
      mensaje: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export default { askRuc };