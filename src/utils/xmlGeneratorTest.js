import { getDataById, getDataString, getDataBoolean, getDataFecha } from "../../sqlProcedures/sqlRequests.js";
import xmlgen from 'facturacionelectronicapy-xmlgen';
import xmlsign from 'facturacionelectronicapy-xmlsign';
import qrgen from 'facturacionelectronicapy-qrgen';
import xml2js from 'xml2js';

import { configuracionGlobal } from "../../config/configRoute.js";

export const getParams = async (id) => {
  // Ejecuta cada consulta y guarda el resultado
  const rucResult = await getDataString(
    `SELECT rtrim(dRucEm) + '-' + ltrim(dDVEmi) as ruc FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const razonSocialResult = await getDataString(
    `select dNomEmi from tmpFactuDE_D2 where idMov = ${id} and tipo=1`
  )
  const nombreFantasiaResult = await getDataString(
    `SELECT dNomFanEmi FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const actividadesEconomicasCodeResult = await getDataString(
    `SELECT cActEco from tmpFactuDE_D21 WHERE idMov = ${id} and tipo=1`
  );
  const actividadesEconomicasDescripcionResult = await getDataString(
    `SELECT dDEsACtEco from tmpFactuDE_D21 WHERE idMov = ${id} and tipo=1`
  );
  const timbradoNumeroResult = await getDataString(
    `SELECT dNumTim FROM tmpFactuDE_C WHERE idMov = ${id} and tipo=1`
  );
  const timbradoFechaResult = await getDataString(
    `SELECT dFeIniT FROM tmpFactuDE_C WHERE idMov = ${id} and tipo=1`
  );
  const tipoContribuyenteResult = await getDataString(
    `SELECT iTipCont FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const tipoRegimenResult = await getDataString(
    `SELECT cTipReg FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const codigoResult = await getDataString(
    `SELECT dEst FROM tmpFactuDE_C WHERE idMov = ${id} and tipo=1`
  );
  const direccionResult = await getDataString(
    `SELECT dDirEmi FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const numeroCasaResult = await getDataString(
    `SELECT dNumCas FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const departamentoResult = await getDataString(
    `SELECT cDepEmi FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  // Aquí se corrigió el await
  const departamentoDescripcionResult = await getDataString(
    `SELECT dDesDepEmi FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const distritoResult = await getDataString(
    `SELECT cDisEmi FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const distritoDescripcionResult = await getDataString(
    `SELECT dDesDisEmi FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const ciudadResult = await getDataString(
    `SELECT cCiuEmi FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const ciudadDescripcionResult = await getDataString(
    `SELECT dDesCiuEmi FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const telefonoResult = await getDataString(
    `SELECT dTelEmi FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const emailResult = await getDataString(
    `SELECT dEmailE FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );
  const denominacionResult = await getDataString(
    `SELECT dDenSuc FROM tmpFactuDE_D2 WHERE idMov = ${id} and tipo=1`
  );

  const actividadesEconomicas = actividadesEconomicasCodeResult.map(
    (item, index) => {
      return {
        codigo: item.cActEco.trim(),
        descripcion:
          actividadesEconomicasDescripcionResult[index]?.dDEsACtEco.trim() ||
          null,
      };
    }
  );

  return {
    version: 150,
    ruc: rucResult[0]?.ruc || null,
    razonSocial: razonSocialResult[0]?.dNomEmi || null,
    nombreFantasia: nombreFantasiaResult[0]?.dNomFanEmi || null,
    actividadesEconomicas,
    timbradoNumero: timbradoNumeroResult[0]?.dNumTim || null,
    timbradoFecha: timbradoFechaResult[0]?.dFeIniT || null,
    tipoContribuyente: tipoContribuyenteResult[0]?.iTipCont || null,
    tipoRegimen: tipoRegimenResult[0]?.cTipReg || null,
    establecimientos: [
      {
        codigo: codigoResult[0]?.dEst || null,
        direccion: direccionResult[0]?.dDirEmi || null,
        numeroCasa: numeroCasaResult[0]?.dNumCas,
        departamento: departamentoResult[0]?.cDepEmi || null,
        departamentoDescripcion:
          departamentoDescripcionResult[0]?.dDesDepEmi || null,
        distrito: distritoResult[0]?.cDisEmi || null,
        distritoDescripcion: distritoDescripcionResult[0]?.dDesDisEmi || null,
        ciudad: ciudadResult[0]?.cCiuEmi || null,
        ciudadDescripcion: ciudadDescripcionResult[0]?.dDesCiuEmi || null,
        telefono: telefonoResult[0]?.dTelEmi || null,
        email: emailResult[0]?.dEmailE || null,
        denominacion: denominacionResult[0]?.dDenSuc || null,
      },
    ],
  };
};

export const getParamData = async (id) => {
  // Ejecuta cada consulta y guarda el resultado
  const tipoDocumentoData = await getDataString(
    `SELECT iTiDE FROM tmpFactuDE_C WHERE idMov = ${id} and tipo=1`
  );
  const establecimientoData = await getDataString(
    `SELECT dEst from tmpFactuDE_C WHERE idMov = ${id} and tipo=1`
  );
  const codigoSeguridadAleatorioData = await getDataString(
    `SELECT dCodSeg from tmpFactuDE_B WHERE idMov = ${id} and tipo=1`
  );
  const puntoData = await getDataString(
    `SELECT dPunExp FROM tmpFactuDE_C WHERE idMov = ${id} and tipo=1`
  );
  const numeroData = await getDataString(
    `SELECT dNumDoc FROM tmpFactuDE_C WHERE idMov = ${id} and tipo=1`
  );
  const fechaData = await getDataString(
    `SELECT dFeEmiDE FROM tmpFactuDE_D WHERE idMov = ${id} and tipo=1`
  );
  const tipoEmisionData = await getDataString(
    `SELECT iTipEmi FROM tmpFactuDE_B WHERE idMov = ${id} and tipo=1`
  );
  const tipoTransaccionData = await getDataString(
    `SELECT iTipTra FROM tmpFactuDE_D1 WHERE idMov = ${id} and tipo=1`
  );
  const tipoImpuestoData = await getDataString(
    `SELECT iTImp FROM tmpFactuDE_D1 WHERE idMov = ${id} and tipo=1`
  );
  const monedaData = await getDataString(
    `SELECT cMoneOpe FROM tmpFactuDE_D1 WHERE idMov = ${id} and tipo=1`
  );
  const condicionAnticipoData = await getDataString(
    `SELECT iCondAnt FROM tmpFactuDE_D1 WHERE idMov = ${id} and tipo=1`
  );
  const condicionTipoCambioData = await getDataString(
    `SELECT dCondTiCam FROM tmpFactuDE_D1 WHERE idMov = ${id} and tipo=1`
  );
  const cambioData = await getDataString(
    `SELECT dTiCam FROM tmpFactuDE_D1 WHERE idMov = ${id} and tipo=1`
  );
  // datos del cliente, verificar con true o false
  const contribuyenteData = await getDataBoolean(
    `SELECT (case
              when iNatRec = 1 then 1
              else 0
            end) as resultadoFinal
     FROM tmpFactuDE_D3 WHERE   idMov = ${id} and tipo=1`
  )
  const rucData = await getDataString(
    `SELECT rtrim(dRucRec) + '-' + ltrim(dDVRec) as rucCliente FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  );
  const razonSocialData = await getDataString(
    `SELECT dNomRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  );
  const nombreFantasiaData = await getDataString(
    `SELECT dNomFanRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  );
  const tipoOperacionData = await getDataString(
    `SELECT iTiOpe FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  );
  const direccionData = await getDataString(
    `SELECT dDirRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  );
  const numeroCasaData = await getDataString(
    `SELECT dNumCasRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  );
  const departamentoData = await getDataString(
    `SELECT cDepRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const departamentoDescripcionData = await getDataString(
    `SELECT dDesDepRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const distritoData = await getDataString(
    `SELECT cDisRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const distritoDescripcionData = await getDataString(
    `SELECT dDesDisRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const ciudadData = await  getDataString(
    `SELECT cCiuRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const ciudadDescripcionData = await getDataString(
    `SELECT dDesCiuRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const paisData = await getDataString(
    `SELECT cPaisRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const paisDescripcionData = await getDataString(
    `SELECT dDesPaisRe FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const tipoContribuyenteData = await getDataString(
    `SELECT iTiContRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  )
  const documentoTipoData = await getDataString(
    `SELECT iTipIDRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const documentoNumeroData = await getDataString(
    `SELECT dNumIDRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const telefonoData = await getDataString(
    `SELECT dTelRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const celularData = await getDataString(
    `SELECT dCelRec FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const emailData = await getDataString(
    `SELECT rtrim(dEmailRec) FROM  tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  const codigoData = await getDataString(
    `SELECT dCodCliente FROM tmpFactuDE_D3 WHERE idMov = ${id} and tipo=1`
  ); 
  // tipo de operacion 
  const presenciaData = await getDataString(
    `SELECT iIndPres FROM tmpFactuDE_E WHERE idMov = ${id} and tipo=1`
  ); 
  const fechaEnvioData = await getDataString(
    `SELECT dFecEmNR FROM tmpFactuDE_E WHERE idMov = ${id} and tipo=1`
  ); 
  // condicion y tipo de pago (contado o credito)
  const tipoData = await getDataString(
    `SELECT iTiPago FROM tmpFactuDE_E71 WHERE idMov = ${id} and tipo=1`
  );
  //al contado
  const montoData = await getDataString(
    `SELECT dMonTiPag FROM tmpFactuDE_E71 WHERE idMov = ${id} and tipo=1`
  );
  const nombreMonedaData = await getDataString(
    `SELECT cMoneTiPag FROM tmpFactuDE_E71 WHERE idMov = ${id} and tipo=1`
  );
  const cambioMonedaData = await getDataString(
    `SELECT dTiCamTiPag FROM tmpFactuDE_E71 WHERE idMov = ${id} and tipo=1`
  );
  //por tarjeta
  const nombreTarjetaData = await getDataString(
    `SELECT dDesDenTarj FROM tmpFactuDE_E711 WHERE idMov = ${id} and tipo=1`
  );
  const titularTarjetaData = await getDataString(
    `SELECT dNomTit FROM tmpFactuDE_E711 WHERE idMov = ${id} and tipo=1`
  );
  const rucTarjetaData = await getDataString(
    `SELECT dRUCProTar FROM tmpFactuDE_E711 WHERE idMov = ${id} and tipo=1`
  );
  const razonSocialTarjetaData = await getDataString(
    `SELECT dRSProTar FROM tmpFactuDE_E711 WHERE idMov = ${id} and tipo=1`
  );
  const medioPagoTarjetaData = await getDataString(
    `SELECT iForProPa FROM tmpFactuDE_E711 WHERE idMov = ${id} and tipo=1`
  );
  const codigoAutorizacionTarjetaData = await getDataString(
    `SELECT dCodAuOpe FROM tmpFactuDE_E711 WHERE idMov = ${id} and tipo=1`
  );
  //cheque
  const nroChequeData = await getDataString(
    `SELECT dNumCheq FROM tmpFactuDE_E712 WHERE idMov = ${id} and tipo=1`
  );
  const bancoChequeData = await getDataString(
    `SELECT dBcoEmi FROM tmpFactuDE_E712 WHERE idMov = ${id} and tipo=1`
  );
  //credito
  const tipoCondicionData = await getDataString(
    `SELECT iCondOpe FROM tmpFactuDE_E7 WHERE idMov = ${id} and tipo=1`
  )
  // para hacer el switch
  const tipoPagoCreditoData = await getDataString(
    `SELECT iTiPago FROM tmpFactuDE_E71 WHERE idMov = ${id} and tipo=1`
  )
  const tipoCreditoData = await getDataString(
    `SELECT iCondCred FROM tmpFactuDE_E72 WHERE idMov = ${id} and tipo=1`
  );
  const plazoCreditoData = await getDataString(
    `SELECT dPlazoCre FROM tmpFactuDE_E72 WHERE idMov = ${id} and tipo=1`
  );
  //detalles - items
  const codigoItemData = await getDataString(
    `SELECT dCodInt FROM tmpFactuDE_E8 WHERE idMov = ${id} and tipo=1`
  );
  const descripcionItemData = await getDataString(
    `SELECT dDesProSer FROM tmpFactuDE_E8 WHERE idMov = ${id} and tipo=1`
  );
  const unidadMedidaItemData = await getDataString(
    `SELECT cUniMed FROM tmpFactuDE_E8 WHERE idMov = ${id} and tipo=1`
  );
  const cantidadItemData = await getDataString(
    `SELECT dCantProSer FROM tmpFactuDE_E8 WHERE idMov = ${id} and tipo=1`
  );
  const precioUnitarioItemData = await getDataString(
    `SELECT dPUniProSer FROM tmpFactuDE_E81 WHERE idMov = ${id} and tipo=1`
  );
  const ivaTipoItemData = await getDataString(
    `SELECT iAfecIVA FROM tmpFactuDE_E82 WHERE idMov = ${id} and tipo=1`
  );
  const ivaBaseItemData = await getDataString(
    `SELECT dPropIVA FROM tmpFactuDE_E82 WHERE idMov = ${id} and tipo=1`
  );
  const ivaItemData = await getDataString(
    `SELECT dTasaIVA FROM tmpFactuDE_E82 WHERE idMov = ${id} and tipo=1`
  );

  const respuesta = await contribuyenteData.resultadoFinal;
  //console.log(respuesta)
  return {
    tipoDocumento: tipoDocumentoData[0]?.iTiDE || null,
    establecimiento: establecimientoData[0]?.dEst || null,
    codigoSeguridadAleatorio: codigoSeguridadAleatorioData[0]?.dCodSeg || null,
    punto: puntoData[0]?.dPunExp || null,
    numero: numeroData[0]?.dNumDoc || null,
    fecha: fechaData[0]?.dFeEmiDE || null,
    tipoEmision: tipoEmisionData[0]?.iTipEmi || null,
    tipoTransaccion: tipoTransaccionData[0]?.iTipTra || null,
    tipoImpuesto: tipoImpuestoData[0]?.iTImp || null,
    moneda: monedaData[0]?.cMoneOpe || null,
    condicionAnticipo: condicionAnticipoData[0]?.iCondAnt || null,
    condicionTipoCambio: condicionTipoCambioData[0]?.dCondTiCam || null,
    cambio: cambioData[0]?.dTiCam || null,
    cliente: {
      contribuyente: contribuyenteData || false,
      ruc: rucData[0]?.rucCliente || null,
      razonSocial: razonSocialData[0]?.dNomRec || null,
      nombreFantasia: nombreFantasiaData[0]?.dNomFanRec || null,
      tipoOperacion: tipoOperacionData[0]?.iTiOpe || null,
      direccion: direccionData[0]?.dDirRec || null,
      numeroCasa: numeroCasaData[0]?.dNumCasRec,
      departamento: departamentoData[0]?.cDepRec || null,
      departamentoDescripcion:
        departamentoDescripcionData[0]?.dDesDepRec || null,
      distrito: distritoData[0]?.cDisRec || null,
      distritoDescripcion: distritoDescripcionData[0]?.dDesDisRec || null,
      ciudad: ciudadData[0]?.cCiuRec || null,
      ciudadDescripcion: ciudadDescripcionData[0]?.dDesCiuRec || null,
      pais: paisData[0]?.cPaisRec || null,
      paisDescripcion: paisDescripcionData[0]?.dDesPaisRe || null,
      tipoContribuyente: tipoContribuyenteData[0]?.iTiContRec || null,
      documentoTipo: documentoTipoData[0]?.iTipIDRec,
      documentoNumero: documentoNumeroData[0]?.dNumIDRec || null,
      telefono: telefonoData[0]?.dTelRec || null,
      celular: celularData[0]?.dCelRec || null,
      email: emailData[0]?.dEmailRec || null,
      codigo: codigoData[0]?.dCodCliente || null,
    },
    factura: {
      presencia: presenciaData[0]?.iIndPres || null,
      fechaEnvio: fechaEnvioData[0]?.dFecEmNR || null,
    },
    condicion: {
      tipo: tipoCondicionData[0]?.iCondOpe || null,
      ...(tipoCondicionData[0]?.iCondOpe === 1 ? {
          entregas: [{
              tipo: tipoCondicionData[0]?.iCondOpe || null,
              monto: montoData[0]?.dMonTiPag || null,
              moneda: nombreMonedaData[0]?.cMoneTiPag || null,
              cambio: cambioMonedaData[0]?.dTiCamTiPag || null,
              infoTarjeta: {
                  tipoDescripcion: nombreTarjetaData[0]?.dDesDenTarj || null,
                  titular: titularTarjetaData[0]?.dNomTit || null,
                  ruc: rucTarjetaData[0]?.dRUCProTar || null,
                  razonSocial: razonSocialTarjetaData[0]?.dRSProTar || null,
                  medioPago: medioPagoTarjetaData[0]?.iForProPa || null,
                  codigoAutorizacion: codigoAutorizacionTarjetaData[0]?.dCodAuOpe || null
              },
              infoCheque: {
                  numeroCheque: nroChequeData[0]?.dNumCheq || null,
                  banco: bancoChequeData[0]?.dBcoEmi || null,
              }
          }]
      } : {}),
      ...(tipoCondicionData[0]?.iCondOpe === 2 ? {
          credito: {
              tipo: tipoCreditoData[0]?.iCondCred || null,
              plazo: plazoCreditoData[0]?.dPlazoCre || null,
          }
      } : {})
    },    
      items: 
        codigoItemData.map((item, index) => {
          return {
            codigo: item.dCodInt.trim(),
            descripcion: descripcionItemData[index]?.dDesProSer.trim() || null,
            unidadMedida: unidadMedidaItemData[index]?.cUniMed || null,
            cantidad: cantidadItemData[index]?.dCantProSer || null,
            precioUnitario: precioUnitarioItemData[index]?.dPUniProSer || null,
            ivaTipo: ivaTipoItemData[index]?.iAfecIVA ,
            ivaBase: ivaBaseItemData[index]?.dPropIVA ,
            iva: ivaItemData[index]?.dTasaIVA ,
          };
      },
    ),
  }
};