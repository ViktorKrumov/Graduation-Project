import React, { useState } from "react";
import "./FAQ.css";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';


export default function FAQ() {
  const faqData = [
    {
        question: "Do you provide warranty for your products?",
        answer:
          "Yes, we provide warranty for all our products. Each product comes with a warranty period. Please check the product details for more information.",
    },
    {
        question: "Do you accept returns?",
          answer:
            "Yes, we accept returns within a specified return period. Please refer to our return policy for more information.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
          "We accept various payment methods including credit/debit cards, PayPal, and bank transfers. You can choose the payment method that suits you best during checkout.",
    },
    {
        question: "Do you offer international shipping?",
        answer:
          "Yes, we offer international shipping to select countries. Shipping rates and delivery times may vary depending on the destination. Please contact us for more information.",
    },
    {
        question: "Do you offer discounts for bulk orders?",
        answer:
          "Yes, we offer discounts for bulk orders. Please contact us for a custom quote and special pricing for large quantities.",
      },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq-container mt-5">
    <h1 className="faq-heading">Frequently Asked Questions</h1>
    <div className="faq-content">
      <div className="faq-items">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleAccordion(index)}
            >
              {item.question} {activeIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            <div
              className={`faq-answer ${
                activeIndex === index ? "open" : "closed"
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
      <img src={'https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/FAQ-Image.png?alt=media&token=98cb1463-aea7-4b2c-a6f4-61b644186d10'} alt="FAQ" className="faq-image" />
    </div>
  </div>
  );
}
