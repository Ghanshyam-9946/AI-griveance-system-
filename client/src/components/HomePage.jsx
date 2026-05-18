import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Camera, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Search,
  Users,
  BrainCircuit,
  Zap,
  Activity,
  ArrowRight,
  Award,
  Shield,
  FileText,
  Clock,
  HelpCircle,
  PhoneCall,
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = ({ onReportGrievance, onTrackStatus, onCitizenLogin, onDeptLogin, stats, isDeptAuthenticated, isAuthenticated }) => {
  const { t } = useTranslation();

  const metrics = [
    { label: t('home.statsActive', "ACTIVE REPORTS"), value: stats?.totalComplaints || '5,240', icon: <Activity className="w-8 h-8" />, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: t('home.statsResolved', "RESOLVED CASES"), value: stats?.resolvedComplaints || '4,892', icon: <CheckCircle2 className="w-8 h-8" />, color: 'text-green-500', bg: 'bg-green-50' },
    { label: t('home.aiAccuracy', "AI ACCURACY"), value: `${stats?.aiAccuracy || '98.4'}%`, icon: <BrainCircuit className="w-8 h-8" />, color: 'text-amber-500', bg: 'bg-amber-50' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/home.jpg" 
            alt={t('home.heroAlt', "Government Service Center")}
            className="w-full h-full object-cover scale-105 transform motion-safe:animate-[pulse_30s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gov-navy-deep/95 via-gov-navy/80 to-transparent"></div>
          {/* Subtle noise texture overlay for premium feel */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          {/* Animated Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gov-saffron/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-serif font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-gov-saffron leading-tight mb-6 drop-shadow-2xl">
                {t('home.heroTitle', 'Direct Bridge Between Citizens & Government')}
              </h1>
              <p className="text-xl md:text-2xl text-blue-50/90 mb-10 max-w-2xl font-normal leading-relaxed drop-shadow-xl border-l-4 border-gov-saffron pl-5 bg-gradient-to-r from-gov-navy/40 to-transparent p-3 rounded-r-2xl">
                {t('home.heroSub', 'India\'s first smart grievance redressal system utilizing advanced AI for automated categorization, priority routing, and real-time resolution tracking.')}
              </p>
              
              <div className="flex flex-wrap gap-4 md:gap-6">
                <button 
                  onClick={onCitizenLogin} 
                  className="group relative overflow-hidden bg-white text-gov-navy px-8 md:px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 border border-white/50"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gov-saffron/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <span className="relative z-10">{t('home.reportBtn', 'FILE A COMPLAINT')}</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform text-gov-saffron" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Complain/Stats Section - Moved BELOW Hero Section */}
      <section className="relative z-20 py-16 px-4 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-gray-100 flex items-center gap-6 group hover:-translate-y-1"
              >
                <div className={`p-5 ${m.bg} rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ${m.color}`}>
                  {m.icon}
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-gov-navy tracking-tight">{m.value}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mt-2">{m.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Glassmorphism & Hover Effects */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gov-saffron/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 text-center mb-20 relative z-10">
          <span className="text-gov-saffron font-bold tracking-widest uppercase text-sm mb-3 block">{t('home.featuresTitle', 'Platform Features')}</span>
          <h2 className="text-4xl md:text-5xl font-serif text-gov-navy mb-6">{t('home.commonIssues', 'Our Services')}</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gov-saffron to-gov-navy mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">{t('home.featuresSub', 'Providing a comprehensive digital interface for all your public service grievances with state-of-the-art technology.')}</p>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: t('home.citizenUpload', "Complaint Registration"), 
                desc: t('home.citizenUploadSub', "Register your grievances with geo-tagged images for faster identification."),
                img: "/road.jpeg",
                icon: <FileText className="w-6 h-6" />
              },
              { 
                title: t('home.aiDetection', "AI Assistance"), 
                desc: t('home.aiDetectionSub', "Intelligent sorting and categorization of complaints using computer vision."),
                img: "/water.webp",
                icon: <BrainCircuit className="w-6 h-6" />
              },
              { 
                title: t('home.realTimeTracking', "Complaint Tracking"), 
                desc: t('home.realTimeTrackingSub', "Transparent, real-time tracking of your complaint's progress."),
                img: "/high.jpeg",
                icon: <Search className="w-6 h-6" />
              },
              { 
                title: t('home.smartRouting', "Department Support"), 
                desc: t('home.smartRoutingSub', "Direct coordination with relevant government departments."),
                img: "/home.jpg",
                icon: <Users className="w-6 h-6" />
              },
              { 
                title: t('home.urgentEscalation', "Citizen Helpdesk"), 
                desc: t('home.urgentEscalationSub', "24/7 dedicated support for grievance related queries."),
                img: "/road.jpeg",
                icon: <HelpCircle className="w-6 h-6" />
              },
              { 
                title: t('home.adminInsights', "Official Analytics"), 
                desc: t('home.adminInsightsSub', "Data-driven insights for improved administrative performance."),
                img: "/water.webp",
                icon: <LayoutDashboard className="w-6 h-6" />
              }
            ].map((s, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] border border-gray-100 flex flex-col transition-all duration-300"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gov-navy-deep/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute bottom-5 left-5 bg-white/20 backdrop-blur-md border border-white/30 text-white p-3.5 rounded-2xl shadow-lg">
                    {s.icon}
                  </div>
                </div>
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold text-gov-navy mb-4 group-hover:text-gov-saffron transition-colors">{s.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-light">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Dynamic Layout */}
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img 
                  src="/high.jpeg" 
                  alt={t('home.aboutImgAlt', "Government Administration Building")}
                  className="w-full object-cover h-[500px]"
                />
                <div className="absolute inset-0 bg-gov-navy/20"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gov-saffron rounded-[2.5rem] -z-0 opacity-20"></div>
              <div className="absolute -top-8 -left-8 w-32 h-32 border-8 border-gov-navy rounded-[2rem] -z-0 opacity-10"></div>
              
              {/* Floating badge */}
              <div className="absolute -right-6 top-1/4 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-20 animate-bounce">
                <div className="flex items-center gap-4">
                  <div className="bg-gov-green/10 p-3 rounded-full">
                    <ShieldCheck className="w-8 h-8 text-gov-green" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-400 uppercase">{t('home.trustedBy', 'Trusted by')}</div>
                    <div className="text-2xl font-black text-gov-navy">{t('home.millions', 'Millions')}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="inline-block bg-gov-saffron/10 text-gov-saffron px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest mb-6 border border-gov-saffron/20">{t('home.howItWorks', 'About the Portal')}</div>
              <h2 className="text-4xl md:text-5xl font-serif text-gov-navy mb-8 leading-tight">{t('home.stepsTitle', 'Digital Governance for a New India')}</h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed font-light">
                {t('home.howItWorksSub', 'This portal is a flagship initiative to integrate advanced Artificial Intelligence with public grievance management. Our mission is to ensure that every citizen\'s voice is heard and every complaint is addressed with scientific precision and accountability.')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  t('home.step2', "Automated categorization using Deep Learning"),
                  t('home.step3', "Verified geo-tagging for site accuracy"),
                  t('home.step4', "Direct linkage with Departmental Heads"),
                  t('home.step5', "Public transparency through open metrics")
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="bg-white shadow-sm border border-gray-100 p-2 rounded-xl mt-1">
                      <CheckCircle2 className="w-5 h-5 text-gov-green" />
                    </div>
                    <span className="font-medium text-gray-700 leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              <button className="bg-white border-2 border-gov-navy text-gov-navy hover:bg-gov-navy hover:text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 group transition-all">
                {t('home.ctaBtn', 'Learn more about our mission')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer / Contact Style Section */}
      <section className="bg-gov-navy py-20 text-white border-t-4 border-gov-saffron relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gov-saffron/10 rounded-full blur-[80px] translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-5 mb-8">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="h-14 invert brightness-0" />
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold tracking-tight">{t('common.nationalPortal', 'Jansahayak Portal')}</h3>
                  <p className="text-gov-saffron text-xs font-bold uppercase tracking-[0.2em] mt-1">{t('common.govOfIndia', 'Government of India initiative')}</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-10 font-light">
                {t('common.footerAbout', 'Official AI-driven platform for managing public grievances and ensuring effective administrative response across all departments.')}
              </p>
              <div className="flex gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 inline-flex backdrop-blur-sm">
                <div className="bg-gov-saffron/20 p-3 rounded-xl">
                  <PhoneCall className="w-6 h-6 text-gov-saffron" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{t('common.helpDesk', 'Citizen Helpline')}</div>
                  <div className="text-2xl font-bold tracking-wider">1800-111-222</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-8 text-white uppercase tracking-[0.2em]">{t('footer.importantLinks', 'Important Links')}</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><a href="#" className="hover:text-gov-saffron transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gov-saffron rounded-full"></div> {t('footer.privacyPolicy', 'Privacy Policy')}</a></li>
                <li><a href="#" className="hover:text-gov-saffron transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gov-saffron rounded-full"></div> {t('footer.termsOfService', 'Terms of Service')}</a></li>
                <li><a href="#" className="hover:text-gov-saffron transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gov-saffron rounded-full"></div> {t('footer.digitalIndia', 'Digital India')}</a></li>
                <li><a href="#" className="hover:text-gov-saffron transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gov-saffron rounded-full"></div> {t('footer.myGovPortal', 'MyGov Portal')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-8 text-white uppercase tracking-[0.2em]">{t('footer.deptAccess', 'Department Access')}</h4>
              <button 
                onClick={() => onDeptLogin()} 
                className="group relative overflow-hidden bg-gov-saffron text-gov-navy px-6 py-4 rounded-xl font-bold transition-all w-full mb-6 hover:-translate-y-1 shadow-[0_10px_20px_rgba(255,153,51,0.2)]"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">{t('footer.officerAccess', 'Officer Access')} <ArrowRight className="w-4 h-4" /></span>
              </button>
              <div className="flex items-start gap-3 text-gray-500 bg-white/5 p-4 rounded-xl border border-white/10">
                <Shield className="w-5 h-5 shrink-0 text-gray-400" />
                <p className="text-xs font-medium leading-relaxed">{t('footer.protectedPortal', 'Protected portal for authorized personnel only.')}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-medium">
            <div>© {new Date().getFullYear()} {t('footer.copyright', 'National Informatics Centre (NIC). All Rights Reserved.')}</div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-widest font-bold">
              <span className="hover:text-white cursor-pointer transition-colors">{t('footer.privacy', 'Privacy')}</span>
              <span className="hover:text-white cursor-pointer transition-colors">{t('footer.terms', 'Terms')}</span>
              <span className="hover:text-white cursor-pointer transition-colors">{t('footer.sitemap', 'Sitemap')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

