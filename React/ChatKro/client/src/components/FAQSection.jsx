import { useState } from "react";

const faqs = [
  {
    q: "How do I change my theme?",
    a: "You can change your theme using the dropdown menu in the navigation bar. We offer 12 different themes to customize your experience.",
  },
  {
    q: "Is ChatKro free to use?",
    a: "ChatKro offers both free and premium plans. The free plan includes basic messaging features, while premium offers advanced features and customization options.",
  },
  {
    q: "How secure are my messages?",
    a: "All messages are encrypted end-to-end, ensuring that only you and the recipient can read them. We prioritize your privacy and security.",
  },
  {
    q: "Can I use ChatKro on mobile?",
    a: "Yes! ChatKro is fully responsive and works perfectly on all devices including smartphones, tablets, and desktops.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-12 font-sans">
        Frequently Asked Questions
      </h2>

      <div className="grid gap-6">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="bg-base-200 rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => toggle(i)}
          >
            <div className="text-xl font-semibold font-sans flex justify-between items-center">
              {item.q}
              <span>{activeIndex === i ? "▲" : "▼"}</span>
            </div>
            {activeIndex === i && (
              <p className="mt-2 text-base font-sans">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
