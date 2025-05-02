import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.error,
    backgroundColor: 'rgba(230, 57, 70, 0.1)',
    padding: 16,
    borderRadius: 8,
    lineHeight: 24,
  },
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listCard: {
    margin: 16,
    padding: 20,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 0,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.text,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 6,
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: COLORS.text,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    marginBottom: 12,
  },
  picker: {
    height: 50,
    color: COLORS.text,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  disabledButton: {
    borderColor: COLORS.inactive,
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: COLORS.secondary,
    fontWeight: '600',
    fontSize: 16,
  },
  disabledButtonText: {
    color: COLORS.inactive,
  },
  advanceItem: {
    padding: 14,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginBottom: 10,
  },
  advanceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: COLORS.text,
  },
  advanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  advanceAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.success,
  },
  advanceDate: {
    fontSize: 14,
    color: COLORS.lightText,
  },
  advanceObservation: {
    fontSize: 12,
    color: COLORS.lightText,
    fontStyle: 'italic',
  },
  // Novos estilos para os botões de seleção de funcionário
  employeeButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 10,
  },
  employeeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    minWidth: 120,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  employeeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  employeeButtonInactive: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  employeeButtonText: {
    fontWeight: '500',
    fontSize: 14,
  },
  employeeButtonTextActive: {
    color: COLORS.background,
  },
  employeeButtonTextInactive: {
    color: COLORS.text,
  },
});
