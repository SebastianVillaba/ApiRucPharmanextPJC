// IMPORT DE PAQUETES
import xmlgen from "facturacionelectronicapy-xmlgen";
import xmlsign from "facturacionelectronicapy-xmlsign";
import qrgen from "facturacionelectronicapy-qrgen";
import xml2js from "xml2js";

// IMPORT DE FUNCIONES
import { getParamData, getParams } from "../utils/xmlGeneratorTest.js";
import {
  getParamsRemision,
  getDataRemision,
} from "../utils/xmlGeneratorRemision.js";
import {
  getDataFacturaExportacion,
  getParamsFacturaExportacion,
} from "../utils/xmlGeneratorExportacion.js";
import {
  getDataRemisionExportacion,
  getParamsRemisionExportacion,
} from "../utils/xmlGeneratorRemisionExportacion.js";

// VARIABLE
import { configuracionGlobal } from "../../config/configRoute.js";

// CONTROLADORES
const getXMLControler = async (req, res) => {
  try {
    const { id } = req.params;
    // Aqui se desestructura data del body del request
    //const { data } = req.body;

    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    //Para usar cuando el cliente envie el json (te lee el body)
    //const data = await getXML(id);

    const parametros = await getParams(id);
    const data = await getParamData(id);

    if (parametros && data) {
      // Crea el XML
      const xml = await xmlgen.default.generateXMLDE(parametros, data);
      //Aqui se firma el XML
      const xmlFirmado = await xmlsign.default
        .signXML(xml, "./src/certs/RAMON_MYSKO_BUBEN_VIT_S_A.p12", "PBRI111533")
        .catch((err) => console.error("Error al firmar XML:", err));

      res.status(200).send(xmlFirmado);
      // Aquí ya puedes trabajar con la cadena del QR (qrString)
    }
  } catch (err) {
    console.error("Error en getXMLControler:", err);
    res.status(500).json({
      error: "Error al en getXMLControler: ",
      mensaje: err.message,
    });
  }
};

const getQRFacturaControler = async (req, res) => {
  try {
    const { id } = req.params;
    // Aqui se desestructura data del body del request
    //const { data } = req.body;

    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    //Para usar cuando el cliente envie el json (te lee el body)
    //const data = await getXML(id);

    const parametros = await getParams(id);
    const data = await getParamData(id);

    console.log("Tipo de procedimineto: ", data.tipoDocumento);
    console.log("Id de la transaccion: ", id);
    console.log("Fecha de la transaccion: ", new Date().toLocaleString());

    if (parametros && data) {
      // Crea el XML
      const xml = await xmlgen.default.generateXMLDE(parametros, data);
      //Aqui se firma el XML
      const xmlFirmado = await xmlsign.default
        .signXML(xml, configuracionGlobal.firma, configuracionGlobal.claveFirma)
        .catch((err) => console.error("Error al firmar XML:", err));

      //Aqui se genera el QR
      const QrFinal = await qrgen.default.generateQR(xmlFirmado);

      const parser = new xml2js.Parser({
        explicitArray: false,
        tagNameProcessors: [xml2js.processors.stripPrefix],
      });

      parser.parseString(QrFinal, (err, result) => {
        if (err) {
          console.error("Error al parsear el XML:", err);
          return;
        }
        // La estructura resultante se ajusta a los nombres de nodos sin prefijo
        // Accedemos al nodo gCamFuFD y luego a dCarQR
        const qrString = result.rDE.gCamFuFD.dCarQR;

        res.status(200).send(qrString);
        // Aquí ya puedes trabajar con la cadena del QR (qrString)
      });
    }
  } catch (err) {
    console.error("Error en getDataString:", err);
    res.status(500).json({
      error: "Error al en getXMLControler: ",
      mensaje: err.message,
    });
  }
};

const getQRRemisionControler = async (req, res) => {
  try {
    const { id } = req.params;
    // Aqui se desestructura data del body del request
    //const { data } = req.body;

    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    //Para usar cuando el cliente envie el json (te lee el body)
    //const data = await getXML(id);

    const parametros = await getParamsRemision(id);
    const data = await getDataRemision(id);

    console.log("Tipo de procedimineto: ", data.tipoDocumento);
    console.log("Id de la transaccion: ", id);
    console.log("Fecha de la transaccion: ", new Date().toLocaleString());

    if (parametros && data) {
      // Crea el XML
      const xml = await xmlgen.default.generateXMLDE(parametros, data);
      //Aqui se firma el XML
      const xmlFirmado = await xmlsign.default
        .signXML(xml, configuracionGlobal.firma, configuracionGlobal.claveFirma)
        .catch((err) => console.error("Error al firmar XML:", err));

      //Aqui se genera el QR
      const QrFinal = await qrgen.default.generateQR(xmlFirmado);

      const parser = new xml2js.Parser({
        explicitArray: false,
        tagNameProcessors: [xml2js.processors.stripPrefix],
      });

      parser.parseString(QrFinal, (err, result) => {
        if (err) {
          console.error("Error al parsear el XML:", err);
          return;
        }
        // La estructura resultante se ajusta a los nombres de nodos sin prefijo
        // Accedemos al nodo gCamFuFD y luego a dCarQR
        const qrString = result.rDE.gCamFuFD.dCarQR;

        res.status(200).send(qrString);
        // Aquí ya puedes trabajar con la cadena del QR (qrString)
      });
    }
  } catch (err) {
    console.error("Error en getQRRemisionController:", err);
    res.status(500).json({
      error: "Error al en getQRRemisionControler: ",
      mensaje: err.message,
    });
  }
};

