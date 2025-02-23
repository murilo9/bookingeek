import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";

const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;
const stripePromise = loadStripe(STRIPE_KEY);

const StyledContainer = styled.div``;

type CheckoutStepProps = {
  clientSecret: string;
};

export default function CheckoutStep({ clientSecret }: CheckoutStepProps) {
  console.log("stripe key", STRIPE_KEY);
  return (
    <StyledContainer>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </StyledContainer>
  );
}
