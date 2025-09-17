import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="bb-footer" aria-labelledby="footer-heading">
      <div className="bb-container">
        <div className="bb-col">
          <h4 id="footer-heading">Customer Service</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Shipping &amp; Delivery</a></li>
            <li><a href="#">Returns &amp; Refunds</a></li>
            <li><a href="#">Track Order</a></li>
          </ul>
        </div>

        <div className="bb-col">
          <h4>Shop by Category</h4>
          <ul>
            <li><a href="#">Phones</a></li>
            <li><a href="#">Laptops</a></li>
            <li><a href="#">Accessories</a></li>
            <li><a href="#">Wearables</a></li>
          </ul>
        </div>

        <div className="bb-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
          </ul>
        </div>

        <div className="bb-col">
          <h4>Our Pages</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="bb-bottom">
        <span>© 2025 BuyBrand. All rights reserved.</span>
      </div>
    </footer>
  );
}