const getQRFacturaExportacionControler = async (req, res) => {
  try {
    const { id } = req.params;
    // Aqui se desestructura data del body del request
    //const { data } = req.body;

    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    //Para usar cuando el cliente envie el json (te lee el body)
    //const data = await getXML(id);

    const parametros = await getParamsFacturaExportacion(id);
    const data = await getDataFacturaExportacion(id);

    console.log("Tipo de procedimineto: 2");
    console.log("Id de la transaccion: ", id);
    console.log("Fecha de la transaccion: ", new Date().toLocaleString());

    if (parametros && data) {
      // Crea el XML
      const xml = await xmlgen.default.generateXMLDE(parametros, data);
      //Aqui se firma el XML
      const xmlFirmado = await xmlsign.default
        .signXML(xml, configuracionGlobal.firma, configuracionGlobal.claveFirma)
        .catch((err) => console.error("Error al firmar XML:", err));

      //Aqui se genera el QR
      const QrFinal = await qrgen.default.generateQR(xmlFirmado);

      const parser = new xml2js.Parser({
        explicitArray: false,
        tagNameProcessors: [xml2js.processors.stripPrefix],
      });

      parser.parseString(QrFinal, (err, result) => {
        if (err) {
          console.error("Error al parsear el XML:", err);
          return;
        }
        // La estructura resultante se ajusta a los nombres de nodos sin prefijo
        // Accedemos al nodo gCamFuFD y luego a dCarQR
        const qrString = result.rDE.gCamFuFD.dCarQR;

        res.status(200).send(qrString);
        // Aquí ya puedes trabajar con la cadena del QR (qrString)
      });
    }
  } catch (err) {
    console.error("Error en getQRFacturaExportacionControler:", err);
    res.status(500).json({
      error: "Error al en getQRFacturaExportacionControler: ",
      mensaje: err.message,
    });
  }
};

const getQRRemisionExportacionControler = async (req, res) => {
  try {
    const { id } = req.params;
    // Aqui se desestructura data del body del request
    //const { data } = req.body;

    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    //Para usar cuando el cliente envie el json (te lee el body)
    //const data = await getXML(id);

    const parametros = await getParamsRemisionExportacion(id);
    const data = await getDataRemisionExportacion(id);

    console.log("Tipo de procedimineto: ", data.tipoDocumento);
    console.log("Id de la transaccion: ", id);
    console.log("Fecha de la transaccion: ", new Date().toLocaleString());

    if (parametros && data) {
      // Crea el XML
      const xml = await xmlgen.default.generateXMLDE(parametros, data);
      //Aqui se firma el XML
      const xmlFirmado = await xmlsign.default
        .signXML(xml, configuracionGlobal.firma, configuracionGlobal.claveFirma)
        .catch((err) => console.error("Error al firmar XML:", err));

      //Aqui se genera el QR
      const QrFinal = await qrgen.default.generateQR(xmlFirmado);

      const parser = new xml2js.Parser({
        explicitArray: false,
        tagNameProcessors: [xml2js.processors.stripPrefix],
      });

      parser.parseString(QrFinal, (err, result) => {
        if (err) {
          console.error("Error al parsear el XML:", err);
          return;
        }
        // La estructura resultante se ajusta a los nombres de nodos sin prefijo
        // Accedemos al nodo gCamFuFD y luego a dCarQR
        const qrString = result.rDE.gCamFuFD.dCarQR;

        res.status(200).send(qrString);
        // Aquí ya puedes trabajar con la cadena del QR (qrString)
      });
    }
  } catch (err) {
    console.error("Error en getQRRemisionExportacionControler:", err);
    res.status(500).json({
      error: "Error al en getQRRemisionExportacionControler: ",
      mensaje: err.message,
    });
  }
};

export default {
  getXMLControler,
  getQRFacturaControler,
  getQRRemisionControler,
  getQRFacturaExportacionControler,
  getQRRemisionExportacionControler,
};
