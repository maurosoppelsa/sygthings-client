// TermsModal.js

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import colors from '../../config/colors';

/*I'm just doing this because for some reason I wasn't able to read a simple txt file, leave it for now*/
export default function TermsModal({ visible, onClose}: { visible: boolean, onClose: () => void }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.titleText}>Términos y Condiciones</Text>
            <Text style={styles.termsConditionsText}>
              {"\n"}1. Introducción:
              {"\n"}Bienvenido a Marandu. Estos Términos y Condiciones ("Términos") rigen su uso de Marandu y cualquier servicio relacionado proporcionado por GISAE.
              
              {"\n"}2. Aceptación de los Términos: 
              {"\n"}Al descargar, instalar o utilizar nuestra aplicación móvil, usted acepta estar sujeto a estos Términos. Si no está de acuerdo con los Términos, no utilice nuestra aplicación.

              {"\n"}3. Cambios en los Términos: 
              {"\n"}Nos reservamos el derecho de modificar estos Términos en cualquier momento. Su uso continuado de la aplicación significa que acepta las modificaciones.

              {"\n"}4. Licencia de Uso: 
              {"\n"}Le concedemos una licencia limitada, no exclusiva e intransferible para usar Marandu para su uso personal y no comercial.

              {"\n"}5. Restricciones de Uso: 
              {"\n"}No debe:
              - Usar la aplicación para fines ilegales.
              - Violar derechos de propiedad intelectual.
              - Transmitir contenido malicioso como virus o malware.

              {"\n"}6. Cuentas de Usuario: 
              {"\n"}En algunos casos, puede ser necesario crear una cuenta para acceder a ciertas partes de la aplicación. Usted es responsable de mantener la confidencialidad de su cuenta.

              {"\n"}7. Privacidad: 
              {"\n"}La protección de datos personales es importante para nosotros. Consulte nuestra Política de Privacidad para obtener información sobre cómo recopilamos y usamos su información personal.

              {"\n"}8. Limitación de Responsabilidad: 
              {"\n"}Hasta el máximo permitido por la legislación argentina, en ningún caso GISAE será responsable de daños directos, indirectos, accidentales, etc.

              {"\n"}9. Indemnización: 
              {"\n"}Usted acuerda indemnizar y eximir de responsabilidad a GISAE contra cualquier reclamación o demanda que surja de su uso o abuso de [Nombre de la Aplicación].

              {"\n"}10. Disputas: 
              {"\n"}Cualquier disputa relacionada con estos Términos se regirá por las leyes de la República Argentina, sin tener en cuenta sus conflictos de disposiciones legales.

              {"\n"}11. Contacto: 
              {"\n"}Para cualquier pregunta o inquietud respecto a estos Términos, por favor contáctenos en gisae.argentina@gmail.com.

              {"\n\n"}Fecha de Vigencia: 1 de marzo de 2024

              {"\n"}Marandu © 2024 GISAE. Todos los derechos reservados.
            </Text>
          </ScrollView>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => onClose()}
          >
            <Text style={styles.textStyle}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  termsConditionsText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.maranduGreen,
  },
  textStyle: {
    color: colors.maranduYellow,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleText: {
    // Apply center alignment to the title
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
});
