import React, { createContext, useContext, useState, ReactNode } from "react";

type VoucherType = "strom" | "einkauf" | null;
type PaymentMethod = "credit_card" | null;
type Variant = "solo" | "choice" | null;

interface OrderState {
  variant: Variant;
  voucher: VoucherType;
  paymentMethod: PaymentMethod;
  setVariant: (v: Variant) => void;
  setVoucher: (v: VoucherType) => void;
  setPaymentMethod: (p: PaymentMethod) => void;
}

const OrderContext = createContext<OrderState | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [variant, setVariant] = useState<Variant>(null);
  const [voucher, setVoucher] = useState<VoucherType>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  return (
    <OrderContext.Provider value={{ variant, voucher, paymentMethod, setVariant, setVoucher, setPaymentMethod }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
};
