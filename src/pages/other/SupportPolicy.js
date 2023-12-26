import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import clsx from "clsx";

const SupportPolicy = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Privacy Policy"
        description="Privacy Policy for Bluster - Your Trusted E-commerce Partner"
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Privacy Policy", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        <div className={clsx("welcome-area", "pt-100", "pb-100")}>
          <div className="container">
            <div className="">
              <h3>Privacy Policy</h3>
              <p>Last updated: August 17, 2023</p>
              <p>Thank you for choosing Bluster as your trusted e-commerce partner.</p>
              <p>This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website.</p>
              <h3>Information We Collect</h3>
              <p>We collect various types of information for the purpose of providing and improving our services to you. The types of information we may collect include:</p>
              <ul>
                <li>
                  <p><strong>Personal Information</strong>: Such as your name, email address, and phone number, which you provide to us when creating an account or making a purchase.</p>
                </li>
                <li>
                  <p><strong>Usage Data</strong>: Information about how you interact with our website, including pages visited and actions taken.</p>
                </li>
              </ul>
              <h3>How We Use Your Information</h3>
              <p>We use the collected information for various purposes, including:</p>
              <ul>
                <li>Processing and fulfilling your orders.</li>
                <li>Providing customer support.</li>
                <li>Improving and customizing our website.</li>
                <li>Sending you promotional and marketing communications.</li>
              </ul>
              <h3>Information Security</h3>
              <p>We prioritize the security of your personal information and take appropriate measures to protect it. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
              <h3>Your Choices</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Access, update, or delete your personal information.</li>
                <li>Opt-out of receiving promotional communications.</li>
              </ul>
              <h3>Contact Us</h3>
              <p>If you have any questions about our Privacy Policy, please contact us:</p>
              <ul>
                <li>
                  <p>By email: privacy@bluster.in</p>
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

export default SupportPolicy;
