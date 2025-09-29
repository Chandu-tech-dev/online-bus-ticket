# Payment Gateway Integration Guide for KSRTC Bus Booking System

## Overview
This guide provides step-by-step instructions for integrating popular payment gateways into your KSRTC bus ticket booking system. The application now supports Razorpay, Stripe, PayPal, and Paytm integrations.

## Supported Payment Gateways

### 1. **Razorpay** (Recommended for Indian Users)
**Best for:** Indian businesses, supports all major payment methods
**Free Tier:** ₹1 lakh/month processing
**Setup URL:** https://razorpay.com/

#### Integration Steps:
1. Sign up at https://razorpay.com/
2. Complete KYC verification
3. Get your API Key ID from Dashboard → Settings → API Keys
4. Replace `'YOUR_RAZORPAY_KEY_ID'` in `script.js` with your actual key

#### Features:
- UPI, Cards, Net Banking, Wallets
- Automatic currency conversion
- Webhooks for payment confirmation
- Refund management

### 2. **Stripe**
**Best for:** International payments, developer-friendly
**Free Tier:** 2.9% + ₹30 per transaction (₹500 activation fee)
**Setup URL:** https://stripe.com/in

#### Integration Steps:
1. Sign up at https://stripe.com/
2. Complete account verification
3. Get your Publishable Key from Dashboard → Developers → API Keys
4. Replace `'YOUR_STRIPE_PUBLISHABLE_KEY'` in `script.js`

#### Features:
- Global payment methods
- Advanced fraud detection
- Subscription management
- Multi-currency support

### 3. **PayPal**
**Best for:** International users, trusted brand
**Free Tier:** 2.9% + ₹30 per transaction
**Setup URL:** https://www.paypal.com/in/webapps/mpp/account-selection

#### Integration Steps:
1. Sign up for Business account at PayPal
2. Complete verification
3. Get Client ID from Dashboard → My Apps & Credentials
4. Replace `'YOUR_PAYPAL_CLIENT_ID'` in `index.html`

#### Features:
- Buyer protection
- Chargeback handling
- Multi-currency
- Express Checkout

### 4. **Paytm**
**Best for:** Indian market, popular in India
**Free Tier:** Contact Paytm for pricing
**Setup URL:** https://business.paytm.com/

#### Integration Steps:
1. Sign up at https://business.paytm.com/
2. Complete merchant verification
3. Get MID and keys from Dashboard
4. Replace `'YOUR_PAYTM_MID'` and `'YOUR_PAYTM_TOKEN'` in `script.js`

#### Features:
- UPI, Cards, Net Banking
- Paytm Wallet integration
- EMI options
- Indian language support

## Quick Setup Guide

### For Razorpay (Easiest):
1. Visit https://razorpay.com/
2. Sign up → Complete KYC
3. Go to Dashboard → Settings → API Keys
4. Copy Key ID
5. Replace in `script.js`: `key: 'YOUR_RAZORPAY_KEY_ID'`

### For Stripe:
1. Visit https://stripe.com/
2. Sign up → Verify account
3. Dashboard → Developers → API Keys
4. Copy Publishable Key
5. Replace in `script.js`: `Stripe('YOUR_STRIPE_PUBLISHABLE_KEY')`

### For PayPal:
1. Visit https://www.paypal.com/business
2. Create Business account
3. Dashboard → My Apps & Credentials
4. Copy Client ID
5. Replace in `index.html`: `client-id=YOUR_PAYPAL_CLIENT_ID`

## Testing the Integration

### Test Cards for Different Gateways:

**Razorpay Test Cards:**
- Success: 4111 1111 1111 1111
- Failure: 4000 0000 0000 0002

**Stripe Test Cards:**
- Success: 4242 4242 4242 4242
- Failure: 4000 0000 0000 0002

**PayPal Sandbox:**
- Use sandbox.paypal.com for testing

## Security Best Practices

1. **Never expose secret keys in client-side code**
2. **Use HTTPS for all payment pages**
3. **Implement webhook verification**
4. **Store payment data securely**
5. **Regular security audits**

## Webhook Configuration

For production, set up webhooks to receive payment confirmations:

### Razorpay Webhooks:
- URL: `https://yourdomain.com/webhook/razorpay`
- Events: `payment.captured`, `payment.failed`

### Stripe Webhooks:
- URL: `https://yourdomain.com/webhook/stripe`
- Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

## Troubleshooting

### Common Issues:

1. **"Payment method not supported"**
   - Check if SDK is loaded properly
   - Verify API keys are correct

2. **Payment fails in test mode**
   - Use test card numbers
   - Check console for errors

3. **Webhook not receiving events**
   - Ensure HTTPS URL
   - Check firewall settings

## Support

- **Razorpay:** https://razorpay.com/support/
- **Stripe:** https://support.stripe.com/
- **PayPal:** https://www.paypal.com/us/smarthelp
- **Paytm:** https://business.paytm.com/support

## Cost Comparison

| Gateway | Setup Fee | Transaction Fee | Monthly Fee |
|---------|-----------|-----------------|-------------|
| Razorpay | Free | 2% | Free (₹1L/month) |
| Stripe | ₹500 | 2.9% + ₹30 | Free |
| PayPal | Free | 2.9% + ₹30 | Free |
| Paytm | Contact | Contact | Contact |

## Next Steps

1. Choose a payment gateway based on your target audience
2. Complete the signup and verification process
3. Replace the placeholder keys with actual credentials
4. Test thoroughly in sandbox mode
5. Go live with production keys

## Additional Resources

- [Payment Gateway Comparison](https://www.g2.com/categories/payment-processing)
- [PCI Compliance Guide](https://www.pcisecuritystandards.org/)
- [Indian Payment Gateway Regulations](https://www.rbi.org.in/)

---

**Note:** Always test payments in sandbox/test mode before going live. Never use real card details for testing.
