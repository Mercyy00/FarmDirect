import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { api } from '../services/api';
import { Mail, Phone, MapPin, Clock, CheckCircle2, ChevronDown, ChevronUp, Send } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Customer Support');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.submitContactMessage({
        name,
        email,
        phone,
        subject,
        message,
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] px-3 py-1 rounded-full bg-[#E8EFE9]">
          Direct Support & Inquiries
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1E2922]">
          We’re Here For You & Our Growers
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6E63]">
          Questions about your delivery box, farmer partnerships, wholesale orders, or technical Django integration? Get in touch.
        </p>
      </div>

      {/* Main Grid: Form + Support Cards (Matches Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E3EAE0] shadow-xs">
          <h2 className="font-display text-xl font-bold text-[#1E2922] mb-1">
            Send a Message to Farm Support
          </h2>
          <p className="text-xs text-[#6B7C72] mb-6">
            Our local agronomy and support team reviews inquiries within 2-4 business hours.
          </p>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2D6A4F] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1E2922]">
                Message Received!
              </h3>
              <p className="text-sm text-[#5C6E63] max-w-sm mx-auto">
                Thank you for reaching out. A confirmation ticket has been dispatched to your email, and our team will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2.5 bg-[#2D6A4F] text-white text-xs font-semibold rounded-xl hover:bg-[#21543D] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#1E2922] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eleanor Vance"
                    className="w-full px-3.5 py-2.5 bg-[#F8F9F5] border border-[#D5DDD2] rounded-xl text-xs text-[#1E2922] focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1E2922] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#F8F9F5] border border-[#D5DDD2] rounded-xl text-xs text-[#1E2922] focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#1E2922] block mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 382-9104"
                    className="w-full px-3.5 py-2.5 bg-[#F8F9F5] border border-[#D5DDD2] rounded-xl text-xs text-[#1E2922] focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1E2922] block mb-1">
                    Topic / Department *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9F5] border border-[#D5DDD2] rounded-xl text-xs text-[#1E2922] focus:outline-none focus:border-[#2D6A4F]"
                  >
                    <option value="Customer Support">Delivery & Box Inquiries</option>
                    <option value="Farm Partnership">Become a Partner Farm</option>
                    <option value="Wholesale Inquiry">Culinary & Wholesale Accounts</option>
                    <option value="Django Developer">Python / Django Backend Integration</option>
                    <option value="Press & Media">General Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1E2922] block mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist with your harvest order or account?"
                  className="w-full px-3.5 py-2.5 bg-[#F8F9F5] border border-[#D5DDD2] rounded-xl text-xs text-[#1E2922] focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#2D6A4F] hover:bg-[#21543D] disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending to Farm Team...' : 'Submit Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Support details & Hubs Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAFBF8] p-6 rounded-3xl border border-[#E3EAE0] space-y-5">
            <h3 className="font-display text-lg font-bold text-[#1E2922]">
              Customer Support & Contact Info
            </h3>

            <div className="space-y-4 text-xs text-[#4A5D52]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E5EFE9] text-[#2D6A4F] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#1E2922]">Telephone Support</div>
                  <div>1-800-FARM-DIR (1-800-327-6347)</div>
                  <div className="text-[11px] text-[#6B7C72]">Mon-Fri 7:00 AM – 6:00 PM PST</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E5EFE9] text-[#2D6A4F] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#1E2922]">Direct Email</div>
                  <div>support@farmdirect-fresh.com</div>
                  <div className="text-[11px] text-[#6B7C72]">growers@farmdirect-fresh.com (Farmers)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E5EFE9] text-[#2D6A4F] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#1E2922]">Regional Distribution Hubs</div>
                  <div>Pacific Northwest Hub: Eugene, OR 97401</div>
                  <div>California Coastal Hub: Petaluma, CA 94952</div>
                  <div>Northeast Hub: Hudson, NY 12534</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E5EFE9] text-[#2D6A4F] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#1E2922]">Harvest Cut-Off Windows</div>
                  <div>Sunday 11:59 PM for Wednesday delivery</div>
                  <div>Wednesday 11:59 PM for Saturday delivery</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#E8EFE9] border border-[#D0DFD3] text-xs text-[#2A4837] space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-[#193226]">
              <span>🐍</span> Python & Django Integration
            </div>
            <p className="text-[11px] leading-relaxed">
              Are you connecting this frontend to your Django backend project? Use the <strong>"Django API"</strong> badge in the top navigation bar to inspect models, endpoints, and sample DRF serializers.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion (Matches Screenshot) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E3EAE0] space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
            Got Questions?
          </span>
          <h2 className="font-display text-2xl font-bold text-[#1E2922]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#EDF2EB]">
          {FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-sm font-bold text-[#1E2922] hover:text-[#2D6A4F] transition-colors gap-4"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8C9B90] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-xs text-[#526359] leading-relaxed pr-6">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
