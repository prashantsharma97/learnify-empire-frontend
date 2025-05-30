import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-neon-blue/20 last:border-0">
      <button 
        className="py-4 w-full flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-neon-blue flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neon-blue flex-shrink-0" />
        )}
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-400">{answer}</p>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  const faqs = [
    {
      question: "How long does it take to set up my course?",
      answer: "You can have your course set up and ready to sell in as little as a few hours. Our intuitive drag-and-drop builder and templates make it easy to create professional-looking courses without any technical skills."
    },
    {
      question: "Can I use my own domain name?",
      answer: "Yes! All plans include the ability to use your own custom domain name. Simply point your domain to our servers, and we'll handle the rest. You can also use one of our free subdomains if you prefer."
    },
    {
      question: "What payment methods can I accept?",
      answer: "Learnify supports all major credit cards, PayPal, and regional payment methods. We handle all payment processing, tax calculations, and payouts automatically, so you can focus on creating great content."
    },
    {
      question: "How do I get paid?",
      answer: "We process payouts to your connected bank account or PayPal account on a weekly basis. You can track your earnings in real-time through your dashboard. International creators are supported with multiple payout options."
    },
    {
      question: "Can I migrate my existing course?",
      answer: "Absolutely! We offer a seamless migration service for creators moving from other platforms. Our team will help you transfer your content, student data, and set up your new course site with minimal disruption."
    },
    {
      question: "Is there a transaction fee?",
      answer: "Our Pro and Creator plans have no Learnify transaction fees. The Starter plan has a small 5% transaction fee on course sales. Standard payment processing fees from Stripe or PayPal (typically 2.9% + $0.30 per transaction) apply to all plans."
    }
  ];

  return (
    <section id="faq" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-neon-pink/10 rounded-full filter blur-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="inline-block text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about Learnify. Can't find the answer you're looking for? Contact our support team.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-glass-dark backdrop-blur-sm border border-neon-blue/20 rounded-lg p-6
                        transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/10">
          {faqs.map((faq, index) => (
            <FaqItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
        
        {/* Final CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 
                       border border-neon-blue/30 rounded-lg p-10 max-w-4xl mx-auto
                       backdrop-blur-sm relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-1/4 w-px h-full bg-neon-blue/20"></div>
            <div className="absolute top-0 left-2/4 w-px h-full bg-neon-blue/20"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-neon-blue/20"></div>
            <div className="absolute top-1/4 left-0 w-full h-px bg-neon-blue/20"></div>
            <div className="absolute top-2/4 left-0 w-full h-px bg-neon-blue/20"></div>
            <div className="absolute top-3/4 left-0 w-full h-px bg-neon-blue/20"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to teach the world?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who've transformed their knowledge into a thriving online course business.
            </p>
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium 
                             hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 
                             border border-neon-blue/50">
              Get Started For Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;