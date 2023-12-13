import React, { useContext, useEffect, useState } from "react";
import CheckOutStepes from "../components/CheckOutStepes";
import { Helmet } from "react-helmet-async";
import { Button, Form } from "react-bootstrap";
import { Store } from "../Store";
import { useNavigate } from "react-router";

const PaymentMethodScreen = (e) => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethodName] = useState("");
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethodName));
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckOutStepes step1 step2 step3 />
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>

        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="paypal"
              label="Paypal"
              value="paypal"
              checked={paymentMethodName === "paypal"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="stripe"
              label="Stripe"
              value="stripe"
              checked={paymentMethodName === "stripe"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
