import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { cores } from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import MaquinaDetalheScreen from '../screens/MaquinaDetalheScreen';
import ConfirmarAgendamentoScreen from '../screens/ConfirmarAgendamentoScreen';
import FilaEsperaScreen from '../screens/FilaEsperaScreen';
import MeusAgendamentosScreen from '../screens/MeusAgendamentosScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Opções de estilo padrão para o header azul
const headerOpts = {
  headerStyle: { backgroundColor: cores.azulPrimario },
  headerTintColor: cores.branco,
  headerTitleStyle: { fontWeight: '700' },
};

// Stack de navegação da aba "Máquinas"
function MaquinasStack() {
  return (
    <Stack.Navigator screenOptions={headerOpts}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View>
              <Text style={{ color: cores.branco, fontWeight: '700', fontSize: 17 }}>
                WaLavar
              </Text>
              <Text style={{ color: cores.branco, opacity: 0.85, fontSize: 11 }}>
                Esteio/RS · Aberto até 22h
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MaquinaDetalhe"
        component={MaquinaDetalheScreen}
        options={({ route }) => ({ title: route.params?.maquinaNome ?? 'Máquina' })}
      />
      <Stack.Screen
        name="ConfirmarAgendamento"
        component={ConfirmarAgendamentoScreen}
        options={{ title: 'Confirmar agendamento' }}
      />
      <Stack.Screen
        name="FilaEspera"
        component={FilaEsperaScreen}
        options={({ route }) => ({
          title: `Fila — ${route.params?.maquinaNome ?? ''}`,
        })}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: cores.azulPrimario,
          tabBarInactiveTintColor: cores.cinzaSuave,
          tabBarStyle: { borderTopColor: '#e6edf3' },
          tabBarIcon: ({ color, size }) => {
            const icone = route.name === 'Maquinas' ? '🧺' : '📅';
            return <Text style={{ fontSize: size - 4 }}>{icone}</Text>;
          },
        })}>
        <Tab.Screen
          name="Maquinas"
          component={MaquinasStack}
          options={{ title: 'Máquinas' }}
        />
        <Tab.Screen
          name="MeusAgendamentos"
          component={MeusAgendamentosScreen}
          options={{
            title: 'Agendamentos',
            headerShown: true,
            ...headerOpts,
            headerTitle: 'Meus Agendamentos',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
