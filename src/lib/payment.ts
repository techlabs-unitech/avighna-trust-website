/**
 * Payment gateway hook for Planned Trips — NOT connected yet.
 *
 * When a gateway (Razorpay, PayU, Stripe …) is chosen, implement `startPayment` here and set
 * `paymentEnabled` to true. The trip form already calls it from the "Pay now" button on the
 * confirmation screen, and the database already has payment_status / payment_provider /
 * payment_reference / amount_cents / currency columns waiting (see supabase/migrations).
 *
 * Suggested flow: POST /api/planned-trip/payment → create an order for the request's `reference`
 * → open the gateway checkout → verify the signature in a webhook → set payment_status = 'paid'.
 */
export const paymentEnabled = false;

export type PaymentRequest = { reference: string; amountInr?: number };
export type PaymentResult = { status: "not_configured" } | { status: "started"; checkoutUrl: string };

export async function startPayment(request: PaymentRequest): Promise<PaymentResult> {
  void request;
  return { status: "not_configured" };
}
