import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';
import { confetti } from '../utils/confetti';

export default function BirthdayCafe({ onContinue }) {
  const { cafe } = birthdayData;
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = (e) => {
    if (orderPlaced) return;

    audioManager.playCafeBell();
    const rect = e.currentTarget.getBoundingClientRect();
    confetti.burst(rect.left + rect.width / 2, rect.top - 20, 35);
    setOrderPlaced(true);
  };

  return (
    <div className="page-screen cafe-page" aria-label="Raj's Birthday Cafe and Menu">
      <div className="page-inner-container">
        
        {/* Restaurant Menu Outer Board */}
        <div className={`restaurant-menu-board ${orderPlaced ? 'menu-order-placed' : ''}`}>
          
          {/* Decorative Corner Ornaments */}
          <span className="corner-flourish corner-tl">❧</span>
          <span className="corner-flourish corner-tr">☙</span>
          <span className="corner-flourish corner-bl">❧</span>
          <span className="corner-flourish corner-br">☙</span>

          {/* Restaurant Card Header */}
          <div className="restaurant-header">
            <div className="restaurant-logo-circle">
              <span className="logo-cake">🎂</span>
            </div>
            <h1 className="restaurant-name-title">{cafe.title}</h1>
            <p className="restaurant-subheading">{cafe.subtitle}</p>
            <div className="restaurant-header-divider">
              <span className="divider-line" />
              <span className="divider-emblem">✦ 🌸 ✦</span>
              <span className="divider-line" />
            </div>
          </div>

          {/* Menu Items List */}
          <div className="restaurant-menu-section">
            <h2 className="menu-category-title">{cafe.menuHeader}</h2>
            <ul className="menu-items-list">
              {cafe.menuItems.map((item) => (
                <li key={item.id} className="menu-item-row">
                  <span className="item-icon-col">{item.icon}</span>
                  <div className="item-text-col">
                    <span className="item-name">{item.name}</span>
                    <span className="item-desc">{item.desc}</span>
                  </div>
                  <span className="item-dots-leader" aria-hidden="true" />
                  <span className="item-price-tag">FREE</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Today's Special Section */}
          <div className="todays-special-card">
            <span className="special-tag-ribbon">{cafe.specialSectionTitle}</span>
            <div className="special-card-content">
              <h3 className="special-dish-title">{cafe.specialItem.title}</h3>
              <p className="special-dish-desc">{cafe.specialItem.description}</p>
            </div>
          </div>

          {/* Interactive Order Action & Animated Receipt */}
          {!orderPlaced ? (
            <div className="cafe-order-action">
              <button
                type="button"
                className="place-order-btn animate-pulse-soft"
                onClick={handlePlaceOrder}
                aria-label="Place birthday order"
              >
                <span className="btn-icon">🎂</span>
                <span className="btn-label">{cafe.orderButton}</span>
              </button>
            </div>
          ) : (
            <div className="order-confirmed-container animate-fade-in-up">
              {/* Order Receipt Ticket */}
              <div className="order-receipt-ticket">
                <div className="receipt-sawtooth-top" />
                <div className="receipt-body">
                  <div className="receipt-stamp">PAID WITH LOVE</div>
                  <h4 className="receipt-title">RECEIPT OF HAPPINESS</h4>
                  <div className="receipt-row">
                    <span>Order:</span>
                    <strong>{cafe.receiptDetails.orderNo}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Guest:</span>
                    <strong>{birthdayData.name}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Item:</span>
                    <strong>Birthday Special 🎂</strong>
                  </div>
                  <div className="receipt-row total-row">
                    <span>Total:</span>
                    <strong className="receipt-total">{cafe.receiptDetails.total}</strong>
                  </div>
                  <div className="receipt-status-banner">
                    <span className="check-icon">✓</span>
                    <span>{cafe.orderConfirmed}</span>
                  </div>
                </div>
                <div className="receipt-sawtooth-bottom" />
              </div>

              {/* Continue to Page 3 Button */}
              <button
                type="button"
                className="step-continue-btn animate-scale-up"
                onClick={() => {
                  audioManager.playClick();
                  onContinue();
                }}
              >
                <span>{cafe.continueButton}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
