import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import clsx from "clsx";

const TermsOfService = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Terms of Service"
        description="Terms of Service for Bluster - Your Trusted E-commerce Partner"
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Terms of Service", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        <div className={clsx("welcome-area", "pt-100", "pb-100")}>
          <div className="container">
            <div className="">
              <h3>Terms of Service</h3>
              <p>Last updated: August 17, 2023</p>
              <p>By using the Bluster website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our website.</p>

              <h3>1. Acceptance of Terms</h3>
              <p>By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the website.</p>

              <h3>2. User Accounts</h3>
              <p>When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password.</p>

              <h3>3. Products and Services</h3>
              <p>Our website offers a variety of products and services. We reserve the right to modify or discontinue any product or service without notice at any time.</p>

              <h3>4. Intellectual Property</h3>
              <p>The content on our website, including text, graphics, logos, and images, is the intellectual property of Bluster and is protected by copyright and other laws.</p>

              <h3>5. Limitation of Liability</h3>
              <p>We are not liable for any damages arising out of or in connection with the use of our website. This includes, but is not limited to, direct, indirect, incidental, consequential, and punitive damages.</p>

              <h3>6. Governing Law</h3>
              <p>These Terms of Service are governed by and construed in accordance with the laws of [Your Country], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Your Country] for the resolution of any disputes.</p>

              <h3>Contact Us</h3>
              <p>If you have any questions about our Terms of Service, please contact us:</p>
              <ul>
                <li>
                  <p>By email: support@bluster.in</p>
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

export default TermsOfService;
