"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

const faqs = [
  {
    question: "İlaçlama sonrasında alanı terk etmemiz gerekiyor mu?",
    answer: "Hayır. Kullandığımız biyosidal ürünler kokusuzdur ve insan, çocuk veya evcil hayvan sağlığına zarar vermez. Yalnızca fümigasyon veya yoğun tahtakurusu/pire uygulamalarında alanın 4 saat kapalı kalması tavsiye edilmektedir."
  },
  {
    question: "Kullanılan biyosidal ürünler evcil hayvanlara zarar verir mi?",
    answer: "Kesinlikle hayır. TCK İlaçlama olarak, Sağlık Bakanlığı ve Dünya Sağlık Örgütü (WHO) onaylı, memeli canlıların sağlığını tehdit etmeyen 1. sınıf profesyonel biyosidal ürünler kullanmaktayız."
  },
  {
    question: "İlaçlama uygulamasının etki süresi ne kadardır?",
    answer: "Çevresel faktörlere bağlı olmakla birlikte uygulamalarımız 6 ay ile 1 yıl arasında tam koruma sağlamaktadır. Kurumsal işletmeler için önerdiğimiz periyodik bakım anlaşmaları ile kalıcı ve kesintisiz koruma sunuyoruz."
  },
  {
    question: "İlaçlama işleminden sonra temizlik yapılmalı mı?",
    answer: "Kokusuz ve leke bırakmayan formülasyonlar kullandığımız için detaylı bir eşya yıkamasına gerek yoktur. Uygulamanın tam etki gösterebilmesi adına, ıslak temizliğin dip köşelerde 1 hafta ertelenmesi tavsiye edilir."
  },
  {
    question: "Acil durumlarda ve mesai saatleri dışında hizmetiniz var mı?",
    answer: "Evet, 7/24 kesintisiz hizmet sunmaktayız. Özellikle restoran, otel ve üretim tesisleri gibi faaliyetin durmaması gereken kurumsal alanlar için acil müdahale ekiplerimiz daima hazırdır."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 mb-6">
            <HelpCircle className="w-8 h-8 text-brand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Sıkça Sorulan Sorular</h2>
          <p className="text-slate-400 text-lg">
            Hizmetlerimiz, kullanılan yöntemler ve güvenlik protokollerimiz hakkında en çok merak edilen soruların yanıtlarını aşağıda bulabilirsiniz.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <GlassCard 
                key={index} 
                className="p-0 overflow-hidden border border-white/5 transition-colors hover:border-brand/30"
              >
                <button
                  className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-brand' : 'text-slate-200'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })}
        </div>

        {/* FAQ JSON-LD Schema integration for Google SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </div>
    </section>
  );
}
