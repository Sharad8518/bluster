import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import clsx from "clsx";

const ReturnPolicy = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Return & Refund Policy"
        description="Return & Refund Policy"
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "About us", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        <div className={clsx("welcome-area", "pt-100", "pb-100")}>
          <div className="container">
            <div className="">
              <h3>Return and Refund Policy</h3>
              <p>Last updated: August 17, 2023</p>
              <p>Thank you for shopping at Bluster.</p>
              <p>If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns. </p>
              <p>The following terms are applicable for any products that You purchased with Us.</p>
              <h3>Interpretation</h3>
              <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
              <h3>Definitions</h3>
              <p>For the purposes of this Return and Refund Policy:</p>
              <ul>
                <li>
                  <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Bluster.</p>
                </li>
                <li>
                  <p><strong>Goods</strong> refer to the items offered for sale on the Service.</p>
                </li>
                <li>
                  <p><strong>Orders</strong> mean a request by You to purchase Goods from Us.</p>
                </li>
                <li>
                  <p><strong>Service</strong> refers to the Website.</p>
                </li>
                <li>
                  <p><strong>Website</strong> refers to Bluster, accessible from <a href="https://bluster.in/" rel="external nofollow noopener" target="_blank">https://bluster.in/</a></p>
                </li>
                <li>
                  <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
                </li>
              </ul>
              <h3>Your Order Cancellation Rights</h3>
              <p>You are entitled to cancel Your Order within 7 days without giving any reason for doing so.</p>
              <p>The deadline for cancelling an Order is 7 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.</p>
              <p>In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:</p>
              <ul>
                <li>
                  <p>By email: crm@bluster.in</p>
                </li>
                <li>
                  <p>By phone number: +919424575903</p>
                </li>
              </ul>
              <p>We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.</p>
              <h3>Conditions for Returns</h3>
              <p>In order for the Goods to be eligible for a return, please make sure that:</p>
              <ul>
                <li>The Goods were purchased in the last 7 days</li>
                <li>The Goods are in the original packaging</li>
              </ul>
              <p>The following Goods cannot be returned:</p>
              <ul>
                <li>The supply of Goods made to Your specifications or clearly personalized.</li>
                <li>The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.</li>
                <li>The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
                <li>The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
              </ul>
              <p>We reserve the right to refuse returns of any merchandise that does not meet the above return conditions in our sole discretion.</p>
              <p>Only regular priced Goods may be refunded. Unfortunately, Goods on sale cannot be refunded. This exclusion may not apply to You if it is not permitted by applicable law.</p>
              <h3>Returning Goods</h3>
              <p>You are responsible for the cost and risk of returning the Goods to Us. You should send the Goods at the following address:</p>
              <p>Sagar</p>
              <p>We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.</p>

              <h3>Contact Us</h3>
              <p>If you have any questions about our Returns and Refunds Policy, please contact us:</p>
              <ul>
                <li>
                  <p>By email: crm@bluster.in</p>
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

export default ReturnPolicy;
