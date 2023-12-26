import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import clsx from "clsx";

const ShippingPolicy = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Shipping Policy"
        description="Shipping Policy for Bluster - Your Trusted E-commerce Partner"
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shipping Policy", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        <div className={clsx("welcome-area", "pt-100", "pb-100")}>
          <div className="container">
            <div className="">
              <h3>Shipping Policy</h3>
              <p>Last updated: August 17, 2023</p>
              <p>Thank you for choosing Bluster as your preferred online shopping destination. This Shipping Policy outlines the terms and conditions for the shipment of our products.</p>

              <h3>1. Shipping Methods</h3>
              <p>We offer various shipping methods for the delivery of our products. The available options and estimated delivery times will be displayed at the checkout page.</p>

              <h3>2. Processing Time</h3>
              <p>Orders are typically processed and shipped within 1-2 business days. During peak seasons, processing times may vary, and we appreciate your understanding.</p>

              <h3>3. Shipping Costs</h3>
              <p>Shipping costs are calculated based on the selected shipping method and the destination. The total shipping cost will be displayed at the checkout page before completing your purchase.</p>

              <h3>4. International Shipping</h3>
              <p>We offer international shipping to select countries. International shipping costs and delivery times may vary. Customs duties and taxes may apply and are the responsibility of the recipient.</p>

              <h3>5. Order Tracking</h3>
              <p>Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number to track the status of your order on our website or the carrier's website.</p>

              <h3>6. Delivery Delays</h3>
              <p>We strive to deliver your orders on time. However, unforeseen circumstances such as weather, customs, or other logistical issues may cause delays. We appreciate your patience in such situations.</p>

              <h3>Contact Us</h3>
              <p>If you have any questions about our Shipping Policy, please contact us:</p>
              <ul>
                <li>
                  <p>By email: shipping@bluster.in</p>
                </li>
                <li>
                  <p>By phone number: +919424575903</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ShippingPolicy;
