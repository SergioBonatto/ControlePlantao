import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Share, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { styles } from '../styles/advancePaymentStyles';
import { COLORS } from '../styles/colors';
import { Employee, Advance, AdvancePaymentProps } from '../types/types';

export default function AdvancePayment({ employees, onSaveAdvance, advances = [] }: AdvancePaymentProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  });

  // Obter lista de nomes únicos de funcionários
  const uniqueEmployees = [...new Set(employees.map(emp => emp.name))];

  // Inicializar com o primeiro funcionário se houver algum
  useEffect(() => {
    if (uniqueEmployees.length > 0 && !selectedEmployee) {
      setSelectedEmployee(uniqueEmployees[0]);
    }
  }, [employees]);

  const handleSaveAdvance = () => {
    // Validações permanecem iguais
    if (!selectedEmployee) {
      Alert.alert('Erro', 'Selecione um funcionário');
      return;
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Erro', 'Informe um valor válido para o adiantamento');
      return;
    }

    if (!date) {
      Alert.alert('Erro', 'Informe uma data válida');
      return;
    }

    // Gerar um ID único para este adiantamento
    const advanceId = Date.now().toString();

    // Criar sempre um novo adiantamento
    const advanceData: Advance = {
      id: advanceId,
      employeeName: selectedEmployee,
      amount: parseFloat(amount),
      date: date,
      observation: '' // Campo opcional para observações
    };

    // Notificar o componente pai com o novo adiantamento
    onSaveAdvance(advanceData);

    Alert.alert('Sucesso', 'Adiantamento registrado com sucesso!');
    setAmount('');
  };

  const handleExportCSV = async () => {
    if (advances.length === 0) {
      Alert.alert('Aviso', 'Não há adiantamentos para exportar');
      return;
    }

    const header = 'Funcionário,Valor,Data,Observação\n';
    const body = advances.map(a => {
      return `${a.employeeName},${a.amount},${a.date},${a.observation || ''}`;
    }).join('\n');

    const csv = header + body;

    try {
      const fileUri = `${FileSystem.documentDirectory}adiantamentos.csv`;
      await FileSystem.writeAsStringAsync(fileUri, csv);

      await Share.share({
        url: fileUri,
        message: 'Dados de adiantamentos'
      });

      Alert.alert('Exportado com sucesso!', 'Arquivo de adiantamentos compartilhado.');
    } catch (error) {
      Alert.alert('Erro ao salvar', error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };

  if (uniqueEmployees.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Cadastre funcionários primeiro na tela de Controle de Plantão
        </Text>
      </View>
    );
  }

const renderAdvances = () => {
  return advances.map((advance, index) => (
    <View key={index} style={styles.advanceItem}>
      <Text style={styles.advanceName}>{advance.employeeName}</Text>
      <View style={styles.advanceDetails}>
        <Text style={styles.advanceAmount}>
          R$ {advance.amount.toFixed(2)}
        </Text>
        <View>
          <Text style={styles.advanceDate}>
            {advance.date}
          </Text>
          {advance.observation && (
            <Text style={styles.advanceObservation}>
              {advance.observation}
            </Text>
          )}
        </View>
      </View>
    </View>
  ));
};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Registro de Adiantamentos</Text>

        <Text style={styles.label}>Funcionário</Text>
        <ScrollView
          horizontal={uniqueEmployees.length > 3}
          showsHorizontalScrollIndicator={true}
          style={{ marginBottom: 10 }}
        >
          <View style={styles.employeeButtonContainer}>
            {uniqueEmployees.map((name) => (
              <TouchableOpacity
                key={name}
                style={[
                  styles.employeeButton,
                  selectedEmployee === name ? styles.employeeButtonActive : styles.employeeButtonInactive
                ]}
                onPress={() => setSelectedEmployee(name)}
              >
                <Text
                  style={[
                    styles.employeeButtonText,
                    selectedEmployee === name ? styles.employeeButtonTextActive : styles.employeeButtonTextInactive
                  ]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.label}>Valor do Adiantamento</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Ex: 300.00"
          placeholderTextColor={COLORS.inactive}
        />

        <Text style={styles.label}>Data</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={COLORS.inactive}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSaveAdvance}>
            <Text style={styles.buttonText}>Registrar Adiantamento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, advances.length === 0 && styles.disabledButton]}
            onPress={handleExportCSV}
            disabled={advances.length === 0}
          >
            <Text style={[styles.secondaryButtonText, advances.length === 0 && styles.disabledButtonText]}>
              Exportar Adiantamentos (CSV)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {advances.length > 0 && (
        <View style={styles.listCard}>
          <Text style={styles.cardTitle}>Adiantamentos Registrados</Text>
          {renderAdvances()}
        </View>
      )}
    </ScrollView>
  );
}
