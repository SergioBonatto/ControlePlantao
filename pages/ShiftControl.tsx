import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Platform, Share, ScrollView, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { styles } from '../styles/shiftControlStyles';
import { COLORS } from '../styles/colors';
import { Employee, Advance, ShiftControlProps } from '../types/types';

export default function ShiftControl({ onEmployeeAdded, advances = [], employees = [] }: ShiftControlProps) {
  const [name, setName] = useState('');
  const [dailyRate, setDailyRate] = useState('');
  const [shiftType, setShiftType] = useState<'Diurno' | 'Noturno'>('Diurno');
  const [category, setCategory] = useState<'Folguista' | 'Fixo'>('Fixo');
  const [paymentDate, setPaymentDate] = useState<string>(() => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
    });

    // Usar os adiantamentos fornecidos por props, ou os locais se não foram fornecidos
    const displayAdvances = advances;

    const handleSave = () => {
      // Verificações de validação permanecem as mesmas
      if (!name.trim()) {
        Alert.alert('Erro', 'O nome do funcionário é obrigatório');
        return;
      }

      if (!dailyRate || isNaN(parseFloat(dailyRate)) || parseFloat(dailyRate) <= 0) {
        Alert.alert('Erro', 'Informe um valor válido para a diária');
        return;
      }

      // Validar formato da data
      if (!isValidDate(paymentDate)) {
        Alert.alert('Erro', 'Data inválida. Use o formato DD/MM/AAAA');
        return;
      }

      const data: Employee = {
        name: name.trim(),
        dailyRate: parseFloat(dailyRate),
        shiftType,
        category,
        paymentDate,
      };

      // Notificar o componente pai quando um funcionário for adicionado
      if (onEmployeeAdded) {
        onEmployeeAdded(data);
      }

      Alert.alert('Sucesso', 'Dados salvos na memória!');
      setName('');
      setDailyRate('');
    };

    // Função para validar o formato da data DD/MM/AAAA
    const isValidDate = (dateString: string) => {
        // Verifica se está no formato DD/MM/AAAA
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!regex.test(dateString)) return false;

        // Extrair dia, mês e ano
        const matches = dateString.match(regex);
        if (!matches) return false;

        const day = parseInt(matches[1], 10);
        const month = parseInt(matches[2], 10);
        const year = parseInt(matches[3], 10);

        // Verificar se os valores são válidos
        if (month < 1 || month > 12) return false;

        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) return false;

        return true;
      };

  // const handleSaveAdvance = (advance: Advance) => {
  //   setLocalAdvances(prev => [...prev, advance]);
  // };

  const handleExportCSV = async () => {
    if (employees.length === 0) {
      Alert.alert('Aviso', 'Não há dados para exportar');
      return;
    }

    try {
      // Gerar dois arquivos diferentes
      // 1. Arquivo de plantões
      const shiftsHeader = 'nome,data,categoria,tipo_plantão,valor_diária\n';
      const shiftsRows = employees.map(employee => {
        return `${employee.name},${employee.paymentDate},${employee.category},${employee.shiftType},${employee.dailyRate.toFixed(2)}`;
      }).join('\n');
      const shiftsCSV = shiftsHeader + shiftsRows;

      // 2. Arquivo de resumo com adiantamentos agrupados por nome
      const summaryHeader = 'nome,total_plantões,valor_total_plantões,total_adiantamentos,valor_total_adiantamentos,saldo\n';

      // Agrupar funcionários por nome para o resumo
      interface EmployeeSummary {
        shiftCount: number;
        totalShiftValue: number;
        name: string;
      }

      const employeeSummaries: Record<string, EmployeeSummary> = {};

      // Calcular plantões por funcionário
      employees.forEach(employee => {
        if (!employeeSummaries[employee.name]) {
          employeeSummaries[employee.name] = {
            shiftCount: 0,
            totalShiftValue: 0,
            name: employee.name
          };
        }

        employeeSummaries[employee.name].shiftCount += 1;
        employeeSummaries[employee.name].totalShiftValue += employee.dailyRate;
      });

      // Calcular adiantamentos por funcionário
      interface AdvanceSummary {
        count: number;
        totalAmount: number;
      }

      const advanceSummaries: Record<string, AdvanceSummary> = {};

      displayAdvances.forEach(advance => {
        if (!advanceSummaries[advance.employeeName]) {
          advanceSummaries[advance.employeeName] = {
            count: 0,
            totalAmount: 0
          };
        }

        advanceSummaries[advance.employeeName].count += 1;
        advanceSummaries[advance.employeeName].totalAmount += advance.amount;
      });

      // Gerar linhas para o resumo
      const summaryRows = Object.values(employeeSummaries).map(summary => {
        const advances = advanceSummaries[summary.name] || { count: 0, totalAmount: 0 };
        const saldo = summary.totalShiftValue - advances.totalAmount;

        return `${summary.name},${summary.shiftCount},${summary.totalShiftValue.toFixed(2)},${advances.count},${advances.totalAmount.toFixed(2)},${saldo.toFixed(2)}`;
      }).join('\n');

      const summaryCSV = summaryHeader + summaryRows;

      // 3. Arquivo de adiantamentos detalhados
      const advancesHeader = 'nome,data,valor\n';
      const advancesRows = displayAdvances.map(advance => {
        return `${advance.employeeName},${advance.date},${advance.amount.toFixed(2)}`;
      }).join('\n');
      const advancesCSV = advancesHeader + advancesRows;

      // Salvar os arquivos
      const shiftsFileUri = `${FileSystem.documentDirectory}plantoes.csv`;
      const summaryFileUri = `${FileSystem.documentDirectory}resumo_plantoes.csv`;
      const advancesFileUri = `${FileSystem.documentDirectory}adiantamentos.csv`;

      await FileSystem.writeAsStringAsync(shiftsFileUri, shiftsCSV, { encoding: FileSystem.EncodingType.UTF8 });
      await FileSystem.writeAsStringAsync(summaryFileUri, summaryCSV, { encoding: FileSystem.EncodingType.UTF8 });
      await FileSystem.writeAsStringAsync(advancesFileUri, advancesCSV, { encoding: FileSystem.EncodingType.UTF8 });

      // Perguntar ao usuário qual arquivo compartilhar
      Alert.alert(
        'Exportação concluída',
        'Qual arquivo você deseja compartilhar?',
        [
          {
            text: 'Plantões',
            onPress: () => shareFile(shiftsFileUri, 'Dados de plantões')
          },
          {
            text: 'Resumo',
            onPress: () => shareFile(summaryFileUri, 'Resumo de plantões e adiantamentos')
          },
          {
            text: 'Adiantamentos',
            onPress: () => shareFile(advancesFileUri, 'Dados de adiantamentos')
          },
          {
            text: 'Cancelar',
            style: 'cancel'
          }
        ]
      );
    } catch (error) {
      console.error('Erro na exportação:', error);
      Alert.alert(
        'Erro ao exportar',
        'Não foi possível exportar os dados. Detalhes técnicos: ' +
        (error instanceof Error ? error.message : 'Erro desconhecido')
      );
    }
  };

  // Função auxiliar para compartilhar um arquivo
  const shareFile = async (fileUri: string, message: string) => {
    const shareResult = await Share.share({
      url: fileUri,
      message: message
    });

    if (shareResult.action === Share.sharedAction) {
      Alert.alert('Exportado com sucesso!', 'Arquivo compartilhado.');
    } else if (shareResult.action === Share.dismissedAction) {
      Alert.alert('Informação', 'Compartilhamento cancelado');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Adicionar Funcionário</Text>

        <Text style={styles.label}>Nome do Funcionário</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Digite o nome"
          placeholderTextColor={COLORS.inactive}
        />

        <Text style={styles.label}>Valor da Diária</Text>
        <TextInput
          style={styles.input}
          value={dailyRate}
          onChangeText={setDailyRate}
          keyboardType="numeric"
          placeholder="Ex: 150.00"
          placeholderTextColor={COLORS.inactive}
        />

        <Text style={styles.label}>Data de Pagamento</Text>
        <TextInput
          style={styles.input}
          value={paymentDate}
          onChangeText={setPaymentDate}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={COLORS.inactive}
        />

        <Text style={styles.label}>Tipo de Plantão</Text>
        <View style={styles.optionButtonContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              shiftType === 'Diurno' ? styles.optionButtonActive : styles.optionButtonInactive
            ]}
            onPress={() => setShiftType('Diurno')}
          >
            <Text
              style={[
                styles.optionButtonText,
                shiftType === 'Diurno' ? styles.optionButtonTextActive : styles.optionButtonTextInactive
              ]}
            >
              Diurno
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              shiftType === 'Noturno' ? styles.optionButtonActive : styles.optionButtonInactive
            ]}
            onPress={() => setShiftType('Noturno')}
          >
            <Text
              style={[
                styles.optionButtonText,
                shiftType === 'Noturno' ? styles.optionButtonTextActive : styles.optionButtonTextInactive
              ]}
            >
              Noturno
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.optionButtonContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              category === 'Fixo' ? styles.optionButtonActive : styles.optionButtonInactive
            ]}
            onPress={() => setCategory('Fixo')}
          >
            <Text
              style={[
                styles.optionButtonText,
                category === 'Fixo' ? styles.optionButtonTextActive : styles.optionButtonTextInactive
              ]}
            >
              Fixo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              category === 'Folguista' ? styles.optionButtonActive : styles.optionButtonInactive
            ]}
            onPress={() => setCategory('Folguista')}
          >
            <Text
              style={[
                styles.optionButtonText,
                category === 'Folguista' ? styles.optionButtonTextActive : styles.optionButtonTextInactive
              ]}
            >
              Folguista
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar Entrada</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, employees.length === 0 && styles.disabledButton]}
            onPress={handleExportCSV}
            disabled={employees.length === 0}
          >
            <Text style={[styles.secondaryButtonText, employees.length === 0 && styles.disabledButtonText]}>
              Exportar CSV
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {employees.length > 0 && (
        <View style={styles.listCard}>
          <Text style={styles.cardTitle}>Funcionários Registrados</Text>
          {employees.map((employee, index) => (
            <View key={index} style={styles.employeeItem}>
              <Text style={styles.employeeName}>{employee.name}</Text>
              <View style={styles.employeeDetails}>
                <Text style={styles.employeeText}>
                  R$ {employee.dailyRate.toFixed(2)}
                </Text>
                <Text style={styles.employeeDate}>
                  {employee.paymentDate}
                </Text>
                <View style={[
                  styles.badge,
                  employee.shiftType === 'Diurno' ? styles.diurnoBadge : styles.noturnoBadge
                ]}>
                  <Text style={styles.badgeText}>{employee.shiftType}</Text>
                </View>
                <View style={[
                  styles.badge,
                  employee.category === 'Fixo' ? styles.fixoBadge : styles.folguistaBadge
                ]}>
                  <Text style={styles.badgeText}>{employee.category}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
