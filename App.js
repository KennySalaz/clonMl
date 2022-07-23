
import React, { useCallback, useEffect, useState } from 'react';
import reducer, { actionTypes, initialState } from './App/ContextApi/reducer';
import Navigation from './App/Navegation/Navegation';
import UseContext from './App/ContextApi/UseContext';
import { LogBox, Text, View } from 'react-native';
import { AuthContext } from './App/ContextApi/useImage';
import * as SplashScreen from 'expo-splash-screen';

LogBox.ignoreAllLogs()

const App = () => {
  const [imageContext, setImageContext] = useState([])
  const [appIsReady, setAppIsReady] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        // Mantener visible la pantalla de bienvenida mientras buscamos recursos
        await SplashScreen.preventAutoHideAsync();
        // Precarga las fuentes, haz cualquier llamada a la API que necesites hacer aquí
        /* espera Font.loadAsync(Entypo.font); */
        // Retraso artificial por dos segundos para simular una carga lenta
        // experiencia. ¡Elimine esto si copia y pega el código!
        /*   await new Promise(resolve => setTimeout(resolve, 2000)); */
      } catch (e) {
        console.warn(e);
      } finally {
        // Dile a la aplicación que renderice
        setAppIsReady(true);
      }
    }
    prepare();
    setLoading(true)

  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // ¡Esto le dice a la pantalla de inicio que se oculte inmediatamente! Si llamamos a esto después
      // `setAppIsReady`, entonces podemos ver una pantalla en blanco mientras la aplicación está
      // cargando su estado inicial y renderizando sus primeros píxeles. Así que en vez,
      // ocultamos la pantalla de inicio una vez que sabemos que la vista raíz ya lo ha hecho
      // diseño realizado.
      await SplashScreen.hideAsync();
      setTimeout(() => {
        setLoading(false)
      }, 4000);
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <AuthContext.Provider value={[imageContext, setImageContext]}>
      <UseContext initialState={initialState} reducer={reducer}>
        <Navigation onLayoutRootView={onLayoutRootView} loading={loading} setLoading={setLoading} />
      </UseContext>
    </AuthContext.Provider>

  );
}

export default App


