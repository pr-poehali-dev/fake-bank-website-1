import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "accounts", label: "Счета" },
  { id: "transfers", label: "Переводы" },
  { id: "cards", label: "Карты" },
  { id: "investments", label: "Инвестиции" },
  { id: "contacts", label: "Контакты" },
];

const ASSETS = [
  { name: "Золото", ticker: "XAU", price: "₽ 187 430", change: "+2.4%", up: true, icon: "⬡" },
  { name: "Нефть Brent", ticker: "BRENT", price: "₽ 6 820", change: "+0.9%", up: true, icon: "◈" },
  { name: "S&P 500", ticker: "SPX", price: "₽ 453 100", change: "-0.3%", up: false, icon: "◇" },
  { name: "Биткоин", ticker: "BTC", price: "₽ 7 840 000", change: "+5.1%", up: true, icon: "◉" },
  { name: "Евро", ticker: "EUR", price: "₽ 103.42", change: "-0.1%", up: false, icon: "◎" },
  { name: "Серебро", ticker: "XAG", price: "₽ 2 150", change: "+1.8%", up: true, icon: "◐" },
];

const INVESTMENTS = [
  { rank: 1, name: "Золотые облигации АБ", yield: "+18.4%", risk: "Низкий", amount: "от ₽ 500 000", badge: "ТОП" },
  { rank: 2, name: "Портфель «Элита»", yield: "+24.1%", risk: "Средний", amount: "от ₽ 2 000 000", badge: "НОВОЕ" },
  { rank: 3, name: "Фонд недвижимости", yield: "+12.7%", risk: "Низкий", amount: "от ₽ 1 000 000", badge: null },
  { rank: 4, name: "Глобальный индекс", yield: "+31.2%", risk: "Высокий", amount: "от ₽ 300 000", badge: null },
  { rank: 5, name: "Нефтяной фонд РФ", yield: "+9.8%", risk: "Низкий", amount: "от ₽ 750 000", badge: null },
];

const ACCOUNTS = [
  { name: "Текущий счёт", number: "**** 4821", balance: "₽ 4 850 320.00", currency: "RUB", trend: "+2.1%" },
  { name: "Накопительный", number: "**** 7103", balance: "₽ 12 400 000.00", currency: "RUB", trend: "+8.4%" },
  { name: "Валютный счёт", number: "**** 0047", balance: "$ 184 500.00", currency: "USD", trend: "+0.3%" },
];

const CARDS = [
  { name: "AUREUM Black", number: "**** **** **** 4821", expiry: "12/28", type: "VISA Infinite", color: "from-[#1A160F] to-[#0A0806]" },
  { name: "AUREUM Platinum", number: "**** **** **** 7103", expiry: "09/27", type: "Mastercard World Elite", color: "from-[#1C1C1C] to-[#0F0F0F]" },
];

