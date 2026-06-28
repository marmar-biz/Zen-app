import { useState, useEffect, useRef } from 'react'

const WHATSAPP = 'https://wa.me/989113310449'
const INSTAGRAM = 'https://instagram.com/zen_web_app'
const PHONE = 'tel:09113310449'

const PLANS = [
  {
    name: 'پایه',
    emoji: '🌱',
    price: '۹،۹۰۰،۰۰۰',
    desc: 'مناسب برای کسب‌وکارهای تازه‌کار و افرادی که می‌خواهند حضور حرفه‌ای در فضای آنلاین داشته باشند.',
    features: [
      'طراحی وب اپلیکیشن اختصاصی فارسی',
      'طراحی واکنش‌گرا برای موبایل و دسکتاپ',
      'معرفی کامل کسب‌وکار و خدمات',
      'اتصال مستقیم به واتساپ و اینستاگرام',
      'فرم ثبت درخواست مشتری',
      'نصب روی موبایل (PWA)',
      'دامنه و هاست با راهنمای راه‌اندازی',
      'تحویل در ۵ روز کاری',
    ],
    gradient: 'linear-gradient(160deg,#A6C261 0%,#C8E08A 100%)',
    badge: null as string | null,
    btnLabel: 'انتخاب پلن پایه',
    dark: false,
    btnStyle: { background: 'rgba(42,22,56,0.08)', color: '#2A1638' },
  },
  {
    name: 'حرفه‌ای',
    emoji: '💜',
    price: '۱۸،۹۰۰،۰۰۰',
    desc: 'مناسب برای برندهایی که می‌خواهند مشتری بیشتری جذب کنند و اعتبار آنلاین بالاتری داشته باشند.',
    features: [
      'تمام امکانات پلن پایه',
      'فرم‌های اختصاصی متناسب با شغل',
      'گالری تصاویر حرفه‌ای',
      'صفحات متعدد (خدمات، درباره ما، تماس و…)',
      'انیمیشن و جلوه‌های بصری حرفه‌ای',
      'بهینه‌سازی اولیه سئو گوگل',
      'طراحی اختصاصی بر اساس هویت برند',
      'پشتیبانی ۳ ماهه',
    ],
    gradient: 'linear-gradient(160deg,#A88AED 0%,#C4ADFF 100%)',
    badge: '⭐ محبوب‌ترین' as string | null,
    btnLabel: 'انتخاب پلن حرفه‌ای',
    dark: false,
    btnStyle: { background: 'rgba(42,22,56,0.12)', color: '#2A1638' },
  },
  {
    name: 'VIP',
    emoji: '👑',
    price: '۲۷،۹۰۰،۰۰۰',
    desc: 'مناسب برای برندهای حرفه‌ای، پزشکان، مجموعه‌های اقامتی، آموزشگاه‌ها و کسب‌وکارهایی که به دنبال بالاترین سطح کیفیت هستند.',
    features: [
      'تمام امکانات پلن حرفه‌ای',
      'طراحی کاملاً اختصاصی UI/UX',
      'صفحات نامحدود',
      'سئوی پیشرفته',
      'سیستم رزرو و ثبت درخواست حرفه‌ای',
      'اتصال کامل شبکه‌های اجتماعی',
      'اولویت در پشتیبانی',
      'پشتیبانی ۱۲ ماهه',
      'مشاوره توسعه برند دیجیتال',
    ],
    gradient: 'linear-gradient(160deg,#2A1638 0%,#4A2860 100%)',
    badge: '👑 ویژه برندهای حرفه‌ای' as string | null,
    btnLabel: 'انتخاب پلن VIP',
    dark: true,
    btnStyle: { background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' },
  },
]

const SERVICES = [
  { icon: '🌐', title: 'وب اپلیکیشن PWA', desc: 'قابل نصب روی موبایل مثل یک اپ واقعی، بدون نیاز به اپ استور' },
  { icon: '🎨', title: 'طراحی UI/UX اختصاصی', desc: 'طراحی منحصربه‌فرد متناسب با هویت برند و مخاطبان شما' },
  { icon: '📱', title: 'Mobile First', desc: 'بهینه برای موبایل، تبلت و دسکتاپ — سریع، روان و زیبا' },
  { icon: '📩', title: 'اتصال واتساپ', desc: 'سفارش‌ها مستقیم در واتساپ شما دریافت می‌شوند — بدون واسطه' },
  { icon: '🔍', title: 'سئو و گوگل', desc: 'بهینه‌سازی برای دیده شدن در گوگل و جذب مشتری ارگانیک' },
  { icon: '🚀', title: 'تحویل سریع', desc: 'دمو اختصاصی شما در کمترین زمان آماده می‌شود' },
]

const JOBS = [
  'مربی ورزشی', 'پزشک', 'دندانپزشک', 'مدرسه /خانه بازی',
  'اقامتگاه / هتل', 'کافه / رستوران', 'سالن زیبایی',
  'فروشگاه آنلاین', 'آموزشگاه', 'برند شخصی', 'سایر',
]

const FAQS = [
  { q: 'تحویل پروژه چقدر طول می‌کشد؟', a: 'بسته به پلن انتخابی، دمو اختصاصی شما بین ۵ تا ۱۴ روز کاری آماده می‌شود. پس از تأیید دمو، نسخه نهایی تحویل داده می‌شود.' },
  { q: 'آیا بدون اطلاعات فنی می‌توانم از سایت استفاده کنم؟', a: 'بله. همه چیز آماده تحویل است. راهنمای کامل نصب دامنه، هاست و راه‌اندازی ارائه می‌شود.' },
  { q: 'آیا پس از تحویل پشتیبانی دارید؟', a: 'بله. بسته به پلن، ۳ ماه تا ۱۲ ماه پشتیبانی کامل شامل رفع باگ، به‌روزرسانی و مشاوره دریافت می‌کنید.' },
  { q: 'آیا می‌توانم محتوا را خودم ویرایش کنم؟', a: 'در پلن‌های حرفه‌ای و VIP، پنل مدیریت محتوا ارائه می‌شود تا متون، تصاویر و خدمات را خودتان ویرایش کنید.' },
  { q: 'روش پرداخت چگونه است؟', a: '۵۰٪ پیش‌پرداخت قبل از شروع کار، ۵۰٪ پس از تأیید دمو. پرداخت از طریق کارت‌به‌کارت انجام می‌شود.' },
]

interface FormData {
  name: string; brand: string; job: string; phone: string;
  whatsapp: string; instagram: string; plan: string; notes: string;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const [activeNav, setActiveNav] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [form, setForm] = useState<FormData>({ name: '', brand: '', job: '', phone: '', whatsapp: '', instagram: '', plan: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setActiveNav(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `✨ سفارش جدید — Zen Web App\n\n👤 نام: ${form.name}\n🏢 برند: ${form.brand}\n💼 شغل: ${form.job}\n📱 موبایل: ${form.phone}\n💬 واتساپ: ${form.whatsapp}\n📸 اینستاگرام: ${form.instagram}\n💎 پلن: ${form.plan || 'مشخص نشده'}\n📝 توضیحات: ${form.notes || '—'}`
    window.open(`https://wa.me/989113310449?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const headerBg = scrolled
    ? 'rgba(244,240,221,0.88)'
    : 'rgba(244,240,221,0.6)'

  return (
    <div style={{ background: '#F4F0DD', minHeight: '100vh', fontFamily: 'Vazirmatn,sans-serif', direction: 'rtl' }}>

      {/* ══ HEADER ══ */}
      <header style={{
        position: 'fixed', top: 0, right: 0, left: 0, zIndex: 200,
        background: headerBg,
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(168,138,237,0.15)' : '1px solid transparent',
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 4px 24px rgba(42,22,56,0.08)' : 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/icon-192.png" alt="Zen" style={{ height: '36px', width: '36px', objectFit: 'contain', borderRadius: '10px' }} />
          <span style={{
            fontSize: '16px', fontWeight: '800',
            background: 'linear-gradient(135deg,#A88AED,#A6C261)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Zen Web App</span>
        </div>
        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'linear-gradient(135deg,#A88AED,#C4ADFF)',
          color: '#fff', padding: '8px 16px', borderRadius: '999px',
          fontSize: '13px', fontWeight: '600',
          boxShadow: '0 2px 12px rgba(168,138,237,0.3)',
        }}>
          <span>📸</span><span>اینستاگرام</span>
        </a>
      </header>

      {/* ══ HERO ══ */}
      <section id="home" style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '110px 24px 80px', textAlign: 'center',
        background: 'linear-gradient(160deg,#F4F0DD 0%,#EEE8FF 45%,#F0F4E8 80%,#F4F0DD 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="blob" style={{ width: 340, height: 340, background: '#A88AED', opacity: 0.14, top: -100, right: -80, animationDelay: '0s' }} />
        <div className="blob" style={{ width: 260, height: 260, background: '#A6C261', opacity: 0.12, bottom: 40, left: -60, animationDelay: '3s' }} />
        <div className="blob" style={{ width: 180, height: 180, background: '#A88AED', opacity: 0.08, bottom: 100, right: 60, animationDelay: '5s' }} />

        <div className="hero-animate section-pill">✦ طراحی اختصاصی برای برند شما</div>
        <h1 className="hero-animate hero-animate-delay-1" style={{
          fontSize: 'clamp(28px,6.5vw,52px)', fontWeight: '800',
          lineHeight: 1.3, color: '#2A1638', marginBottom: '20px', maxWidth: '640px',
        }}>
          طراحی سایت و اپلیکیشن<br />
          <span style={{
            background: 'linear-gradient(135deg,#A88AED 0%,#A6C261 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>برای کسب‌وکارهای خاص</span>
        </h1>
        <p className="hero-animate hero-animate-delay-2" style={{
          fontSize: 'clamp(14px,3.5vw,17px)', color: '#5a4070',
          maxWidth: '500px', marginBottom: '40px', lineHeight: 1.9,
        }}>
          اگر مربی، پزشک، دندانپزشک، مجموعه اقامتی، سالن زیبایی یا صاحب برند هستید،
          سفارش خود را ثبت کنید تا دمو اختصاصی شما آماده شود.
        </p>
        <div className="hero-animate hero-animate-delay-3" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-primary glow-btn" onClick={() => scrollTo('order')}>✦ ثبت سفارش</button>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="btn-ghost">مشاهده نمونه‌کارها</a>
        </div>
        <div style={{ display: 'flex', gap: '32px', marginTop: '56px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['+۵۰', 'پروژه موفق'], ['۵ روز', 'تحویل سریع'], ['۱۰۰٪', 'رضایت مشتری']].map(([n, l]) => (
            <div key={l} className="hero-animate hero-animate-delay-3" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#A88AED' }}>{n}</div>
              <div style={{ fontSize: '12px', color: '#7a6a8a', marginTop: '2px' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section id="services" style={{ padding: '80px 24px', background: 'linear-gradient(180deg,#F4F0DD 0%,#EDE8FF 50%,#F4F0DD 100%)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-pill" style={{ margin: '0 auto 16px' }}>🛠 خدمات</div>
            <h2 style={{ fontSize: 'clamp(22px,5vw,36px)', fontWeight: '800', color: '#2A1638', marginBottom: '12px' }}>چه چیزی می‌سازیم؟</h2>
            <p style={{ color: '#7a6a8a', fontSize: '15px', maxWidth: '420px', margin: '0 auto' }}>
              هر پروژه با دقت، سلیقه و تکنولوژی روز دنیا ساخته می‌شود
            </p>
          </div>
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
            {SERVICES.map((s, i) => (
              <div key={s.title} className={`glass-card reveal reveal-delay-${(i % 3) + 1}`}
                style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div className="service-icon">{s.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#2A1638', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: '#7a6a8a', lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PLANS ══ */}
      <section id="plans" style={{ padding: '80px 24px', background: '#2A1638', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -60, width: 300, height: 300, borderRadius: '50%', background: '#A88AED', opacity: 0.07, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -40, width: 240, height: 240, borderRadius: '50%', background: '#A6C261', opacity: 0.06, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="section-pill" style={{ margin: '0 auto 16px', background: 'rgba(168,138,237,0.15)', borderColor: 'rgba(168,138,237,0.3)', color: '#C4ADFF' }}>💎 پلن‌ها</div>
            <h2 style={{ fontSize: 'clamp(22px,5vw,36px)', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>پلن‌های طراحی</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', maxWidth: '400px', margin: '0 auto' }}>
              هر پلن برای نیاز خاصی طراحی شده تا بهترین انتخاب را داشته باشید
            </p>
          </div>
          <div className="plan-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', alignItems: 'start' }}>
            {PLANS.map((plan, i) => (
              <div key={plan.name} className={`reveal reveal-delay-${i + 1}`} style={{
                borderRadius: '28px',
                background: plan.dark ? plan.gradient : plan.gradient,
                color: plan.dark ? '#fff' : '#2A1638',
                padding: '32px 26px',
                boxShadow: plan.badge === '⭐ محبوب‌ترین'
                  ? '0 24px 64px rgba(168,138,237,0.45)'
                  : plan.dark
                    ? '0 16px 48px rgba(0,0,0,0.4)'
                    : '0 12px 40px rgba(36,23,47,0.18)',
                border: plan.badge === '⭐ محبوب‌ترین'
                  ? '2px solid rgba(255,255,255,0.5)'
                  : plan.dark
                    ? '1px solid rgba(168,138,237,0.25)'
                    : '1px solid rgba(255,255,255,0.4)',
                transform: plan.badge === '⭐ محبوب‌ترین' ? 'scale(1.03)' : 'scale(1)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {plan.badge && (
                  <div style={{
                    display: 'inline-block',
                    background: plan.dark ? 'rgba(168,138,237,0.3)' : 'rgba(255,255,255,0.8)',
                    color: plan.dark ? '#C4ADFF' : '#A88AED',
                    borderRadius: '999px', padding: '5px 14px',
                    fontSize: '12px', fontWeight: '700', marginBottom: '18px',
                    backdropFilter: 'blur(8px)',
                    border: plan.dark ? '1px solid rgba(168,138,237,0.3)' : 'none',
                  }}>{plan.badge}</div>
                )}
                <div style={{ fontSize: '40px', marginBottom: '12px', textAlign: 'center' }}>{plan.emoji}</div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '10px', textAlign: 'center' }}>{plan.name}</h3>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '32px', fontWeight: '800' }}>{plan.price}</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', marginRight: '6px', opacity: 0.8 }}>تومان</span>
                </div>
                <p style={{
                  fontSize: '13px', lineHeight: 1.9,
                  opacity: plan.dark ? 0.8 : 0.7,
                  textAlign: 'center', marginBottom: '22px',
                  paddingBottom: '20px',
                  borderBottom: plan.dark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(36,23,47,0.1)',
                }}>{plan.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '26px' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{
                      fontSize: '13.5px', marginBottom: '11px',
                      display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.6,
                    }}>
                      <span style={{
                        flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%',
                        background: plan.dark ? 'rgba(168,138,237,0.3)' : 'rgba(42,22,56,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', fontWeight: '900', marginTop: '3px',
                        border: plan.dark ? '1px solid rgba(168,138,237,0.4)' : 'none',
                      }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="plan-btn"
                  onClick={() => { setForm(p => ({ ...p, plan: `${plan.name} - ${plan.price} تومان` })); scrollTo('order') }}
                  style={{ ...plan.btnStyle } as React.CSSProperties}
                >{plan.btnLabel}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOR EACH JOB ══ */}
      <section style={{ padding: '80px 24px', background: '#F4F0DD' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div className="reveal glass-card" style={{ padding: '48px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
            <div className="section-pill" style={{ margin: '0 auto 16px' }}>✦ دمو اختصاصی</div>
            <h2 style={{ fontSize: 'clamp(20px,5vw,30px)', fontWeight: '800', color: '#2A1638', marginBottom: '14px' }}>
              برای هر شغل، دمو اختصاصی
            </h2>
            <p style={{ color: '#7a6a8a', fontSize: '15px', lineHeight: 1.9, marginBottom: '28px' }}>
              برای هر شغل، دمو اختصاصی قابل طراحی است؛ مثل مربی ورزشی، پزشک، دندانپزشک، اقامتگاه، کافه، سالن زیبایی و فروشگاه.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {JOBS.map(j => <span key={j} className="chip">{j}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ORDER FORM ══ */}
      <section id="order" style={{
        padding: '80px 24px',
        background: 'linear-gradient(160deg,#EDE8FF 0%,#F4F0DD 60%)',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-pill" style={{ margin: '0 auto 16px' }}>📋 سفارش</div>
            <h2 style={{ fontSize: 'clamp(22px,5vw,34px)', fontWeight: '800', color: '#2A1638', marginBottom: '12px' }}>ثبت سفارش</h2>
            <p style={{ color: '#7a6a8a', fontSize: '15px' }}>اطلاعات خود را وارد کنید تا دمو اختصاصی شما آماده شود</p>
          </div>

          {submitted ? (
            <div className="reveal glass-card" style={{ padding: '56px 32px', textAlign: 'center' }}>
              <div style={{ fontSize: '56px', marginBottom: '20px' }}>✅</div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#2A1638', marginBottom: '10px' }}>سفارش ثبت شد!</h3>
              <p style={{ color: '#7a6a8a', fontSize: '14px' }}>واتساپ باز شد. پیام سفارش آماده ارسال است 💬</p>
            </div>
          ) : (
            <form className="reveal glass-card" style={{ padding: '36px 28px' }} onSubmit={handleSubmit}>
              {[
                { label: 'نام و نام خانوادگی', name: 'name', placeholder: 'مثال: زهرا احمدی', required: true },
                { label: 'نام شرکت یا برند', name: 'brand', placeholder: 'نام برند یا کلینیک شما', required: false },
                { label: 'شماره موبایل', name: 'phone', placeholder: '09XXXXXXXXX', required: true, type: 'tel' },
                { label: 'شماره واتساپ (برای ارسال نمونه)', name: 'whatsapp', placeholder: '09XXXXXXXXX', required: true, type: 'tel' },
                { label: 'آدرس اینستاگرام شما', name: 'instagram', placeholder: '@username', required: false },
              ].map(f => (
                <div key={f.name} style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#2A1638', marginBottom: '8px' }}>
                    {f.label}{f.required && <span style={{ color: '#A88AED', marginRight: '4px' }}>*</span>}
                  </label>
                  <input
                    className="form-input"
                    name={f.name}
                    value={(form as Record<string, string>)[f.name]}
                    onChange={handleChange}
                    required={f.required}
                    placeholder={f.placeholder}
                    type={f.type || 'text'}
                  />
                </div>
              ))}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#2A1638', marginBottom: '8px' }}>
                  شغل / حوزه فعالیت<span style={{ color: '#A88AED', marginRight: '4px' }}>*</span>
                </label>
                <select className="form-input" name="job" value={form.job} onChange={handleChange} required style={{ appearance: 'none' }}>
                  <option value="">انتخاب کنید...</option>
                  {JOBS.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#2A1638', marginBottom: '8px' }}>
                  پلن مورد درخواست<span style={{ color: '#A88AED', marginRight: '4px' }}>*</span>
                </label>
                <select className="form-input" name="plan" value={form.plan} onChange={handleChange} required style={{ appearance: 'none' }}>
                  <option value="">انتخاب پلن...</option>
                  <option value="پایه - ۹،۹۰۰،۰۰۰ تومان">🌱 پایه — ۹،۹۰۰،۰۰۰ تومان</option>
                  <option value="حرفه‌ای - ۱۸،۹۰۰،۰۰۰ تومان">💜 حرفه‌ای — ۱۸،۹۰۰،۰۰۰ تومان</option>
                  <option value="VIP - ۲۷،۹۰۰،۰۰۰ تومان">👑 VIP — ۲۷،۹۰۰،۰۰۰ تومان</option>
                </select>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#2A1638', marginBottom: '8px' }}>توضیحات تکمیلی</label>
                <textarea
                  className="form-input"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="هر توضیح اضافی که فکر می‌کنید مفید است..."
                  style={{ minHeight: '110px', resize: 'vertical' }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '16px' }}>
                ✦ ارسال سفارش در واتساپ
              </button>
              <p style={{ textAlign: 'center', fontSize: '12px', color: '#9a8aaa', marginTop: '14px' }}>پس از ارسال، به واتساپ هدایت می‌شوید 💬</p>
            </form>
          )}
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ padding: '80px 24px', background: '#F4F0DD' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
            <div className="section-pill" style={{ margin: '0 auto 16px' }}>❓ سوالات</div>
            <h2 style={{ fontSize: 'clamp(22px,5vw,34px)', fontWeight: '800', color: '#2A1638', marginBottom: '12px' }}>سوالات متداول</h2>
            <p style={{ color: '#7a6a8a', fontSize: '15px' }}>پاسخ سوالات رایج مشتریان</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item reveal reveal-delay-${(i % 3) + 1}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '20px 22px', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Vazirmatn,sans-serif', textAlign: 'right',
                    direction: 'rtl',
                  }}
                >
                  <span style={{ fontSize: '14.5px', fontWeight: '700', color: '#2A1638', flex: 1 }}>{faq.q}</span>
                  <span style={{
                    marginRight: '12px', fontSize: '18px', color: '#A88AED',
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease', flexShrink: 0,
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 22px 20px', fontSize: '14px', color: '#5a4a6b', lineHeight: 1.9 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ padding: '80px 24px 120px', background: 'linear-gradient(160deg,#EDE8FF,#F4F0DD)' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <div className="reveal" style={{ marginBottom: '40px' }}>
            <div className="section-pill" style={{ margin: '0 auto 16px' }}>📞 تماس</div>
            <h2 style={{ fontSize: 'clamp(22px,5vw,34px)', fontWeight: '800', color: '#2A1638', marginBottom: '12px' }}>تماس با ما</h2>
            <p style={{ color: '#7a6a8a', fontSize: '15px' }}>آماده پاسخ‌گویی به سوالات شما هستیم</p>
          </div>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="contact-btn"
              style={{ background: '#25D366', boxShadow: '0 8px 28px rgba(37,211,102,0.35)' }}>
              <span>💬</span> واتساپ — پاسخ سریع
            </a>
            <a href={PHONE} className="contact-btn"
              style={{ background: 'linear-gradient(135deg,#A88AED,#C4ADFF)', boxShadow: '0 8px 28px rgba(168,138,237,0.35)' }}>
              <span>📞</span> تماس مستقیم
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="contact-btn"
              style={{ background: 'linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045)', boxShadow: '0 8px 28px rgba(131,58,180,0.3)' }}>
              <span>📸</span> اینستاگرام
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{
        background: '#1B1026', padding: '40px 24px 100px',
        textAlign: 'center', color: 'rgba(255,255,255,0.5)',
      }}>
        <div style={{ marginBottom: '20px' }}>
          <img src="/icon-192.png" alt="Zen" style={{ height: '44px', width: '44px', objectFit: 'contain', borderRadius: '12px', opacity: 0.9, margin: '0 auto' }} />
        </div>
        <div style={{
          fontSize: '18px', fontWeight: '800', marginBottom: '12px',
          background: 'linear-gradient(135deg,#A88AED,#A6C261)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>Zen Web App</div>
        <p style={{ fontSize: '13px', marginBottom: '24px', lineHeight: 1.8 }}>
          طراحی سایت و اپلیکیشن برای کسب‌وکارهای خاص
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '28px' }}>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>💬</a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"
            style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(168,138,237,0.15)', border: '1px solid rgba(168,138,237,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📸</a>
          <a href={PHONE}
            style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(166,194,97,0.15)', border: '1px solid rgba(166,194,97,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📞</a>
        </div>
        <p style={{ fontSize: '12px', opacity: 0.4 }}>© ۱۴۰۴ Zen Web App — تمام حقوق محفوظ است</p>
      </footer>

      {/* ══ BOTTOM NAV ══ */}
      <nav style={{
        position: 'fixed', bottom: 0, right: 0, left: 0, zIndex: 200,
        background: 'rgba(27,16,38,0.92)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(168,138,237,0.15)',
        padding: '10px 0 12px',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.2)',
      }}>
        {[
          { id: 'home', label: 'خانه', icon: '🏠' },
          { id: 'plans', label: 'پلن‌ها', icon: '💎' },
          { id: 'order', label: 'سفارش', icon: '✦' },
          { id: 'contact', label: 'تماس', icon: '📞' },
        ].map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
            style={{ color: activeNav === item.id ? '#C4ADFF' : 'rgba(255,255,255,0.4)' }}
            onClick={() => scrollTo(item.id)}
          >
            <span style={{ fontSize: '19px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

    </div>
  )
}
