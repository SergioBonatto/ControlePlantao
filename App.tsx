import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import ShiftControl from './pages/ShiftControl';
import AdvancePayment from './pages/AdvancePayment';
import { styles } from './styles/appStyles';
import { Employee, Advance } from './types/types';

type Screen = 'ShiftControl' | 'AdvancePayment';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('ShiftControl');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [advances, setAdvances] = useState<Advance[]>([]);

  const handleEmployeeAdded = (employee: Employee) => {
    setEmployees(prev => [...prev, employee]);
  };

  const handleAdvanceAdded = (advance: Advance) => {
    setAdvances(prev => [...prev, advance]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Controle de Plantão</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              currentScreen === 'ShiftControl' && styles.activeTab
            ]}
            onPress={() => setCurrentScreen('ShiftControl')}
          >
            <Text
              style={[
                styles.tabText,
                currentScreen === 'ShiftControl' && styles.activeTabText
              ]}
            >
              Funcionários
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              currentScreen === 'AdvancePayment' && styles.activeTab
            ]}
            onPress={() => setCurrentScreen('AdvancePayment')}
          >
            <Text
              style={[
                styles.tabText,
                currentScreen === 'AdvancePayment' && styles.activeTabText
              ]}
            >
              Adiantamentos
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {currentScreen === 'ShiftControl' ? (
          <ShiftControl
            onEmployeeAdded={handleEmployeeAdded}
            advances={advances}
            employees={employees}
          />
        ) : (
          <AdvancePayment
            employees={employees}
            onSaveAdvance={handleAdvanceAdded}
            advances={advances}
          />
        )}
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
