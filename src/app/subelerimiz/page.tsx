import { Metadata } from 'next';
import { tckBranches } from '@/data/branches';
import { MapPin, Navigation, PhoneCall, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Şubelerimiz ve Operasyon Merkezlerimiz | TCK İlaçlama',
  description: 'İstanbul genelindeki 28 farklı TCK İlaçlama operasyon merkezimiz ve iletişim adreslerimiz. Size en yakın ilaçlama şubemizi bulun.',
};

export default function BranchesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-brand font-semibold mb-6">
            <MapPin className="w-4 h-4" />
            <span>İstanbul'un Her Yerindeyiz</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            TCK İlaçlama <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald-300">Şubeleri</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            İstanbul'un 28 farklı noktasında bulunan operasyon merkezlerimizle, çağrınıza en fazla 45 dakika içerisinde yanıt veriyor ve acil müdahale ekibimizi yönlendiriyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tckBranches.map((branch) => (
            <div key={branch.id} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-brand/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-[40px] rounded-full group-hover:bg-brand/10 transition-colors pointer-events-none" />
              
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-brand/50 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-brand" />
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                  Aktif Operasyon
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">{branch.name}</h3>
              <p className="text-slate-400 text-sm mb-6 flex items-center gap-2 relative z-10">
                <MapPin className="w-4 h-4 text-slate-500" />
                {branch.district}, İstanbul
              </p>
              
              <div className="flex gap-3 relative z-10">
                <a 
                  href={branch.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Yol Tarifi
                </a>
                <a 
                  href="tel:+905016355053"
                  className="flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
