/**
 * Site copy in the three supported languages.
 * Default is Serbian Cyrillic (`sr-cyrl`); the switcher order matches LANGUAGES.
 * Brand names (AKANEYA, PILAR/CARLOTA/MARIE) and the kanji marks are not
 * translated.
 */

export const LANGUAGES = [
  { code: "sr-cyrl", label: "СР" }, // Српски - ћирилица (default)
  { code: "sr-latn", label: "SR" }, // Srpski - latinica
  { code: "en", label: "EN" }, // English
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

export type CityKey = "Madrid" | "Barcelona" | "Paris";

/** A course/drinks board: header + sourcing note + categorised priced items. */
export type MenuBoardData = {
  eyebrow: string;
  heading: string;
  note: string;
  currency: string;
  sections: {
    title: string;
    items: { name: string; desc: string; price: string }[];
  }[];
};

export type Dict = {
  nav: {
    home: string;
    reservations: string;
    gift: string;
    nature: string;
    landmarks: string;
    blog: string;
    accommodation: string;
    contact: string;
  };
  aria: {
    openMenu: string;
    closeMenu: string;
    close: string;
    language: string;
    primary: string;
    legal: string;
  };
  hero: { tagline: string; scroll: string };
  blog: {
    hero: { eyebrow: string; title: string; lead: string };
    latest: string;
    heading: string;
    all: string;
    readMore: string;
    minRead: string;
    backToBlog: string;
    related: string;
  };
  landmarks: {
    hero: { eyebrow: string; tagline: string };
    intro: { heading: string; body: string };
    featured: {
      eyebrow: string;
      heading: string;
      items: { name: string; desc: string; distance: string }[];
    };
    list: {
      heading: string;
      items: { name: string; desc: string; distance: string }[];
    };
  };
  accommodation: {
    hero: {
      eyebrow: string;
      tagline: string;
      reservation: string;
    };
    intro: {
      eyebrow: string;
      heading: string;
      body: string;
    };
    units: {
      eyebrow: string;
      heading: string;
      items: { name: string; desc: string; features: string[] }[];
    };
    spaces: {
      eyebrow: string;
      heading: string;
      items: { name: string; desc: string; features: string[] }[];
    };
    leisure: {
      eyebrow: string;
      heading: string;
      body: string;
      cards: string[];
    };
    amenities: {
      eyebrow: string;
      heading: string;
      sections: { title: string; items: string[] }[];
    };
    reservation: {
      eyebrow: string;
      heading: string;
      ratingNote: string;
      fromLabel: string;
      unit: string;
      unitPlaceholder: string;
      checkin: string;
      checkout: string;
      guests: string;
      name: string;
      email: string;
      phone: string;
      message: string;
      book: string;
      perNight: string;
      nights: string;
      total: string;
      currency: string;
      available: string;
      unavailable: string;
      selectDates: string;
      capacity: string;
      successTitle: string;
      successBody: string;
      codeLabel: string;
      errorDates: string;
      errorCapacity: string;
      errorUnavailable: string;
      errorInvalid: string;
    };
  };
  restaurant: {
    hero: {
      eyebrow: string;
      tagline: string;
      reservation: string;
      menu: string;
    };
    intro: {
      eyebrow: string;
      heading: string;
      body: string;
      cta: string;
    };
    slowFood: {
      eyebrow: string;
      heading: string;
      body: string;
    };
    concept: { name: string; body: string }[];
    daily: {
      eyebrow: string;
      heading: string;
      items: { title: string; desc: string; price: string }[];
    };
    menuList: MenuBoardData;
    drinksList: MenuBoardData;
  };
  history: { heading: string; body: string };
  profile: { name: string; bio: string };
  featured: { paragraph: string };
  sidebar: {
    restaurantsLabel: string;
    finestLabel: string;
    finest: string[];
  };
  cities: Record<CityKey, string>;
  restaurants: { categories: string[] };
  contact: {
    title: string;
    address: string;
    follow: string;
    page: {
      eyebrow: string;
      tagline: string;
      introHeading: string;
      introBody: string;
      detailsLabel: string;
      addressLabel: string;
      phoneLabel: string;
      emailLabel: string;
      hoursLabel: string;
      hours: string[];
      followLabel: string;
      formHeading: string;
      formNote: string;
      name: string;
      email: string;
      subject: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
      send: string;
      successTitle: string;
      successBody: string;
      mapLabel: string;
      mapHeading: string;
      directions: string;
    };
  };
  events: {
    hero: { eyebrow: string; tagline: string };
    intro: { heading: string; body: string };
    celebrations: {
      eyebrow: string;
      heading: string;
      intro: string;
      items: { name: string; excerpt: string; desc: string; points: string[] }[];
    };
    activities: {
      eyebrow: string;
      heading: string;
      body: string;
      items: { name: string; tag: string; desc: string; body: string }[];
    };
    cta: { eyebrow: string; heading: string; body: string; button: string };
  };
  footer: { links: string[]; copyright: string; explore: string; tagline: string };
  notFound: { eyebrow: string; title: string; body: string; home: string };
};

export const dictionaries: Record<LangCode, Dict> = {
  "sr-cyrl": {
    nav: {
      home: "Почетна",
      reservations: "Резервације",
      gift: "Поклон",
      nature: "Природа",
      landmarks: "Знаменитости",
      blog: "Блог",
      accommodation: "Смештај",
      contact: "Контакт",
    },
    aria: {
      openMenu: "Отвори мени",
      closeMenu: "Затвори мени",
      close: "Затвори",
      language: "Језик",
      primary: "Главна навигација",
      legal: "Правно",
    },
    hero: {
      tagline:
        "Где традиција сусреће луксуз, а гостопримство постаје уметност",
      scroll: "Скролуј",
    },
    blog: {
      hero: {
        eyebrow: "Приче са имања",
        title: "Блог",
        lead: "Приче с имања Милева - о храни с ватре, тишини Шумадије и данима који се памте.",
      },
      latest: "Најновије",
      heading: "Све приче",
      all: "Све",
      readMore: "Читај више",
      minRead: "мин читања",
      backToBlog: "Назад на блог",
      related: "Још са блога",
    },
    landmarks: {
      hero: {
        eyebrow: "Знаменитости",
        tagline: "Природа, историја и духовно наслеђе Шумадије - надомак Милеве.",
      },
      intro: {
        heading: "Шумадија око вас - брда, реке и векови приче.",
        body: "Гривац и његова околина крију мирну шумадијску природу и богато културно наслеђе. Од језера и планинских видика до средњовековних манастира - све је надомак руке, а идеалан полазак управо је Милева.",
      },
      featured: {
        eyebrow: "Издвојено",
        heading: "Најлепше на дохват руке.",
        items: [
          {
            name: "Гружанско језеро",
            desc: "Мирно вештачко језеро у општини Кнић, настало преграђивањем реке Груже. Омиљено је одредиште за риболов, лагане шетње уз обалу и посматрање птица - станиште је за десетине врста. Опкољено благим брдима и салашима, савршено је за спор дан у природи, само десетак минута вожње од имања.",
            distance: "~10 km",
          },
          {
            name: "Шумарице, Крагујевац",
            desc: "Спомен-парк у Крагујевцу, првој престоници модерне Србије, посвећен цивилима страдалим у октобру 1941. године. Кроз зеленило се простиру монументи, међу којима је најпознатији споменик „Прекинути лет“. То је место тихог сећања и шетње, али и живописан парк за одмор - удаљен око тридесет километара од Гривца.",
            distance: "~30 km",
          },
          {
            name: "Аеродром Морава",
            desc: "Регионални аеродром код Краљева (Лађевци), који повезује централну Србију са неколико европских дестинација. Модеран путнички терминал отворен је последњих година и полако шири мрежу летова. За госте који долазе издалека, то је најближа ваздушна капија - на око тридесетак километара од Гривца.",
            distance: "~34 km",
          },
        ],
      },
      list: {
        heading: "Још у близини",
        items: [
          {
            name: "Планина Рудник",
            desc: "Највиши врх Шумадије (Цвијићев врх, 1132 m) - планински ваздух, шуме и стазе, са бањским центром у подножју.",
            distance: "~35 km",
          },
          {
            name: "Манастир Каленић",
            desc: "Бисер моравске школе на обронцима Гледићких планина, с почетка 15. века.",
            distance: "~45 km",
          },
          {
            name: "Манастир Жича",
            desc: "Црвена задужбина из 13. века код Краљева - крунидбена црква српских краљева и седиште прве српске архиепископије.",
            distance: "~48 km",
          },
          {
            name: "Опленац, Топола",
            desc: "Задужбина Карађорђа - петокуполна црква Светог Ђорђа са мозаицима и маузолеј династије Карађорђевић на брегу изнад Тополе.",
            distance: "~50 km",
          },
        ],
      },
    },
    accommodation: {
      hero: {
        eyebrow: "Смештај",
        tagline: "Топло уређене јединице и мир природе - у срцу Шумадије",
        reservation: "Резервација",
      },
      intro: {
        eyebrow: "Упознајте смештај",
        heading:
          "Дом у срцу Шумадије, у мирном селу Гривац.",
        body: "Милева Концепт је ресторан и смештај у мирном селу Гривац - климатизован апартман од 60 m² за до четворо гостију, уз башту, терасу, базен са сланом водом, бесплатан приватни паркинг и Wi-Fi. Приватан улаз, звучна изолација и потпуно опремљена кухиња доносе пуну приватност и мир.",
      },
      units: {
        eyebrow: "Апартман",
        heading: "Резервишите цео апартман.",
        items: [
          {
            name: "Апартман Милева",
            desc: "Климатизован апартман од 60 m² - спаваћа соба, дневни боравак и потпуно опремљена кухиња, за до четворо гостију.",
            features: ["60 m²", "До 4 госта", "1 купатило"],
          },
        ],
      },
      spaces: {
        eyebrow: "Апартман",
        heading: "Простор за четворо, у срцу Шумадије.",
        items: [
          {
            name: "Спаваћа соба",
            desc: "Мирна спаваћа соба са удобним креветом, климом и звучном изолацијом - за потпун одмор.",
            features: ["Двоструки кревет", "Клима", "Звучна изолација"],
          },
          {
            name: "Дневни боравак",
            desc: "Пространи дневни боравак са каучем на развлачење и телевизором - место за још двоје гостију.",
            features: ["Кауч на развлачење", "ТВ", "За двоје додатно"],
          },
          {
            name: "Кухиња и трпезарија",
            desc: "Потпуно опремљена кухиња са фрижидером и простором за обедовање - као код куће.",
            features: ["Потпуно опремљена", "Фрижидер", "Трпезарија"],
          },
          {
            name: "Тераса и башта",
            desc: "Приватан улаз, тераса и башта са погледом на зеленило и приступом базену са сланом водом.",
            features: ["Тераса", "Башта", "Приступ базену"],
          },
        ],
      },
      leisure: {
        eyebrow: "Базени и прославе",
        heading: "Дани поред воде и вечери за памћење.",
        body: "Отворени сезонски базен са сланом водом дочарава осећај мора - окружен зеленилом и тишином Шумадије, идеалан за спора летња поподнева. Уз бар на имању, доручак à la carte и простор за пикник, дани поред воде лако прелазе у вечери за памћење - прославе, породична окупљања и приватне догађаје.",
        cards: ["Базени", "Базени", "Прославе", "Прославе"],
      },
      amenities: {
        eyebrow: "Садржај",
        heading: "Све што вам треба за миран боравак.",
        sections: [
          {
            title: "Смештај",
            items: [
              "Клима уређај",
              "Грејање",
              "Потпуно опремљена кухиња (фрижидер, кувало, посуђе)",
              "Трпезаријски сто",
              "Веш машина",
              "ТВ",
              "Купатило (туш, када, биде, бадемантили, фен)",
              "Приватан улаз",
              "Звучна изолација",
              "Балкон",
              "Пешкири и постељина",
            ],
          },
          {
            title: "Имање и услуге",
            items: [
              "Башта",
              "Тераса",
              "Бесплатан приватни паркинг",
              "Бесплатан Wi-Fi",
              "Целодневно обезбеђење (видео надзор)",
              "Противпожарна заштита",
              "Приземље, приступ за колица",
              "Кућни љубимци на упит",
            ],
          },
          {
            title: "Уживање",
            items: [
              "Сезонски базен са сланом водом",
              "Простор за пикник",
              "Доручак à la carte",
              "Ресторан и бар на имању",
            ],
          },
        ],
      },
      reservation: {
        eyebrow: "Резервација",
        heading: "Резервишите свој боравак.",
        ratingNote: "Оцена гостију 10/10",
        fromLabel: "од",
        unit: "Смештајна јединица",
        unitPlaceholder: "Изаберите јединицу",
        checkin: "Долазак",
        checkout: "Одлазак",
        guests: "Број гостију",
        name: "Име и презиме",
        email: "Имејл",
        phone: "Телефон",
        message: "Напомена",
        book: "Резервиши",
        perNight: "по ноћи",
        nights: "ноћи",
        total: "Укупно",
        currency: "€",
        available: "Слободно за изабране датуме",
        unavailable: "Заузето за изабране датуме",
        selectDates: "Изаберите датуме да видите цену и доступност.",
        capacity: "до {n} гостију",
        successTitle: "Резервација потврђена",
        successBody: "Хвала! Забележили смо вашу резервацију.",
        codeLabel: "Број резервације",
        errorDates: "Датум одласка мора бити после датума доласка.",
        errorCapacity: "Изабрана јединица прима до {n} гостију.",
        errorUnavailable: "Нажалост, термин је управо заузет. Покушајте са другим датумима.",
        errorInvalid: "Молимо попуните сва обавезна поља.",
      },
    },
    restaurant: {
      hero: {
        eyebrow: "Ресторан",
        tagline: "Ватра, укус и гостопримство - у срцу Шумадије",
        reservation: "Резервација",
        menu: "Јеловник",
      },
      intro: {
        eyebrow: "Упознајте ресторан",
        heading:
          "Милева. Ресторан рођен из ватре и дрвета. У срцу Шумадије.",
        body: "Традиција, ватра и пажљиво биране намирнице воде нас до отвореног огњишта усред Шумадије. Јединствен ритуал који буди сва чула.",
        cta: "Сазнајте више",
      },
      slowFood: {
        eyebrow: "Спора храна",
        heading: "Спора кухиња, искрен укус",
        body: "Верујемо у спору храну - јела која настају без журбе, на отвореној ватри и жару, онако како се кувало генерацијама. Све намирнице долазе из домаћинстава у кругу од двадесетак километара: поврће, месо, млечни производи и зачини са околних имања. Тако сваки тањир носи укус овог поднебља и руку људи који га стварају.",
      },
      concept: [
        {
          name: "Аутентичан укус",
          body: "Кухиња Милеве почива на рецептима шумадијског краја - јела спремамо онако како су се спремала генерацијама, без пречица и вештачких додатака. Укус који памтите из бакине кухиње, само уз мало више пажње на сваком тањиру.",
        },
        {
          name: "Локалне намирнице",
          body: "Намирнице стижу са оближњих домаћинстава и из сопствене баште - сезонско поврће, домаће месо, сир, мед и зачинско биље. Знамо порекло сваког састојка, па сваки тањир носи укус краја у ком је настао.",
        },
        {
          name: "Спора припрема",
          body: "Не журимо. Месо се пече сатима под сачем, чорбе се крчкају полако, хлеб се меси и пече на лицу места. Спора припрема је наш начин да сваком јелу дамо пуноћу укуса коју брза кухиња не може.",
        },
      ],
      daily: {
        eyebrow: "Препорука дана",
        heading: "Данас препоручујемо",
        items: [
          {
            title: "Пихтије",
            desc: "Старо српско јело у Милевином руху - по нашој рецептури, са пажљиво бираним састојцима који дају савршен баланс традиције и укуса. Јер код нас се чува оно старо, али се увек дода и нешто наше.",
            price: "",
          },
          {
            title: "Јесен у Милеви",
            desc: "Јесен је стигла у Милева концепт, а с њом и нове боје, мириси и укуси нашег менија. Топли састојци, аутентичан укус и сезонске намирнице које волимо - баш онако како јесен заслужује.",
            price: "",
          },
          {
            title: "Нови мени",
            desc: "Пажљиво осмишљена јела која освајају на први залогај и остају у сећању. Укуси који радују, детаљи који праве разлику и атмосфера у којој се ужива полако - уз чашу доброг вина која заокружује сваки тренутак.",
            price: "",
          },
        ],
      },
      menuList: {
        eyebrow: "Јеловник",
        heading: "Укуси Шумадије",
        note: "Све намирнице потичу из домаћинстава у кругу од двадесетак километара.",
        currency: "дин",
        sections: [
          {
            title: "Предјела",
            items: [
              { name: "Шумадијска плоча", desc: "Кајмак, млади сир, домаћи кулен и пршута уз топлу пројицу.", price: "890" },
              { name: "Пихтије", desc: "Традиционалне, са домаћим сирћетом и белим луком.", price: "520" },
              { name: "Проја са кајмаком", desc: "Топла проја од белог кукуруза и зрелог кајмака.", price: "430" },
              { name: "Ајвар и туршија", desc: "Печени ајвар од бабуре уз зимницу из подрума.", price: "390" },
            ],
          },
          {
            title: "Са жара и испод сача",
            items: [
              { name: "Јагњетина испод сача", desc: "Споро печена, са младим кромпиром и рузмарином.", price: "1980" },
              { name: "Прасетина са ражња", desc: "Хрскава кожица, сочно месо са домаћег имања.", price: "1780" },
              { name: "Шумадијски роштиљ", desc: "Вешалица, ћевапи, пуњена пљескавица и кобасица.", price: "1450" },
              { name: "Караџорђева шницла", desc: "Пуњена кајмаком, панирана, уз тартар.", price: "1350" },
              { name: "Мућкалица", desc: "Свињетина, паприка и лук динстани на тихој ватри.", price: "1180" },
            ],
          },
          {
            title: "Дезерти",
            items: [
              { name: "Штрудла са маком", desc: "Ручно развучено тесто, по рецепту из старе куће.", price: "480" },
              { name: "Гибаница са орасима", desc: "Топла, уз кашику киселог млека.", price: "450" },
              { name: "Ванилице", desc: "Домаће, са слатком од шљива.", price: "360" },
            ],
          },
          {
            title: "Из подрума",
            items: [
              { name: "Шумадијска шљивовица", desc: "Двоструко печена, из храстовог бурета. (0,03 л)", price: "280" },
              { name: "Домаћа лозовача", desc: "Бистра, зрела, из околних винограда. (0,03 л)", price: "300" },
              { name: "Прокупац", desc: "Отворено вино из шумадијских подрума. (0,15 л)", price: "320" },
            ],
          },
        ],
      },
      drinksList: {
        eyebrow: "Карта пића",
        heading: "Домаћа точионица",
        note: "Ракије печене у нашој казаници и вина из околних подрума.",
        currency: "дин",
        sections: [
          {
            title: "Ракије (0,03 л)",
            items: [
              { name: "Шљивовица", desc: "Двоструко печена, из храстовог бурета.", price: "280" },
              { name: "Лозовача", desc: "Бистра и зрела, из околних винограда.", price: "300" },
              { name: "Кајсијевача", desc: "Мека и воћна, из шумадијских воћњака.", price: "320" },
              { name: "Дуњевача", desc: "Пуног мириса, одлежала три године.", price: "340" },
              { name: "Медовача", desc: "Блага, са домаћим багремовим медом.", price: "300" },
            ],
          },
          {
            title: "Вина (чаша, 0,15 л)",
            items: [
              { name: "Прокупац", desc: "Домаће црвено из шумадијских подрума.", price: "320" },
              { name: "Тамјаника", desc: "Ароматично бело, полусуво.", price: "340" },
              { name: "Розе", desc: "Свеже, воћно и лагано.", price: "320" },
            ],
          },
          {
            title: "Пиво",
            items: [
              { name: "Точено (0,3 л)", desc: "Лагер из мале пиваре.", price: "260" },
              { name: "Крафт (0,33 л)", desc: "Променљиве сорте - питајте особље.", price: "360" },
            ],
          },
          {
            title: "Топли напици",
            items: [
              { name: "Домаћа кафа", desc: "Кувана на песку, уз ратлук.", price: "180" },
              { name: "Чај од шумског биља", desc: "Нана, мајчина душица, камилица.", price: "200" },
              { name: "Топла чоколада", desc: "Густа, са домаћим млеком.", price: "260" },
            ],
          },
          {
            title: "Освежење",
            items: [
              { name: "Домаћа лимунада", desc: "Са наном и мало меда.", price: "240" },
              { name: "Сок од боровнице", desc: "Цеђен, из наше баште.", price: "240" },
              { name: "Вода (0,75 л)", desc: "Изворска, газирана или негазирана.", price: "200" },
            ],
          },
        ],
      },
    },
    history: {
      heading: "Добродошли",
      body: "Смештено у мирном и живописном селу Гривац, у општини Кнић, одмаралиште Милева концепт представља праву оазу спокоја и уживања. Ово ексклузивно место, пажљиво осмишљено и грађено с љубављу према детаљима, идеално је за све који траже бег од свакодневице и додир с природом, без одрицања од комфора.",
    },
    profile: {
      name: "Милева концепт",
      bio: "Милева концепт обједињује врхунски ресторан, четири топло уређене смештајне јединице и отворени базен са сланом водом који купачима дочарава осећај мора - у самом срцу Шумадије. Очувана архитектура традиционалног села, ненаметљиво спојена са савременим материјалима, даје му посебну драж. Топлина дрвета и камена, звуци природе и пажљиво бирани детаљи чине сваки боравак изузетним - било да тражите романтичан викенд, породични одмор или простор за приватне прославе и догађаје.",
    },
    featured: {
      paragraph:
        "Чулни предах у којем се време раствара између мирне воде и мириса шуме. Базени са сланом водом, топлина дрвета и отворено небо - мир мора, у срцу Шумадије.",
    },
    sidebar: {
      restaurantsLabel: "Ресторани - Сумибијаки",
      finestLabel: "Најбоље из Јапана",
      finest: ["Ито ранч", "Мацусака говедина", "Кобе говедина", "Краун диња"],
    },
    cities: { Madrid: "Мадрид", Barcelona: "Барселона", Paris: "Париз" },
    restaurants: { categories: ["Ресторан", "Смештај", "Догађаји"] },
    contact: {
      title: "Контакт",
      address: "Гривац бб, 34240 Кнић, Србија",
      follow: "Пратите нас",
      page: {
        eyebrow: "Јавите нам се",
        tagline:
          "Ту смо за свако питање - резервације, прославе и мирне дане у срцу Шумадије.",
        introHeading: "Разговарајмо о вашем боравку",
        introBody:
          "Планирате викенд поред воде, породичну прославу или дужи одмор? Пишите нам или позовите - помоћи ћемо вам да све испланирате и одговорити у најкраћем року.",
        detailsLabel: "Детаљи",
        addressLabel: "Адреса",
        phoneLabel: "Телефон",
        emailLabel: "Имејл",
        hoursLabel: "Радно време",
        hours: ["Понедељак - Петак  ·  09-21", "Субота - Недеља  ·  09-23"],
        followLabel: "Пратите нас",
        formHeading: "Пошаљите поруку",
        formNote: "Одговарамо у року од 24 сата.",
        name: "Име и презиме",
        email: "Имејл",
        subject: "Наслов",
        message: "Порука",
        namePlaceholder: "Ваше име",
        emailPlaceholder: "vas@email.rs",
        subjectPlaceholder: "О чему се ради?",
        messagePlaceholder: "Ваша порука…",
        send: "Пошаљи поруку",
        successTitle: "Хвала вам!",
        successBody:
          "Ваша порука је послата. Јавићемо вам се у најкраћем могућем року.",
        mapLabel: "Локација",
        mapHeading: "Гривац, у срцу Шумадије",
        directions: "Отвори у мапама",
      },
    },
    events: {
      hero: {
        eyebrow: "Догађаји",
        tagline:
          "Свадбе, славе и прославе у амбијенту који се памти - у срцу Шумадије.",
      },
      intro: {
        heading: "Прославе и доживљаји на једном месту.",
        body: "Милева није само простор за славље - то је имање на коме дан почиње доручком у башти, а завршава игром поред ватре. Организујемо велике прославе, али и авантуре у природи Шумадије, за оне који боравак желе да напуне доживљајима.",
      },
      celebrations: {
        eyebrow: "Прославе",
        heading: "За сваку прилику.",
        intro: "Милева је имање створено за окупљања. Сваки повод има свој ритам, а ми га пратимо - од тихих породичних слава до великих свадби које трају до зоре. Изаберите прилику и погледајте како је замишљамо.",
        items: [
          {
            name: "Венчања",
            excerpt: "Целодневна прослава под ведрим небом - церемонија у башти, коктел уз базен и весеље до зоре, за до 200 гостију.",
            desc: "Венчање на имању је целодневна прослава под ведрим небом: церемонија у башти, коктел уз базен и весеље које траје до касно у ноћ. Отворени простор прима до 200 гостију, а амбијент шумадијских брда сваку фотографију чини посебном. Кетеринг, декорацију и распоред столова прилагођавамо вашој визији - од интимних свадби у кругу најближих до великих слава са музиком уживо. Ту смо да вам детаљи не буду брига, него уживање.",
            points: ["до 200 гостију", "церемонија на отвореном", "кетеринг и декор", "паркинг за госте"],
          },
          {
            name: "Рођендани и прославе",
            excerpt: "Породична слава, крштење, рођендан или годишњица - топао амбијент и простор који окупља неколико генерација за истим столом.",
            desc: "Породична слава, крштење, рођендан или годишњица - најлепши тренуци заслужују топао амбијент и простор који окупља неколико генерација за истим столом. Мени прилагођавамо посном или мрсном столу и поштујемо обичаје, а лети се славље природно сели напоље, поред базена и баште. Од дечјих рођендана до великих журки за пунолетство и јубилеје - ви бирате повод и госте, а ми се бринемо да све тече глатко и срдачно, онако како приличи породичном слављу.",
            points: ["породични мени", "посна и мрсна трпеза", "базен и башта", "музика до касно"],
          },
          {
            name: "Позоришне представе",
            excerpt: "Лети башта и простор поред базена постају природна позорница - гостујуће трупе, вечери поезије и представе под звездама.",
            desc: "Имање волимо да оживимо и представом под ведрим небом - башта и простор поред базена лети постају природна позорница. Угошћујемо путујуће трупе и локалне ансамбле, приређујемо вечери поезије и мале сцене за публику која вечера под звездама. Уметност нам је једнако важна као и гостопримство, па сцену, тон и светло постављамо тако да представа и амбијент раде заједно.",
            points: ["сцена на отвореном", "гостујуће трупе", "вечери под звездама", "тон и светло"],
          },
          {
            name: "Изложбе и симпозијуми",
            excerpt: "Слике, фотографије и радове ликовних уметника постављамо у сали, башти и поред базена, уз колоније, разговоре и књижевне вечери.",
            desc: "Просторе имања радо уступамо и уметности и идејама - слике, фотографије и радове ликовних уметника постављамо у сали, башти и поред базена, а окупљања посвећена стваралаштву, попут ликовних колонија, књижевних вечери и стручних сусрета, добијају мир какав градске сале немају. Приређујемо отварања, разговоре и мале поставке, а распоред, светло и тон прилагођавамо сваком аутору и теми. Уметност нам је једнако важна као и гостопримство, па гости остају и на ноћењу, да доживљај траје и после званичног дела.",
            points: ["ликовне поставке", "отварања и разговори", "ликовне колоније", "смештај на лицу места"],
          },
        ],
      },
      activities: {
        eyebrow: "Доживљаји",
        heading: "Авантура на прагу Шумадије.",
        body: "Испуните дан у седлу, на точковима или пешке кроз брда - сами, у пару или са екипом.",
        items: [
          {
            name: "Јахање коња",
            tag: "у седлу",
            desc: "Мирне јахачке стазе кроз ливаде и шуму, уз пратњу водича, за почетнике и искусне.",
            body: "Јахање на имању почиње кратким упознавањем са коњима и основама у седлу, па тек онда крећемо у мирну шетњу ливадама и шумским стазама. Водич је уз вас целим путем, темпо прилагођавамо групи, а руте бирамо према искуству - од лаганих кругова за прве покушаје до дужих излета за оне који већ седе сигурно. Опрема и заштитне кациге су обезбеђене, а јахање организујемо и за децу уз посебан надзор. После стазе најлепше је вратити се на терасу и одморити уз поглед на брда.",
          },
          {
            name: "Панорамске руте",
            tag: "пешке и бициклом",
            desc: "Обележене стазе кроз шумадијска брда, до видиковаца, језера и старих салаша.",
            body: "Око имања се пружа мрежа обележених стаза кроз шумадијска брда - неке су кратке шетње до најближег видиковца, друге целодневни излети до језера, старих салаша и запуштених воденица. Руте су погодне и за пешаке и за бициклисте, а тежину бирате сами: од опуштених спустова до успона који награђују погледом на цео крај. На полазку добијате мапу и препоруке, а по жељи и пратњу водича који познаје сваку пречицу. За повратак спремамо ланч-пакет или топли оброк на тераси.",
          },
          {
            name: "Квадови (АТВ)",
            tag: "адреналин",
            desc: "Вожња четвороточкашима теренима око имања - за групе и појединце жељне брзине.",
            body: "За оне који траже мало адреналина, вожња квадовима води теренима око имања - блатњавим стазама, шумским путевима и отвореним пољанама. Пре поласка следи кратка обука и провера опреме, а вожњу увек прати искусан водич који бира руту према условима и искуству групе. Кациге и заштита су обавезни и обезбеђени, а маршуте прилагођавамо - од лежерне вожње за почетнике до захтевнијих деоница за искусне. Идеално за групе, момачке и девојачке дане и све који желе активан дан у природи.",
          },
          {
            name: "Пикник и роштиљ",
            tag: "поред воде",
            desc: "Опремљена места за пикник и роштиљ на отвореном, за опуштене дане у природи.",
            body: "Опремљена места за пикник и роштиљ распоређена су по имању - у хладу поред воде, на ивици ливаде или уз баштенску терасу. Донесите своје друштво, а ми припремамо роштиљ, дрва, столове и све што треба, или уз најаву спремамо мени по вашој жељи. Ово су лежерни, целодневни планови: деца се играју на трави, старији дремају у хладу, а дан се лагано претаче у вечеру под отвореним небом. Савршен завршетак после јахања, руте или вожње квадовима.",
          },
        ],
      },
      cta: {
        eyebrow: "Планирате догађај?",
        heading: "Испричајте нам своју идеју.",
        body: "Прослава, јахање, руте или квадови - јавите се и заједно ћемо испланирати сваки детаљ.",
        button: "Контактирајте нас",
      },
    },
    footer: {
      links: ["Политика колачића", "Политика приватности", "Правне напомене"],
      copyright: "© 2026 Милева концепт",
      explore: "Навигација",
      tagline: "Где традиција сусреће луксуз, а гостопримство постаје уметност.",
    },
    notFound: {
      eyebrow: "Грешка 404",
      title: "Залутали сте са стазе",
      body: "Страница коју тражите не постоји или је премештена. Вратите се на почетну и наставите разгледање Милеве.",
      home: "Назад на почетну",
    },
  },

  "sr-latn": {
    nav: {
      home: "Početna",
      reservations: "Rezervacije",
      gift: "Poklon",
      nature: "Priroda",
      landmarks: "Znamenitosti",
      blog: "Blog",
      accommodation: "Smeštaj",
      contact: "Kontakt",
    },
    aria: {
      openMenu: "Otvori meni",
      closeMenu: "Zatvori meni",
      close: "Zatvori",
      language: "Jezik",
      primary: "Glavna navigacija",
      legal: "Pravno",
    },
    hero: {
      tagline:
        "Gde tradicija susreće luksuz, a gostoprimstvo postaje umetnost",
      scroll: "Skroluj",
    },
    blog: {
      hero: {
        eyebrow: "Priče sa imanja",
        title: "Blog",
        lead: "Priče sa imanja Mileva - o hrani s vatre, tišini Šumadije i danima koji se pamte.",
      },
      latest: "Najnovije",
      heading: "Sve priče",
      all: "Sve",
      readMore: "Čitaj više",
      minRead: "min čitanja",
      backToBlog: "Nazad na blog",
      related: "Još sa bloga",
    },
    landmarks: {
      hero: {
        eyebrow: "Znamenitosti",
        tagline: "Priroda, istorija i duhovno nasleđe Šumadije - nadomak Mileve.",
      },
      intro: {
        heading: "Šumadija oko vas - brda, reke i vekovi priče.",
        body: "Grivac i njegova okolina kriju mirnu šumadijsku prirodu i bogato kulturno nasleđe. Od jezera i planinskih vidika do srednjovekovnih manastira - sve je nadomak ruke, a idealan polazak upravo je Mileva.",
      },
      featured: {
        eyebrow: "Izdvojeno",
        heading: "Najlepše na dohvat ruke.",
        items: [
          {
            name: "Gružansko jezero",
            desc: "Mirno veštačko jezero u opštini Knić, nastalo pregrađivanjem reke Gruže. Omiljeno je odredište za ribolov, lagane šetnje uz obalu i posmatranje ptica - stanište je za desetine vrsta. Opkoljeno blagim brdima i salašima, savršeno je za spor dan u prirodi, samo desetak minuta vožnje od imanja.",
            distance: "~10 km",
          },
          {
            name: "Šumarice, Kragujevac",
            desc: "Spomen-park u Kragujevcu, prvoj prestonici moderne Srbije, posvećen civilima stradalim u oktobru 1941. godine. Kroz zelenilo se prostiru monumenti, među kojima je najpoznatiji spomenik „Prekinuti let“. To je mesto tihog sećanja i šetnje, ali i živopisan park za odmor - udaljen oko trideset kilometara od Grivca.",
            distance: "~30 km",
          },
          {
            name: "Aerodrom Morava",
            desc: "Regionalni aerodrom kod Kraljeva (Lađevci), koji povezuje centralnu Srbiju sa nekoliko evropskih destinacija. Moderan putnički terminal otvoren je poslednjih godina i polako širi mrežu letova. Za goste koji dolaze izdaleka, to je najbliža vazdušna kapija - na oko tridesetak kilometara od Grivca.",
            distance: "~34 km",
          },
        ],
      },
      list: {
        heading: "Još u blizini",
        items: [
          {
            name: "Planina Rudnik",
            desc: "Najviši vrh Šumadije (Cvijićev vrh, 1132 m) - planinski vazduh, šume i staze, sa banjskim centrom u podnožju.",
            distance: "~35 km",
          },
          {
            name: "Manastir Kalenić",
            desc: "Biser moravske škole na obroncima Gledićkih planina, s početka 15. veka.",
            distance: "~45 km",
          },
          {
            name: "Manastir Žiča",
            desc: "Crvena zadužbina iz 13. veka kod Kraljeva - krunidbena crkva srpskih kraljeva i sedište prve srpske arhiepiskopije.",
            distance: "~48 km",
          },
          {
            name: "Oplenac, Topola",
            desc: "Zadužbina Karađorđa - petokupolna crkva Svetog Đorđa sa mozaicima i mauzolej dinastije Karađorđević na bregu iznad Topole.",
            distance: "~50 km",
          },
        ],
      },
    },
    accommodation: {
      hero: {
        eyebrow: "Smeštaj",
        tagline: "Toplo uređene jedinice i mir prirode - u srcu Šumadije",
        reservation: "Rezervacija",
      },
      intro: {
        eyebrow: "Upoznajte smeštaj",
        heading:
          "Dom u srcu Šumadije, u mirnom selu Grivac.",
        body: "Mileva Koncept je restoran i smeštaj u mirnom selu Grivac - klimatizovan apartman od 60 m² za do četvoro gostiju, uz baštu, terasu, bazen sa slanom vodom, besplatan privatni parking i Wi-Fi. Privatan ulaz, zvučna izolacija i potpuno opremljena kuhinja donose punu privatnost i mir.",
      },
      units: {
        eyebrow: "Apartman",
        heading: "Rezervišite ceo apartman.",
        items: [
          {
            name: "Apartman Mileva",
            desc: "Klimatizovan apartman od 60 m² - spavaća soba, dnevni boravak i potpuno opremljena kuhinja, za do četvoro gostiju.",
            features: ["60 m²", "Do 4 gosta", "1 kupatilo"],
          },
        ],
      },
      spaces: {
        eyebrow: "Apartman",
        heading: "Prostor za četvoro, u srcu Šumadije.",
        items: [
          {
            name: "Spavaća soba",
            desc: "Mirna spavaća soba sa udobnim krevetom, klimom i zvučnom izolacijom - za potpun odmor.",
            features: ["Dvostruki krevet", "Klima", "Zvučna izolacija"],
          },
          {
            name: "Dnevni boravak",
            desc: "Prostrani dnevni boravak sa kaučem na razvlačenje i televizorom - mesto za još dvoje gostiju.",
            features: ["Kauč na razvlačenje", "TV", "Za dvoje dodatno"],
          },
          {
            name: "Kuhinja i trpezarija",
            desc: "Potpuno opremljena kuhinja sa frižiderom i prostorom za obedovanje - kao kod kuće.",
            features: ["Potpuno opremljena", "Frižider", "Trpezarija"],
          },
          {
            name: "Terasa i bašta",
            desc: "Privatan ulaz, terasa i bašta sa pogledom na zelenilo i pristupom bazenu sa slanom vodom.",
            features: ["Terasa", "Bašta", "Pristup bazenu"],
          },
        ],
      },
      leisure: {
        eyebrow: "Bazeni i proslave",
        heading: "Dani pored vode i večeri za pamćenje.",
        body: "Otvoreni sezonski bazen sa slanom vodom dočarava osećaj mora - okružen zelenilom i tišinom Šumadije, idealan za spora letnja popodneva. Uz bar na imanju, doručak à la carte i prostor za piknik, dani pored vode lako prelaze u večeri za pamćenje - proslave, porodična okupljanja i privatne događaje.",
        cards: ["Bazeni", "Bazeni", "Proslave", "Proslave"],
      },
      amenities: {
        eyebrow: "Sadržaj",
        heading: "Sve što vam treba za miran boravak.",
        sections: [
          {
            title: "Smeštaj",
            items: [
              "Klima uređaj",
              "Grejanje",
              "Potpuno opremljena kuhinja (frižider, kuvalo, posuđe)",
              "Trpezarijski sto",
              "Veš mašina",
              "TV",
              "Kupatilo (tuš, kada, bide, bademantili, fen)",
              "Privatan ulaz",
              "Zvučna izolacija",
              "Balkon",
              "Peškiri i posteljina",
            ],
          },
          {
            title: "Imanje i usluge",
            items: [
              "Bašta",
              "Terasa",
              "Besplatan privatni parking",
              "Besplatan Wi-Fi",
              "Celodnevno obezbeđenje (video nadzor)",
              "Protivpožarna zaštita",
              "Prizemlje, pristup za kolica",
              "Kućni ljubimci na upit",
            ],
          },
          {
            title: "Uživanje",
            items: [
              "Sezonski bazen sa slanom vodom",
              "Prostor za piknik",
              "Doručak à la carte",
              "Restoran i bar na imanju",
            ],
          },
        ],
      },
      reservation: {
        eyebrow: "Rezervacija",
        heading: "Rezervišite svoj boravak.",
        ratingNote: "Ocena gostiju 10/10",
        fromLabel: "od",
        unit: "Smeštajna jedinica",
        unitPlaceholder: "Izaberite jedinicu",
        checkin: "Dolazak",
        checkout: "Odlazak",
        guests: "Broj gostiju",
        name: "Ime i prezime",
        email: "Imejl",
        phone: "Telefon",
        message: "Napomena",
        book: "Rezerviši",
        perNight: "po noći",
        nights: "noći",
        total: "Ukupno",
        currency: "€",
        available: "Slobodno za izabrane datume",
        unavailable: "Zauzeto za izabrane datume",
        selectDates: "Izaberite datume da vidite cenu i dostupnost.",
        capacity: "do {n} gostiju",
        successTitle: "Rezervacija potvrđena",
        successBody: "Hvala! Zabeležili smo vašu rezervaciju.",
        codeLabel: "Broj rezervacije",
        errorDates: "Datum odlaska mora biti posle datuma dolaska.",
        errorCapacity: "Izabrana jedinica prima do {n} gostiju.",
        errorUnavailable: "Nažalost, termin je upravo zauzet. Pokušajte sa drugim datumima.",
        errorInvalid: "Molimo popunite sva obavezna polja.",
      },
    },
    restaurant: {
      hero: {
        eyebrow: "Restoran",
        tagline: "Vatra, ukus i gostoprimstvo - u srcu Šumadije",
        reservation: "Rezervacija",
        menu: "Jelovnik",
      },
      intro: {
        eyebrow: "Upoznajte restoran",
        heading:
          "Mileva. Restoran rođen iz vatre i drveta. U srcu Šumadije.",
        body: "Tradicija, vatra i pažljivo birane namirnice vode nas do otvorenog ognjišta usred Šumadije. Jedinstven ritual koji budi sva čula.",
        cta: "Saznajte više",
      },
      slowFood: {
        eyebrow: "Spora hrana",
        heading: "Spora kuhinja, iskren ukus",
        body: "Verujemo u sporu hranu - jela koja nastaju bez žurbe, na otvorenoj vatri i žaru, onako kako se kuvalo generacijama. Sve namirnice dolaze iz domaćinstava u krugu od dvadesetak kilometara: povrće, meso, mlečni proizvodi i začini sa okolnih imanja. Tako svaki tanjir nosi ukus ovog podneblja i ruku ljudi koji ga stvaraju.",
      },
      concept: [
        {
          name: "Autentičan ukus",
          body: "Kuhinja Mileve počiva na receptima šumadijskog kraja - jela spremamo onako kako su se spremala generacijama, bez prečica i veštačkih dodataka. Ukus koji pamtite iz bakine kuhinje, samo uz malo više pažnje na svakom tanjiru.",
        },
        {
          name: "Lokalne namirnice",
          body: "Namirnice stižu sa obližnjih domaćinstava i iz sopstvene bašte - sezonsko povrće, domaće meso, sir, med i začinsko bilje. Znamo poreklo svakog sastojka, pa svaki tanjir nosi ukus kraja u kom je nastao.",
        },
        {
          name: "Spora priprema",
          body: "Ne žurimo. Meso se peče satima pod sačem, čorbe se krčkaju polako, hleb se mesi i peče na licu mesta. Spora priprema je naš način da svakom jelu damo punoću ukusa koju brza kuhinja ne može.",
        },
      ],
      daily: {
        eyebrow: "Preporuka dana",
        heading: "Danas preporučujemo",
        items: [
          {
            title: "Pihtije",
            desc: "Staro srpsko jelo u Milevinom ruhu - po našoj recepturi, sa pažljivo biranim sastojcima koji daju savršen balans tradicije i ukusa. Jer kod nas se čuva ono staro, ali se uvek doda i nešto naše.",
            price: "",
          },
          {
            title: "Jesen u Milevi",
            desc: "Jesen je stigla u Mileva koncept, a s njom i nove boje, mirisi i ukusi našeg menija. Topli sastojci, autentičan ukus i sezonske namirnice koje volimo - baš onako kako jesen zaslužuje.",
            price: "",
          },
          {
            title: "Novi meni",
            desc: "Pažljivo osmišljena jela koja osvajaju na prvi zalogaj i ostaju u sećanju. Ukusi koji raduju, detalji koji prave razliku i atmosfera u kojoj se uživa polako - uz čašu dobrog vina koja zaokružuje svaki trenutak.",
            price: "",
          },
        ],
      },
      menuList: {
        eyebrow: "Jelovnik",
        heading: "Ukusi Šumadije",
        note: "Sve namirnice potiču iz domaćinstava u krugu od dvadesetak kilometara.",
        currency: "din",
        sections: [
          {
            title: "Predjela",
            items: [
              { name: "Šumadijska ploča", desc: "Kajmak, mladi sir, domaći kulen i pršuta uz toplu projicu.", price: "890" },
              { name: "Pihtije", desc: "Tradicionalne, sa domaćim sirćetom i belim lukom.", price: "520" },
              { name: "Proja sa kajmakom", desc: "Topla proja od belog kukuruza i zrelog kajmaka.", price: "430" },
              { name: "Ajvar i turšija", desc: "Pečeni ajvar od babure uz zimnicu iz podruma.", price: "390" },
            ],
          },
          {
            title: "Sa žara i ispod sača",
            items: [
              { name: "Jagnjetina ispod sača", desc: "Sporo pečena, sa mladim krompirom i ruzmarinom.", price: "1980" },
              { name: "Prasetina sa ražnja", desc: "Hrskava kožica, sočno meso sa domaćeg imanja.", price: "1780" },
              { name: "Šumadijski roštilj", desc: "Vešalica, ćevapi, punjena pljeskavica i kobasica.", price: "1450" },
              { name: "Karađorđeva šnicla", desc: "Punjena kajmakom, panirana, uz tartar.", price: "1350" },
              { name: "Mućkalica", desc: "Svinjetina, paprika i luk dinstani na tihoj vatri.", price: "1180" },
            ],
          },
          {
            title: "Deserti",
            items: [
              { name: "Štrudla sa makom", desc: "Ručno razvučeno testo, po receptu iz stare kuće.", price: "480" },
              { name: "Gibanica sa orasima", desc: "Topla, uz kašiku kiselog mleka.", price: "450" },
              { name: "Vanilice", desc: "Domaće, sa slatkom od šljiva.", price: "360" },
            ],
          },
          {
            title: "Iz podruma",
            items: [
              { name: "Šumadijska šljivovica", desc: "Dvostruko pečena, iz hrastovog bureta. (0,03 l)", price: "280" },
              { name: "Domaća lozovača", desc: "Bistra, zrela, iz okolnih vinograda. (0,03 l)", price: "300" },
              { name: "Prokupac", desc: "Otvoreno vino iz šumadijskih podruma. (0,15 l)", price: "320" },
            ],
          },
        ],
      },
      drinksList: {
        eyebrow: "Karta pića",
        heading: "Domaća točionica",
        note: "Rakije pečene u našoj kazanici i vina iz okolnih podruma.",
        currency: "din",
        sections: [
          {
            title: "Rakije (0,03 l)",
            items: [
              { name: "Šljivovica", desc: "Dvostruko pečena, iz hrastovog bureta.", price: "280" },
              { name: "Lozovača", desc: "Bistra i zrela, iz okolnih vinograda.", price: "300" },
              { name: "Kajsijevača", desc: "Meka i voćna, iz šumadijskih voćnjaka.", price: "320" },
              { name: "Dunjevača", desc: "Punog mirisa, odležala tri godine.", price: "340" },
              { name: "Medovača", desc: "Blaga, sa domaćim bagremovim medom.", price: "300" },
            ],
          },
          {
            title: "Vina (čaša, 0,15 l)",
            items: [
              { name: "Prokupac", desc: "Domaće crveno iz šumadijskih podruma.", price: "320" },
              { name: "Tamjanika", desc: "Aromatično belo, polusuvo.", price: "340" },
              { name: "Rose", desc: "Sveže, voćno i lagano.", price: "320" },
            ],
          },
          {
            title: "Pivo",
            items: [
              { name: "Točeno (0,3 l)", desc: "Lager iz male pivare.", price: "260" },
              { name: "Kraft (0,33 l)", desc: "Promenljive sorte - pitajte osoblje.", price: "360" },
            ],
          },
          {
            title: "Topli napici",
            items: [
              { name: "Domaća kafa", desc: "Kuvana na pesku, uz ratluk.", price: "180" },
              { name: "Čaj od šumskog bilja", desc: "Nana, majčina dušica, kamilica.", price: "200" },
              { name: "Topla čokolada", desc: "Gusta, sa domaćim mlekom.", price: "260" },
            ],
          },
          {
            title: "Osveženje",
            items: [
              { name: "Domaća limunada", desc: "Sa nanom i malo meda.", price: "240" },
              { name: "Sok od borovnice", desc: "Ceđen, iz naše bašte.", price: "240" },
              { name: "Voda (0,75 l)", desc: "Izvorska, gazirana ili negazirana.", price: "200" },
            ],
          },
        ],
      },
    },
    history: {
      heading: "Dobrodošli",
      body: "Smešteno u mirnom i živopisnom selu Grivac, u opštini Knić, odmaralište Mileva koncept predstavlja pravu oazu spokoja i uživanja. Ovo ekskluzivno mesto, pažljivo osmišljeno i građeno s ljubavlju prema detaljima, idealno je za sve koji traže beg od svakodnevice i dodir s prirodom, bez odricanja od komfora.",
    },
    profile: {
      name: "Mileva koncept",
      bio: "Mileva koncept objedinjuje vrhunski restoran, četiri toplo uređene smeštajne jedinice i otvoreni bazen sa slanom vodom koji kupačima dočarava osećaj mora - u samom srcu Šumadije. Očuvana arhitektura tradicionalnog sela, nenametljivo spojena sa savremenim materijalima, daje mu posebnu draž. Toplina drveta i kamena, zvuci prirode i pažljivo birani detalji čine svaki boravak izuzetnim - bilo da tražite romantičan vikend, porodični odmor ili prostor za privatne proslave i događaje.",
    },
    featured: {
      paragraph:
        "Čulni predah u kojem se vreme rastvara između mirne vode i mirisa šume. Bazeni sa slanom vodom, toplina drveta i otvoreno nebo - mir mora, u srcu Šumadije.",
    },
    sidebar: {
      restaurantsLabel: "Restorani - Sumibijaki",
      finestLabel: "Najbolje iz Japana",
      finest: ["Ito ranč", "Macusaka govedina", "Kobe govedina", "Kraun dinja"],
    },
    cities: { Madrid: "Madrid", Barcelona: "Barselona", Paris: "Pariz" },
    restaurants: { categories: ["Restoran", "Smeštaj", "Događaji"] },
    contact: {
      title: "Kontakt",
      address: "Grivac bb, 34240 Knić, Srbija",
      follow: "Pratite nas",
      page: {
        eyebrow: "Javite nam se",
        tagline:
          "Tu smo za svako pitanje - rezervacije, proslave i mirne dane u srcu Šumadije.",
        introHeading: "Razgovarajmo o vašem boravku",
        introBody:
          "Planirate vikend pored vode, porodičnu proslavu ili duži odmor? Pišite nam ili pozovite - pomoći ćemo vam da sve isplanirate i odgovoriti u najkraćem roku.",
        detailsLabel: "Detalji",
        addressLabel: "Adresa",
        phoneLabel: "Telefon",
        emailLabel: "Imejl",
        hoursLabel: "Radno vreme",
        hours: ["Ponedeljak - Petak  ·  09-21", "Subota - Nedelja  ·  09-23"],
        followLabel: "Pratite nas",
        formHeading: "Pošaljite poruku",
        formNote: "Odgovaramo u roku od 24 sata.",
        name: "Ime i prezime",
        email: "Imejl",
        subject: "Naslov",
        message: "Poruka",
        namePlaceholder: "Vaše ime",
        emailPlaceholder: "vas@email.rs",
        subjectPlaceholder: "O čemu se radi?",
        messagePlaceholder: "Vaša poruka…",
        send: "Pošalji poruku",
        successTitle: "Hvala vam!",
        successBody:
          "Vaša poruka je poslata. Javićemo vam se u najkraćem mogućem roku.",
        mapLabel: "Lokacija",
        mapHeading: "Grivac, u srcu Šumadije",
        directions: "Otvori u mapama",
      },
    },
    events: {
      hero: {
        eyebrow: "Događaji",
        tagline:
          "Svadbe, slave i proslave u ambijentu koji se pamti - u srcu Šumadije.",
      },
      intro: {
        heading: "Proslave i doživljaji na jednom mestu.",
        body: "Mileva nije samo prostor za slavlje - to je imanje na kome dan počinje doručkom u bašti, a završava igrom pored vatre. Organizujemo velike proslave, ali i avanture u prirodi Šumadije, za one koji boravak žele da napune doživljajima.",
      },
      celebrations: {
        eyebrow: "Proslave",
        heading: "Za svaku priliku.",
        intro: "Mileva je imanje stvoreno za okupljanja. Svaki povod ima svoj ritam, a mi ga pratimo - od tihih porodičnih slava do velikih svadbi koje traju do zore. Izaberite priliku i pogledajte kako je zamišljamo.",
        items: [
          {
            name: "Venčanja",
            excerpt: "Celodnevna proslava pod vedrim nebom - ceremonija u bašti, koktel uz bazen i veselje do zore, za do 200 gostiju.",
            desc: "Venčanje na imanju je celodnevna proslava pod vedrim nebom: ceremonija u bašti, koktel uz bazen i veselje koje traje do kasno u noć. Otvoreni prostor prima do 200 gostiju, a ambijent šumadijskih brda svaku fotografiju čini posebnom. Ketering, dekoraciju i raspored stolova prilagođavamo vašoj viziji - od intimnih svadbi u krugu najbližih do velikih slava sa muzikom uživo. Tu smo da vam detalji ne budu briga, nego uživanje.",
            points: ["do 200 gostiju", "ceremonija na otvorenom", "ketering i dekor", "parking za goste"],
          },
          {
            name: "Rođendani i proslave",
            excerpt: "Porodična slava, krštenje, rođendan ili godišnjica - topao ambijent i prostor koji okuplja nekoliko generacija za istim stolom.",
            desc: "Porodična slava, krštenje, rođendan ili godišnjica - najlepši trenuci zaslužuju topao ambijent i prostor koji okuplja nekoliko generacija za istim stolom. Meni prilagođavamo posnom ili mrsnom stolu i poštujemo običaje, a leti se slavlje prirodno seli napolje, pored bazena i bašte. Od dečjih rođendana do velikih žurki za punoletstvo i jubileje - vi birate povod i goste, a mi se brinemo da sve teče glatko i srdačno, onako kako priliči porodičnom slavlju.",
            points: ["porodični meni", "posna i mrsna trpeza", "bazen i bašta", "muzika do kasno"],
          },
          {
            name: "Pozorišne predstave",
            excerpt: "Leti bašta i prostor pored bazena postaju prirodna pozornica - gostujuće trupe, večeri poezije i predstave pod zvezdama.",
            desc: "Imanje volimo da oživimo i predstavom pod vedrim nebom - bašta i prostor pored bazena leti postaju prirodna pozornica. Ugošćujemo putujuće trupe i lokalne ansamble, priređujemo večeri poezije i male scene za publiku koja večera pod zvezdama. Umetnost nam je jednako važna kao i gostoprimstvo, pa scenu, ton i svetlo postavljamo tako da predstava i ambijent rade zajedno.",
            points: ["scena na otvorenom", "gostujuće trupe", "večeri pod zvezdama", "ton i svetlo"],
          },
          {
            name: "Izložbe i simpozijumi",
            excerpt: "Slike, fotografije i radove likovnih umetnika postavljamo u sali, bašti i pored bazena, uz kolonije, razgovore i književne večeri.",
            desc: "Prostore imanja rado ustupamo i umetnosti i idejama - slike, fotografije i radove likovnih umetnika postavljamo u sali, bašti i pored bazena, a okupljanja posvećena stvaralaštvu, poput likovnih kolonija, književnih večeri i stručnih susreta, dobijaju mir kakav gradske sale nemaju. Priređujemo otvaranja, razgovore i male postavke, a raspored, svetlo i ton prilagođavamo svakom autoru i temi. Umetnost nam je jednako važna kao i gostoprimstvo, pa gosti ostaju i na noćenju, da doživljaj traje i posle zvaničnog dela.",
            points: ["likovne postavke", "otvaranja i razgovori", "likovne kolonije", "smeštaj na licu mesta"],
          },
        ],
      },
      activities: {
        eyebrow: "Doživljaji",
        heading: "Avantura na pragu Šumadije.",
        body: "Ispunite dan u sedlu, na točkovima ili peške kroz brda - sami, u paru ili sa ekipom.",
        items: [
          {
            name: "Jahanje konja",
            tag: "u sedlu",
            desc: "Mirne jahačke staze kroz livade i šumu, uz pratnju vodiča, za početnike i iskusne.",
            body: "Jahanje na imanju počinje kratkim upoznavanjem sa konjima i osnovama u sedlu, pa tek onda krećemo u mirnu šetnju livadama i šumskim stazama. Vodič je uz vas celim putem, tempo prilagođavamo grupi, a rute biramo prema iskustvu - od laganih krugova za prve pokušaje do dužih izleta za one koji već sede sigurno. Oprema i zaštitne kacige su obezbeđene, a jahanje organizujemo i za decu uz poseban nadzor. Posle staze najlepše je vratiti se na terasu i odmoriti uz pogled na brda.",
          },
          {
            name: "Panoramske rute",
            tag: "peške i biciklom",
            desc: "Obeležene staze kroz šumadijska brda, do vidikovaca, jezera i starih salaša.",
            body: "Oko imanja se pruža mreža obeleženih staza kroz šumadijska brda - neke su kratke šetnje do najbližeg vidikovca, druge celodnevni izleti do jezera, starih salaša i zapuštenih vodenica. Rute su pogodne i za pešake i za bicikliste, a težinu birate sami: od opuštenih spustova do uspona koji nagrađuju pogledom na ceo kraj. Na polasku dobijate mapu i preporuke, a po želji i pratnju vodiča koji poznaje svaku prečicu. Za povratak spremamo lanč-paket ili topli obrok na terasi.",
          },
          {
            name: "Kvadovi (ATV)",
            tag: "adrenalin",
            desc: "Vožnja četvorotočkašima terenima oko imanja - za grupe i pojedince željne brzine.",
            body: "Za one koji traže malo adrenalina, vožnja kvadovima vodi terenima oko imanja - blatnjavim stazama, šumskim putevima i otvorenim poljanama. Pre polaska sledi kratka obuka i provera opreme, a vožnju uvek prati iskusan vodič koji bira rutu prema uslovima i iskustvu grupe. Kacige i zaštita su obavezni i obezbeđeni, a maršrute prilagođavamo - od ležerne vožnje za početnike do zahtevnijih deonica za iskusne. Idealno za grupe, momačke i devojačke dane i sve koji žele aktivan dan u prirodi.",
          },
          {
            name: "Piknik i roštilj",
            tag: "pored vode",
            desc: "Opremljena mesta za piknik i roštilj na otvorenom, za opuštene dane u prirodi.",
            body: "Opremljena mesta za piknik i roštilj raspoređena su po imanju - u hladu pored vode, na ivici livade ili uz baštensku terasu. Donesite svoje društvo, a mi pripremamo roštilj, drva, stolove i sve što treba, ili uz najavu spremamo meni po vašoj želji. Ovo su ležerni, celodnevni planovi: deca se igraju na travi, stariji dremaju u hladu, a dan se lagano pretače u večeru pod otvorenim nebom. Savršen završetak posle jahanja, rute ili vožnje kvadovima.",
          },
        ],
      },
      cta: {
        eyebrow: "Planirate događaj?",
        heading: "Ispričajte nam svoju ideju.",
        body: "Proslava, jahanje, rute ili kvadovi - javite se i zajedno ćemo isplanirati svaki detalj.",
        button: "Kontaktirajte nas",
      },
    },
    footer: {
      links: ["Politika kolačića", "Politika privatnosti", "Pravne napomene"],
      copyright: "© 2026 Mileva koncept",
      explore: "Navigacija",
      tagline: "Gde tradicija susreće luksuz, a gostoprimstvo postaje umetnost.",
    },
    notFound: {
      eyebrow: "Greška 404",
      title: "Zalutali ste sa staze",
      body: "Stranica koju tražite ne postoji ili je premeštena. Vratite se na početnu i nastavite razgledanje Mileve.",
      home: "Nazad na početnu",
    },
  },

  en: {
    nav: {
      home: "Home",
      reservations: "Reservations",
      gift: "Gift",
      nature: "Nature",
      landmarks: "Landmarks",
      blog: "Blog",
      accommodation: "Accommodation",
      contact: "Contact",
    },
    aria: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      close: "Close",
      language: "Language",
      primary: "Primary",
      legal: "Legal",
    },
    hero: {
      tagline: "Where tradition meets luxury, and hospitality becomes art",
      scroll: "Scroll",
    },
    blog: {
      hero: {
        eyebrow: "Stories from the estate",
        title: "Blog",
        lead: "Stories from the Mileva estate - on food from the fire, the quiet of Šumadija and days to remember.",
      },
      latest: "Latest",
      heading: "All stories",
      all: "All",
      readMore: "Read more",
      minRead: "min read",
      backToBlog: "Back to the blog",
      related: "More from the blog",
    },
    landmarks: {
      hero: {
        eyebrow: "Landmarks",
        tagline: "The nature, history and spiritual heritage of Šumadija - a step from Mileva.",
      },
      intro: {
        heading: "Šumadija around you - hills, rivers and centuries of story.",
        body: "Grivac and its surroundings hold the quiet nature of Šumadija and a rich cultural heritage. From lakes and mountain vistas to medieval monasteries - everything is within reach, and Mileva is the ideal starting point.",
      },
      featured: {
        eyebrow: "Featured",
        heading: "The finest within easy reach.",
        items: [
          {
            name: "Gruža Lake",
            desc: "A calm reservoir in the Knić municipality, formed by damming the Gruža river. It is a favourite spot for fishing, gentle walks along the shore and birdwatching - it is home to dozens of species. Ringed by soft hills and homesteads, it is perfect for a slow day in nature, just ten minutes' drive from the estate.",
            distance: "~10 km",
          },
          {
            name: "Šumarice, Kragujevac",
            desc: "A memorial park in Kragujevac, the first capital of modern Serbia, dedicated to the civilians who perished in October 1941. Monuments are scattered across the greenery, the best known being the 'Interrupted Flight'. It is a place of quiet remembrance and gentle walks, and a scenic park to rest in - about thirty kilometres from Grivac.",
            distance: "~30 km",
          },
          {
            name: "Morava Airport",
            desc: "A regional airport near Kraljevo (Lađevci), connecting central Serbia with several European destinations. Its modern passenger terminal opened in recent years and is slowly expanding its network of flights. For guests arriving from afar, it is the nearest gateway by air - about thirty kilometres from Grivac.",
            distance: "~34 km",
          },
        ],
      },
      list: {
        heading: "More nearby",
        items: [
          {
            name: "Mount Rudnik",
            desc: "The highest peak of Šumadija (Cvijić Peak, 1,132 m) - mountain air, forests and trails, with a spa resort at its foot.",
            distance: "~35 km",
          },
          {
            name: "Kalenić Monastery",
            desc: "A gem of the Morava school on the slopes of the Gledić mountains, from the early 15th century.",
            distance: "~45 km",
          },
          {
            name: "Žiča Monastery",
            desc: "A red 13th-century endowment near Kraljevo - the coronation church of Serbian kings and seat of the first Serbian archbishopric.",
            distance: "~48 km",
          },
          {
            name: "Oplenac, Topola",
            desc: "Karađorđe's endowment - the five-domed Church of St. George with its mosaics and the mausoleum of the Karađorđević dynasty on the hill above Topola.",
            distance: "~50 km",
          },
        ],
      },
    },
    accommodation: {
      hero: {
        eyebrow: "Accommodation",
        tagline: "Warmly appointed units and the calm of nature - in the heart of Šumadija",
        reservation: "Reservation",
      },
      intro: {
        eyebrow: "The stay",
        heading:
          "A home in the heart of Šumadija, in the quiet village of Grivac.",
        body: "Mileva Koncept is a restaurant and accommodation in the quiet village of Grivac - an air-conditioned 60 m² apartment for up to four guests, with a garden, terrace, saltwater pool, free private parking and WiFi. A private entrance, soundproofing and a fully equipped kitchen bring full privacy and calm.",
      },
      units: {
        eyebrow: "The apartment",
        heading: "Book the whole apartment.",
        items: [
          {
            name: "Mileva Apartment",
            desc: "An air-conditioned 60 m² apartment - bedroom, living room and a fully equipped kitchen, for up to four guests.",
            features: ["60 m²", "Up to 4 guests", "1 bathroom"],
          },
        ],
      },
      spaces: {
        eyebrow: "The apartment",
        heading: "Room for four, in the heart of Šumadija.",
        items: [
          {
            name: "Bedroom",
            desc: "A calm bedroom with a comfortable bed, air conditioning and soundproofing - for a full night's rest.",
            features: ["Double bed", "Air conditioning", "Soundproofing"],
          },
          {
            name: "Living room",
            desc: "A spacious living room with a sofa bed and a television - room for two more guests.",
            features: ["Sofa bed", "TV", "Sleeps two more"],
          },
          {
            name: "Kitchen & dining",
            desc: "A fully equipped kitchen with a fridge and a dining area - just like home.",
            features: ["Fully equipped", "Fridge", "Dining area"],
          },
          {
            name: "Terrace & garden",
            desc: "A private entrance, terrace and garden overlooking the greenery, with access to the saltwater pool.",
            features: ["Terrace", "Garden", "Pool access"],
          },
        ],
      },
      leisure: {
        eyebrow: "Pools & celebrations",
        heading: "Days by the water and evenings to remember.",
        body: "The open seasonal saltwater pool brings the feeling of the sea - surrounded by the greenery and quiet of Šumadija, ideal for slow summer afternoons. With an on-site bar, à la carte breakfast and a picnic area, days by the water turn easily into evenings to remember - celebrations, family gatherings and private events.",
        cards: ["Pools", "Pools", "Celebrations", "Celebrations"],
      },
      amenities: {
        eyebrow: "Amenities",
        heading: "Everything you need for a restful stay.",
        sections: [
          {
            title: "The stay",
            items: [
              "Air conditioning",
              "Heating",
              "Fully equipped kitchen (fridge, kettle, kitchenware)",
              "Dining table",
              "Washing machine",
              "TV",
              "Bathroom (shower, bathtub, bidet, bathrobes, hairdryer)",
              "Private entrance",
              "Soundproofing",
              "Balcony",
              "Towels & bed linen",
            ],
          },
          {
            title: "Grounds & services",
            items: [
              "Garden",
              "Terrace",
              "Free private parking",
              "Free WiFi",
              "Full-day security (CCTV)",
              "Fire safety",
              "Ground floor, wheelchair access",
              "Pets on request",
            ],
          },
          {
            title: "Leisure",
            items: [
              "Seasonal saltwater pool",
              "Picnic area",
              "À la carte breakfast",
              "On-site restaurant & bar",
            ],
          },
        ],
      },
      reservation: {
        eyebrow: "Reservation",
        heading: "Reserve your stay.",
        ratingNote: "Guest rating 10/10",
        fromLabel: "from",
        unit: "Accommodation unit",
        unitPlaceholder: "Choose a unit",
        checkin: "Check-in",
        checkout: "Check-out",
        guests: "Guests",
        name: "Full name",
        email: "Email",
        phone: "Phone",
        message: "Note",
        book: "Book now",
        perNight: "per night",
        nights: "nights",
        total: "Total",
        currency: "€",
        available: "Available for the selected dates",
        unavailable: "Booked for the selected dates",
        selectDates: "Choose your dates to see the price and availability.",
        capacity: "up to {n} guests",
        successTitle: "Reservation confirmed",
        successBody: "Thank you! We've recorded your reservation.",
        codeLabel: "Booking reference",
        errorDates: "Check-out must be after check-in.",
        errorCapacity: "The selected unit sleeps up to {n} guests.",
        errorUnavailable: "Sorry, that period was just booked. Please try different dates.",
        errorInvalid: "Please fill in all required fields.",
      },
    },
    restaurant: {
      hero: {
        eyebrow: "Restaurant",
        tagline: "Fire, flavor and hospitality - in the heart of Šumadija",
        reservation: "Reservation",
        menu: "Menu",
      },
      intro: {
        eyebrow: "Get to know the restaurant",
        heading:
          "Mileva. A restaurant born of fire and wood. In the heart of Šumadija.",
        body: "Tradition, fire and carefully chosen ingredients lead us to an open hearth in the heart of Šumadija. A unique ritual that awakens all the senses.",
        cta: "Discover more",
      },
      slowFood: {
        eyebrow: "Slow food",
        heading: "Slow cooking, honest flavor",
        body: "We believe in slow food - dishes made without haste, over open fire and embers, the way they were cooked for generations. Every ingredient comes from households within some twenty kilometers: vegetables, meat, dairy and herbs from the surrounding estates. So every plate carries the taste of this land and the hands of the people who create it.",
      },
      concept: [
        {
          name: "Authentic flavor",
          body: "Mileva's kitchen rests on the recipes of the Šumadija region - we prepare dishes the way they've been made for generations, with no shortcuts or artificial additives. The flavour you remember from your grandmother's kitchen, only with a little more care on every plate.",
        },
        {
          name: "Local ingredients",
          body: "Ingredients come from nearby farms and our own garden - seasonal vegetables, home-raised meat, cheese, honey and herbs. We know the origin of every ingredient, so each plate carries the taste of the place it came from.",
        },
        {
          name: "Slow preparation",
          body: "We don't rush. Meat roasts for hours under the sač, broths simmer slowly, bread is kneaded and baked on site. Slow preparation is our way of giving every dish a fullness of flavour that fast cooking can't.",
        },
      ],
      daily: {
        eyebrow: "Daily recommendation",
        heading: "Today we recommend",
        items: [
          {
            title: "Pihtije",
            desc: "An old Serbian dish in Mileva's own guise - made to our recipe, with carefully chosen ingredients that strike the perfect balance of tradition and taste. We keep the old ways, but always add something of our own.",
            price: "",
          },
          {
            title: "Autumn at Mileva",
            desc: "Autumn has arrived at Mileva Koncept, and with it new colors, scents and flavors on our menu. Warm ingredients, authentic taste and the seasonal produce we love - just the way autumn deserves.",
            price: "",
          },
          {
            title: "New menu",
            desc: "Carefully crafted dishes that win you over at the first bite and stay in memory. Flavors that delight, details that make the difference, and an atmosphere to be enjoyed slowly - with a glass of good wine to round off every moment.",
            price: "",
          },
        ],
      },
      menuList: {
        eyebrow: "Menu",
        heading: "Flavors of Šumadija",
        note: "Every ingredient comes from households within some twenty kilometers.",
        currency: "RSD",
        sections: [
          {
            title: "Starters",
            items: [
              { name: "Šumadija board", desc: "Kajmak, young cheese, home-made kulen and pršut with warm cornbread.", price: "890" },
              { name: "Pihtije (aspic)", desc: "Traditional, with home vinegar and garlic.", price: "520" },
              { name: "Cornbread with kajmak", desc: "Warm white-corn proja and matured kajmak.", price: "430" },
              { name: "Ajvar & pickles", desc: "Roasted red-pepper ajvar with cellar preserves.", price: "390" },
            ],
          },
          {
            title: "From the grill & under the sač",
            items: [
              { name: "Lamb under the sač", desc: "Slow-baked, with new potatoes and rosemary.", price: "1980" },
              { name: "Spit-roast pork", desc: "Crisp skin, juicy meat from a local farm.", price: "1780" },
              { name: "Šumadija mixed grill", desc: "Vešalica, ćevapi, stuffed patty and sausage.", price: "1450" },
              { name: "Karađorđe's schnitzel", desc: "Rolled with kajmak, breaded, with tartar.", price: "1350" },
              { name: "Mućkalica", desc: "Pork, peppers and onion stewed over a low fire.", price: "1180" },
            ],
          },
          {
            title: "Desserts",
            items: [
              { name: "Poppy-seed strudel", desc: "Hand-pulled dough, from an old family recipe.", price: "480" },
              { name: "Walnut gibanica", desc: "Warm, with a spoon of soured milk.", price: "450" },
              { name: "Vanilice", desc: "Home-made, with plum preserve.", price: "360" },
            ],
          },
          {
            title: "From the cellar",
            items: [
              { name: "Šumadija plum brandy", desc: "Double-distilled, from an oak barrel. (0.03 l)", price: "280" },
              { name: "Grape rakija", desc: "Clear, matured, from nearby vineyards. (0.03 l)", price: "300" },
              { name: "Prokupac wine", desc: "Open, from Šumadija cellars. (0.15 l)", price: "320" },
            ],
          },
        ],
      },
      drinksList: {
        eyebrow: "Drinks",
        heading: "The house pour",
        note: "Rakija distilled in our own still and wines from nearby cellars.",
        currency: "RSD",
        sections: [
          {
            title: "Rakija (0.03 l)",
            items: [
              { name: "Plum brandy", desc: "Double-distilled, from an oak barrel.", price: "280" },
              { name: "Grape rakija", desc: "Clear and matured, from nearby vineyards.", price: "300" },
              { name: "Apricot rakija", desc: "Soft and fruity, from Šumadija orchards.", price: "320" },
              { name: "Quince rakija", desc: "Full-scented, aged three years.", price: "340" },
              { name: "Honey rakija", desc: "Mellow, with home acacia honey.", price: "300" },
            ],
          },
          {
            title: "Wine (glass, 0.15 l)",
            items: [
              { name: "Prokupac", desc: "House red from Šumadija cellars.", price: "320" },
              { name: "Tamjanika", desc: "Aromatic white, off-dry.", price: "340" },
              { name: "Rosé", desc: "Fresh, fruity and light.", price: "320" },
            ],
          },
          {
            title: "Beer",
            items: [
              { name: "Draught (0.3 l)", desc: "Lager from a small brewery.", price: "260" },
              { name: "Craft (0.33 l)", desc: "Rotating styles - ask the staff.", price: "360" },
            ],
          },
          {
            title: "Hot drinks",
            items: [
              { name: "House coffee", desc: "Brewed on sand, with Turkish delight.", price: "180" },
              { name: "Forest herb tea", desc: "Mint, wild thyme, chamomile.", price: "200" },
              { name: "Hot chocolate", desc: "Thick, with home milk.", price: "260" },
            ],
          },
          {
            title: "Refreshments",
            items: [
              { name: "House lemonade", desc: "With mint and a little honey.", price: "240" },
              { name: "Blueberry juice", desc: "Pressed, from our garden.", price: "240" },
              { name: "Water (0.75 l)", desc: "Spring water, sparkling or still.", price: "200" },
            ],
          },
        ],
      },
    },
    history: {
      heading: "Welcome",
      body: "Nestled in the peaceful and picturesque village of Grivac, in the municipality of Knić, the Mileva Koncept resort is a true oasis of calm and enjoyment. This exclusive place, thoughtfully designed and built with a love for detail, is ideal for anyone seeking an escape from everyday life and a touch of nature - without giving up comfort.",
    },
    profile: {
      name: "Mileva Koncept",
      bio: "Mileva Koncept brings together a fine restaurant, four warmly furnished accommodation units, and an outdoor pool with salt-enriched water that gives bathers the feeling of the seaside - in the very heart of Šumadija. The preserved architecture of a traditional village, subtly blended with modern materials, lends it a special charm. The warmth of wood and stone, the sounds of nature, and carefully chosen details make every stay exceptional - whether you seek a romantic weekend, a family holiday, or a space for private celebrations and events.",
    },
    featured: {
      paragraph:
        "A sensory escape where time dissolves between still water and the scent of the forest. Salt-water pools, warm wood and open sky - the calm of the sea, in the heart of Šumadija.",
    },
    sidebar: {
      restaurantsLabel: "Restaurants - Sumibiyaki",
      finestLabel: "Japan's Finest",
      finest: ["Ito Ranch", "Matsusaka Beef", "Kobe Beef", "Crown Melon"],
    },
    cities: { Madrid: "Madrid", Barcelona: "Barcelona", Paris: "Paris" },
    restaurants: { categories: ["Restaurant", "Accommodation", "Events"] },
    contact: {
      title: "Contact",
      address: "Grivac bb, 34240 Knić, Serbia",
      follow: "Follow us",
      page: {
        eyebrow: "Get in touch",
        tagline:
          "We're here for every question - reservations, celebrations and quiet days in the heart of Šumadija.",
        introHeading: "Let's talk about your stay",
        introBody:
          "Planning a weekend by the water, a family celebration or a longer retreat? Write or call us - we'll help you plan every detail and reply as soon as we can.",
        detailsLabel: "Details",
        addressLabel: "Address",
        phoneLabel: "Phone",
        emailLabel: "Email",
        hoursLabel: "Opening hours",
        hours: ["Monday - Friday  ·  09-21", "Saturday - Sunday  ·  09-23"],
        followLabel: "Follow us",
        formHeading: "Send a message",
        formNote: "We reply within 24 hours.",
        name: "Full name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        namePlaceholder: "Your name",
        emailPlaceholder: "you@email.com",
        subjectPlaceholder: "What is it about?",
        messagePlaceholder: "Your message…",
        send: "Send message",
        successTitle: "Thank you!",
        successBody:
          "Your message has been sent. We'll get back to you as soon as possible.",
        mapLabel: "Location",
        mapHeading: "Grivac, in the heart of Šumadija",
        directions: "Open in maps",
      },
    },
    events: {
      hero: {
        eyebrow: "Events",
        tagline:
          "Weddings, feasts and celebrations in a setting to remember - in the heart of Šumadija.",
      },
      intro: {
        heading: "Celebrations and experiences in one place.",
        body: "Mileva is more than a place to celebrate - it's an estate where the day starts with breakfast in the garden and ends with play by the fire. We host grand celebrations, but also adventures in the nature of Šumadija, for those who want their stay full of experiences.",
      },
      celebrations: {
        eyebrow: "Celebrations",
        heading: "For every occasion.",
        intro: "Mileva is an estate made for gatherings. Every occasion has its own rhythm, and we follow it - from quiet family feasts to grand weddings that last until dawn. Choose the occasion and see how we imagine it.",
        items: [
          {
            name: "Weddings",
            excerpt: "A full-day celebration under the open sky - a garden ceremony, poolside cocktails and festivities until dawn, for up to 200 guests.",
            desc: "A wedding on the estate is a full-day celebration under the open sky: a ceremony in the garden, cocktails by the pool and festivities that last late into the night. The open grounds hold up to 200 guests, and the setting of the Šumadija hills makes every photograph special. We tailor the catering, decoration and seating to your vision - from intimate weddings among your nearest to grand celebrations with live music. We are here so the details are a pleasure, not a worry.",
            points: ["up to 200 guests", "open-air ceremony", "catering & decor", "guest parking"],
          },
          {
            name: "Birthdays & celebrations",
            excerpt: "A family feast, a christening, a birthday or an anniversary - a warm setting with room to gather several generations at one table.",
            desc: "A family feast, a christening, a birthday or an anniversary - the moments that matter deserve a warm setting and room enough to gather several generations at one table. We tailor the menu to a fasting or a festive table and honour the customs, and in summer the celebration moves naturally outside, by the pool and garden. From children's birthdays to big coming-of-age parties and milestones - you choose the occasion and the guests, and we keep everything running smoothly and warmly, just as a family celebration should feel.",
            points: ["family menu", "fasting & festive table", "pool & garden", "music until late"],
          },
          {
            name: "Theatre performances",
            excerpt: "In summer the garden and poolside become a natural stage - guest troupes, poetry evenings and performances under the stars.",
            desc: "We love to bring the estate to life with performances under the open sky - in summer the garden and poolside become a natural stage. We host travelling troupes and local ensembles, stage poetry evenings and small scenes for an audience dining under the stars. Art matters to us as much as hospitality, so we set the stage, sound and light so that the performance and the setting work together.",
            points: ["open-air stage", "guest troupes", "evenings under the stars", "sound & light"],
          },
          {
            name: "Exhibitions & symposia",
            excerpt: "Paintings, photographs and artworks fill the hall, garden and poolside, alongside colonies, talks and literary evenings.",
            desc: "We gladly give the estate's spaces over to art and to ideas - paintings, photographs and works by visual artists are shown in the hall, the garden and by the pool, while gatherings devoted to creativity, such as art colonies, literary evenings and expert meetings, find a calm that city halls lack. We host openings, talks and small displays, tailoring the layout, light and tone to each artist and theme. Art matters to us as much as hospitality, so guests stay the night too, letting the experience last beyond the formal programme.",
            points: ["visual displays", "openings & talks", "art colonies", "on-site lodging"],
          },
        ],
      },
      activities: {
        eyebrow: "Experiences",
        heading: "Adventure on the edge of Šumadija.",
        body: "Fill the day in the saddle, on wheels or on foot through the hills - solo, as a pair or with a crew.",
        items: [
          {
            name: "Horse riding",
            tag: "in the saddle",
            desc: "Gentle riding trails through meadows and forest, with a guide, for beginners and the experienced.",
            body: "Riding on the estate starts with a short introduction to the horses and the basics in the saddle, and only then do we set off on a gentle walk through meadows and forest trails. A guide stays with you the whole way, we match the pace to the group, and we choose routes by experience - from easy loops for first attempts to longer outings for those who already sit securely. Gear and safety helmets are provided, and we arrange riding for children under special supervision too. After the trail, there's nothing better than returning to the terrace to rest with a view of the hills.",
          },
          {
            name: "Panoramic routes",
            tag: "on foot & by bike",
            desc: "Marked trails through the hills of Šumadija, to viewpoints, lakes and old homesteads.",
            body: "A network of marked trails spreads out around the estate through the hills of Šumadija - some are short walks to the nearest viewpoint, others full-day outings to lakes, old homesteads and abandoned mills. The routes suit both walkers and cyclists, and you choose the difficulty yourself: from easy descents to climbs rewarded with a view over the whole region. At the start you get a map and recommendations, and on request a guide who knows every shortcut. For the way back we prepare a lunch pack or a warm meal on the terrace.",
          },
          {
            name: "Quads (ATV)",
            tag: "adrenaline",
            desc: "Riding ATVs on the terrain around the estate - for groups and individuals after a thrill.",
            body: "For those after a little adrenaline, an ATV ride takes you across the terrain around the estate - muddy tracks, forest roads and open fields. Before setting off there's a short briefing and an equipment check, and the ride is always led by an experienced guide who picks the route to suit conditions and the group's experience. Helmets and protection are mandatory and provided, and we adapt the routes - from a relaxed ride for beginners to more demanding sections for the experienced. Ideal for groups, stag and hen days and anyone who wants an active day in nature.",
          },
          {
            name: "Picnic & barbecue",
            tag: "by the water",
            desc: "Equipped spots for picnics and barbecue in the open air, for relaxed days in nature.",
            body: "Equipped spots for picnics and barbecue are set around the estate - in the shade by the water, at the edge of a meadow or beside the garden terrace. Bring your own company and we prepare the grill, firewood, tables and everything you need, or, with notice, a menu to your wishes. These are relaxed, full-day plans: children play on the grass, elders doze in the shade, and the day drifts gently into dinner under the open sky. The perfect finish after riding, a route or a quad ride.",
          },
        ],
      },
      cta: {
        eyebrow: "Planning an event?",
        heading: "Tell us your idea.",
        body: "A celebration, riding, routes or quads - get in touch and we'll plan every detail together.",
        button: "Contact us",
      },
    },
    footer: {
      links: ["Cookies policy", "Privacy policy", "Legal notice"],
      copyright: "© 2026 Mileva Koncept",
      explore: "Navigation",
      tagline: "Where tradition meets luxury, and hospitality becomes art.",
    },
    notFound: {
      eyebrow: "Error 404",
      title: "You've wandered off the path",
      body: "The page you're looking for doesn't exist or has moved. Head back to the homepage and keep exploring Mileva.",
      home: "Back to home",
    },
  },
};
