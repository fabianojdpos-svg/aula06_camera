import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function App() {

  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState('front');

  const handleCamera = () => {
    if (camera === 'front')
      setCamera('back');
    else
      setCamera('front');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 32 }}>Exemplo de câmera</Text>

      {
        permission?.granted === true &&
        <>
          <Text style={{ fontSize: 28, color: 'blue' }}>Permissão concedida</Text>
          <Button title='Alternar câmera' onPress={handleCamera} />
          <CameraView style={{ width: 200, height: 200 }} facing={camera} />
        </>
      }

      {permission?.status === 'denied' && permission?.canAskAgain === false &&

        <Text style={{ fontSize: 28, color: 'red' }}>
          Permissão negada. Alterar configuração do aplicativo nas configurações do sistema
        </Text>
      }

      {
        (permission?.status === 'undetermined' || permission?.status === 'denied') && permission?.canAskAgain !== false &&
        <>
          <Text style={{ fontSize: 28, color: 'purple' }}>
            Permissão ainda não concedida
          </Text>
          <Button title='Solicitar permissão' onPress={requestPermission} />
        </>
      }

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});