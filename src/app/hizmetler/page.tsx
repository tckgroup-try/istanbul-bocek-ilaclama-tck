import { ServiceTab } from '@/components/ServiceTab';
import { ShieldCheck } from 'lucide-react';
import Script from 'next/script';

export const metadata = {
  title: 'Profesyonel İlaçlama Hizmetleri | TCK İlaçlama',
  description: 'Kurumsal ve bireysel alanlarda garantili böcek, kemirgen ve haşere ilaçlama çözümleri.',
};

export default function HizmetlerPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-slate-600 mb-6">
          <ShieldCheck className="w-4 h-4 text-brand" />
          <span>Deneyimli Uzman Kadrosu</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
          Kapsamlı <span className="text-brand">Hizmet</span> Ağımız
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Sıradan ilaçlama şirketlerinin aksine, işletmenizin işleyişini 1 dakika bile durdurmadan, evinizde ise düzeninizi bozmadan %100 garantili, profesyonel koruma yöntemleri uyguluyoruz.
        </p>
      </div>
      
      {/* ServiceTab bileşeni tüm hizmetleri sekmeli yapıda gösterecektir */}
      <ServiceTab />

      {/* ItemList Schema for better search hierarchy representation */}
      <Script
        id="hizmetler-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "TCK İlaçlama Hizmetleri",
            "description": "İstanbul genelinde sunduğumuz kurumsal ve bireysel ilaçlama hizmetlerinin listesi.",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Fabrika ve Üretim Tesisi İlaçlama",
                "url": "https://www.tckilaclama.com/hizmet/istanbul-merkez-fabrika-bocek-ilaclama"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Depo ve Lojistik Alan İlaçlama",
                "url": "https://www.tckilaclama.com/hizmet/istanbul-merkez-depo-bocek-ilaclama"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Restoran, Cafe ve Otel İlaçlama",
                "url": "https://www.tckilaclama.com/hizmet/istanbul-merkez-restoran-bocek-ilaclama"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Plaza ve Ofis İlaçlama",
                "url": "https://www.tckilaclama.com/hizmet/istanbul-merkez-ofis-bocek-ilaclama"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "Gemi ve Yat Fümigasyon İlaçlama",
                "url": "https://www.tckilaclama.com/hizmet/istanbul-merkez-gemi-bocek-ilaclama"
              },
              {
                "@type": "ListItem",
                "position": 6,
                "name": "Ev ve Daire İlaçlama",
                "url": "https://www.tckilaclama.com/hizmet/istanbul-merkez-villa-bocek-ilaclama"
              },
              {
                "@type": "ListItem",
                "position": 7,
                "name": "Apartman ve Site Ortak Alan İlaçlama",
                "url": "https://www.tckilaclama.com/hizmet/istanbul-merkez-apartman-bocek-ilaclama"
              },
              {
                "@type": "ListItem",
                "position": 8,
                "name": "Bahçe ve Peyzaj Açık Alan İlaçlama",
                "url": "https://www.tckilaclama.com/hizmet/istanbul-merkez-site-bocek-ilaclama"
              }
            ]
          })
        }}
      />
    </div>
  );
}
