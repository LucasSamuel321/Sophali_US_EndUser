import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  placeholder: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 50,
  },
  toggleContainer: {
    flexDirection: 'row',
    margin: 0,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 4,
  },
  toggleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  toggleOptionActive: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  toggleTextActive: {
    color: Colors.textLight,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  paymentMethodsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    marginBottom: 12,
  },
  methodTile: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  methodTileActive: {
    borderColor: Colors.primary,
    backgroundColor: '#fff',
  },
  methodIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  methodLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  methodSubLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  detailContent: {
    flex: 1,
    marginLeft: 16,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  detailSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  visaIcon: {
    width: 40,
    height: 24,
    backgroundColor: Colors.visaBlue,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visaText: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: 'bold',
  },
  mastercardIcon: {
    width: 40,
    height: 24,
    backgroundColor: Colors.mastercardRed,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mastercardText: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: 'bold',
  },
  amexIcon: {
    width: 40,
    height: 24,
    backgroundColor: Colors.amexBlue,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amexText: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: 'bold',
  },
  googlePayIcon: {
    width: 40,
    height: 24,
    backgroundColor: Colors.googlePayGreen,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googlePayText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  applePayIcon: {
    width: 40,
    height: 24,
    backgroundColor: Colors.applePayBlack,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInputContainer: {
    marginBottom: 16,
  },
  cardInputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  digitalWalletInfoContainer: {
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  digitalWalletRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  digitalWalletText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 12,
    flex: 1,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  discountValue: {
    color: Colors.success,
  },
  tipContainer: {
    marginTop: 16,
  },
  tipLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  tipButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tipButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tipButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  tipButtonTextActive: {
    color: Colors.textLight,
  },
  payNowBar: {
    flexDirection: 'column',
    backgroundColor: Colors.cartBackground,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    margin: 10
  },
  paymentSummary: {
    marginBottom: 5,
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 10,
    color: Colors.cartText,
    textAlign: 'center',
  },
  payNowButton: {
    marginBottom: 8,
  },
  payNowButtonDisabled: {
    opacity: 0.6,
  },
  payNowText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.cartText,
    textAlign: 'center',
  },
  estimatedInfo: {
    fontSize: 14,
    color: Colors.cartText,
    textAlign: 'center',
  },
});
