import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  optionButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 10,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButtonActive: {
    backgroundColor: COLORS.primary,
  },
  optionButtonInactive: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionButtonText: {
    fontWeight: '500',
    fontSize: 15,
  },
  optionButtonTextActive: {
    color: COLORS.background,
  },
  optionButtonTextInactive: {
    color: COLORS.text,
  },
  segmentedControl: {
    flexDirection: 'row',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  segmentedButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentedButtonActive: {
    backgroundColor: COLORS.primary,
  },
  segmentedButtonText: {
    color: COLORS.text,
    fontWeight: '500',
    fontSize: 14,
  },
  segmentedButtonTextActive: {
    color: COLORS.background,
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
  employeeItem: {
    padding: 14,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginBottom: 10,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: COLORS.text,
  },
  employeeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  employeeText: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '500',
  },
  employeeDate: {
    fontSize: 14,
    color: COLORS.lightText,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 5,
  },
  diurnoBadge: {
    backgroundColor: '#4CC9F0',
  },
  noturnoBadge: {
    backgroundColor: '#3A0CA3',
  },
  fixoBadge: {
    backgroundColor: '#4895EF',
  },
  folguistaBadge: {
    backgroundColor: '#F72585',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});
