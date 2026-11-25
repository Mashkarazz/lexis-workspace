import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  Filter,
  Globe2,
  LayoutDashboard,
  Layers3,
  Menu,
  MoreHorizontal,
  PenTool,
  Play,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import "./App.css";
import "./quality-refresh.css";
import "./publication-tracker.css";
import "./control-center.css";
import { pipelineApi, pipelineLiveEnabled } from "./pipeline-api";

const stages = [
  ["brief", "Бриф"],
  ["facts", "Факты"],
  ["structure", "Структура"],
  ["writing", "Текст"],
  ["visual", "Инфографика"],
  ["validation", "Проверка"],
  ["review", "AI-ревью"],
  ["publish", "Публикация"],
];
const pages = {
  product: {
    eyebrow: "01 — ПРОДУКТ",
    title: "ИИ-конвейер|статей для|роста сайта.",
    lead: "LEXIS помогает выпускать статьи сериями: команда ИИ-агентов исследует темы, работает с фактами, строит структуру, пишет материал и проверяет его перед публикацией. Вы видите весь процесс в одном кабинете.",
    cards: [
      [
        "Темы — не из воздуха",
        "SEO-анализ показывает, что ищет аудитория, какие вопросы она задаёт и на какие из них ваш сайт может дать полезный ответ.",
      ],
      [
        "План — вместо хаоса",
        "Темы становятся контент-планом: у каждой статьи есть задача, место в серии и связь с другими материалами.",
      ],
      [
        "Команда — вместо одного запроса",
        "Специализированные ИИ-агенты создают и проверяют статьи по этапам, чтобы выпускать их регулярно и не терять качество.",
      ],
    ],
  },
  how: {
    eyebrow: "02 — КАК ЭТО РАБОТАЕТ",
    title: "От задачи бизнеса|к потоку статей.",
    lead: "Команда ИИ-агентов ведёт каждый материал по понятному маршруту: от темы и фактов до проверки. Вы видите текущий этап, результат и следующий шаг.",
  },
  quality: {
    eyebrow: "03 — КАЧЕСТВО",
    title: "Полезно людям.|Понятно поиску.",
    lead: "Регулярный выпуск не должен снижать качество. Поэтому ИИ-команда проверяет факты, ясность текста, структуру, поисковую логику и готовность материала к публикации.",
  },
  pricing: {
    eyebrow: "04 — ТАРИФЫ",
    title: "Платите за объём|готовых материалов.",
    lead: "Стоимость зависит от того, сколько статей вам нужно выпускать в месяц. Начните с первого потока и оцените, как работает система на вашей нише.",
  },
  journal: {
    eyebrow: "05 — JOURNAL",
    title: "Как создавать контент,|который находят.",
    lead: "Практичные заметки о SEO-анализе, выборе тем, контент-плане и качестве материалов для сайта.",
  },
};
const split = (t) => (
  <>
    {t.split("|").map((s, i) => (
      <span key={s}>
        {s}
        {i < t.split("|").length - 1 && <br />}
      </span>
    ))}
  </>
);
function Logo({ go }) {
  return (
    <button className="logo" onClick={() => go("home")}>
      <span className="logo-mark">
        <i />
        <i />
        <i />
      </span>
      LEXIS<span className="logo-dot">.</span>
    </button>
  );
}
function Header({ go, setMenu }) {
  return (
    <header>
      <Logo go={go} />
      <nav>
        <button onClick={() => go("product")}>Продукт</button>
        <button onClick={() => go("how")}>Как это работает</button>
        <button onClick={() => go("quality")}>Качество</button>
        <button onClick={() => go("pricing")}>Тарифы</button>
        <button onClick={() => go("journal")}>Журнал</button>
      </nav>
      <div className="head-actions">
        <button className="login" onClick={() => go("login")}>
          Войти
        </button>
        <button className="mini cta" onClick={() => go("signup")}>
          Попробовать бесплатно <ArrowRight size={14} />
        </button>
      </div>
      <button className="hamb" onClick={() => setMenu((x) => !x)}>
        <Menu />
      </button>
    </header>
  );
}
function StatusFlow({ compact = false }) {
  return (
    <div className={"status-flow " + (compact ? "compact" : "")}>
      {stages.map(([id, label], i) => (
        <div className={i < 3 ? "complete" : i === 3 ? "current" : ""} key={id}>
          <span>
            {i < 3 ? (
              <Check size={12} />
            ) : i === 3 ? (
              <i />
            ) : (
              String(i + 1).padStart(2, "0")
            )}
          </span>
          <b>{label}</b>
          {i < stages.length - 1 && <em />}
        </div>
      ))}
    </div>
  );
}
function Landing({ go }) {
  return (
    <>
      <section className="hero">
        <div className="herocopy reveal">
          <div className="eyebrow">
            <b /> КОМАНДА ИИ-АГЕНТОВ ДЛЯ КОНТЕНТА
          </div>
          <h1>{split("SEO-статьи|для роста сайта")}</h1>
          <p>
            LEXIS помогает выпускать статьи сериями: команда ИИ-агентов
            исследует темы, работает с фактами, строит структуру, пишет материал
            и проверяет его перед публикацией. Вы видите весь процесс в одном
            кабинете.
          </p>
          <div className="actions">
            <button className="cta" onClick={() => go("signup")}>
              Запустить первый поток статей <ArrowRight />
            </button>
            <button
              className="watch"
              onClick={() =>
                document
                  .querySelector("#flow")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>
                <Play size={15} />
              </span>
              Посмотреть, как работают агенты
            </button>
          </div>
          <small>7 дней доступа · начните с анализа ниши и контент-плана</small>
        </div>
        <div className="orbital">
          <div className="orbit o1" />
          <div className="orbit o2" />
          <i className="star s1" />
          <i className="star s2" />
          <div className="core">
            <div className="coretop">
              <b /> LEXIS FLOW <span>⌁</span>
            </div>
            <div className="numbers">
              <b>01</b>
              <i />
              <b>02</b>
              <i />
              <b>03</b>
            </div>
            <div>
              Search demand.
              <br />
              <em>Useful articles.</em>
            </div>
          </div>
          <div className="float f1">
            <Search size={16} />
            <div>
              <b>Агент-исследователь</b>
              <span>Спрос и темы для контент-плана</span>
            </div>
          </div>
          <div className="float f2">
            <FileCheck2 size={16} />
            <div>
              <b>Агент контроля качества</b>
              <span>Факты · ясность · SEO</span>
            </div>
            <Check size={15} />
          </div>
        </div>
      </section>
      <section className="ticker">
        AI RESEARCH <i /> AI EDITOR <i /> AI WRITER <i /> QUALITY CHECK <i />
        HUMAN CONTROL <i /> AI RESEARCH
      </section>
      <section className="intro reveal">
        <p>
          Не генератор текста. ИИ-редакция, которая превращает контент-план в
          управляемый поток статей.
        </p>
        <div>
          <span>исследование</span>
          <span>редактура</span>
          <span>текст</span>
          <span>проверка</span>
          <span>контроль</span>
        </div>
      </section>
      <section className="flow reveal" id="flow">
        <div className="section-head">
          <div>
            <small>01 — КАК РАБОТАЕТ ИИ-КОМАНДА</small>
            <h2>{split("Агенты ведут статью|от задачи до результата.")}</h2>
          </div>
          <p>
            Исследователь работает с темой и фактами, редактор строит логику
            материала, автор готовит текст, а агенты контроля качества проверяют
            результат перед публикацией.
          </p>
        </div>
        <StatusFlow />
        <button className="text-button" onClick={() => go("how")}>
          Посмотреть весь процесс <ArrowRight size={17} />
        </button>
      </section>
      <section className="demo reveal">
        <div className="demo-copy">
          <small>02 — РАБОЧЕЕ ПРОСТРАНСТВО</small>
          <h2>{split("Управляйте потоком|статей в одном кабинете.")}</h2>
          <p>
            Контент-план становится живой очередью: видно, над чем работают
            агенты, где нужна проверка, какие замечания появились и что уже
            готово к публикации.
          </p>
          <button className="text-button" onClick={() => go("app")}>
            Открыть демо-кабинет <ArrowRight size={17} />
          </button>
        </div>
        <RequestPreview go={go} />
      </section>
      <section className="agent-team reveal">
        <div className="agent-team-head">
          <small>03 — ИИ-РЕДАКЦИЯ</small>
          <h2>{split("Не один ИИ-автор,|а команда для каждой статьи.")}</h2>
          <p>
            Агенты передают результаты друг другу. Поэтому статья создаётся не
            одним случайным запросом, а проходит редакционный маршрут с
            понятными ролями и результатами.
          </p>
        </div>
        <div className="agent-team-grid">
          {[
            ["01", "Агент-исследователь", "Собирает факты, источники и контекст темы."],
            ["02", "Агент-редактор", "Выстраивает структуру и путь читателя по материалу."],
            ["03", "Агент-автор", "Готовит понятный черновик по фактам и утверждённой структуре."],
            ["04", "Агенты качества", "Проверяют ясность, SEO, ссылки и готовность к публикации."],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="quality-strip reveal">
        <ShieldCheck />
        <div>
          <small>ПОНЯТНО ЛЮДЯМ · ПОЛЕЗНО ДЛЯ ПОИСКА</small>
          <h3>Факты · ясность · структура · SEO-поля · внутренние ссылки</h3>
        </div>
        <button
          aria-label="Открыть страницу качества"
          onClick={() => go("quality")}
        >
          <ArrowUpRight />
        </button>
      </section>
      <section className="quote">
        <span>“</span>
        <blockquote>
          ИИ делает работу.
          <br />
          Вы управляете <em>направлением.</em>
        </blockquote>
        <p>
          Вы задаёте цель и добавляете знания о компании. ИИ-команда берёт на
          себя повторяющиеся редакционные этапы и помогает вести много статей
          параллельно.
        </p>
      </section>
      <section className="plans reveal">
        <div>
          <small>04 — ТАРИФЫ И ЛИМИТЫ</small>
          <h2>
            Выберите темп
            <br />
            для роста сайта.
          </h2>
        </div>
        <div className="plan-cards">
          <article>
            <small>СТАРТ</small>
            <strong>
              4 950 ₽ <em>/ месяц</em>
            </strong>
            <p>
              До 30 статей в месяц для первого регулярного контент-потока.
            </p>
            <ul>
              <li>
                <Check /> SEO-анализ ниши
              </li>
              <li>
                <Check /> Контент-план и очередь
              </li>
              <li>
                <Check /> Полный цикл ИИ-агентов
              </li>
            </ul>
            <button className="cta" onClick={() => go("pricing")}>
              Посмотреть тарифы <ArrowRight />
            </button>
          </article>
          <article className="coming-plan">
            <small>РОСТ · ОСНОВНОЙ ВЫБОР</small>
            <strong>
              12 450 ₽ <em>/ месяц</em>
            </strong>
            <p>
              До 50 статей в месяц для стабильного SEO-продвижения.
            </p>
            <button className="ghost" onClick={() => go("pricing")}>
              Сравнить все тарифы <ArrowRight size={15} />
            </button>
          </article>
        </div>
      </section>
    </>
  );
}
function RequestPreview({ go }) {
  return (
    <div className="request-preview">
      <div className="request-top">
        <span className="status-dot" /> <small>A-0042 · В РАБОТЕ</small>
        <button onClick={() => go("app")}>
          <ArrowUpRight size={16} />
        </button>
      </div>
      <h3>Как выстроить контент-стратегию для B2B-команды</h3>
      <div className="request-meta">
        <span>Гайд</span>
        <span>Средний риск</span>
        <span>обновлено 2 мин назад</span>
      </div>
      <StatusFlow compact />
      <div className="request-bottom">
        <div>
          <small>ТЕКУЩИЙ ЭТАП</small>
          <b>Проверяем факты и источники</b>
        </div>
        <button onClick={() => go("app")}>
          Открыть заявку <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
function PageArt({ kind }) {
  if (kind === "product")
    return (
      <section className="page-art product-art reveal">
        <div className="art-kicker">КАК РАБОТАЕТ ИИ-РЕДАКЦИЯ / 04 РОЛИ</div>
        <div className="product-map">
          {[
            "Исследуем тему",
            "Строим структуру",
            "Готовим текст",
            "Проверяем качество",
          ].map((x, i) => (
            <div key={x}>
              <span>0{i + 1}</span>
              <b>{x}</b>
              <i />
            </div>
          ))}
        </div>
        <p>
          Каждый агент отвечает за свой этап и передаёт результат следующему —
          так контент-план превращается в серию управляемых материалов.
        </p>
      </section>
    );
  if (kind === "how")
    return (
      <section className="page-art how-art reveal">
        <div className="art-kicker">МАРШРУТ МАТЕРИАЛА / ПОШАГОВО</div>
        <div className="route-line">
          {["Спрос", "Темы", "План", "Статья", "Проверка"].map((x, i) => (
            <div key={x}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{x}</b>
            </div>
          ))}
        </div>
        <p>
          На каждом этапе есть понятный результат — поэтому статья движется
          дальше не «на глаз», а после проверки.
        </p>
      </section>
    );
  if (kind === "quality")
    return (
      <section className="page-art quality-art reveal">
        <div className="art-kicker">КОНТРОЛЬ ПЕРЕД ПУБЛИКАЦИЕЙ</div>
        <div className="quality-radar">
          <i />
          <i />
          <i />
          <b>
            <strong>4</strong>
            <small>проверки перед выпуском</small>
          </b>
        </div>
        <div>
          <span>Факты</span>
          <span>Структура</span>
          <span>SEO</span>
          <span>Польза</span>
        </div>
      </section>
    );
  if (kind === "pricing")
    return (
      <section className="page-art pricing-art reveal">
        <div>
          <small>ТЕСТОВЫЙ ПЕРИОД</small>
          <b>07</b>
          <span>
            дней, чтобы пройти
            <br />
            первый цикл работы.
          </span>
        </div>
        <aside>
          <div className="pricing-signal">
            <i />
            <i />
            <i />
          </div>
          <p>
            Объём — по числу
            <br />
            <em>статей в месяц.</em>
          </p>
        </aside>
      </section>
    );
  return (
    <section className="page-art journal-art reveal">
      <div className="art-kicker">ИЗ РЕДАКЦИИ LEXIS</div>
      <div className="journal-line">
        <span>Спрос</span>
        <i />
        <span>Польза</span>
        <i />
        <span>Результат</span>
      </div>
      <p>
        Короткие заметки о том, как планировать контент и делать материалы
        полезными для людей и поиска.
      </p>
    </section>
  );
}
const journalArticles = [
  {
    title: "Почему факт — не ссылка, а ответственность",
    label: "01 · FACTS",
    lead: "Ссылка в черновике ещё не делает утверждение достоверным. Редакционная работа начинается с вопроса: что именно источник подтверждает, в каком контексте и можно ли это честно перенести в материал?",
    sections: [
      [
        "Ссылка не равна доказательству",
        "Один и тот же материал может быть рекламным, устаревшим, вторичным или вырванным из контекста. Поэтому редактору важно не просто сохранить URL, а связать конкретное утверждение с фрагментом источника, датой его снимка и границами применимости.",
      ],
      [
        "У факта есть паспорт",
        "Полезный факт отвечает на четыре вопроса: кто источник, когда информация была актуальна, какую именно мысль она подтверждает и насколько надёжен источник. Такой «паспорт» помогает автору не усиливать формулировку сильнее, чем позволяют данные.",
      ],
      [
        "Ответственность начинается до текста",
        "Если в структуру попадают неподтверждённые цифры, широкие обещания или чужая интерпретация, красивый текст не исправит проблему. Гораздо дешевле остановиться на этапе фактов, чем объяснять после публикации, откуда взялся сомнительный тезис.",
      ],
    ],
    takeaway:
      "Хорошая редакция хранит не коллекцию ссылок, а цепочку оснований для каждого важного решения.",
  },
  {
    title: "Контент-план: как перестать выбирать темы в последний момент",
    label: "02 · SYSTEM",
    lead: "Контент-план нужен не для заполнения таблицы идеями. Его задача — снять ежедневный вопрос «о чём писать?» и связать каждую тему с аудиторией, спросом, продуктовой задачей и местом в системе сайта.",
    sections: [
      [
        "Начните не с списка тем",
        "Сначала определите вопросы аудитории, на которые бизнес действительно может дать полезный и честный ответ. Затем разложите их на хабы и дочерние материалы: так отдельные публикации начинают усиливать друг друга, а не конкурировать за внимание.",
      ],
      [
        "У каждой темы должна быть причина",
        "В рабочем плане у темы есть кластер, роль, волна, ожидаемый эффект и ограничение. Это позволяет не смешивать новости, объясняющие гайды и сравнения в одну неуправляемую очередь.",
      ],
      [
        "План становится маршрутом",
        "Когда тема попадает в очередь, редактор уже знает, что нужно проверить, какие внутренние ссылки существуют и какой результат считается готовым. Работа начинается с решения, а не с пустого документа.",
      ],
    ],
    takeaway:
      "Хороший контент-план превращает выбор темы из импровизации в управляемый маршрут.",
  },
  {
    title: "Что должна проверять AI‑редакция до публикации",
    label: "03 · REVIEW",
    lead: "AI‑редакция полезна не тогда, когда пытается заменить автора, а когда последовательно проверяет то, что человеку легко пропустить в длинном материале: источники, границы утверждений, структуру и читательский вывод.",
    sections: [
      [
        "Сначала правила, потом мнение",
        "Машинная проверка хорошо ловит отсутствие источника, битые ссылки, незаполненные поля, повторяющиеся блоки и нарушения формата. Эти правила должны быть прозрачными: редактору важно видеть не только ошибку, но и её владельца.",
      ],
      [
        "Затем смысловой взгляд",
        "AI‑ревью помогает спросить: отвечает ли материал на заявленный вопрос, не обещает ли больше, чем позволяют факты, нет ли в выводе логического скачка. Это не оценка «хорошо/плохо», а адресные замечания к конкретному блоку.",
      ],
      [
        "Публикация — отдельное решение",
        "Даже прошедший проверки материал не должен публиковаться сам по себе. Финальное подтверждение человека фиксирует ответственность за заголовок, ссылки, контекст и момент выхода.",
      ],
    ],
    takeaway:
      "Сильная AI‑редакция не заменяет редактора — она делает его решения спокойнее, точнее и заметнее.",
  },
];
function JournalArticle({ article, go }) {
  return (
    <main className="journal-article">
      <section className="article-hero reveal">
        <button className="back-link" onClick={() => go("journal")}>
          <ChevronLeft /> К журналу
        </button>
        <small>{article.label} · LEXIS JOURNAL</small>
        <h1>{article.title}</h1>
        <p>{article.lead}</p>
        <div className="article-meta">
          <span>LEXIS EDITORIAL</span>
          <span>6 мин чтения</span>
          <span>18 НОЯБРЯ 2026</span>
        </div>
      </section>
      <article className="journal-paper reveal">
        {article.sections.map(([heading, text], i) => (
          <section key={heading}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2>{heading}</h2>
              <p>{text}</p>
            </div>
          </section>
        ))}
        <blockquote>{article.takeaway}</blockquote>
      </article>
      <section className="article-end reveal">
        <small>LEXIS WORKSPACE</small>
        <b>Системный контент начинается с ясного следующего шага.</b>
        <button className="cta" onClick={() => go("signup")}>
          Попробовать LEXIS <ArrowRight />
        </button>
      </section>
    </main>
  );
}

const legalPages = {
  privacy: {
    eyebrow: "ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ",
    title: "Политика конфиденциальности",
    updated: "Черновик от 25 ноября 2026 года",
    intro: "Этот документ объясняет, какие данные может обрабатывать LEXIS и для каких целей. Он опубликован как рабочая основа до определения юридического лица, страны работы и финального порядка обработки данных.",
    sections: [
      ["Какие данные могут обрабатываться", "При работе с сервисом могут обрабатываться данные, которые вы вводите самостоятельно: имя, рабочий email, название компании, сведения о сайте, нише, продуктах, контент-плане, статьях и настройках команды. Технически могут фиксироваться данные сессии, время входа и действия в рабочем пространстве — это нужно для безопасности и работы сервиса."],
      ["Зачем это нужно", "Данные используются только для создания и ведения рабочего пространства, подготовки материалов, отображения статусов конвейера, поддержки пользователей, защиты аккаунта и улучшения работы сервиса. Мы не продаём данные клиентов и не используем материалы одной компании для доступа другой компании."],
      ["Хранение и доступ", "Доступ к материалам, настройкам и рабочим данным получают только пользователи вашей команды в соответствии со своей ролью и технические системы, необходимые для работы LEXIS. В будущем сроки хранения, место размещения данных и порядок удаления будут зафиксированы в финальной версии документа."],
      ["Ваши обращения", "Вы сможете запросить уточнение, исправление или удаление данных в пределах, разрешённых законом и договорными обязательствами. Контакт для таких обращений будет указан после оформления юридических реквизитов проекта."],
    ],
  },
  terms: {
    eyebrow: "ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ",
    title: "Условия использования",
    updated: "Черновик от 25 ноября 2026 года",
    intro: "Это предварительное описание правил работы с LEXIS. Оно помогает понять назначение сервиса до запуска платного доступа, но не заменяет финальный договор или оферту.",
    sections: [
      ["Назначение сервиса", "LEXIS помогает командам планировать и готовить серии материалов для сайтов: проводить подготовку тем, собирать контент-план, запускать этапы ИИ-конвейера и отслеживать состояние каждой статьи."],
      ["Ответственность за материалы", "ИИ помогает подготовить материал, но не принимает юридически значимые решения за пользователя. Перед публикацией пользователь обязан проверить факты, ссылки, соответствие материала законодательству, правилам площадки, интересам бренда и требованиям своей отрасли."],
      ["Допустимое использование", "Нельзя использовать сервис для нарушения закона, прав третьих лиц, распространения вредоносного кода, спама, вводящей в заблуждение информации или материалов, для которых у пользователя нет необходимых прав. Нельзя пытаться получить доступ к данным других пользователей или нарушить работу платформы."],
      ["Доступ и изменения", "На этапе beta-версии отдельные функции, тарифы и интерфейс могут меняться. О существенных изменениях условий платного доступа пользователи будут уведомляться до их вступления в силу."],
    ],
  },
  payments: {
    eyebrow: "ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ",
    title: "Правила оплаты",
    updated: "Черновик от 25 ноября 2026 года",
    intro: "Страница описывает планируемый порядок оплаты тарифов LEXIS. Сейчас оплата на сайте не подключена: выбор тарифа не списывает деньги и не создаёт обязательств.",
    sections: [
      ["Как будет работать оплата", "Планируется оплата доступа к выбранному тарифу за один месяц через ЮKassa: банковской картой или СБП. Для первой версии пользователь будет продлевать доступ вручную; автоматические списания не предусмотрены."],
      ["Когда предоставляется доступ", "После подключения платежей доступ и лимит статей должны активироваться только после подтверждения успешного платежа платёжным сервисом. Страница успешной оплаты в браузере сама по себе не будет считаться подтверждением."],
      ["Лимиты тарифа", "Каждый тариф будет включать лимит статей на расчётный месяц. Точные правила переноса неиспользованного объёма, приостановки доступа, смены тарифа и корпоративных условий будут опубликованы до запуска продаж."],
      ["Возвраты и документы", "Правила возврата, реквизиты продавца, порядок выдачи чеков и документов зависят от страны, юридического статуса проекта и выбранной модели продаж. Они будут определены и опубликованы до приёма первых платежей."],
    ],
  },
};

function LegalPage({ kind, go }) {
  const page = legalPages[kind];
  return (
    <main className="legal-page">
      <section className="legal-hero reveal">
        <button className="back-link" onClick={() => go("home")}>
          <ChevronLeft /> На главную
        </button>
        <small>{page.eyebrow}</small>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
        <em>{page.updated}</em>
      </section>
      <article className="legal-paper reveal">
        <p className="legal-status">Важно: это информационный черновик. До запуска платежей его нужно адаптировать под юрисдикцию и реквизиты проекта, затем проверить у профильного юриста.</p>
        {page.sections.map(([heading, text], index) => (
          <section key={heading}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><h2>{heading}</h2><p>{text}</p></div>
          </section>
        ))}
      </article>
    </main>
  );
}

function PublicPage({ kind, go }) {
  let p = pages[kind];
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const featureDetails = [
    {
      label: "SEO-АНАЛИЗ НИШИ",
      title: "Статьи начинаются не с нейросети, а с понимания ниши.",
      text: "Перед запуском потока LEXIS помогает определить, что ищет аудитория, какие проблемы она пытается решить и какие темы уже раскрывают конкуренты. Так ИИ-команда получает не случайные идеи, а осмысленный план работы.",
      steps: [
        "Что ищет аудитория",
        "Какие темы уже заняты",
        "Что стоит выпустить первым",
      ],
    },
    {
      label: "КОНТЕНТ-ПЛАН",
      title: "Каждой теме — своё место в системе.",
      text: "До написания видно, какой вопрос читателя решает материал, для какого запроса он нужен и куда поведёт человека дальше. Контент-план становится понятной очередью для команды ИИ-агентов.",
      steps: [
        "Вопрос читателя",
        "План ответа и SEO-поля",
        "Связи с другими страницами",
      ],
    },
    {
      label: "КОНТРОЛЬ КАЧЕСТВА",
      title: "Объём растёт, а качество остаётся под контролем.",
      text: "Агенты качества проверяют факты, ясность, структуру, обязательные элементы и внутренние ссылки. Если что-то не готово, замечание возвращается на нужный этап — проблема не теряется в готовом тексте.",
      steps: [
        "Факты и источники",
        "Понятность и формат",
        "Проверка перед публикацией",
      ],
    },
  ];
  const details = {
    product: {
      label: "ЕДИНАЯ СИСТЕМА ПРОИЗВОДСТВА",
      title: "От поиска темы до готовой статьи — с понятными ролями.",
      items: [
        [
          "01",
          "Находим основу для тем",
          "SEO-анализ ниши показывает, какие вопросы задают потенциальные клиенты и какие темы нужны вашему сайту.",
        ],
        [
          "02",
          "Собираем контент-план",
          "Объединяем темы в контент-план, чтобы материалы не повторялись и усиливали друг друга.",
        ],
        [
          "03",
          "Запускаем ИИ-команду",
          "Агенты создают статьи сериями и проверяют каждую перед публикацией.",
        ],
      ],
    },
    how: {
      label: "КАК ДВИГАЕТСЯ МАТЕРИАЛ",
      title: "У каждого агента — понятная зона ответственности.",
      items: [
        ["Исследователь", "Собирает запросы, факты и вопросы аудитории."],
        ["Редактор", "Определяет логику и порядок раскрытия темы."],
        ["Автор", "Готовит понятный ответ на конкретный вопрос читателя."],
        ["Контроль качества", "Сверяет факты, ясность, SEO-логику и готовность к публикации."],
      ],
    },
    quality: {
      label: "ПРИНЦИП КАЧЕСТВА",
      title: "Сначала польза и ясность. Затем масштаб.",
      items: [
        [
          "01",
          "Спрос",
          "Тема появляется из анализа спроса, а не из случайной идеи.",
        ],
        [
          "02",
          "Ответ",
          "Структура и язык помогают читателю быстро найти понятный и полный ответ.",
        ],
        [
          "03",
          "Контроль",
          "Проверки удерживают качество каждой статьи в серии.",
        ],
      ],
    },
    pricing: {
      label: "ЧТО ВХОДИТ В ПОТОК",
      title: "Вы выбираете объём материалов в месяц.",
      items: [
        ["7 дней", "Тестовый доступ, чтобы посмотреть процесс на своей нише."],
        ["5 статей", "Первая серия: от анализа тем до проверки материалов."],
        ["Объём", "Дальнейший тариф зависит от количества статей в месяц."],
      ],
    },
    journal: {
      label: "ПРАКТИКА РЕДАКЦИИ",
      title: "Хороший контент начинается|с понимания читателя.",
      items: [
        ["Спрос", "Как выбирать темы, которые ищет аудитория."],
        ["Система", "Как контент-план превращается в связанные материалы."],
        ["Качество", "Что проверить, прежде чем статья выйдет на сайт."],
      ],
    },
  }[kind];
  const detail = featureDetails[activeFeature];
  const selectFeature = (i) => setActiveFeature(i);
  const onFeatureKey = (event, i) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectFeature(i);
    }
  };
  return (
    <main className={"public-page public-" + kind}>
      <section className="page-hero reveal">
        <small>{p.eyebrow}</small>
        <h1>{split(p.title)}</h1>
        <p>{p.lead}</p>
        {kind === "how" ? (
          <StatusFlow />
        ) : (
          <button className="cta" onClick={() => go("app")}>
            Посмотреть LEXIS <ArrowRight />
          </button>
        )}
        {kind === "product" && (
          <div className="agent-pulse" aria-hidden="true">
            <div className="agent-pulse-grid" />
            <div className="agent-pulse-route">
              <span>01</span><i /><span>02</span><i /><span>03</span><i /><span>04</span>
            </div>
            <div className="agent-pulse-copy">
              <small>AI EDITORIAL FLOW</small>
              <b>Исследование → текст → проверка</b>
            </div>
          </div>
        )}
      </section>
      <PageArt kind={kind} />
      {kind === "product" && (
        <>
          <section className="feature-grid" aria-label="Этапы SEO-конвейера">
            {p.cards.map(([h, d], i) => (
              <article
                className={
                  "reveal feature-card " +
                  (activeFeature === i ? "selected" : "")
                }
                role="button"
                tabIndex={0}
                key={h}
                onClick={() => selectFeature(i)}
                onKeyDown={(event) => onFeatureKey(event, i)}
                aria-expanded={activeFeature === i}
                aria-controls="feature-detail"
              >
                <span>0{i + 1}</span>
                <h3>{h}</h3>
                <p>{d}</p>
                <ArrowUpRight aria-hidden="true" />
              </article>
            ))}
          </section>
          <section
            className="feature-detail reveal shown"
            id="feature-detail"
            aria-live="polite"
          >
            <div>
              <small>{detail.label}</small>
              <h2>{detail.title}</h2>
              <p>{detail.text}</p>
            </div>
            <ol>
              {detail.steps.map((step, i) => (
                <li key={step}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        </>
      )}
      {kind === "quality" && (
        <section className="checks reveal">
          {[
            "Тема подтверждена анализом спроса",
            "Факты и источники проверены",
            "Структура отвечает на вопрос читателя",
            "Внутренние ссылки уместны",
            "Материал готов к публикации",
          ].map((x) => (
            <div key={x}>
              <Check /> {x}
            </div>
          ))}
        </section>
      )}
      {kind === "pricing" && (
        <>
          <section className="pricing-intro reveal">
            <span>ВСЕ ТАРИФЫ ВКЛЮЧАЮТ SEO-АНАЛИЗ НИШИ</span>
            <p>Темы, контент-план, работа команды ИИ-агентов, контроль качества и личный кабинет. Лимит обновляется каждый месяц после продления.</p>
          </section>
          <section className="pricing-cards reveal" aria-label="Тарифы LEXIS">
            {[
              { id: "start", name: "Старт", price: "4 950 ₽", volume: "до 30 статей в месяц", text: "Чтобы запустить регулярный SEO-контент для одного сайта.", points: ["SEO-анализ ниши", "Контент-план и очередь", "Полный цикл ИИ-агентов"] },
              { id: "growth", name: "Рост", price: "12 450 ₽", volume: "до 50 статей в месяц", text: "Для бизнеса, которому нужен стабильный поток материалов.", points: ["Всё из тарифа «Старт»", "Приоритет в очереди", "Статусы и история статей"], featured: true },
              { id: "scale", name: "Масштаб", price: "24 950 ₽", volume: "до 150 статей в месяц", text: "Для команд и агентств, которые ведут несколько направлений.", points: ["Всё из тарифа «Рост»", "Несколько контент-направлений", "Расширенные роли команды"] },
              { id: "custom", name: "Индивидуальный", price: "По запросу", volume: "от 300 статей в месяц", text: "Для корпоративных команд, агентств и нестандартных процессов.", points: ["Несколько сайтов и проектов", "Индивидуальные правила", "Интеграции и сопровождение"], custom: true },
            ].map((plan) => (
              <article className={(plan.featured ? "featured " : "") + (plan.custom ? "custom-plan" : "")} key={plan.id}>
                {plan.featured && <b className="pricing-badge">ОСНОВНОЙ ВЫБОР</b>}
                <small>{plan.name.toUpperCase()}</small>
                <h2>{plan.price}<em>{plan.custom ? "" : " / месяц"}</em></h2>
                <strong>{plan.volume}</strong>
                <p>{plan.text}</p>
                <ul>{plan.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul>
                <button className={plan.featured ? "cta" : "ghost"} onClick={() => setSelectedPlan(plan)}>
                  {plan.custom ? "Обсудить тариф" : "Выбрать тариф"} <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </section>
          <p className="pricing-note reveal">Без автосписаний: вы самостоятельно продлеваете доступ каждый месяц. Оплата картой и СБП через ЮKassa будет доступна после запуска платёжного контура.</p>
          {selectedPlan && (
            <div className="pricing-dialog-backdrop" role="presentation" onMouseDown={() => setSelectedPlan(null)}>
              <section className="pricing-dialog" role="dialog" aria-modal="true" aria-labelledby="plan-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
                <button className="pricing-dialog-close" onClick={() => setSelectedPlan(null)} aria-label="Закрыть"><X size={18} /></button>
                <small>ВЫБРАН ТАРИФ</small>
                <h2 id="plan-dialog-title">{selectedPlan.name}</h2>
                <p>{selectedPlan.custom ? "Оставьте заявку — подготовим тариф под ваш объём и процессы." : `${selectedPlan.price} в месяц · ${selectedPlan.volume}.`}</p>
                <div className="payment-preview"><span>ЮKassa</span><b>Карты · СБП</b><em>Подключаем оплату</em></div>
                <button className="cta" onClick={() => go("signup")}>Продолжить к заявке <ArrowRight /></button>
                <p className="dialog-note">Сейчас это предварительное оформление: доступ не будет списан автоматически.</p>
              </section>
            </div>
          )}
        </>
      )}
      {kind === "journal" && (
        <section className="journal-grid reveal">
          {journalArticles.map((article, i) => (
            <article key={article.title}>
              <small>{article.label} · ПРАКТИКА РЕДАКЦИИ</small>
              <h3>{article.title}</h3>
              <button onClick={() => go("journal/" + i)}>
                Читать <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </section>
      )}
      <section className="page-deep-dive reveal">
        <div className="deep-head">
          <small>{details.label}</small>
          <h2>{details.title}</h2>
        </div>
        <div className="deep-grid">
          {details.items.map(([n, h, d]) => (
            <article key={h}>
              <span>{n}</span>
              <h3>{h}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <div className="page-cta">
          <div>
            <small>LEXIS WORKSPACE</small>
            <b>
              Запустите первую серию материалов и посмотрите, как система
              работает на темах вашей ниши.
            </b>
          </div>
          <button className="cta" onClick={() => go("signup")}>
            Попробовать бесплатно <ArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
}
const statusLabels = {
  brief_draft: "Бриф создан",
  needs_facts: "Проверяем факты",
  ready_for_structure: "Готово к структуре",
  structuring: "Строим структуру",
  ready_for_writing: "Готово к тексту",
  writing: "Пишем черновик",
  ready_for_assembly: "Готово к сборке",
  assembling: "Собираем материал",
  machine_review: "Проверка качества",
  needs_structure_revision: "Нужна структура",
  needs_writer_revision: "Нужны правки текста",
  llm_review: "AI‑ревью",
  approved: "Готово к публикации",
  published: "Опубликовано",
  monitoring: "Мониторинг",
  blocked: "Заблокировано",
};
const ownerLabels = {
  facts: "проверку фактов",
  structure: "структуру",
  writer: "текст",
  system: "администратору конвейера",
};
const nextStepFor = (status, revision) => {
  if (revision) {
    const owner = ownerLabels[revision.targetOwner] || revision.targetOwner;
    return {
      title: `Доработать ${owner}`,
      description:
        revision.instructions?.join(" ") ||
        "Конвейер передал материал на адресную доработку.",
      tab:
        revision.targetOwner === "facts"
          ? "facts"
          : revision.targetOwner === "structure"
            ? "structure"
            : revision.targetOwner === "writer"
              ? "draft"
              : "history",
    };
  }
  const steps = {
    brief_draft: [
      "Запустить проверку фактов",
      "Конвейер соберёт источники и проверит утверждения.",
      "facts",
    ],
    needs_facts: [
      "Дождаться проверки фактов",
      "Нужны подтверждённые источники и ответы на открытые вопросы.",
      "facts",
    ],
    ready_for_structure: [
      "Построить структуру",
      "Можно запустить следующий этап: конвейер подготовит план статьи.",
      "structure",
    ],
    structuring: [
      "Дождаться структуры",
      "Конвейер формирует логичный план и SEO-поля материала.",
      "structure",
    ],
    ready_for_writing: [
      "Написать черновик",
      "Проверенные факты и структура готовы для автора.",
      "draft",
    ],
    writing: [
      "Дождаться черновика",
      "Автор формирует текст на основе согласованных данных.",
      "draft",
    ],
    ready_for_assembly: [
      "Собрать материал",
      "Можно подготовить инфографику и финальную сборку.",
      "visual",
    ],
    assembling: [
      "Дождаться сборки",
      "Конвейер проверяет состав материала и визуальные слоты.",
      "visual",
    ],
    machine_review: [
      "Дождаться проверки качества",
      "Автоматическая проверка выявит ошибки до ревью.",
      "validation",
    ],
    needs_structure_revision: [
      "Исправить структуру",
      "Замечания отправлены ответственному за структуру.",
      "structure",
    ],
    needs_writer_revision: [
      "Исправить текст",
      "Замечания отправлены автору материала.",
      "draft",
    ],
    llm_review: [
      "Дождаться AI-ревью",
      "Последняя смысловая проверка определит, готов ли материал к публикации.",
      "review",
    ],
    approved: [
      "Опубликовать материал",
      "Материал прошёл проверки и готов к передаче в CMS.",
      "publish",
    ],
    published: [
      "Проверить результат публикации",
      "Материал опубликован; далее начнётся наблюдение за результатом.",
      "publish",
    ],
    monitoring: [
      "Следить за результатами",
      "Материал находится на этапе мониторинга после публикации.",
      "publish",
    ],
    blocked: [
      "Разобрать блокировку",
      "Откройте историю и устраните причину, указанную конвейером.",
      "history",
    ],
  };
  const [title, description, tab] = steps[status] || [
    "Проверить состояние",
    "Статус обновляется из конвейера.",
    "overview",
  ];
  return { title, description, tab };
};
const revisionOwnersForStatus = (status) => {
  const available = {
    brief_draft: ["facts", "system"],
    structuring: ["facts", "structure", "system"],
    writing: ["facts", "system"],
    assembling: ["facts", "structure", "writer", "system"],
    machine_review: ["facts", "structure", "writer", "system"],
    llm_review: ["facts", "structure", "writer", "system"],
    approved: ["facts", "structure", "writer", "system"],
    blocked: ["facts"],
  };
  return available[status] || [];
};
const kindLabels = {
  compare: "Сравнение",
  guide: "Гайд",
  news: "Новость",
  programmatic: "SEO‑страница",
  unknown: "Материал",
};
const requestTitle = (r) =>
  r.brief.inputType === "planned_topic" ? r.brief.title : r.brief.eventSummary;
const requestRow = (r) => ({
  id: r.id,
  title: requestTitle(r),
  status: statusLabels[r.status] || r.status,
  type:
    kindLabels[r.brief.inputType === "news" ? "news" : r.brief.materialKind] ||
    "Материал",
  risk: r.status === "blocked" ? "high" : "low",
  createdAt: r.createdAt,
  updatedAt: r.updatedAt || r.createdAt,
  rawStatus: r.status,
  raw: r,
});
function AppShell({ go }) {
  const [tab, setTab] = useState("overview"),
    [create, setCreate] = useState(false),
    [requests, setRequests] = useState([]),
    [liveRequests, setLiveRequests] = useState([]),
    [loadError, setLoadError] = useState(
      pipelineLiveEnabled
        ? ""
        : "Защищённое подключение к конвейеру ещё не включено. Данные не отображаются, чтобы кабинет не показывал предположения.",
    ),
    [loading, setLoading] = useState(pipelineLiveEnabled),
    [queue, setQueue] = useState([]),
    [selected, setSelected] = useState(null),
    [liveState, setLiveState] = useState(
      pipelineLiveEnabled ? "connecting" : "offline",
    ),
    [lastSync, setLastSync] = useState(null),
    [notification, setNotification] = useState("");
  const previousStatuses = useRef(new Map());
  useEffect(() => {
    if (!pipelineLiveEnabled) return;
    let active = true;
    let refreshing = false;
    const refresh = async () => {
      if (refreshing) return;
      refreshing = true;
      try {
        const [data, queueData] = await Promise.all([
          pipelineApi.listRequests({ pageSize: 100 }),
          pipelineApi.listQueue(),
        ]);
        if (active) {
          const rows = (data.items || []).map(requestRow);
          const changed = rows.find((row) => {
            const previous = previousStatuses.current.get(row.id);
            return (
              previous &&
              previous !== row.rawStatus &&
              [
                "approved",
                "published",
                "needs_structure_revision",
                "needs_writer_revision",
                "blocked",
              ].includes(row.rawStatus)
            );
          });
          previousStatuses.current = new Map(
            rows.map((row) => [row.id, row.rawStatus]),
          );
          setLiveRequests(rows);
          if (changed) {
            setNotification(
              `${changed.title}: ${statusLabels[changed.rawStatus] || changed.rawStatus}.`,
            );
          }
          setQueue(queueData.items || []);
          setLoadError("");
          setLastSync(new Date());
        }
      } catch (e) {
        if (active)
          setLoadError(
            e.status === 401
              ? "Сессия истекла. Войдите снова."
              : "Не удалось обновить данные конвейера.",
          );
      } finally {
        refreshing = false;
        if (active) setLoading(false);
      }
    };
    void refresh();
    const unsubscribe = pipelineApi.subscribe({
      onOpen: () => {
        if (active) {
          setLiveState("online");
          void refresh();
        }
      },
      onEvent: (event) => {
        if (active && event.type !== "heartbeat") void refresh();
      },
      onError: () => {
        if (active) setLiveState("reconnecting");
      },
    });
    const fallback = setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, 15_000);
    return () => {
      active = false;
      unsubscribe();
      clearInterval(fallback);
    };
  }, []);
  const menu = [
    ["overview", LayoutDashboard, "Обзор"],
    ["requests", FileText, "Заявки"],
    ["plan", Layers3, "Контент-план"],
    ["queue", Clock3, "Очередь"],
    ["published", Globe2, "Публикации"],
    ["agents", Sparkles, "ИИ-агенты"],
    ["reports", BarChart3, "Аналитика"],
  ];
  const addRequest = async (brief) => {
    try {
      const result = pipelineLiveEnabled
        ? await pipelineApi.createRequest(brief)
        : {
            item: {
              id: "A-004" + Math.floor(Math.random() * 50 + 3),
              brief,
              status: "brief_draft",
              createdAt: new Date().toISOString(),
            },
          };
      const row = requestRow(result.item);
      if (pipelineLiveEnabled) setLiveRequests((x) => [row, ...x]);
      else setRequests((x) => [row, ...x]);
      setCreate(false);
      setTab("requests");
      return row;
    } catch (e) {
      throw new Error(e.message || "Не удалось создать заявку.");
    }
  };
  const addTopic = async (topic) => {
    if (pipelineLiveEnabled) {
      const result = await pipelineApi.createRequestFromTopic(topic.slug);
      const row = requestRow(result.item);
      setLiveRequests((x) => [row, ...x.filter((item) => item.id !== row.id)]);
      setQueue((x) => (x.includes(topic.slug) ? x : [...x, topic.slug]));
      return row;
    }
    const brief = {
      inputType: "planned_topic",
      title: topic.h1 || topic.question,
      cluster: topic.cluster || "Без кластера",
      materialKind: topic.kind === "compare" ? "compare" : "guide",
      goal: topic.intent || "Создать полезный материал для аудитории.",
      knownFacts: "Тема из контент-плана: " + topic.slug,
      forbiddenMentions: topic.boundary || "",
      internalLinks: topic.url || "",
    };
    await addRequest(brief);
    setQueue((x) => (x.includes(topic.slug) ? x : [...x, topic.slug]));
  };
  const allRequests = pipelineLiveEnabled ? liveRequests : requests;
  const title = create
    ? "Новый материал"
    : selected
      ? selected.title
      : tab === "overview"
        ? "Доброе утро, Мария."
        : menu.find((x) => x[0] === tab)?.[2];
  return (
    <main className="app-shell">
      <aside className="app-nav">
        <Logo go={go} />
        <small>WORKSPACE</small>
        {menu.map(([id, I, label]) => (
          <button
            className={tab === id && !create && !selected ? "selected" : ""}
            key={id}
            onClick={() => {
              setCreate(false);
              setSelected(null);
              setTab(id);
            }}
          >
            <I size={16} />
            {label}
            {id === "requests" && <em>{4 + allRequests.length}</em>}
          </button>
        ))}
        <div className="nav-bottom">
          <button>
            <Globe2 size={16} /> Русский
          </button>
          <button onClick={() => go("home")}>← На сайт</button>
        </div>
      </aside>
      <section className="dashboard">
        <div className="dash-head">
          <div>
            <small>LEXIS / WORKSPACE</small>
            <h1>{title}</h1>
            {pipelineLiveEnabled && (
              <small className={"live-connection " + liveState}>
                <i />
                {liveState === "online"
                  ? "ДАННЫЕ В РЕАЛЬНОМ ВРЕМЕНИ"
                  : liveState === "reconnecting"
                    ? "ПЕРЕПОДКЛЮЧАЕМСЯ · РЕЗЕРВНОЕ ОБНОВЛЕНИЕ"
                    : "ПОДКЛЮЧАЕМ КОНВЕЙЕР"}
                {lastSync &&
                  " · " +
                    lastSync.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
              </small>
            )}
          </div>
          {!create && !selected && (
            <button className="cta" onClick={() => setCreate(true)}>
              <Plus size={17} /> Создать материал
            </button>
          )}
        </div>
        {create ? (
          <NewMaterial cancel={() => setCreate(false)} submit={addRequest} />
        ) : selected ? (
          <RequestDetail request={selected} back={() => setSelected(null)} />
        ) : tab === "overview" ? (
          <Overview setTab={setTab} requests={allRequests} loading={loading} />
        ) : tab === "plan" ? (
          <ContentPlan add={addTopic} queue={queue.map((item) => item.slug)} />
        ) : tab === "queue" ? (
          <ProductionQueue
            queue={queue}
            refreshQueue={async () => {
              const data = await pipelineApi.listQueue();
              setQueue(data.items || []);
            }}
          />
        ) : tab === "requests" ? (
          <Requests
            created={allRequests}
            create={() => setCreate(true)}
            open={setSelected}
            loading={loading}
            error={loadError}
          />
        ) : tab === "published" ? (
          <PublicationTracker
            requests={allRequests}
            loading={loading}
            apiError={loadError}
          />
        ) : tab === "agents" ? (
          <AgentsBoard requests={allRequests} loading={loading} />
        ) : (
          <Placeholder tab={tab} setTab={setTab} />
        )}
        {notification && (
          <div
            className="workspace-notification"
            role="status"
            aria-live="polite"
          >
            <span>{notification}</span>
            <button
              onClick={() => setNotification("")}
              aria-label="Закрыть уведомление"
            >
              <X size={15} />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
const agentStages = [
  {
    id: "orchestrator",
    name: "Оркестратор",
    description:
      "Выбирает следующий безопасный шаг и возвращает материал на нужную доработку.",
    statuses: [
      "brief_draft",
      "needs_facts",
      "ready_for_structure",
      "ready_for_writing",
      "ready_for_assembly",
      "machine_review",
      "llm_review",
      "approved",
    ],
  },
  {
    id: "search",
    name: "Поиск и факты",
    description:
      "Исследует спрос, источники, конкурентные материалы и открытые вопросы.",
    statuses: ["needs_facts"],
  },
  {
    id: "structure",
    name: "Архитектор",
    description:
      "Собирает структуру будущей статьи на основе фактов и задачи читателя.",
    statuses: ["structuring", "needs_structure_revision"],
  },
  {
    id: "writer",
    name: "Автор",
    description: "Готовит черновик по утверждённым фактам и структуре.",
    statuses: ["writing", "needs_writer_revision"],
  },
  {
    id: "visuals",
    name: "Инфографика",
    description: "Готовит проверяемые визуальные слоты для материала.",
    statuses: ["assembling"],
  },
  {
    id: "validator",
    name: "Контроль качества",
    description:
      "Проверяет факты, формат, внутренние ссылки и обязательные элементы.",
    statuses: ["machine_review"],
  },
  {
    id: "reviewer",
    name: "AI-ревьюер",
    description: "Проверяет смысл, границы утверждений и пользу для читателя.",
    statuses: ["llm_review"],
  },
  {
    id: "publisher",
    name: "Публикатор",
    description:
      "Передаёт одобренный материал на сайт и фиксирует отчёт о публикации.",
    statuses: ["approved", "published", "monitoring"],
  },
];
const activeAgentFor = (row) =>
  agentStages.find((agent) =>
    agent.statuses.includes(row.rawStatus || row.raw?.status),
  );
function Overview({ setTab, requests, loading }) {
  const items = requests;
  const inWork = items.filter(
    (row) =>
      !["published", "monitoring", "approved", "blocked"].includes(
        row.rawStatus || row.status,
      ),
  ).length;
  const ready = items.filter((row) =>
    ["approved"].includes(row.rawStatus || row.status),
  ).length;
  const published = items.filter((row) =>
    ["published", "monitoring"].includes(row.rawStatus || row.status),
  ).length;
  const active = items
    .filter(
      (row) =>
        !["published", "monitoring", "approved", "blocked"].includes(
          row.rawStatus || row.status,
        ),
    )
    .slice(0, 4);
  const byAgent = agentStages
    .map((agent) => ({
      ...agent,
      items: items.filter((row) =>
        agent.statuses.includes(row.rawStatus || row.status),
      ),
    }))
    .filter((agent) => agent.items.length);
  return (
    <section className="control-center reveal shown">
      <div className="control-intro">
        <div>
          <small>ПАНЕЛЬ УПРАВЛЕНИЯ</small>
          <h2>
            Контент-производство
            <br />
            <em>на одной панели.</em>
          </h2>
        </div>
        <p>
          Следите за темами недели, текущими исполнителями и публикациями.
          Каждая статья проходит один маршрут — от спроса до отчёта о выходе на
          сайт.
        </p>
      </div>
      <div className="control-stats">
        <article>
          <small>В РАБОТЕ</small>
          <b>{loading ? "—" : String(inWork).padStart(2, "0")}</b>
          <span>материалов в конвейере</span>
        </article>
        <article>
          <small>ГОТОВО К ВЫПУСКУ</small>
          <b>{loading ? "—" : String(ready).padStart(2, "0")}</b>
          <span>прошли все проверки</span>
        </article>
        <article>
          <small>ОПУБЛИКОВАНО</small>
          <b>{loading ? "—" : String(published).padStart(2, "0")}</b>
          <button onClick={() => setTab("published")}>
            Открыть публикации <ArrowRight size={14} />
          </button>
        </article>
      </div>
      <div className="control-grid">
        <section className="control-panel work-panel">
          <div className="panel-head">
            <div>
              <small>СЕЙЧАС В РАБОТЕ</small>
              <h2>Маршрут статей</h2>
            </div>
            <button onClick={() => setTab("requests")}>
              Все статьи <ArrowRight size={15} />
            </button>
          </div>
          {active.length ? (
            active.map((row) => {
              const agent = activeAgentFor(row);
              return (
                <article className="work-item" key={row.id}>
                  <span>
                    {agent?.id === "writer"
                      ? "✎"
                      : agent?.id === "reviewer"
                        ? "◌"
                        : agent?.id === "search"
                          ? "⌕"
                          : "✦"}
                  </span>
                  <div>
                    <small>
                      {row.id} ·{" "}
                      {agent?.name ||
                        statusLabels[row.rawStatus || row.status] ||
                        "В работе"}
                    </small>
                    <b>{row.title}</b>
                    <p>
                      {statusLabels[row.rawStatus || row.status] || row.status}
                    </p>
                  </div>
                  <i />
                </article>
              );
            })
          ) : (
            <div className="control-empty">Нет активных статей.</div>
          )}
        </section>
        <section className="control-panel agent-activity">
          <div className="panel-head">
            <div>
              <small>ИИ-АГЕНТЫ</small>
              <h2>Кто сейчас занят</h2>
            </div>
            <button onClick={() => setTab("agents")}>
              <ArrowUpRight size={16} />
            </button>
          </div>
          {byAgent.length ? (
            byAgent.slice(0, 4).map((agent) => (
              <div className="agent-line" key={agent.id}>
                <span>{agent.name.slice(0, 1)}</span>
                <b>{agent.name}</b>
                <small>
                  {agent.items.length}{" "}
                  {agent.items.length === 1 ? "материал" : "материала"}
                </small>
              </div>
            ))
          ) : (
            <div className="control-empty">Агенты ждут новые темы.</div>
          )}
        </section>
        <section className="control-panel week-panel">
          <div className="panel-head">
            <div>
              <small>ПЛАН НА НЕДЕЛЮ</small>
              <h2>Что пойдёт дальше</h2>
            </div>
            <button onClick={() => setTab("plan")}>
              Контент-план <ArrowRight size={15} />
            </button>
          </div>
          <ol>
            <li>
              <span>01</span>
              <b>Проверить темы по спросу</b>
              <small>Контент-план</small>
            </li>
            <li>
              <span>02</span>
              <b>Запустить первую волну</b>
              <small>Очередь</small>
            </li>
            <li>
              <span>03</span>
              <b>Проверить материалы перед выпуском</b>
              <small>Качество</small>
            </li>
          </ol>
        </section>
      </div>
      <section className="control-next">
        <div>
          <small>СЛЕДУЮЩИЙ ШАГ</small>
          <b>
            Добавьте тему из контент-плана — конвейер создаст заявку и
            зафиксирует маршрут статьи.
          </b>
        </div>
        <button className="cta" onClick={() => setTab("plan")}>
          Открыть контент-план <ArrowRight />
        </button>
      </section>
    </section>
  );
}
function AgentsBoard({ requests, loading }) {
  const items = requests;
  return (
    <section className="agents-page reveal shown">
      <div className="agents-head">
        <div>
          <small>КАРТА КОНВЕЙЕРА</small>
          <h2>
            ИИ-агенты
            <br />
            <em>и их зона ответственности.</em>
          </h2>
          <p>
            Агенты не пишут текст изолированно: каждый получает результат
            предыдущего этапа и возвращает материал на доработку, если проверка
            не пройдена.
          </p>
        </div>
        <span className="topic-status">
          {loading ? "ОБНОВЛЯЕМ" : "СОСТОЯНИЕ ОНЛАЙН"}
        </span>
      </div>
      <div className="agent-board">
        {agentStages.map((agent, index) => {
          const assigned = items.filter((row) =>
            agent.statuses.includes(row.rawStatus || row.status),
          );
          const isActive = assigned.some(
            (row) =>
              !["published", "monitoring", "approved"].includes(
                row.rawStatus || row.status,
              ),
          );
          return (
            <article className={isActive ? "active" : ""} key={agent.id}>
              <div className="agent-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i className={isActive ? "online" : ""} />
              </div>
              <h3>{agent.name}</h3>
              <p>{agent.description}</p>
              <div>
                <b>{assigned.length}</b>
                <small>
                  {assigned.length === 1
                    ? "материал на этапе"
                    : "материалов на этапе"}
                </small>
              </div>
            </article>
          );
        })}
      </div>
      <section className="agent-route">
        <small>КАК СТАТЬЯ ДВИЖЕТСЯ ПО СИСТЕМЕ</small>
        <div>
          {[
            "Спрос и факты",
            "Структура",
            "Черновик",
            "Контроль",
            "AI‑ревью",
            "Публикация",
          ].map((step, index) => (
            <span key={step}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              {step}
            </span>
          ))}
        </div>
      </section>
    </section>
  );
}
function NewMaterial({ cancel, submit }) {
  const [mode, setMode] = useState(null),
    [step, setStep] = useState(0),
    [value, setValue] = useState(""),
    [answers, setAnswers] = useState([]),
    [saving, setSaving] = useState(false),
    [error, setError] = useState("");
  const planned = [
    ["Рабочее название", "Например: Как построить контент-стратегию для B2B"],
    ["Поисковый кластер", "Например: контент-стратегия B2B"],
    ["Тип материала", "guide"],
    ["Зачем этот материал бизнесу?", "Опишите желаемый результат"],
    ["Что уже известно?", "Факты, ссылки или «пока ничего»"],
    ["Что нельзя упоминать?", "Ограничения, конкуренты, стоп-темы"],
    ["Предпочтительные внутренние ссылки", "/guides · /cases · /product"],
  ];
  const news = [
    ["Ссылка на источник новости", "https://"],
    ["Что произошло?", "Коротко опишите событие"],
    [
      "Почему это важно аудитории?",
      "Продажи, обучение, найм или клиентский сервис",
    ],
    ["Нужно ли упоминать конкурентов?", "Если да — кого именно"],
    ["Желаемый срок публикации", "Например: до 22 ноября"],
  ];
  const fields = mode === "news" ? news : planned;
  const current = fields[step];
  const materialKind = {
    Гайд: "guide",
    Сравнение: "compare",
    "SEO‑страница": "programmatic",
    "Не знаю": "unknown",
  };
  const next = async () => {
    const complete = [...answers, value];
    if (step < fields.length - 1) {
      setAnswers(complete);
      setStep((x) => x + 1);
      setValue("");
      return;
    }
    const brief =
      mode === "news"
        ? {
            inputType: "news",
            sourceUrl: complete[0],
            eventSummary: complete[1],
            relevance: complete[2],
            competitorMentions: complete[3],
            deadline: complete[4],
          }
        : {
            inputType: "planned_topic",
            title: complete[0],
            cluster: complete[1],
            materialKind: materialKind[complete[2]] || "unknown",
            goal: complete[3],
            knownFacts: complete[4],
            forbiddenMentions: complete[5],
            internalLinks: complete[6],
          };
    setSaving(true);
    setError("");
    try {
      await submit(brief);
    } catch (e) {
      setError(e.message || "Не удалось сохранить заявку.");
    } finally {
      setSaving(false);
    }
  };
  if (!mode)
    return (
      <section className="new-material reveal shown">
        <button className="back-link" onClick={cancel}>
          <ChevronLeft /> Назад к обзору
        </button>
        <small>НОВАЯ ЗАЯВКА</small>
        <h2>
          Что сегодня
          <br />
          запускаем?
        </h2>
        <p>
          Выберите точку входа. LEXIS соберёт правильный бриф и проведёт
          материал по этапам.
        </p>
        <div className="start-types">
          <button onClick={() => setMode("planned")}>
            <PenTool />
            <span>
              <b>Тема из плана</b>
              <small>Готовая SEO‑тема, кластер и логика публикации</small>
            </span>
            <ArrowRight />
          </button>
          <button onClick={() => setMode("own")}>
            <Sparkles />
            <span>
              <b>Своя тема</b>
              <small>Материал по вашей задаче, аудитории и бизнес‑цели</small>
            </span>
            <ArrowRight />
          </button>
          <button onClick={() => setMode("news")}>
            <Zap />
            <span>
              <b>Новостной повод</b>
              <small>
                Событие, которое нужно быстро превратить в полезный материал
              </small>
            </span>
            <ArrowRight />
          </button>
        </div>
      </section>
    );
  return (
    <section className="brief-form reveal shown">
      <button
        className="back-link"
        onClick={() => {
          if (step) {
            setStep((x) => x - 1);
            setValue(answers[step - 1] || "");
            setAnswers((x) => x.slice(0, -1));
          } else setMode(null);
        }}
      >
        <ChevronLeft /> {step ? "Предыдущий вопрос" : "Изменить тип заявки"}
      </button>
      <div className="form-progress">
        <span style={{ width: ((step + 1) / fields.length) * 100 + "%" }} />
      </div>
      <small>
        {mode === "news" ? "НОВОСТНОЙ МАТЕРИАЛ" : "БРИФ МАТЕРИАЛА"} ·{" "}
        {String(step + 1).padStart(2, "0")} /{" "}
        {String(fields.length).padStart(2, "0")}
      </small>
      <h2>{current[0]}</h2>
      <p>
        Это поле станет частью структурированного брифа для редакционного
        конвейера.
      </p>
      {current[1] === "guide" ? (
        <div className="kind-select">
          {["Гайд", "Сравнение", "SEO‑страница", "Не знаю"].map((x, i) => (
            <button
              className={value === x ? "picked" : ""}
              key={x}
              onClick={() => setValue(x)}
            >
              <b>{x}</b>
              <small>
                {i === 0
                  ? "Объясняет тему и помогает сделать выбор"
                  : "LEXIS уточнит формат после проверки фактов"}
              </small>
              <i>{value === x && <Check />}</i>
            </button>
          ))}
        </div>
      ) : (
        <textarea
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={current[1]}
        />
      )}{" "}
      {error && <p className="form-error">{error}</p>}
      <div className="form-actions">
        <button className="ghost" onClick={cancel}>
          Сохранить и выйти
        </button>
        <button
          className="cta"
          disabled={!value.trim() || saving}
          onClick={next}
        >
          {saving
            ? "Сохраняем…"
            : step === fields.length - 1
              ? "Создать заявку"
              : "Продолжить"}{" "}
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}
function ContentPlan({ add, queue }) {
  const [q, setQ] = useState(""),
    [wave, setWave] = useState("all"),
    [selected, setSelected] = useState([]),
    [topics, setTopics] = useState([]),
    [loading, setLoading] = useState(pipelineLiveEnabled),
    [error, setError] = useState(""),
    [adding, setAdding] = useState("");
  useEffect(() => {
    if (!pipelineLiveEnabled) return;
    pipelineApi
      .listTopics()
      .then((data) => setTopics(data.items || []))
      .catch((e) =>
        setError(
          e.status === 401
            ? "Сессия истекла. Войдите снова."
            : "Не удалось загрузить контент‑план.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);
  const source = topics;
  const found = source.filter(
    (x) =>
      (wave === "all" || String(x.wave) === wave) &&
      [x.question, x.cluster, x.slug]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  const toggle = (s) =>
    setSelected((a) => (a.includes(s) ? a.filter((x) => x !== s) : [...a, s]));
  const addOne = async (topic) => {
    setAdding(topic.slug);
    setError("");
    try {
      await add(topic);
      setSelected((x) => x.filter((s) => s !== topic.slug));
    } catch (e) {
      setError(e.message || "Не удалось создать заявку из темы.");
    } finally {
      setAdding("");
    }
  };
  const selectedTopics = source.filter((x) => selected.includes(x.slug));
  return (
    <section className="plan-page reveal shown">
      <div className="page-controls">
        <div className="search">
          <Search size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск по теме или кластеру"
          />
        </div>
        <div className="filters">
          <Filter size={15} />
          {["all", "1", "2", "3"].map((x) => (
            <button
              className={wave === x ? "on" : ""}
              onClick={() => setWave(x)}
              key={x}
            >
              {x === "all" ? "Все волны" : "Волна " + x}
            </button>
          ))}
        </div>
      </div>
      <div className="plan-intro">
        <div>
          <small>
            {loading ? "ЗАГРУЖАЕМ ТЕМЫ" : source.length + " ГОТОВЫХ ТЕМ"}
          </small>
          <h2>
            Контент‑план
            <br />
            <em>в движении.</em>
          </h2>
        </div>
        <p>
          Выбирайте темы по спросу и волне. Хабы публикуются раньше дочерних
          статей — так внутренняя структура сайта остаётся целой.
        </p>
      </div>
      {pipelineLiveEnabled && (
        <div className={error ? "api-state error" : "api-state"}>
          {error || "Контент‑план получен из защищённого конвейера"}
        </div>
      )}
      <div className="selection-bar">
        <span>
          Выбрано: <b>{selected.length}</b>
        </span>
        <button className="ghost" onClick={() => setSelected([])}>
          Сбросить
        </button>
        <button
          className="cta"
          disabled={!selected.length || Boolean(adding)}
          onClick={async () => {
            for (const topic of selectedTopics) await addOne(topic);
          }}
        >
          {adding ? "Добавляем…" : "Добавить выбранные"} <ArrowRight />
        </button>
      </div>
      <div className="topic-table">
        <div className="topic-head">
          <span />
          <span>ТЕМА</span>
          <span>СПРОС</span>
          <span>ВОЛНА</span>
          <span>СТАТУС</span>
          <span />
        </div>
        {found.map((topic) => (
          <div className="topic-row" key={topic.slug}>
            <button
              className={
                "select-box " + (selected.includes(topic.slug) ? "checked" : "")
              }
              onClick={() => toggle(topic.slug)}
            >
              {selected.includes(topic.slug) && <Check size={13} />}
            </button>
            <div>
              <b>{topic.question}</b>
              <small>
                {topic.slug.replace(/-/g, " ")} · {topic.kind || "гайд"} ·{" "}
                {topic.role === "hub" ? "Хаб" : "Статья"}
              </small>
            </div>
            <span>
              {topic.demand?.shows
                ? Number(topic.demand.shows).toLocaleString("ru-RU")
                : "—"}
            </span>
            <span>
              <i className={"wave w" + (topic.wave || 3)} /> {topic.wave || "—"}
            </span>
            <span className="topic-status">
              {queue.includes(topic.slug) ? "В очереди" : "Доступна"}
            </span>
            <button
              className="row-add"
              disabled={Boolean(adding)}
              onClick={() => addOne(topic)}
            >
              {adding === topic.slug ? (
                <Clock3 size={16} />
              ) : (
                <Plus size={16} />
              )}
            </button>
          </div>
        ))}
        {!loading && !found.length && (
          <div className="no-results">По этому запросу тем нет.</div>
        )}
      </div>
    </section>
  );
}
function ProductionQueue({ queue, refreshQueue }) {
  const [error, setError] = useState(""),
    [busy, setBusy] = useState("");
  const shown = queue;
  const act = async (key, work) => {
    setBusy(key);
    setError("");
    try {
      await work();
      await refreshQueue?.();
    } catch (e) {
      setError(e.message || "Не удалось обновить очередь.");
    } finally {
      setBusy("");
    }
  };
  return (
    <section className="queue-page reveal shown">
      <div className="queue-intro">
        <div>
          <small>ПОСЛЕДОВАТЕЛЬНЫЙ ПРОГОН</small>
          <h2>
            Очередь
            <br />
            <em>производства.</em>
          </h2>
        </div>
        <p>
          Управляйте порядком и статусами заявок. Запуск останавливается на
          согласовании: публикация всегда требует отдельного подтверждения.
        </p>
      </div>
      {pipelineLiveEnabled && (
        <div className={error ? "api-state error" : "api-state"}>
          {error || "Реальная очередь конвейера"}
        </div>
      )}
      <div className="queue-status">
        <span>
          <i /> Ручное управление включено
        </span>
        <button
          className="ghost"
          disabled={
            !shown.some((item) => item.status === "pending") || Boolean(busy)
          }
          onClick={() => act("run", () => pipelineApi.runQueue(1))}
        >
          {busy === "run" ? "Запускаем…" : "Запустить следующую"} <Play />
        </button>
      </div>
      {shown.length ? (
        <div className="queue-list">
          {shown.map((item, i) => (
            <article
              key={item.requestId}
              className={item.status === "running" ? "now" : ""}
            >
              <div className="queue-number">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="queue-title">
                <small>
                  {item.status === "running"
                    ? "В РАБОТЕ"
                    : item.status === "blocked"
                      ? "БЛОКИРОВКА"
                      : item.status === "done"
                        ? "ГОТОВО"
                        : "ОЖИДАЕТ"}
                </small>
                <h3>{item.title}</h3>
                <p>
                  {item.slug} · обновлено{" "}
                  {item.updatedAt
                    ? new Date(item.updatedAt).toLocaleString("ru-RU")
                    : "время не указано"}
                </p>
              </div>
              {item.status === "running" && (
                <div className="queue-progress">
                  <i />
                  <span>Обработка выполняется конвейером</span>
                </div>
              )}
              <div className="queue-actions">
                {item.status === "pending" && (
                  <button
                    disabled={Boolean(busy)}
                    onClick={() =>
                      act("pause-" + item.requestId, () =>
                        pipelineApi.updateQueue(item.requestId, {
                          status: "blocked",
                          note: "Приостановлено редактором.",
                        }),
                      )
                    }
                  >
                    Пауза
                  </button>
                )}
                {item.status === "blocked" && (
                  <button
                    disabled={Boolean(busy)}
                    onClick={() =>
                      act("resume-" + item.requestId, () =>
                        pipelineApi.updateQueue(item.requestId, {
                          status: "pending",
                          note: "Возобновлено редактором.",
                        }),
                      )
                    }
                  >
                    Возобновить
                  </button>
                )}
                {item.status !== "running" && item.status !== "done" && (
                  <button
                    disabled={Boolean(busy)}
                    onClick={() =>
                      act("remove-" + item.requestId, () =>
                        pipelineApi.removeFromQueue(item.requestId),
                      )
                    }
                  >
                    Убрать
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-queue">
          <Layers3 />
          <h3>Очередь пока пуста</h3>
          <p>В настоящий момент в конвейере нет тем в очереди.</p>
        </div>
      )}
      <div className="queue-note">
        <ShieldCheck />
        <p>
          Очередь не публикует статьи автоматически: она доводит материал до
          статуса «готово к публикации», после чего нужно отдельное
          подтверждение.
        </p>
      </div>
    </section>
  );
}
function Requests({ created, create, open, loading, error }) {
  const [query, setQuery] = useState(""),
    [filter, setFilter] = useState("Все");
  const source = created;
  const rows = source.filter(
    (x) =>
      (filter === "Все" || x.status === filter) &&
      x.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className="requests-page reveal shown">
      <div className="request-filter">
        <div className="search">
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Найти заявку"
          />
        </div>
        <button className="ghost">
          <Filter size={15} /> Фильтры
        </button>
        <button className="cta" onClick={create}>
          <Plus size={16} /> Новая заявка
        </button>
      </div>
      {pipelineLiveEnabled && (
        <div className={error ? "api-state error" : "api-state"}>
          {loading
            ? "Подключаемся к защищённому конвейеру…"
            : error || "Защищённое подключение к конвейеру активно"}
        </div>
      )}
      <div className="status-filters">
        {[
          "Все",
          "Проверяем факты",
          "Пишем черновик",
          "AI‑ревью",
          "Заблокировано",
          "Бриф создан",
        ].map((x) => (
          <button
            className={filter === x ? "active" : ""}
            onClick={() => setFilter(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="request-list">
        <div className="request-list-head">
          <span>МАТЕРИАЛ</span>
          <span>СТАТУС</span>
          <span>РИСК</span>
          <span />
        </div>
        {rows.map((row) => (
          <article key={row.id} onClick={() => open(row)}>
            <span className="doc-square">✦</span>
            <div>
              <b>{row.title}</b>
              <small>
                {row.id} · {row.type} ·{" "}
                {row.createdAt
                  ? new Date(row.createdAt).toLocaleString("ru-RU")
                  : "обновлено недавно"}
              </small>
            </div>
            <span
              className={
                "req-status " + row.status.replaceAll(" ", "-").toLowerCase()
              }
            >
              {row.status}
            </span>
            <span className={"risk " + row.risk}>
              {row.risk === "high"
                ? "Высокий"
                : row.risk === "medium"
                  ? "Средний"
                  : "Низкий"}
            </span>
            <button>
              <ChevronRight />
            </button>
          </article>
        ))}
        {!loading && !rows.length && (
          <div className="no-results">
            В защищённом конвейере пока нет заявок. Создайте первую.
          </div>
        )}
      </div>
    </section>
  );
}
function publicationFromArtifacts(payload) {
  const root =
    payload?.publication ||
    payload?.publish ||
    payload?.artifacts?.publication ||
    payload?.artifacts?.publish ||
    payload ||
    {};
  return {
    url:
      root.url || root.publishedUrl || root.publicUrl || root.result?.url || "",
    publishedAt: root.publishedAt || root.createdAt || root.updatedAt || "",
    summary: root.summary || root.message || root.title || "",
    statusCode: root.statusCode || root.httpStatus || "",
  };
}
function PublicationTracker({ requests, loading, apiError }) {
  const [reports, setReports] = useState({}),
    [loadingReports, setLoadingReports] = useState(false),
    [error, setError] = useState("");
  const published = requests
    .filter((row) =>
      ["published", "monitoring"].includes(row.rawStatus || row.raw?.status),
    )
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || 0) -
        new Date(a.updatedAt || a.createdAt || 0),
    );
  const publishedKey = published.map((row) => row.id).join(",");
  useEffect(() => {
    let active = true;
    if (!pipelineLiveEnabled || !publishedKey)
      return () => {
        active = false;
      };
    setLoadingReports(true);
    Promise.all(
      published.map(async (row) => {
        try {
          const data = await pipelineApi.getArtifacts(row.id);
          return [row.id, publicationFromArtifacts(data.item || data)];
        } catch {
          return [row.id, {}];
        }
      }),
    )
      .then((entries) => {
        if (active) setReports(Object.fromEntries(entries));
      })
      .catch(() => {
        if (active) setError("Не удалось загрузить отчёты о публикации.");
      })
      .finally(() => {
        if (active) setLoadingReports(false);
      });
    return () => {
      active = false;
    };
  }, [publishedKey]);
  const shown = published;
  return (
    <section className="publications-page reveal shown">
      <div className="publication-tracker-head">
        <div>
          <small>ПУБЛИКАЦИИ / READ ONLY</small>
          <h2>
            Вышедшие
            <br />
            материалы.
          </h2>
          <p>
            Здесь видны только статьи, для которых конвейер зафиксировал
            публикацию или начал мониторинг. Ссылка появляется только после
            подтверждения от конвейера.
          </p>
        </div>
        <span className="topic-status">
          {loading || loadingReports ? "ОБНОВЛЯЕМ" : "АКТУАЛЬНО"}
        </span>
      </div>
      {pipelineLiveEnabled && (
        <div className={apiError || error ? "api-state error" : "api-state"}>
          {loading || loadingReports
            ? "Загружаем данные из конвейера…"
            : apiError ||
              error ||
              "Данные о публикациях получены из защищённого конвейера"}
        </div>
      )}
      <div className="publication-summary">
        <article>
          <small>ВЫШЛО МАТЕРИАЛОВ</small>
          <b>{shown.length}</b>
          <span>за всё время</span>
        </article>
        <article>
          <small>МОНИТОРИНГ</small>
          <b>
            {
              shown.filter(
                (row) => (row.rawStatus || row.raw?.status) === "monitoring",
              ).length
            }
          </b>
          <span>после публикации</span>
        </article>
      </div>
      <div className="publication-feed">
        {shown.map((row) => {
          const report = reports[row.id] || {};
          const date = report.publishedAt || row.updatedAt || row.createdAt;
          const monitored = (row.rawStatus || row.raw?.status) === "monitoring";
          return (
            <article key={row.id}>
              <div className="publication-mark">
                <Check size={17} />
              </div>
              <div className="publication-info">
                <small>
                  {row.id} · {row.type?.toUpperCase() || "МАТЕРИАЛ"}
                </small>
                <h3>{row.title || "Материал без названия"}</h3>
                <p>
                  {report.summary ||
                    "Публикация подтверждена конвейером. Материал доступен для дальнейшего мониторинга."}
                </p>
                <span>
                  {date
                    ? new Date(date).toLocaleString("ru-RU")
                    : "Дата публикации уточняется"}
                </span>
              </div>
              <div className="publication-state">
                <b>{monitored ? "НА МОНИТОРИНГЕ" : "ОПУБЛИКОВАНО"}</b>
                {report.statusCode && <small>HTTP {report.statusCode}</small>}
                {report.url ? (
                  <a href={report.url} target="_blank" rel="noreferrer">
                    Открыть статью <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <span>Ссылка появится после отчёта</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {!loading && !loadingReports && !shown.length && (
        <div className="published-empty">
          <Globe2 />
          <h3>Пока нет опубликованных материалов</h3>
          <p>
            Как только конвейер подтвердит публикацию статьи, она появится в
            этой ленте.
          </p>
        </div>
      )}
    </section>
  );
}
function RequestDetail({ request, back }) {
  const [view, setView] = useState("overview"),
    [live, setLive] = useState(request.raw || null),
    [artifacts, setArtifacts] = useState(null),
    [loading, setLoading] = useState(pipelineLiveEnabled),
    [error, setError] = useState(""),
    [running, setRunning] = useState(false),
    [confirming, setConfirming] = useState(false),
    [runningAll, setRunningAll] = useState(false),
    [publishing, setPublishing] = useState(false),
    [revisionOpen, setRevisionOpen] = useState(false),
    [revisionOwner, setRevisionOwner] = useState("writer"),
    [revisionNote, setRevisionNote] = useState(""),
    [routing, setRouting] = useState(false),
    [preview, setPreview] = useState(null),
    [previewLoading, setPreviewLoading] = useState(false),
    [notice, setNotice] = useState("");
  useEffect(() => {
    if (!pipelineLiveEnabled || request.raw) return;
    pipelineApi
      .getRequest(request.id)
      .then((data) => setLive(data.item))
      .catch(() => setError("Не удалось загрузить актуальные данные заявки."))
      .finally(() => setLoading(false));
  }, [request]);
  useEffect(() => {
    if (!pipelineLiveEnabled) return;
    pipelineApi
      .getArtifacts(request.id)
      .then((data) => setArtifacts(data.item))
      .catch(() => setError("Не удалось загрузить артефакты заявки."));
  }, [request.id]);
  const current = live ? requestRow(live) : request;
  const canRun =
    pipelineLiveEnabled &&
    live &&
    !["approved", "published", "monitoring", "blocked"].includes(live.status);
  const runNext = async () => {
    setRunning(true);
    setError("");
    try {
      const result = await pipelineApi.runNext(current.id);
      setLive(result.item);
      const latest = await pipelineApi.getArtifacts(current.id);
      setArtifacts(latest.item);
      setConfirming(false);
    } catch (e) {
      setError(e.message || "Не удалось запустить этап.");
    } finally {
      setRunning(false);
    }
  };
  const runAll = async () => {
    setRunningAll(true);
    setError("");
    try {
      const result = await pipelineApi.runUntilIdle(current.id);
      setLive(result.item);
      const latest = await pipelineApi.getArtifacts(current.id);
      setArtifacts(latest.item);
    } catch (e) {
      setError(e.message || "Не удалось выполнить полный прогон.");
    } finally {
      setRunningAll(false);
    }
  };
  const publish = async () => {
    setPublishing(true);
    setError("");
    try {
      const result = await pipelineApi.publish(current.id);
      setLive(result.item);
      const latest = await pipelineApi.getArtifacts(current.id);
      setArtifacts(latest.item);
      setNotice("Публикация запущена. Отчёт появится во вкладке «Публикация».");
    } catch (e) {
      setError(e.message || "Не удалось опубликовать материал.");
    } finally {
      setPublishing(false);
    }
  };
  const refreshArtifacts = async () => {
    const latest = await pipelineApi.getArtifacts(current.id);
    setArtifacts(latest.item);
  };
  const routeRevision = async () => {
    if (!revisionNote.trim()) {
      setError(
        "Опишите, что нужно исправить, прежде чем отправлять материал на доработку.",
      );
      return;
    }
    setRouting(true);
    setError("");
    try {
      const result = await pipelineApi.routeRevision(current.id, {
        owner: revisionOwner,
        note: revisionNote.trim(),
      });
      setLive(result.item);
      await refreshArtifacts();
      setRevisionOpen(false);
      setRevisionNote("");
      setNotice(
        `Материал отправлен на доработку: ${ownerLabels[revisionOwner] || revisionOwner}.`,
      );
    } catch (e) {
      setError(e.message || "Не удалось направить материал на доработку.");
    } finally {
      setRouting(false);
    }
  };
  const openPreview = async () => {
    setPreviewLoading(true);
    setError("");
    try {
      setPreview(await pipelineApi.getPublicationPreview(current.id));
    } catch (e) {
      setError(e.message || "Не удалось подготовить предпросмотр публикации.");
    } finally {
      setPreviewLoading(false);
    }
  };
  const revisionOwners = live ? revisionOwnersForStatus(live.status) : [];
  const tabs = [
    ["overview", "Обзор"],
    ["brief", "Бриф"],
    ["facts", "Факты"],
    ["structure", "Структура"],
    ["draft", "Черновик"],
    ["visual", "Инфографика"],
    ["validation", "Проверка"],
    ["review", "AI‑ревью"],
    ["history", "История"],
    ["publish", "Публикация"],
  ];
  return (
    <section className="request-detail reveal shown">
      <button className="back-link" onClick={back}>
        <ChevronLeft /> К списку заявок
      </button>
      <div className="detail-top">
        <div>
          <small>
            {current.id} · {current.type?.toUpperCase()}
          </small>
          <h2>{current.title}</h2>
          <div className="detail-tags">
            <span
              className={
                "req-status " +
                current.status.replaceAll(" ", "-").toLowerCase()
              }
            >
              {current.status}
            </span>
            <span className={"risk " + current.risk}>
              {current.risk === "high"
                ? "Высокий риск"
                : current.risk === "medium"
                  ? "Средний риск"
                  : "Низкий риск"}
            </span>
            <span>
              {current.createdAt
                ? new Date(current.createdAt).toLocaleDateString("ru-RU")
                : "Создано сегодня"}
            </span>
          </div>
        </div>
        <div className="detail-actions">
          <button className="ghost" aria-label="Дополнительные действия">
            <MoreHorizontal size={18} />
          </button>
          <button
            className="cta"
            disabled={!canRun || running}
            onClick={() => setConfirming(true)}
          >
            {running ? "Запускаем…" : "Запустить следующий этап"} <ArrowRight />
          </button>
          {pipelineLiveEnabled && canRun && (
            <button
              className="ghost"
              disabled={runningAll || running}
              onClick={runAll}
            >
              {runningAll ? "Выполняем…" : "До согласования"}
            </button>
          )}
          {pipelineLiveEnabled && live?.status === "approved" && (
            <button className="cta" disabled={publishing} onClick={publish}>
              {publishing ? "Публикуем…" : "Опубликовать"} <ArrowRight />
            </button>
          )}
          {pipelineLiveEnabled && artifacts?.draft && (
            <button
              className="ghost"
              disabled={previewLoading}
              onClick={openPreview}
            >
              {previewLoading ? "Готовим…" : "Предпросмотр"}
            </button>
          )}
          {pipelineLiveEnabled && revisionOwners.length > 0 && (
            <button
              className="ghost"
              onClick={() => {
                setRevisionOwner(revisionOwners[0]);
                setRevisionOpen(true);
              }}
            >
              На доработку
            </button>
          )}
        </div>
      </div>
      {confirming && (
        <div className="run-confirm">
          <div>
            <small>ПОДТВЕРЖДЕНИЕ ЗАПУСКА</small>
            <b>Запустить один следующий этап для {current.id}?</b>
            <p>
              Запуск создаст или обновит артефакты конвейера. Публикация через
              этот маршрут недоступна.
            </p>
          </div>
          <button className="ghost" onClick={() => setConfirming(false)}>
            Отмена
          </button>
          <button className="cta" disabled={running} onClick={runNext}>
            Подтверждаю запуск <ArrowRight />
          </button>
        </div>
      )}
      {loading && (
        <div className="api-state">Загружаем защищённую карточку…</div>
      )}
      {error && <div className="api-state error">{error}</div>}
      {notice && (
        <div className="api-state success" role="status">
          {notice}
        </div>
      )}
      {revisionOpen && (
        <section className="revision-form" aria-label="Отправить на доработку">
          <div>
            <small>ВОЗВРАТ НА ДОРАБОТКУ</small>
            <b>Кому направить замечание</b>
            <p>
              Конвейер сохранит причину и переведёт статью на соответствующий
              этап.
            </p>
          </div>
          <label>
            Исполнитель
            <select
              value={revisionOwner}
              onChange={(event) => setRevisionOwner(event.target.value)}
            >
              {revisionOwners.map((owner) => (
                <option key={owner} value={owner}>
                  {ownerLabels[owner] || owner}
                </option>
              ))}
            </select>
          </label>
          <label>
            Что исправить
            <textarea
              value={revisionNote}
              onChange={(event) => setRevisionNote(event.target.value)}
              placeholder="Например: уточнить источники в разделе о ценах"
            />
          </label>
          <div className="revision-actions">
            <button className="ghost" onClick={() => setRevisionOpen(false)}>
              Отмена
            </button>
            <button className="cta" disabled={routing} onClick={routeRevision}>
              {routing ? "Отправляем…" : "Отправить"}
            </button>
          </div>
        </section>
      )}
      <div className="detail-flow">
        <StatusFlow />
        <div className="flow-note">
          <span className="status-dot" />
          <b>Сейчас: {current.status}</b>
          <small>
            Запуск защищён подтверждением, токеном сессии и ограничением
            повторных вызовов.
          </small>
        </div>
      </div>
      <div className="detail-tabs">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            className={view === id ? "selected" : ""}
            onClick={() => setView(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="detail-content">
        {view === "overview" ? (
          <RequestOverview
            setView={setView}
            request={live}
            artifacts={artifacts}
          />
        ) : view === "brief" ? (
          <BriefView request={live} onSaved={setLive} />
        ) : (
          <ArtifactView
            type={view}
            artifacts={artifacts}
            requestId={current.id}
          />
        )}
      </div>
      {preview && (
        <PublicationPreview preview={preview} close={() => setPreview(null)} />
      )}
    </section>
  );
}
function RequestOverview({ setView, request, artifacts }) {
  const facts = artifacts?.facts;
  const revision = artifacts?.revision;
  const nextStep = nextStepFor(request?.status, revision);
  const latestNote =
    request?.notes?.at(-1) || "Конвейер ещё не зафиксировал событий.";
  const artifactStates = [
    ["Бриф", request ? "ready" : ""],
    ["Факты", facts ? "ready" : ""],
    ["Структура", artifacts?.structure ? "ready" : ""],
    ["Черновик", artifacts?.draft ? "ready" : ""],
    ["Проверка", artifacts?.validationReport ? "ready" : ""],
    ["Ревью", artifacts?.reviewReport ? "ready" : ""],
  ];
  return (
    <div className="detail-grid">
      <section className="detail-card large">
        <small>ТЕКУЩЕЕ СОСТОЯНИЕ</small>
        <h3>
          {request?.status
            ? statusLabels[request.status] || request.status
            : "Загружаем заявку"}
        </h3>
        <p>
          {revision
            ? revision.instructions?.join(" ")
            : "Конвейер ведёт материал по этапам и сохраняет проверяемые артефакты каждого шага."}
        </p>
        <div className="source-chips">
          <span>{facts?.sources?.length || 0} источников</span>
          <span>{facts?.claims?.length || 0} фактов</span>
          <span>{facts?.gaps?.length || 0} открытых вопросов</span>
        </div>
        <button className="text-button" onClick={() => setView("facts")}>
          Открыть факты <ArrowRight size={16} />
        </button>
      </section>
      <section className="detail-card">
        <small>СЛЕДУЮЩИЙ ШАГ</small>
        <h3>{nextStep.title}</h3>
        <p>{nextStep.description}</p>
        <button className="ghost" onClick={() => setView(nextStep.tab)}>
          Открыть этап <ArrowRight size={14} />
        </button>
      </section>
      {revision && (
        <section className="detail-card revision-card">
          <small>ПРИЧИНА ДОРАБОТКИ</small>
          <h3>
            Владелец:{" "}
            {ownerLabels[revision.targetOwner] || revision.targetOwner}
          </h3>
          <p>
            {revision.issues?.map((issue) => issue.message).join(" · ") ||
              revision.instructions?.join(" ") ||
              "Причина сохранена в истории заявки."}
          </p>
          <button className="text-button" onClick={() => setView("history")}>
            Открыть историю <ArrowRight size={16} />
          </button>
        </section>
      )}
      <section className="detail-card">
        <small>ПОСЛЕДНЕЕ СОБЫТИЕ</small>
        <h3>Последнее действие конвейера</h3>
        <p>{latestNote}</p>
        <button className="text-button" onClick={() => setView("history")}>
          История <ArrowRight size={16} />
        </button>
      </section>
      <section className="detail-card wide-card">
        <small>АРТЕФАКТЫ ЗАЯВКИ</small>
        <div className="artifact-track">
          {artifactStates.map(([x, s]) => (
            <div key={x} className={s}>
              <i>
                {s === "ready" ? (
                  <Check size={11} />
                ) : s === "active" ? (
                  <span />
                ) : (
                  "·"
                )}
              </i>
              <b>{x}</b>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
function BriefView({ request, onSaved }) {
  const demo = {
    inputType: "planned_topic",
    title: "Как выстроить контент-стратегию для B2B-команды",
    cluster: "контент-стратегия B2B",
    materialKind: "guide",
    goal: "Создать понятный материал для руководителя отдела продаж.",
    knownFacts: "Есть интервью с руководителем продаж и данные по воронке.",
    forbiddenMentions: "Не упоминать непроверенные сервисы и метрики.",
    internalLinks: "/guides · /cases · /product/call-scoring",
  };
  const brief = request?.brief || demo;
  const [edit, setEdit] = useState(false),
    [saved, setSaved] = useState(false),
    [saving, setSaving] = useState(false),
    [error, setError] = useState("");
  const [form, setForm] = useState(() => briefToForm(brief));
  const editable = !pipelineLiveEnabled || request?.status === "brief_draft";
  const fields = [
    ["title", "Рабочее название"],
    ["cluster", "Поисковый кластер"],
    ["kind", "Тип материала"],
    ["goal", "Бизнес-цель"],
    ["facts", "Известные факты"],
    ["limits", "Ограничения"],
    ["links", "Внутренние ссылки"],
  ];
  const save = async () => {
    if (!edit) {
      setEdit(true);
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (pipelineLiveEnabled && request) {
        const result = await pipelineApi.updateBrief(
          request.id,
          formToBrief(form),
        );
        onSaved(result.item);
      }
      setSaved(true);
      setEdit(false);
    } catch (e) {
      setError(e.message || "Не удалось сохранить бриф.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <section className="brief-view">
      <div className="artifact-head">
        <div>
          <small>STRUCTURED BRIEF</small>
          <h3>Бриф материала</h3>
        </div>
        <button
          className={edit ? "cta" : "ghost"}
          disabled={!editable || saving}
          onClick={save}
        >
          {saving
            ? "Сохраняем…"
            : edit
              ? "Сохранить изменения"
              : "Редактировать"}
        </button>
      </div>
      {!editable && (
        <div className="api-state">
          Редактирование закрыто: бриф можно менять только до запуска обработки.
        </div>
      )}
      {saved && (
        <div className="saved">
          <Check /> Бриф сохранён в защищённом конвейере
        </div>
      )}
      {error && <div className="form-error">{error}</div>}
      <div className="brief-fields">
        {fields.map(([id, label]) => (
          <label key={id}>
            <small>{label}</small>
            {edit ? (
              <textarea
                value={form[id]}
                onChange={(e) =>
                  setForm((x) => ({ ...x, [id]: e.target.value }))
                }
              />
            ) : (
              <p>{form[id]}</p>
            )}
          </label>
        ))}
      </div>
      <div className="brief-footer">
        <div>
          <ShieldCheck />
          <span>
            <b>Следующий этап — факты</b>
            <small>
              Сначала конвейер проверит источник и занятость кластера.
            </small>
          </span>
        </div>
        <button className="cta" disabled>
          Запуск этапа подключим после отдельной проверки безопасности{" "}
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}
function briefToForm(brief) {
  if (brief.inputType === "news")
    return {
      title: brief.eventSummary,
      cluster: "Новостной материал",
      kind: "Новость",
      goal: brief.relevance,
      facts: brief.sourceUrl,
      limits: brief.competitorMentions,
      links: brief.deadline,
    };
  return {
    title: brief.title,
    cluster: brief.cluster,
    kind: kindLabels[brief.materialKind] || "Материал",
    goal: brief.goal,
    facts: brief.knownFacts,
    limits: brief.forbiddenMentions,
    links: brief.internalLinks,
  };
}
function formToBrief(form) {
  const materialKind = {
    Гайд: "guide",
    Сравнение: "compare",
    "SEO‑страница": "programmatic",
    Материал: "unknown",
  };
  return {
    inputType: "planned_topic",
    title: form.title,
    cluster: form.cluster,
    materialKind: materialKind[form.kind] || "unknown",
    goal: form.goal,
    knownFacts: form.facts,
    forbiddenMentions: form.limits,
    internalLinks: form.links,
  };
}
function FactsView() {
  const [showBlocked, setShowBlocked] = useState(false);
  const facts = [
    [
      "F-01",
      "Стратегия связывает контент с этапами сделки, а не только с поисковыми запросами.",
      "Методика: sales enablement framework",
      "primary",
      "18.11.2026",
    ],
    [
      "F-02",
      "Команда должна измерять переход материала к следующему действию в воронке.",
      "Внутренний кейс Lexis Voice",
      "official",
      "18.11.2026",
    ],
    [
      "F-03",
      "Для B2B‑материалов важно определить владельца контента и цикл обновления.",
      "Интервью с руководителем продаж",
      "expert",
      "17.11.2026",
    ],
    [
      "F-04",
      "Нельзя заявлять конкретный рост конверсии без источника и условий кейса.",
      "Правило проверки фактов",
      "blocked",
      "—",
    ],
  ];
  return (
    <section className="facts-view">
      <div className="artifact-head">
        <div>
          <small>FACT PACKAGE · V1</small>
          <h3>Факты и источники</h3>
        </div>
        <button className="ghost" onClick={() => setShowBlocked(!showBlocked)}>
          {showBlocked ? "Все утверждения" : "Показать ограничения"}
        </button>
      </div>
      <div className="facts-summary">
        <div>
          <b>14</b>
          <small>утверждений</small>
        </div>
        <div>
          <b>06</b>
          <small>источников</small>
        </div>
        <div>
          <b className="violet-text">01</b>
          <small>открытый вопрос</small>
        </div>
        <div>
          <b className="aqua-text">✓</b>
          <small>кластер свободен</small>
        </div>
      </div>
      <div className="fact-tabs">
        <button className="selected">Утверждения</button>
        <button>Источники</button>
        <button>Открытые вопросы</button>
      </div>
      <div className="fact-list">
        {facts
          .filter((x) => showBlocked || x[3] !== "blocked")
          .map(([id, claim, source, quality, date]) => (
            <article
              className={quality === "blocked" ? "blocked" : ""}
              key={id}
            >
              <div className="fact-id">
                {quality === "blocked" ? <X size={14} /> : <Check size={14} />}
              </div>
              <div>
                <small>
                  {id} ·{" "}
                  {quality === "blocked"
                    ? "ЗАПРЕЩЕНО В ФИНАЛЕ"
                    : "РАЗРЕШЕНО К ИСПОЛЬЗОВАНИЮ"}
                </small>
                <p>{claim}</p>
                <span>
                  <b>{source}</b> · снимок {date}
                </span>
              </div>
              <button>
                Открыть источник <ArrowUpRight size={13} />
              </button>
            </article>
          ))}
      </div>
      <div className="open-question">
        <Sparkles />
        <div>
          <small>ОТКРЫТЫЙ ВОПРОС</small>
          <b>Нужны данные о частоте обновления стратегии в командах B2B.</b>
          <p>
            Поисковик продолжит сбор, но структура может быть построена без
            этого дополнительного факта.
          </p>
        </div>
        <button className="ghost">Добавить факт</button>
      </div>
      <div className="brief-footer">
        <div>
          <ShieldCheck />
          <span>
            <b>Фактура достаточно полная</b>
            <small>
              Можно перейти к построению структуры. Все использованные
              утверждения сохранят ссылки на источники.
            </small>
          </span>
        </div>
        <button className="cta">
          Построить структуру <ArrowRight />
        </button>
      </div>
    </section>
  );
}
function StructureView() {
  const [edit, setEdit] = useState(false);
  const blocks = [
    ["lead", "Лид", "Коротко отвечает на основной вопрос", "F-01"],
    [
      "prose",
      "Какие задачи решает контент-стратегия?",
      "Объясняет связь контента и воронки",
      "F-01 · F-02",
    ],
    [
      "steps",
      "Как выстроить процесс за 5 шагов?",
      "Практическая последовательность",
      "F-02 · F-03",
    ],
    [
      "cards",
      "Что нужно определить до запуска?",
      "Критерии готовности команды",
      "F-03",
    ],
    [
      "callout",
      "Где стратегия чаще всего ломается?",
      "Ограничение и риск",
      "F-03",
    ],
    ["faq", "Частые вопросы", "8 реальных вопросов аудитории", "F-01 · F-02"],
    ["cta", "Следующий шаг", "Тематический призыв к действию", "—"],
  ];
  return (
    <section className="structure-view">
      <div className="artifact-head">
        <div>
          <small>MATERIAL STRUCTURE · V1</small>
          <h3>Структура статьи</h3>
        </div>
        <button
          className={edit ? "cta" : "ghost"}
          onClick={() => setEdit((x) => !x)}
        >
          {edit ? "Сохранить" : "Редактировать"}
        </button>
      </div>
      <div className="seo-cards">
        <label>
          <small>SEO TITLE · 58 / 65</small>
          <input
            readOnly={!edit}
            defaultValue="Контент-стратегия B2B: как выстроить систему"
          />
        </label>
        <label>
          <small>DESCRIPTION · 143 / 160</small>
          <textarea
            readOnly={!edit}
            defaultValue="Как связать контент, этапы продаж и реальные задачи команды: структура работающей B2B-стратегии."
          />
        </label>
        <div>
          <small>ОЦЕНКА ОБЪЁМА</small>
          <b>
            1 640 <span>слов</span>
          </b>
          <p>6 смысловых блоков · FAQ 8</p>
        </div>
      </div>
      <div className="structure-list">
        {blocks.map(([kind, title, purpose, fact], i) => (
          <article key={title}>
            <span className="block-no">{String(i + 1).padStart(2, "0")}</span>
            <div className="block-type">{kind}</div>
            <div className="block-main">
              <b>{title}</b>
              <small>{purpose}</small>
            </div>
            <span className="block-facts">{fact}</span>
            {edit && (
              <button>
                <MoreHorizontal size={17} />
              </button>
            )}
          </article>
        ))}
      </div>
      <div className="structure-rule">
        <Check />
        <span>
          <b>Формат валиден</b>
          <small>
            Один лид первым, 6–8 смысловых блоков, SEO‑поля в лимитах, FAQ из 8
            вопросов.
          </small>
        </span>
      </div>
      <div className="brief-footer">
        <div>
          <PenTool />
          <span>
            <b>Структура привязана к 14 фактам</b>
            <small>
              Писатель сможет использовать только подтверждённые утверждения из
              пакета фактуры.
            </small>
          </span>
        </div>
        <button className="cta">
          Запустить написание <ArrowRight />
        </button>
      </div>
    </section>
  );
}
function DraftView() {
  const [edit, setEdit] = useState(false),
    [mode, setMode] = useState("read"),
    [saved, setSaved] = useState(false);
  const [lead, setLead] = useState(
    "Контент-стратегия B2B нужна не для того, чтобы выпускать больше статей. Она помогает связать каждую тему с задачей аудитории, этапом сделки и следующим действием команды.",
  );
  return (
    <section className="draft-view">
      <div className="artifact-head">
        <div>
          <small>DRAFT DOC · V1</small>
          <h3>Черновик материала</h3>
        </div>
        <div className="draft-actions">
          <button
            className={mode === "read" ? "selected" : ""}
            onClick={() => setMode("read")}
          >
            Статья
          </button>
          <button
            className={mode === "proof" ? "selected" : ""}
            onClick={() => setMode("proof")}
          >
            Данные и источники
          </button>
          <button
            className={edit ? "cta" : "ghost"}
            onClick={() => {
              if (edit) setSaved(true);
              setEdit((x) => !x);
            }}
          >
            {edit ? "Сохранить" : "Редактировать"}
          </button>
        </div>
      </div>
      {saved && (
        <div className="saved">
          <Check /> Версия сохранена. Следующая проверка увидит только эти
          изменения.
        </div>
      )}
      <div className="draft-layout">
        <article className="article-paper">
          <small>ГАЙД · 1 642 СЛОВА · 7 МИН ЧТЕНИЯ</small>
          <h1>Как выстроить контент‑стратегию для B2B‑команды</h1>
          {edit ? (
            <textarea
              className="lead-editor"
              value={lead}
              onChange={(e) => setLead(e.target.value)}
            />
          ) : (
            <p className="article-lead">{lead}</p>
          )}
          <div className="inline-source">
            <span>F-01</span>
            <p>
              Лид привязан к проверяемому утверждению о связи стратегии и этапов
              сделки.
            </p>
          </div>
          <h2>Какие задачи решает контент‑стратегия?</h2>
          <p>
            Она делает темы управляемыми: каждая отвечает на конкретный вопрос и
            подводит читателя к следующему действию. Для команды это ещё и
            способ увидеть, какие материалы действительно помогают сделке
            двигаться.
          </p>
          {mode === "proof" && (
            <div className="proof-callout">
              <Check /> Источники: F‑01, F‑02 · достоверность высокая
            </div>
          )}
          <h2>Как выстроить процесс за пять шагов?</h2>
          <ol>
            <li>Определить задачу аудитории, а не только ключевой запрос.</li>
            <li>Связать материал с этапом сделки и метрикой.</li>
            <li>Проверить факты до написания текста.</li>
          </ol>
          <div className="article-visual">
            <Layers3 />
            <div>
              <small>ВИЗУАЛЬНЫЙ СЛОТ</small>
              <b>Схема: тема → вопрос → действие → метрика</b>
            </div>
          </div>
          <h2>Что нужно определить до запуска?</h2>
          <p>
            Владельца процесса, источник фактов, правила обновления и допустимые
            внутренние ссылки. Без этих условий контент превращается в набор
            случайных публикаций.
          </p>
        </article>
        <aside className="draft-sidebar">
          <small>НАВИГАЦИЯ</small>
          {[
            "Лид",
            "Задачи стратегии",
            "5 шагов",
            "Визуальная схема",
            "Критерии готовности",
            "FAQ",
            "CTA",
          ].map((x, i) => (
            <button key={x} className={i === 0 ? "active" : ""}>
              {String(i + 1).padStart(2, "0")} {x}
            </button>
          ))}
          <hr />
          <small>СОСТОЯНИЕ</small>
          <p>
            <Check /> 14 фактов привязано
          </p>
          <p>
            <Check /> 3 внутренние ссылки
          </p>
          <p>
            <i /> 1 визуальный слот
          </p>
        </aside>
      </div>
      <div className="brief-footer">
        <div>
          <FileCheck2 />
          <span>
            <b>Черновик готов к машинной проверке</b>
            <small>
              Проверим факты, SEO, обязательные блоки, FAQ, внутренние ссылки и
              формат публикации.
            </small>
          </span>
        </div>
        <button className="cta">
          Проверить материал <ArrowRight />
        </button>
      </div>
    </section>
  );
}
function VisualView() {
  const [layout, setLayout] = useState("after");
  const [slots, setSlots] = useState([true, true, false]);
  const visual = [
    [
      "hero_compare",
      "Схема движения контента",
      "После лида",
      "Тема → вопрос → действие → метрика",
    ],
    [
      "howto_steps",
      "Пять шагов стратегии",
      "После блока «Как выстроить процесс»",
      "5 практических этапов",
    ],
    [
      "stats_strip",
      "Ритм обновления стратегии",
      "Перед CTA",
      "Не хватает проверенных данных",
    ],
  ];
  return (
    <section className="visual-view">
      <div className="artifact-head">
        <div>
          <small>INFOGRAPHICS SPEC · V1</small>
          <h3>Инфографика из данных</h3>
        </div>
        <button className="ghost">Открыть предпросмотр</button>
      </div>
      <div className="visual-principle">
        <Layers3 />
        <div>
          <b>LEXIS не придумывает визуалы из воздуха.</b>
          <p>
            Каждая схема строится только из структурированных данных статьи и
            хранит ссылку на использованные факты.
          </p>
        </div>
      </div>
      <div className="visual-list">
        {visual.map(([kind, title, placement, data], i) => (
          <article className={!slots[i] ? "muted" : ""} key={kind}>
            <div className="visual-icon">
              {i === 0 ? "⌁" : i === 1 ? "↳" : "▥"}
            </div>
            <div className="visual-info">
              <small>
                {kind.toUpperCase()} ·{" "}
                {slots[i] ? "МОЖНО ПОСТРОИТЬ" : "НУЖНЫ ДАННЫЕ"}
              </small>
              <h3>{title}</h3>
              <p>
                <b>Расположение:</b> {placement}
              </p>
              <span>
                <Check size={12} /> {data}
              </span>
            </div>
            <div className="visual-controls">
              <button
                className={slots[i] ? "on" : ""}
                onClick={() =>
                  setSlots((s) => s.map((x, n) => (n === i ? !x : x)))
                }
              >
                {slots[i] ? "Использовать" : "Пропустить"}
              </button>
              {i === 0 && (
                <button
                  onClick={() =>
                    setLayout(layout === "after" ? "before" : "after")
                  }
                >
                  {layout === "after" ? "После лида" : "Перед CTA"}
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="visual-preview">
        <div className="preview-paper">
          <small>ЛИД СТАТЬИ</small>
          <p>Контент-стратегия связывает темы с реальными задачами команды.</p>
          <div className="diagram">
            <span>Тема</span>
            <i>→</i>
            <span>Вопрос</span>
            <i>→</i>
            <span>Действие</span>
            <i>→</i>
            <span>Метрика</span>
          </div>
          <small>СЛЕДУЮЩИЙ БЛОК</small>
        </div>
        <aside>
          <small>ВИЗУАЛЬНЫЙ СЛОТ</small>
          <b>#{layout === "after" ? "01" : "03"}</b>
          <p>{layout === "after" ? "После лида" : "Перед CTA"}</p>
          <span>Данные: F‑01, F‑02</span>
        </aside>
      </div>
      <div className="brief-footer">
        <div>
          <Check />
          <span>
            <b>2 визуала готовы к сборке</b>
            <small>
              Третий слот остаётся выключенным: конвейер не добавит графику без
              подтверждённых данных.
            </small>
          </span>
        </div>
        <button className="cta">
          Сохранить спецификацию <ArrowRight />
        </button>
      </div>
    </section>
  );
}
function ValidationView() {
  const [fixed, setFixed] = useState(false);
  const issues = fixed
    ? [
        [
          "success",
          "Все обязательные проверки пройдены",
          "Можно отправить материал на AI‑ревью.",
        ],
      ]
    : [
        [
          "warning",
          "SEO description близок к лимиту",
          "156 из 160 символов. Рекомендуем сократить описание.",
        ],
        [
          "error",
          "Не хватает акцентов в двух абзацах",
          "Владелец: писатель · блок «5 шагов стратегии».",
        ],
        [
          "error",
          "Не подтверждён один визуальный слот",
          "Владелец: факты · нужны данные о частоте обновления.",
        ],
      ];
  return (
    <section className="validation-view">
      <div className="artifact-head">
        <div>
          <small>MACHINE VALIDATION · V1</small>
          <h3>Проверка качества</h3>
        </div>
        <button className="ghost" onClick={() => setFixed(!fixed)}>
          {fixed ? "Показать проблемы" : "Симулировать исправление"}
        </button>
      </div>
      <div className="validation-score">
        <div className={fixed ? "passed" : "needs"}>
          <span>{fixed ? <Check /> : "82"}</span>
          <div>
            <small>ГОТОВНОСТЬ МАТЕРИАЛА</small>
            <h3>{fixed ? "Проверка пройдена" : "Нужны адресные правки"}</h3>
            <p>
              {fixed
                ? "Машинные правила выполнены. Материал можно передать ревьюеру."
                : "2 ошибки и 1 предупреждение маршрутизированы правильным владельцам."}
            </p>
          </div>
        </div>
        <div className="checks-grid">
          {[
            ["Факты и источники", true],
            ["SEO-поля", true],
            ["Лид и структура", true],
            ["FAQ: 8 вопросов", true],
            ["Внутренние ссылки", true],
            ["Визуальные слоты", fixed],
            ["Акценты в тексте", fixed],
            ["Готовность публикации", fixed],
          ].map(([x, ok]) => (
            <span key={x} className={ok ? "ok" : "fail"}>
              {ok ? <Check /> : <X />}
              {x}
            </span>
          ))}
        </div>
      </div>
      <div className="issue-list">
        {issues.map(([level, title, desc], i) => (
          <article className={level} key={title}>
            <span>
              {level === "success" ? (
                <Check />
              ) : level === "warning" ? (
                "!"
              ) : (
                <X />
              )}
            </span>
            <div>
              <b>{title}</b>
              <p>{desc}</p>
            </div>
            {level !== "success" && (
              <button className="ghost">
                {i === 1 ? "Вернуть писателю" : "Вернуть поисковику"}{" "}
                <ArrowRight size={13} />
              </button>
            )}
          </article>
        ))}
      </div>
      <div className="validation-note">
        <ShieldCheck />
        <p>
          Машинная приемка всегда идёт до AI‑ревью. Она проверяет формат,
          источники, SEO, обязательные блоки, ссылки и правила публикации.
        </p>
      </div>
      <div className="brief-footer">
        <div>
          <FileCheck2 />
          <span>
            <b>
              {fixed
                ? "Можно запускать смысловое ревью"
                : "Сначала исправьте адресные проблемы"}
            </b>
            <small>
              Каждое замечание уже привязано к фактам, структуре, тексту или
              системе.
            </small>
          </span>
        </div>
        <button className="cta" disabled={!fixed}>
          Отправить на AI‑ревью <ArrowRight />
        </button>
      </div>
    </section>
  );
}
function ReviewView() {
  const [approved, setApproved] = useState(false);
  const notes = [
    [
      "writer",
      "Добавить границу применимости",
      "В блоке о пяти шагах уточнить: подход работает, когда у команды есть владелец процесса и доступ к данным звонков.",
    ],
    [
      "structure",
      "Усилить финальный вывод",
      "Вердикт должен помочь выбрать первый шаг, а не повторить предыдущие разделы.",
    ],
  ];
  return (
    <section className="review-view">
      <div className="artifact-head">
        <div>
          <small>SEMANTIC REVIEW · V1</small>
          <h3>AI‑ревью</h3>
        </div>
        <button className="ghost">История ревизий</button>
      </div>
      <div className={"review-decision " + (approved ? "approved" : "")}>
        <div className="review-orb">{approved ? <Check /> : "AI"}</div>
        <div>
          <small>РЕШЕНИЕ РЕВЬЮЕРА</small>
          <h3>
            {approved ? "Одобрено к публикации" : "Нужна адресная доработка"}
          </h3>
          <p>
            {approved
              ? "Материал отвечает на вопрос, опирается на проверенные факты и готов к публикационному контуру."
              : "Текст содержательно точен, но два замечания сделают вывод честнее и полезнее для читателя."}
          </p>
        </div>
        <button className="cta" onClick={() => setApproved((x) => !x)}>
          {approved ? "Вернуть замечания" : "Симулировать одобрение"}
        </button>
      </div>
      {!approved ? (
        <>
          <div className="review-summary">
            <span>
              <b>02</b> замечания
            </span>
            <span>
              <b>01</b> писатель
            </span>
            <span>
              <b>01</b> структура
            </span>
            <span>
              <b>00</b> факты
            </span>
          </div>
          <div className="review-notes">
            {notes.map(([owner, title, desc], i) => (
              <article key={title}>
                <span className={"owner " + owner}>
                  {owner === "writer" ? "ТЕКСТ" : "СТРУКТУРА"}
                </span>
                <div>
                  <small>
                    БЛОК {i === 0 ? "03 · ПЯТЬ ШАГОВ" : "06 · ВЫВОД"}
                  </small>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
                <button className="ghost">
                  Открыть блок <ArrowRight size={13} />
                </button>
              </article>
            ))}
          </div>
          <div className="review-quote">
            «Материал не пытается обещать универсальный результат и опирается на
            фактологическую базу. После двух небольших правок будет готов к
            публикации.»
          </div>
        </>
      ) : (
        <div className="approval-card">
          <Check />
          <h3>Материал готов к публикации</h3>
          <p>
            Ревьюер не нашёл смысловых противоречий, неподтверждённых обещаний
            или пустых разделов.
          </p>
          <button className="cta">
            Перейти к публикации <ArrowRight />
          </button>
        </div>
      )}
      <div className="brief-footer">
        <div>
          <Sparkles />
          <span>
            <b>Ревью не переписывает статью за автора</b>
            <small>
              Оно указывает конкретный блок, проблему и владельца исправления —
              именно так устроен реальный конвейер.
            </small>
          </span>
        </div>
        <button className="ghost">Скачать отчёт</button>
      </div>
    </section>
  );
}
function PublishView() {
  const [confirmed, setConfirmed] = useState(false),
    [published, setPublished] = useState(false);
  return (
    <section className="publish-view">
      <div className="artifact-head">
        <div>
          <small>PUBLICATION CONTOUR · V1</small>
          <h3>Публикация</h3>
        </div>
        <span className={published ? "published-badge" : "ready-badge"}>
          {published ? (
            <>
              <Check /> ОПУБЛИКОВАНО
            </>
          ) : (
            "ГОТОВО К ПУБЛИКАЦИИ"
          )}
        </span>
      </div>
      {published ? (
        <div className="published-success">
          <Check />
          <div>
            <small>МАТЕРИАЛ ОПУБЛИКОВАН</small>
            <h3>Страница уже доступна</h3>
            <p>
              Публикационный контур сохранил URL, дату и provenance. Материал
              перешёл в мониторинг.
            </p>
            <a href="#published">
              lexisvoice.ru/guides/content-strategy-b2b{" "}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="publish-layout">
            <section>
              <small>БУДУЩИЙ АДРЕС</small>
              <div className="url-card">
                <span>lexisvoice.ru</span>
                <b>/guides/content-strategy-b2b</b>
              </div>
              <div className="publish-grid">
                <div>
                  <small>ТИП МАТЕРИАЛА</small>
                  <b>Гайд</b>
                  <span>автопубликация доступна</span>
                </div>
                <div>
                  <small>РАЗДЕЛ</small>
                  <b>Техники</b>
                  <span>хаб опубликован</span>
                </div>
                <div>
                  <small>SEO‑КЛАСТЕР</small>
                  <b>Свободен</b>
                  <span>уникальность пройдена</span>
                </div>
                <div>
                  <small>ВНУТРЕННИЕ ССЫЛКИ</small>
                  <b>3 / 3</b>
                  <span>все существуют</span>
                </div>
              </div>
            </section>
            <aside>
              <small>ВОЛНА ПУБЛИКАЦИИ</small>
              <strong>
                03 <em>/ 12</em>
              </strong>
              <p>материала выпущено сегодня</p>
              <div>
                <i />
                <span>Лимит безопасной волны</span>
              </div>
            </aside>
          </div>
          <div className="publish-checks">
            {[
              ["Материал прошёл машинную проверку", true],
              ["AI‑ревью одобрило статью", true],
              ["Источники и provenance приложены", true],
              ["Визуальные слоты готовы", true],
              ["Все внутренние ссылки существуют", true],
              ["Публикационный API подключён", false],
            ].map(([x, ok]) => (
              <p key={x} className={ok ? "ok" : "pending"}>
                {ok ? <Check /> : <Clock3 />}
                {x}
                {!ok && <span>подключим при интеграции</span>}
              </p>
            ))}
          </div>
          <label className="publish-confirm">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span>
              Я проверила предпросмотр, заголовок, внутренние ссылки и понимаю,
              что после публикации материал перейдёт в мониторинг.
            </span>
          </label>
          <div className="brief-footer">
            <div>
              <ShieldCheck />
              <span>
                <b>Публикация не переписывает материал</b>
                <small>
                  Если Content API вернёт ошибку, конвейер создаст адресное
                  замечание и вернёт работу нужному агенту.
                </small>
              </span>
            </div>
            <button
              className="cta"
              disabled={!confirmed}
              onClick={() => setPublished(true)}
            >
              Опубликовать <ArrowRight />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
function HistoryView() {
  const events = [
    ["11:42", "Поисковик", "Добавлен первичный источник", "facts", "F‑04"],
    [
      "11:37",
      "Система",
      "Кластер проверен: свободен",
      "system",
      "content-strategy-b2b",
    ],
    [
      "11:26",
      "Оркестратор",
      "Заявка направлена поисковику",
      "orchestrator",
      "needs_facts",
    ],
    ["11:18", "Мария", "Создан бриф материала", "user", "brief.v1.json"],
  ];
  return (
    <section className="history-view">
      <div className="artifact-head">
        <div>
          <small>PROVENANCE · AUDIT TRAIL</small>
          <h3>История материала</h3>
        </div>
        <button className="ghost">Скачать provenance</button>
      </div>
      <div className="provenance-card">
        <div>
          <small>REQUEST ID</small>
          <b>A‑0042</b>
        </div>
        <div>
          <small>МОДЕЛЬ</small>
          <b>gpt‑5.5</b>
        </div>
        <div>
          <small>ВЕРСИЯ БРИФА</small>
          <b>v1</b>
        </div>
        <div>
          <small>СОЗДАНО</small>
          <b>18.11.2026</b>
        </div>
      </div>
      <div className="timeline">
        {events.map(([time, actor, title, type, file], i) => (
          <article key={title}>
            <time>{time}</time>
            <i className={type} />
            <div>
              <small>
                {actor.toUpperCase()} · {file}
              </small>
              <b>{title}</b>
              {i === 0 && (
                <p>
                  Источник сохранён с датой снимка и привязан к утверждению,
                  которое может использовать писатель.
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="history-info">
        <FileCheck2 />
        <div>
          <b>Почему это важно</b>
          <p>
            Материалы конвейера не лежат в Git‑истории сайта. Provenance хранит
            ответ на вопрос: кто, когда, на каком основании и какой моделью
            создал каждую версию.
          </p>
        </div>
      </div>
    </section>
  );
}
function ArtifactView({ type, artifacts, requestId }) {
  const keyMap = {
    facts: "facts",
    structure: "structure",
    draft: "draft",
    visual: "infographics",
    validation: "validationReport",
    review: "reviewReport",
    history: "revision",
    publish: "publicationReport",
  };
  const artifact = artifacts?.[keyMap[type]];
  if (pipelineLiveEnabled)
    return (
      <LiveArtifactView type={type} artifact={artifact} requestId={requestId} />
    );
  if (type === "facts") return <FactsView />;
  if (type === "structure") return <StructureView />;
  if (type === "draft") return <DraftView />;
  if (type === "visual") return <VisualView />;
  if (type === "validation") return <ValidationView />;
  if (type === "review") return <ReviewView />;
  if (type === "publish") return <PublishView />;
  if (type === "history") return <HistoryView />;
  return (
    <section className="artifact-empty">
      <span>
        <FileText />
      </span>
      <small>АРТЕФАКТ КОНВЕЙЕРА</small>
      <h3>Артефакт</h3>
      <p>В работе.</p>
    </section>
  );
}
function PublicationPreview({ preview, close }) {
  const doc = preview.doc || {};
  const blocks = doc.blocks || doc.article?.blocks || [];
  return (
    <div
      className="preview-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Предпросмотр статьи"
    >
      <section className="publication-preview">
        <div className="artifact-head">
          <div>
            <small>ПРЕДПРОСМОТР ПУБЛИКАЦИИ</small>
            <h3>{doc.title || doc.meta?.title || "Статья"}</h3>
          </div>
          <button
            className="ghost"
            onClick={close}
            aria-label="Закрыть предпросмотр"
          >
            <X size={17} />
          </button>
        </div>
        <p className="preview-description">
          {doc.description ||
            doc.meta?.description ||
            "Содержимое, которое будет передано в CMS после публикации."}
        </p>
        {!preview.publishable && (
          <div className="api-state error">
            Материал пока нельзя публиковать: завершите обязательные этапы
            конвейера.
          </div>
        )}
        <article className="article-paper">
          {blocks.length ? (
            blocks.map((block, index) => (
              <section key={block.id || index}>
                {(block.title || block.heading) && (
                  <h2>{block.title || block.heading}</h2>
                )}
                {block.text && <p>{block.text}</p>}
                {block.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </section>
            ))
          ) : (
            <p>
              Конвейер ещё не сформировал читабельное содержимое для
              предпросмотра.
            </p>
          )}
        </article>
      </section>
    </div>
  );
}
function LiveArtifactView({ type, artifact, requestId }) {
  const labels = {
    facts: "Факты и источники",
    structure: "Структура статьи",
    draft: "Черновик",
    visual: "Инфографика",
    validation: "Проверка качества",
    review: "AI‑ревью",
    history: "История ревизий",
    publish: "Публикация",
  };
  if (!artifact)
    return (
      <section className="artifact-empty">
        <span>
          <Clock3 />
        </span>
        <small>АРТЕФАКТ ЕЩЁ НЕ СОЗДАН</small>
        <h3>{labels[type]}</h3>
        <p>
          Конвейер создаст этот материал на соответствующем этапе. Автозапуск
          пока отключён для безопасности.
        </p>
      </section>
    );
  if (type === "facts") return <LiveFacts artifact={artifact} />;
  if (type === "structure") return <LiveStructure artifact={artifact} />;
  if (type === "draft") return <LiveDraft artifact={artifact} />;
  if (type === "visual") return <LiveVisuals artifact={artifact} />;
  if (type === "validation") return <LiveValidation artifact={artifact} />;
  if (type === "review") return <LiveReview artifact={artifact} />;
  if (type === "history")
    return <LiveHistory artifact={artifact} requestId={requestId} />;
  if (type === "publish") return <LivePublication artifact={artifact} />;
  const pretty = JSON.stringify(artifact, null, 2);
  return (
    <section className="live-artifact">
      <div className="artifact-head">
        <div>
          <small>PIPELINE ARTIFACT · READ ONLY</small>
          <h3>{labels[type]}</h3>
        </div>
        <span className="topic-status">Защищённый просмотр</span>
      </div>
      <p>
        Данные получены напрямую из конвейера. Редактирование этого артефакта
        пока намеренно отключено.
      </p>
      <pre>{pretty}</pre>
    </section>
  );
}
function LiveFacts({ artifact }) {
  const [sheet, setSheet] = useState("claims");
  const sources = new Map((artifact.sources || []).map((x) => [x.id, x]));
  const claims = artifact.claims || [];
  return (
    <section className="live-artifact">
      <div className="artifact-head">
        <div>
          <small>FACT PACKAGE · READ ONLY</small>
          <h3>Факты и источники</h3>
        </div>
        <span className="topic-status">Защищённый просмотр</span>
      </div>
      <div className="facts-summary">
        <div>
          <b>{claims.length}</b>
          <small>утверждений</small>
        </div>
        <div>
          <b>{(artifact.sources || []).length}</b>
          <small>источников</small>
        </div>
        <div>
          <b className="violet-text">{(artifact.gaps || []).length}</b>
          <small>открытых вопросов</small>
        </div>
        <div>
          <b className="aqua-text">{artifact.topicOccupied ? "!" : "✓"}</b>
          <small>
            {artifact.topicOccupied ? "тема занята" : "тема свободна"}
          </small>
        </div>
      </div>
      <div className="fact-tabs">
        <button
          className={sheet === "claims" ? "selected" : ""}
          onClick={() => setSheet("claims")}
        >
          Утверждения
        </button>
        <button
          className={sheet === "sources" ? "selected" : ""}
          onClick={() => setSheet("sources")}
        >
          Источники
        </button>
        <button
          className={sheet === "gaps" ? "selected" : ""}
          onClick={() => setSheet("gaps")}
        >
          Открытые вопросы
        </button>
      </div>
      {sheet === "claims" && (
        <div className="fact-list">
          {claims.map((claim) => {
            const linked = (claim.sourceIds || [])
              .map((id) => sources.get(id))
              .filter(Boolean);
            return (
              <article
                className={!claim.allowedInFinal ? "blocked" : ""}
                key={claim.id}
              >
                <div className="fact-id">
                  {claim.allowedInFinal ? <Check size={14} /> : <X size={14} />}
                </div>
                <div>
                  <small>
                    {claim.id} ·{" "}
                    {claim.allowedInFinal
                      ? "РАЗРЕШЕНО К ИСПОЛЬЗОВАНИЮ"
                      : "НЕ ИСПОЛЬЗОВАТЬ В ФИНАЛЕ"}
                  </small>
                  <p>{claim.claim}</p>
                  <span>
                    {linked.map((source) => source.title).join(" · ") ||
                      "Источник не привязан"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {sheet === "sources" && (
        <div className="source-cards">
          {(artifact.sources || []).map((source) => (
            <article key={source.id}>
              <small>
                {source.id} · {source.reliability}
              </small>
              <b>{source.title}</b>
              <span>
                {source.publisher || "Источник"} · снимок{" "}
                {new Date(source.retrievedAt).toLocaleDateString("ru-RU")}
              </span>
              <a href={source.url} target="_blank" rel="noreferrer">
                Открыть источник <ArrowUpRight size={13} />
              </a>
            </article>
          ))}
        </div>
      )}
      {sheet === "gaps" && (
        <div className="gaps-list">
          {(artifact.gaps || []).map((gap) => (
            <p key={gap}>
              <Sparkles size={15} />
              {gap}
            </p>
          ))}
          {!(artifact.gaps || []).length && (
            <p>
              <Check size={15} />
              Открытых вопросов нет.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
function LiveStructure({ artifact }) {
  return (
    <section className="live-artifact">
      <div className="artifact-head">
        <div>
          <small>ARTICLE ARCHITECTURE · READ ONLY</small>
          <h3>Структура статьи</h3>
        </div>
        <span className="topic-status">Защищённый просмотр</span>
      </div>
      <div className="structure-meta">
        <div>
          <small>SEO TITLE</small>
          <b>{artifact.seoTitle}</b>
        </div>
        <div>
          <small>DESCRIPTION</small>
          <b>{artifact.description}</b>
        </div>
        <div>
          <small>МАТЕРИАЛ</small>
          <b>{kindLabels[artifact.materialKind] || artifact.materialKind}</b>
        </div>
      </div>
      <div className="structure-live-list">
        {(artifact.sections || []).map((section, i) => (
          <article key={section.id}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <small>
                {section.blockType} · {section.targetWords || "—"} слов
              </small>
              <h3>{section.title || section.purpose}</h3>
              <p>{section.purpose}</p>
              {section.requiredClaimIds?.length > 0 && (
                <em>Факты: {section.requiredClaimIds.join(", ")}</em>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function LiveDraft({ artifact }) {
  return (
    <section className="live-artifact">
      <div className="artifact-head">
        <div>
          <small>DRAFT DOCUMENT · READ ONLY</small>
          <h3>{artifact.meta?.title || "Черновик"}</h3>
        </div>
        <span className="topic-status">Защищённый просмотр</span>
      </div>
      <div className="draft-meta-live">
        <span>SEO: {artifact.meta?.seoTitle}</span>
        <span>{artifact.meta?.description}</span>
      </div>
      <article className="article-paper">
        {(artifact.blocks || []).map((block) => (
          <section key={block.id}>
            <small>{block.type}</small>
            {(block.title || block.heading) && (
              <h2>{block.title || block.heading}</h2>
            )}
            {block.text && <p>{block.text}</p>}
            {block.paragraphs?.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
    </section>
  );
}
function LiveVisuals({ artifact }) {
  return (
    <section className="live-artifact">
      <div className="artifact-head">
        <div>
          <small>INFOGRAPHIC SPECS · READ ONLY</small>
          <h3>Инфографика</h3>
        </div>
        <span className="topic-status">Защищённый просмотр</span>
      </div>
      <p>
        Каждый слот привязан к подтверждённым данным. Конвейер не создаёт
        декоративные визуалы без фактологической основы.
      </p>
      <div className="visual-spec-grid">
        {artifact.map((item, i) => (
          <article key={item.id}>
            <div>
              <span>0{String(i + 1)}</span>
              <small>
                {item.blockType} · {item.status || "готово"}
              </small>
            </div>
            <h3>{item.title}</h3>
            <p>
              {item.visualSlot?.brief ||
                item.missingData?.join(" ") ||
                "Спецификация на основе данных материала."}
            </p>
            <em>
              {item.sourceClaimIds?.length
                ? "Факты: " + item.sourceClaimIds.join(", ")
                : "Нет привязанных фактов"}
            </em>
            <div className={"visual-state " + (item.status || "derivable")}>
              {item.status === "needs_data"
                ? "Нужны данные"
                : item.status === "skip"
                  ? "Пропустить"
                  : "Готово к сборке"}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function LiveValidation({ artifact }) {
  const issues = artifact.issues || [];
  const errors = issues.filter((x) => x.severity === "error");
  return (
    <section className="live-artifact">
      <div className="artifact-head">
        <div>
          <small>MACHINE VALIDATION · READ ONLY</small>
          <h3>Проверка качества</h3>
        </div>
        <span className={artifact.ok ? "ready-badge" : "published-badge"}>
          {artifact.ok ? (
            <>
              <Check /> ПРОЙДЕНА
            </>
          ) : (
            <>
              <X /> НУЖНЫ ПРАВКИ
            </>
          )}
        </span>
      </div>
      <div
        className={"validation-live-score " + (artifact.ok ? "ok" : "needs")}
      >
        <b>{artifact.ok ? "✓" : errors.length}</b>
        <div>
          <small>РЕЗУЛЬТАТ МАШИННОЙ ПРОВЕРКИ</small>
          <h3>
            {artifact.ok
              ? "Материал прошёл проверку"
              : "Есть адресные замечания"}
          </h3>
          <p>
            Проверено: {new Date(artifact.checkedAt).toLocaleString("ru-RU")}
          </p>
        </div>
      </div>
      <div className="issue-list">
        {issues.length ? (
          issues.map((issue) => (
            <article
              className={issue.severity}
              key={issue.code + issue.message}
            >
              <span>{issue.severity === "error" ? <X /> : "!"}</span>
              <div>
                <b>{issue.message}</b>
                <p>
                  Владелец исправления: {issue.owner}
                  {issue.path ? " · " + issue.path : ""}
                </p>
              </div>
            </article>
          ))
        ) : (
          <article className="success">
            <span>
              <Check />
            </span>
            <div>
              <b>Критичных замечаний нет</b>
              <p>Все правила этого этапа выполнены.</p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
function LiveReview({ artifact }) {
  const issues = artifact.issues || [];
  return (
    <section className="live-artifact">
      <div className="artifact-head">
        <div>
          <small>SEMANTIC REVIEW · READ ONLY</small>
          <h3>AI‑ревью</h3>
        </div>
        <span className={artifact.approved ? "ready-badge" : "published-badge"}>
          {artifact.approved ? (
            <>
              <Check /> ОДОБРЕНО
            </>
          ) : (
            "НУЖНЫ ПРАВКИ"
          )}
        </span>
      </div>
      <div
        className={"review-decision " + (artifact.approved ? "approved" : "")}
      >
        <div className="review-orb">{artifact.approved ? <Check /> : "AI"}</div>
        <div>
          <small>ВЕРДИКТ РЕВЬЮЕРА</small>
          <h3>
            {artifact.approved
              ? "Материал одобрен"
              : "Есть замечания к материалу"}
          </h3>
          <p>{artifact.summary}</p>
        </div>
      </div>
      {issues.length > 0 && (
        <div className="review-notes">
          {issues.map((issue) => (
            <article key={issue.code + issue.message}>
              <span className={"owner " + issue.owner}>
                {issue.owner.toUpperCase()}
              </span>
              <div>
                <small>{issue.code}</small>
                <h3>{issue.message}</h3>
                <p>
                  {issue.path ||
                    "Замечание привязано к соответствующему этапу конвейера."}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
function LiveHistory({ artifact, requestId }) {
  const [events, setEvents] = useState([]);
  const [auditError, setAuditError] = useState("");
  useEffect(() => {
    if (!pipelineLiveEnabled || !requestId) return;
    pipelineApi
      .getAudit(requestId)
      .then((data) => setEvents(data.items || []))
      .catch(() => setAuditError("Журнал действий пока недоступен."));
  }, [requestId]);
  return (
    <section className="live-artifact">
      <div className="artifact-head">
        <div>
          <small>REVISION PROVENANCE · READ ONLY</small>
          <h3>История ревизии</h3>
        </div>
        <span className="topic-status">Защищённый просмотр</span>
      </div>
      <div className="provenance-card">
        <div>
          <small>ИСТОЧНИК</small>
          <b>{artifact.source}</b>
        </div>
        <div>
          <small>ПОПЫТКА</small>
          <b>{artifact.attempt}</b>
        </div>
        <div>
          <small>ВЛАДЕЛЕЦ</small>
          <b>{artifact.targetOwner}</b>
        </div>
        <div>
          <small>СТАТУС</small>
          <b>{artifact.targetStatus}</b>
        </div>
      </div>
      <div className="timeline">
        {events.map((event) => (
          <article key={event.id}>
            <time>
              {new Date(event.at).toLocaleString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
            <i className="system" />
            <div>
              <small>
                {event.actor.role} · {event.outcome}
              </small>
              <b>{event.action}</b>
              <p>
                {event.detail || "Действие выполнено в рабочем пространстве."}
              </p>
            </div>
          </article>
        ))}
        {(artifact.issues || []).map((issue, i) => (
          <article key={issue.code + issue.message}>
            <time>{String(i + 1).padStart(2, "0")}</time>
            <i className={issue.owner} />
            <div>
              <small>
                {issue.owner.toUpperCase()} · {issue.code}
              </small>
              <b>{issue.message}</b>
              <p>{issue.path || "Маршрут исправления создан конвейером."}</p>
            </div>
          </article>
        ))}
      </div>
      {auditError && <div className="api-state error">{auditError}</div>}
    </section>
  );
}
function LivePublication({ artifact }) {
  return (
    <section className="live-artifact">
      <div className="artifact-head">
        <div>
          <small>PUBLICATION REPORT · READ ONLY</small>
          <h3>Публикация</h3>
        </div>
        <span className={artifact.ok ? "ready-badge" : "published-badge"}>
          {artifact.ok ? (
            <>
              <Check /> ОПУБЛИКОВАНО
            </>
          ) : (
            "НЕ ОПУБЛИКОВАНО"
          )}
        </span>
      </div>
      <div className="publication-live">
        <div>
          <small>РЕЗУЛЬТАТ</small>
          <h3>{artifact.summary}</h3>
          <p>Время: {new Date(artifact.publishedAt).toLocaleString("ru-RU")}</p>
          {artifact.url && (
            <a href={artifact.url} target="_blank" rel="noreferrer">
              Открыть опубликованный материал <ArrowUpRight size={14} />
            </a>
          )}
        </div>
        <aside>
          <small>HTTP</small>
          <b>{artifact.statusCode || "—"}</b>
          <span>{artifact.updated ? "обновлено" : "новая публикация"}</span>
        </aside>
      </div>
      {artifact.issues?.length > 0 && (
        <div className="issue-list">
          {artifact.issues.map((issue) => (
            <article
              className={issue.severity}
              key={issue.code + issue.message}
            >
              <span>
                <X />
              </span>
              <div>
                <b>{issue.message}</b>
                <p>{issue.owner}</p>
              </div>
            </article>
          ))}
        </div>
      )}
      <div className="api-state">
        Запуск публикации через веб‑интерфейс намеренно закрыт. Этот экран
        показывает только отчёт конвейера.
      </div>
    </section>
  );
}
function Reports() {
  const [report, setReport] = useState(null),
    [loading, setLoading] = useState(pipelineLiveEnabled),
    [error, setError] = useState("");
  useEffect(() => {
    if (!pipelineLiveEnabled) return;
    pipelineApi
      .getReportSummary()
      .then(setReport)
      .catch((e) =>
        setError(
          e.status === 401
            ? "Сессия истекла. Войдите снова."
            : "Не удалось загрузить отчёт.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);
  if (!pipelineLiveEnabled)
    return (
      <section className="empty-state reveal">
        <span>
          <BarChart3 />
        </span>
        <small>ДЕМО‑РЕЖИМ</small>
        <h2>
          Отчёты подключаются
          <br />к конвейеру.
        </h2>
        <p>
          В локальном режиме здесь будет видна динамика созданных, проверенных и
          заблокированных материалов.
        </p>
      </section>
    );
  const statuses = Object.entries(report?.byStatus || {});
  return (
    <section className="reports-page reveal shown">
      <div className="report-head">
        <div>
          <small>PIPELINE OBSERVABILITY</small>
          <h2>
            Состояние
            <br />
            <em>производства.</em>
          </h2>
          <p>
            Отчёт создаётся по данным защищённого хранилища конвейера и не
            показывает секреты или содержимое служебных журналов.
          </p>
        </div>
        <span className="topic-status">
          {loading ? "ОБНОВЛЯЕМ" : "АКТУАЛЬНО"}
        </span>
      </div>
      {error && <div className="api-state error">{error}</div>}
      {report && (
        <>
          <div className="report-stats">
            <article>
              <small>ВСЕГО ЗАЯВОК</small>
              <b>{report.totalRequests}</b>
              <span>в защищённом хранилище</span>
            </article>
            <article>
              <small>СОЗДАНО СЕГОДНЯ</small>
              <b>{report.createdToday}</b>
              <span>по времени сервера</span>
            </article>
            <article>
              <small>В ОЧЕРЕДИ</small>
              <b>{report.queue.total}</b>
              <span>
                {report.queue.running} в работе · {report.queue.blocked}{" "}
                заблокировано
              </span>
            </article>
          </div>
          <section className="report-panel">
            <div className="panel-head">
              <div>
                <small>РАСПРЕДЕЛЕНИЕ СТАТУСОВ</small>
                <h2>Материалы по этапам</h2>
              </div>
            </div>
            <div className="status-bars">
              {statuses.length ? (
                statuses.map(([status, count]) => (
                  <article key={status}>
                    <div>
                      <b>{statusLabels[status] || status}</b>
                      <span>{count}</span>
                    </div>
                    <i
                      style={{
                        width:
                          Math.max(
                            8,
                            Math.round(
                              (count / Math.max(report.totalRequests, 1)) * 100,
                            ),
                          ) + "%",
                      }}
                    />
                  </article>
                ))
              ) : (
                <p>Пока нет заявок для отчёта.</p>
              )}
            </div>
          </section>
          <small className="report-time">
            Отчёт сформирован:{" "}
            {new Date(report.generatedAt).toLocaleString("ru-RU")}
          </small>
        </>
      )}
    </section>
  );
}
function Placeholder({ tab, setTab }) {
  if (tab === "reports") return <Reports />;
  const data = {
    requests: [
      "Заявки",
      "Здесь появится полный список материалов, фильтры по статусу и карточки каждого этапа.",
    ],
    plan: [
      "Контент-план",
      "104 темы, кластеры, спрос, волны публикации и связанные статьи уже ждут своего интерфейса.",
    ],
    queue: [
      "Очередь производства",
      "Последовательность тем, управление запуском и прозрачные статусы.",
    ],
  }[tab] || ["Раздел", "В работе"];
  return (
    <section className="empty-state reveal">
      <span>
        {tab === "plan" ? (
          <Layers3 />
        ) : tab === "queue" ? (
          <Clock3 />
        ) : (
          <FileText />
        )}
      </span>
      <small>СКОРО В LEXIS</small>
      <h2>{data[0]}</h2>
      <p>{data[1]}</p>
      <button className="cta" onClick={() => setTab("overview")}>
        Вернуться к обзору <ArrowRight />
      </button>
    </section>
  );
}
function Auth({ mode, go }) {
  const signup = mode === "signup";
  const [step, setStep] = useState(0),
    [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      company: "",
    }),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  const field =
    signup && step === 0
      ? ["name", "Как вас зовут?", "Например: Мария"]
      : signup && step === 1
        ? ["email", "Ваш рабочий email", "name@company.com"]
        : signup && step === 2
          ? [
              "company",
              "Как называется ваша команда?",
              "Например: Lexis Studio",
            ]
          : !signup && step === 0
            ? ["email", "Ваш e-mail", "name@company.com"]
            : [
                "password",
                signup ? "Создайте пароль" : "С возвращением.",
                "Не менее 8 символов",
              ];
  const final = signup ? step === 3 : step === 1;
  const continueAuth = async () => {
    if (!final) {
      setStep((x) => x + 1);
      return;
    }
    if (signup || !pipelineLiveEnabled) {
      go(signup ? "onboarding" : "app");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await pipelineApi.login(data.email, data.password);
      go("app");
    } catch (e) {
      setError(
        e.message ||
          "Не удалось войти. Проверьте данные и подключение к локальному API.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="auth-page">
      <div className="auth-top">
        <Logo go={go} />
        <button onClick={() => go("home")}>← На главную</button>
      </div>
      <section className="auth-card">
        <div className="auth-orbit">
          <i />
          <i />
          <b>⌁</b>
        </div>
        <small>{signup ? "СОЗДАЙТЕ АККАУНТ" : "LEXIS ACCOUNT"}</small>
        <h1>{field[1]}</h1>
        <p>
          {signup
            ? "Несколько ответов — и ваша редакционная система будет готова к первой заявке."
            : pipelineLiveEnabled
              ? "Войдите в защищённое локальное пространство LEXIS."
              : "Войдите, чтобы посмотреть демонстрацию рабочего пространства."}
        </p>
        {!signup && !pipelineLiveEnabled && (
          <div className="auth-notice">
            Демо-режим · локальный API ещё не включён
          </div>
        )}
        {signup && (
          <div className="auth-progress">
            {[0, 1, 2, 3].map((i) => (
              <i className={i <= step ? "active" : ""} key={i} />
            ))}
          </div>
        )}
        <label>
          <span>
            {field[0] === "password"
              ? "Пароль"
              : field[0] === "email"
                ? "Email"
                : field[0] === "company"
                  ? "Команда"
                  : "Имя"}
          </span>
          <input
            autoFocus
            autoComplete={
              field[0] === "password"
                ? "current-password"
                : field[0] === "email"
                  ? "email"
                  : "off"
            }
            type={field[0] === "password" ? "password" : "text"}
            value={data[field[0]]}
            onChange={(e) => {
              setError("");
              setData((x) => ({ ...x, [field[0]]: e.target.value }));
            }}
            placeholder={field[2]}
          />
        </label>
        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}
        <button
          className="cta wide"
          disabled={!data[field[0]].trim() || loading}
          onClick={continueAuth}
        >
          {loading
            ? "Проверяем доступ…"
            : final
              ? signup
                ? "Создать пространство"
                : "Продолжить"
              : "Продолжить"}{" "}
          <ArrowRight />
        </button>
        {!signup && pipelineLiveEnabled && (
          <button className="auth-text">Не помню пароль</button>
        )}
        <div className="auth-switch">
          {signup ? "Уже есть аккаунт?" : "Впервые в LEXIS?"}{" "}
          <button onClick={() => go(signup ? "login" : "signup")}>
            {signup ? "Войти" : "Попробовать бесплатно"}
          </button>
        </div>
      </section>
    </main>
  );
}
function Onboarding({ go }) {
  const [step, setStep] = useState(0),
    [selected, setSelected] = useState(null);
  const screens = [
    {
      title: "Для кого вы создаёте контент?",
      lead: "Это поможет LEXIS правильно собрать первый бриф.",
      options: [
        ["own", "Для своего бизнеса"],
        ["agency", "Для клиентов агентства"],
        ["editorial", "Для редакционного проекта"],
        ["explore", "Пока изучаю"],
      ],
    },
    {
      title: "Какой язык нужен первым?",
      lead: "Вы сможете добавить второй язык позднее.",
      options: [
        ["ru", "Русский"],
        ["en", "English"],
        ["both", "Русский и English"],
      ],
    },
    {
      title: "Первый поток уже рядом.",
      lead: "Создайте заявку сейчас или сначала посмотрите рабочее пространство.",
      options: [
        ["create", "Создать первый материал"],
        ["explore", "Открыть обзор"],
      ],
    },
  ];
  const screen = screens[step];
  return (
    <main className="auth-page onboarding">
      <div className="auth-top">
        <Logo go={go} />
        <small>ONBOARDING · {step + 1}/3</small>
      </div>
      <section className="onboarding-card">
        <small>ДОБРО ПОЖАЛОВАТЬ В LEXIS</small>
        <h1>{screen.title}</h1>
        <p>{screen.lead}</p>
        <div className="onboarding-options">
          {screen.options.map(([id, label]) => (
            <button
              className={selected === id ? "picked" : ""}
              key={id}
              onClick={() => setSelected(id)}
            >
              <span>{label}</span>
              {selected === id && <Check />}
            </button>
          ))}
        </div>
        <div className="onboarding-actions">
          <button className="ghost" onClick={() => go("app")}>
            Пропустить
          </button>
          <button
            className="cta"
            disabled={!selected}
            onClick={() => (step === 2 ? go("app") : setStep((x) => x + 1))}
          >
            {step === 2 ? "Открыть пространство" : "Продолжить"} <ArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
}
export default function App() {
  const [page, setPage] = useState("home"),
    [menu, setMenu] = useState(false);
  useEffect(() => {
    const onScroll = () =>
      document.querySelectorAll(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < innerHeight * 0.88)
          el.classList.add("shown");
      });
    onScroll();
    addEventListener("scroll", onScroll);
    return () => removeEventListener("scroll", onScroll);
  }, [page]);
  const go = (x) => {
    setPage(x);
    setMenu(false);
    scrollTo({ top: 0, behavior: "smooth" });
  };
  if (page === "app") return <AppShell go={go} />;
  if (page === "login" || page === "signup")
    return <Auth mode={page} go={go} />;
  if (page === "onboarding") return <Onboarding go={go} />;
  if (legalPages[page]) return <LegalPage kind={page} go={go} />;
  const articleMatch = page.match(/^journal\/(\d+)$/);
  const article = articleMatch
    ? journalArticles[Number(articleMatch[1])]
    : null;
  return (
    <>
      <div className="ambient a" />
      <div className="ambient b" />
      <Header go={go} setMenu={setMenu} />
      {menu && (
        <div className="mobile-menu">
          {["Продукт", "Как это работает", "Качество", "Тарифы", "Журнал"].map(
            (n, i) => (
              <button
                key={n}
                onClick={() =>
                  go(["product", "how", "quality", "pricing", "journal"][i])
                }
              >
                {n}
              </button>
            ),
          )}
          <button className="cta" onClick={() => go("signup")}>
            Попробовать бесплатно <ArrowRight />
          </button>
        </div>
      )}
      {article ? (
        <JournalArticle article={article} go={go} />
      ) : page === "home" ? (
        <Landing go={go} />
      ) : (
        <PublicPage kind={page} go={go} />
      )}
      <footer>
        <Logo go={go} />
        <div className="footer-cta">
          <small>КОНТЕНТ — ЭТО ДВИЖЕНИЕ МЫСЛИ</small>
          <b>
            Дайте идее
            <br />
            <em>ясный маршрут.</em>
          </b>
          <button onClick={() => go("signup")}>
            Начать с LEXIS <ArrowRight size={15} />
          </button>
        </div>
        <div className="footer-links">
          <button onClick={() => go("product")}>Продукт</button>
          <button onClick={() => go("journal")}>Журнал</button>
          <button>Telegram</button>
        </div>
        <div className="footer-legal" aria-label="Юридическая информация">
          <button onClick={() => go("privacy")}>Конфиденциальность</button>
          <button onClick={() => go("terms")}>Условия использования</button>
          <button onClick={() => go("payments")}>Правила оплаты</button>
        </div>
        <small>© 2026 LEXIS</small>
      </footer>
    </>
  );
}