function useOnlineCount() {
  const [count, setCount] = useState(247);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(200, Math.min(350, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return count;
}

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

const Section = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <section id={id} className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
    {children}
  </section>
);

const SectionTitle = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
  <div className="mb-12">
    <h2 className="font-display text-5xl md:text-6xl font-light gold-gradient mb-3">{children}</h2>
    {sub && <p className="text-sm tracking-[0.25em] uppercase text-gold-dark font-light">{sub}</p>}
    <div className="line-gold mt-6 w-32" />
  </div>
);

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const onlineCount = useOnlineCount();
  const prevCount = useRef(onlineCount);
  const [countDir, setCountDir] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (onlineCount > prevCount.current) setCountDir("up");
    else if (onlineCount < prevCount.current) setCountDir("down");
    prevCount.current = onlineCount;
    const t = setTimeout(() => setCountDir(null), 600);
    return () => clearTimeout(t);
  }, [onlineCount]);

  const totalAssets = useCountUp(17250000);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-obsidian text-foreground">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gold-bg rounded-sm flex items-center justify-center">
              <span className="text-obsidian font-display font-bold text-xs">AB</span>
            </div>
            <span className="font-display text-xl tracking-widest shimmer-text">AUREUM</span>
            <span className="hidden md:block text-xs tracking-[0.3em] uppercase text-gold-dark/60 mt-1">BANK</span>
          </div>

          {/* Online Counter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-obsidian-2/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-muted-foreground tracking-wider">онлайн</span>
            <span
              className={`text-sm font-semibold tabular-nums transition-all duration-300 ${
                countDir === "up" ? "text-emerald-400" : countDir === "down" ? "text-red-400" : "text-gold"
              }`}
            >
              {onlineCount.toLocaleString("ru-RU")}
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-all duration-200 rounded-sm ${
                  activeSection === item.id
                    ? "text-gold border-b border-gold"
                    : "text-muted-foreground hover:text-gold/80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu */}
          <button className="lg:hidden text-gold" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden glass-dark border-t border-gold/10 py-4 px-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left py-3 px-4 text-sm tracking-wider uppercase text-muted-foreground hover:text-gold border-b border-gold/5 last:border-0"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <div id="home" className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,168,76,0.07)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(201,168,76,0.04)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
          <div className="max-w-4xl">
            <p className="text-xs tracking-[0.5em] uppercase text-gold-dark mb-6 animate-fade-in">
              Частный банк высшего уровня
            </p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] mb-8 animate-slide-up">
              <span className="gold-gradient">AUREUM</span>
              <br />
              <span className="text-foreground/80">BANK</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-light max-w-xl leading-relaxed mb-12">
              Эксклюзивное обслуживание состоятельных клиентов с 1998 года.
              Ваш капитал — наша ответственность.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("accounts")}
                className="gold-bg text-obsidian px-8 py-3 text-xs tracking-[0.3em] uppercase font-semibold hover:opacity-90 transition-opacity"
              >
                Войти в кабинет
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="border border-gold/40 text-gold px-8 py-3 text-xs tracking-[0.3em] uppercase font-light hover:border-gold/80 transition-colors"
              >
                Стать клиентом
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10">
            {[
              { label: "Клиентов", value: "12 400+" },
              { label: "Активов под управлением", value: "₽ 2.4 трлн" },
              { label: "Лет на рынке", value: "26" },
              { label: "Отделений", value: "48" },
            ].map((stat) => (
              <div key={stat.label} className="bg-obsidian p-6 md:p-8">
                <p className="font-display text-3xl md:text-4xl font-light gold-gradient mb-2">{stat.value}</p>
                <p className="text-xs tracking-wider uppercase text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACCOUNTS */}
      <Section id="accounts">
        <SectionTitle sub="Управление финансами">Счета</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ACCOUNTS.map((acc) => (
            <div key={acc.number} className="card-premium p-6 rounded-sm group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">{acc.name}</p>
                  <p className="text-sm font-mono text-gold/60">{acc.number}</p>
                </div>
                <span className="text-xs px-2 py-1 border border-gold/20 text-gold/60 tracking-widest">{acc.currency}</span>
              </div>
              <p className="font-display text-3xl font-light text-foreground mb-3">{acc.balance}</p>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-xs">{acc.trend}</span>
                <span className="text-muted-foreground text-xs">за месяц</span>
              </div>
              <div className="line-gold mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 card-premium rounded-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Суммарные активы</p>
              <p className="font-display text-4xl gold-gradient font-light">
                ₽ {totalAssets.toLocaleString("ru-RU")}.00
              </p>
            </div>
            <button className="gold-bg text-obsidian px-6 py-2.5 text-xs tracking-[0.3em] uppercase font-semibold hover:opacity-90 transition-opacity">
              Пополнить счёт
            </button>
          </div>
        </div>
      </Section>

      <div className="line-gold mx-8 md:mx-16" />

      {/* TRANSFERS */}
      <Section id="transfers">
        <SectionTitle sub="Быстрые операции">Переводы</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-premium p-8 rounded-sm">
            <h3 className="font-display text-2xl font-light text-gold mb-6">Новый перевод</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Получатель</label>
                <input
                  type="text"
                  placeholder="Номер счёта или телефон"
                  className="w-full bg-obsidian border border-gold/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/50 rounded-sm"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Сумма</label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="0.00"
                    className="flex-1 bg-obsidian border border-gold/20 border-r-0 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/50 rounded-l-sm"
                  />
                  <span className="bg-obsidian-3 border border-gold/20 px-4 py-3 text-sm text-gold/60 rounded-r-sm">₽</span>
                </div>
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Комментарий</label>
                <input
                  type="text"
                  placeholder="Необязательно"
                  className="w-full bg-obsidian border border-gold/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/50 rounded-sm"
                />
              </div>
              <button className="w-full gold-bg text-obsidian py-3 text-xs tracking-[0.3em] uppercase font-semibold hover:opacity-90 transition-opacity mt-2">
                Выполнить перевод
              </button>
            </div>
          </div>

          <div className="card-premium p-8 rounded-sm">
            <h3 className="font-display text-2xl font-light text-gold mb-6">История переводов</h3>
            <div className="space-y-3">
              {[
                { name: "Алексей В.", amount: "-₽ 250 000", date: "Сегодня, 14:32", type: "out" },
                { name: "ООО «Меркурий»", amount: "+₽ 1 800 000", date: "Вчера, 09:15", type: "in" },
                { name: "Иванова М.С.", amount: "-₽ 85 000", date: "03 мар, 16:48", type: "out" },
                { name: "Дивиденды АБ", amount: "+₽ 420 000", date: "01 мар, 12:00", type: "in" },
                { name: "Петров К.И.", amount: "-₽ 130 000", date: "28 фев, 11:20", type: "out" },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gold/5 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.date}</p>
                  </div>
                  <span className={`font-mono text-sm font-medium ${t.type === "in" ? "text-emerald-400" : "text-foreground"}`}>
                    {t.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="line-gold mx-8 md:mx-16" />

      {/* CARDS */}
      <Section id="cards">
        <SectionTitle sub="Премиальные инструменты">Карты</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CARDS.map((card, i) => (
            <div key={i} className="group">
              <div className={`relative bg-gradient-to-br ${card.color} border border-gold/25 rounded-sm p-8 aspect-[1.6/1] flex flex-col justify-between overflow-hidden cursor-pointer group-hover:border-gold/50 transition-all duration-300`}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,168,76,0.08)_0%,transparent_60%)]" />
                <div className="flex justify-between items-start">
                  <div>
                    <p className="shimmer-text font-display text-2xl font-light tracking-widest">{card.name}</p>
                    <p className="text-xs tracking-widest text-gold/40 mt-1 uppercase">{card.type}</p>
                  </div>
                  <div className="w-10 h-10 gold-bg rounded-sm flex items-center justify-center">
                    <span className="text-obsidian font-display font-bold text-xs">AB</span>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-lg tracking-[0.2em] text-foreground/80 mb-3">{card.number}</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gold/40 tracking-wider uppercase mb-1">Срок действия</p>
                      <p className="font-mono text-sm text-foreground/70">{card.expiry}</p>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30" />
                      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 -ml-3" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {["Заблокировать", "Лимиты", "Реквизиты"].map((action) => (
                  <button key={action} className="border border-gold/15 py-2 text-xs tracking-wider uppercase text-muted-foreground hover:border-gold/40 hover:text-gold/80 transition-all">
                    {action}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 card-premium rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-display text-2xl font-light gold-gradient">Заказать новую карту</p>
            <p className="text-sm text-muted-foreground mt-1">Выпуск от 1 рабочего дня. Доставка по всему миру.</p>
          </div>
          <button className="gold-bg text-obsidian px-6 py-2.5 text-xs tracking-[0.3em] uppercase font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
            Оформить карту
          </button>
        </div>
      </Section>

      <div className="line-gold mx-8 md:mx-16" />

      {/* INVESTMENTS */}
      <Section id="investments">
        <SectionTitle sub="Доходность и активы">Инвестиции</SectionTitle>

        {/* Popular Assets */}
        <div className="mb-12">
          <h3 className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">Популярные активы</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {ASSETS.map((asset) => (
              <div key={asset.ticker} className="card-premium p-4 rounded-sm group cursor-pointer hover:bg-obsidian-3 transition-colors">
                <div className="text-2xl text-gold/40 mb-3 group-hover:text-gold/70 transition-colors">{asset.icon}</div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">{asset.ticker}</p>
                <p className="text-sm font-medium text-foreground mb-1">{asset.price}</p>
                <span className={`text-xs font-medium ${asset.up ? "text-emerald-400" : "text-red-400"}`}>
                  {asset.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Rating */}
        <div>
          <h3 className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">Рейтинг инвестиций</h3>
          <div className="space-y-2">
            {INVESTMENTS.map((inv) => (
              <div key={inv.rank} className="card-premium rounded-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer hover:bg-obsidian-3 transition-colors">
                <div className="flex items-center gap-5">
                  <span className="font-display text-4xl font-light text-gold/20 group-hover:text-gold/40 transition-colors w-10 text-center">
                    {inv.rank}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground">{inv.name}</p>
                      {inv.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 gold-bg text-obsidian font-bold tracking-widest rounded-sm">
                          {inv.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{inv.amount} · Риск: {inv.risk}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 ml-14 md:ml-0">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-0.5">Доходность</p>
                    <p className="text-lg font-display text-emerald-400">{inv.yield}</p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-gold/30 group-hover:text-gold/60 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="line-gold mx-8 md:mx-16" />

      {/* CONTACTS */}
      <Section id="contacts">
        <SectionTitle sub="Персональный менеджер">Контакты</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { icon: "Phone", label: "Горячая линия", value: "+7 (800) 100-00-00", sub: "Бесплатно, 24/7" },
              { icon: "Mail", label: "Электронная почта", value: "private@aureum.bank", sub: "Ответ в течение 2 часов" },
              { icon: "MapPin", label: "Главный офис", value: "Москва, Кутузовский просп., 32", sub: "Пн–Пт 9:00–19:00" },
              { icon: "MessageSquare", label: "Telegram", value: "@aureum_private", sub: "Персональный менеджер" },
            ].map((contact) => (
              <div key={contact.label} className="card-premium p-5 rounded-sm flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 border border-gold/25 flex items-center justify-center flex-shrink-0 group-hover:border-gold/50 transition-colors rounded-sm">
                  <Icon name={contact.icon} fallback="CircleAlert" size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-0.5">{contact.label}</p>
                  <p className="text-sm font-medium text-foreground">{contact.value}</p>
                  <p className="text-xs text-gold/50 mt-0.5">{contact.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card-premium p-8 rounded-sm">
            <h3 className="font-display text-2xl font-light text-gold mb-6">Стать клиентом</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Иванов Иван Иванович"
                  className="w-full bg-obsidian border border-gold/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/50 rounded-sm"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Телефон</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-obsidian border border-gold/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/50 rounded-sm"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Сумма активов</label>
                <select className="w-full bg-obsidian border border-gold/20 px-4 py-3 text-sm text-muted-foreground focus:outline-none focus:border-gold/50 rounded-sm">
                  <option value="">Выберите диапазон</option>
                  <option>от ₽ 1 000 000</option>
                  <option>от ₽ 5 000 000</option>
                  <option>от ₽ 50 000 000</option>
                  <option>от ₽ 500 000 000</option>
                </select>
              </div>
              <button className="w-full gold-bg text-obsidian py-3 text-xs tracking-[0.3em] uppercase font-semibold hover:opacity-90 transition-opacity mt-2">
                Подать заявку
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-gold/10 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 gold-bg rounded-sm flex items-center justify-center">
              <span className="text-obsidian font-display font-bold text-[9px]">AB</span>
            </div>
            <span className="font-display text-lg tracking-widest text-gold/60">AUREUM BANK</span>
          </div>
          <p className="text-xs text-muted-foreground/40 tracking-wider">
            © 2024 AUREUM BANK. Лицензия ЦБ РФ № 0000. Демонстрационный проект.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-muted-foreground/50 tracking-wider">
              {onlineCount} пользователей онлайн
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}