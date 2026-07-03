/**
 * Site copy in the three supported languages.
 * Default is Serbian Cyrillic (`sr-cyrl`); the switcher order matches LANGUAGES.
 * Brand names (AKANEYA, PILAR/CARLOTA/MARIE) and the kanji marks are not
 * translated.
 */

export const LANGUAGES = [
  { code: "sr-cyrl", label: "СР" }, // Српски — ћирилица (default)
  { code: "sr-latn", label: "SR" }, // Srpski — latinica
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
  };
  aria: {
    openMenu: string;
    closeMenu: string;
    language: string;
    primary: string;
    legal: string;
  };
  hero: { tagline: string; scroll: string };
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
    concept: string[];
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
  contact: { title: string; address: string; follow: string };
  footer: { links: string[]; copyright: string; explore: string; tagline: string };
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
    },
    aria: {
      openMenu: "Отвори мени",
      closeMenu: "Затвори мени",
      language: "Језик",
      primary: "Главна навигација",
      legal: "Правно",
    },
    hero: {
      tagline:
        "Где традиција сусреће луксуз, а гостопримство постаје уметност",
      scroll: "Скролуј",
    },
    restaurant: {
      hero: {
        eyebrow: "Ресторан",
        tagline: "Ватра, укус и гостопримство — у срцу Шумадије",
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
        body: "Верујемо у спору храну — јела која настају без журбе, на отвореној ватри и жару, онако како се кувало генерацијама. Све намирнице долазе из домаћинстава у кругу од двадесетак километара: поврће, месо, млечни производи и зачини са околних имања. Тако сваки тањир носи укус овог поднебља и руку људи који га стварају.",
      },
      concept: ["Аутентичан укус", "Локалне намирнице", "Спора припрема"],
      daily: {
        eyebrow: "Препорука дана",
        heading: "Данас препоручујемо",
        items: [
          {
            title: "Пихтије",
            desc: "Старо српско јело у Милевином руху — по нашој рецептури, са пажљиво бираним састојцима који дају савршен баланс традиције и укуса. Јер код нас се чува оно старо, али се увек дода и нешто наше.",
            price: "",
          },
          {
            title: "Јесен у Милеви",
            desc: "Јесен је стигла у Милева концепт, а с њом и нове боје, мириси и укуси нашег менија. Топли састојци, аутентичан укус и сезонске намирнице које волимо — баш онако како јесен заслужује.",
            price: "",
          },
          {
            title: "Нови мени",
            desc: "Пажљиво осмишљена јела која освајају на први залогај и остају у сећању. Укуси који радују, детаљи који праве разлику и атмосфера у којој се ужива полако — уз чашу доброг вина која заокружује сваки тренутак.",
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
              { name: "Крафт (0,33 л)", desc: "Променљиве сорте — питајте особље.", price: "360" },
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
      bio: "Милева концепт обједињује врхунски ресторан, четири топло уређене смештајне јединице и отворени базен са сланом водом који купачима дочарава осећај мора — у самом срцу Шумадије. Очувана архитектура традиционалног села, ненаметљиво спојена са савременим материјалима, даје му посебну драж. Топлина дрвета и камена, звуци природе и пажљиво бирани детаљи чине сваки боравак изузетним — било да тражите романтичан викенд, породични одмор или простор за приватне прославе и догађаје.",
    },
    featured: {
      paragraph:
        "Чулни предах у којем се време раствара између мирне воде и мириса шуме. Базени са сланом водом, топлина дрвета и отворено небо — мир мора, у срцу Шумадије.",
    },
    sidebar: {
      restaurantsLabel: "Ресторани — Сумибијаки",
      finestLabel: "Најбоље из Јапана",
      finest: ["Ито ранч", "Мацусака говедина", "Кобе говедина", "Краун диња"],
    },
    cities: { Madrid: "Мадрид", Barcelona: "Барселона", Paris: "Париз" },
    restaurants: { categories: ["Ресторан", "Смештај", "Догађаји"] },
    contact: {
      title: "Контакт",
      address: "Гривац бб, 34240 Кнић, Србија",
      follow: "Пратите нас",
    },
    footer: {
      links: ["Политика колачића", "Политика приватности", "Правне напомене"],
      copyright: "© 2026 Милева концепт",
      explore: "Навигација",
      tagline: "Где традиција сусреће луксуз, а гостопримство постаје уметност.",
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
    },
    aria: {
      openMenu: "Otvori meni",
      closeMenu: "Zatvori meni",
      language: "Jezik",
      primary: "Glavna navigacija",
      legal: "Pravno",
    },
    hero: {
      tagline:
        "Gde tradicija susreće luksuz, a gostoprimstvo postaje umetnost",
      scroll: "Skroluj",
    },
    restaurant: {
      hero: {
        eyebrow: "Restoran",
        tagline: "Vatra, ukus i gostoprimstvo — u srcu Šumadije",
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
        body: "Verujemo u sporu hranu — jela koja nastaju bez žurbe, na otvorenoj vatri i žaru, onako kako se kuvalo generacijama. Sve namirnice dolaze iz domaćinstava u krugu od dvadesetak kilometara: povrće, meso, mlečni proizvodi i začini sa okolnih imanja. Tako svaki tanjir nosi ukus ovog podneblja i ruku ljudi koji ga stvaraju.",
      },
      concept: ["Autentičan ukus", "Lokalne namirnice", "Spora priprema"],
      daily: {
        eyebrow: "Preporuka dana",
        heading: "Danas preporučujemo",
        items: [
          {
            title: "Pihtije",
            desc: "Staro srpsko jelo u Milevinom ruhu — po našoj recepturi, sa pažljivo biranim sastojcima koji daju savršen balans tradicije i ukusa. Jer kod nas se čuva ono staro, ali se uvek doda i nešto naše.",
            price: "",
          },
          {
            title: "Jesen u Milevi",
            desc: "Jesen je stigla u Mileva koncept, a s njom i nove boje, mirisi i ukusi našeg menija. Topli sastojci, autentičan ukus i sezonske namirnice koje volimo — baš onako kako jesen zaslužuje.",
            price: "",
          },
          {
            title: "Novi meni",
            desc: "Pažljivo osmišljena jela koja osvajaju na prvi zalogaj i ostaju u sećanju. Ukusi koji raduju, detalji koji prave razliku i atmosfera u kojoj se uživa polako — uz čašu dobrog vina koja zaokružuje svaki trenutak.",
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
              { name: "Kraft (0,33 l)", desc: "Promenljive sorte — pitajte osoblje.", price: "360" },
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
      bio: "Mileva koncept objedinjuje vrhunski restoran, četiri toplo uređene smeštajne jedinice i otvoreni bazen sa slanom vodom koji kupačima dočarava osećaj mora — u samom srcu Šumadije. Očuvana arhitektura tradicionalnog sela, nenametljivo spojena sa savremenim materijalima, daje mu posebnu draž. Toplina drveta i kamena, zvuci prirode i pažljivo birani detalji čine svaki boravak izuzetnim — bilo da tražite romantičan vikend, porodični odmor ili prostor za privatne proslave i događaje.",
    },
    featured: {
      paragraph:
        "Čulni predah u kojem se vreme rastvara između mirne vode i mirisa šume. Bazeni sa slanom vodom, toplina drveta i otvoreno nebo — mir mora, u srcu Šumadije.",
    },
    sidebar: {
      restaurantsLabel: "Restorani — Sumibijaki",
      finestLabel: "Najbolje iz Japana",
      finest: ["Ito ranč", "Macusaka govedina", "Kobe govedina", "Kraun dinja"],
    },
    cities: { Madrid: "Madrid", Barcelona: "Barselona", Paris: "Pariz" },
    restaurants: { categories: ["Restoran", "Smeštaj", "Događaji"] },
    contact: {
      title: "Kontakt",
      address: "Grivac bb, 34240 Knić, Srbija",
      follow: "Pratite nas",
    },
    footer: {
      links: ["Politika kolačića", "Politika privatnosti", "Pravne napomene"],
      copyright: "© 2026 Mileva koncept",
      explore: "Navigacija",
      tagline: "Gde tradicija susreće luksuz, a gostoprimstvo postaje umetnost.",
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
    },
    aria: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Language",
      primary: "Primary",
      legal: "Legal",
    },
    hero: {
      tagline: "Where tradition meets luxury, and hospitality becomes art",
      scroll: "Scroll",
    },
    restaurant: {
      hero: {
        eyebrow: "Restaurant",
        tagline: "Fire, flavor and hospitality — in the heart of Šumadija",
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
        body: "We believe in slow food — dishes made without haste, over open fire and embers, the way they were cooked for generations. Every ingredient comes from households within some twenty kilometers: vegetables, meat, dairy and herbs from the surrounding estates. So every plate carries the taste of this land and the hands of the people who create it.",
      },
      concept: ["Authentic flavor", "Local ingredients", "Slow preparation"],
      daily: {
        eyebrow: "Daily recommendation",
        heading: "Today we recommend",
        items: [
          {
            title: "Pihtije",
            desc: "An old Serbian dish in Mileva's own guise — made to our recipe, with carefully chosen ingredients that strike the perfect balance of tradition and taste. We keep the old ways, but always add something of our own.",
            price: "",
          },
          {
            title: "Autumn at Mileva",
            desc: "Autumn has arrived at Mileva Koncept, and with it new colors, scents and flavors on our menu. Warm ingredients, authentic taste and the seasonal produce we love — just the way autumn deserves.",
            price: "",
          },
          {
            title: "New menu",
            desc: "Carefully crafted dishes that win you over at the first bite and stay in memory. Flavors that delight, details that make the difference, and an atmosphere to be enjoyed slowly — with a glass of good wine to round off every moment.",
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
              { name: "Craft (0.33 l)", desc: "Rotating styles — ask the staff.", price: "360" },
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
      body: "Nestled in the peaceful and picturesque village of Grivac, in the municipality of Knić, the Mileva Koncept resort is a true oasis of calm and enjoyment. This exclusive place, thoughtfully designed and built with a love for detail, is ideal for anyone seeking an escape from everyday life and a touch of nature — without giving up comfort.",
    },
    profile: {
      name: "Mileva Koncept",
      bio: "Mileva Koncept brings together a fine restaurant, four warmly furnished accommodation units, and an outdoor pool with salt-enriched water that gives bathers the feeling of the seaside — in the very heart of Šumadija. The preserved architecture of a traditional village, subtly blended with modern materials, lends it a special charm. The warmth of wood and stone, the sounds of nature, and carefully chosen details make every stay exceptional — whether you seek a romantic weekend, a family holiday, or a space for private celebrations and events.",
    },
    featured: {
      paragraph:
        "A sensory escape where time dissolves between still water and the scent of the forest. Salt-water pools, warm wood and open sky — the calm of the sea, in the heart of Šumadija.",
    },
    sidebar: {
      restaurantsLabel: "Restaurants — Sumibiyaki",
      finestLabel: "Japan's Finest",
      finest: ["Ito Ranch", "Matsusaka Beef", "Kobe Beef", "Crown Melon"],
    },
    cities: { Madrid: "Madrid", Barcelona: "Barcelona", Paris: "Paris" },
    restaurants: { categories: ["Restaurant", "Accommodation", "Events"] },
    contact: {
      title: "Contact",
      address: "Grivac bb, 34240 Knić, Serbia",
      follow: "Follow us",
    },
    footer: {
      links: ["Cookies policy", "Privacy policy", "Legal notice"],
      copyright: "© 2026 Mileva Koncept",
      explore: "Navigation",
      tagline: "Where tradition meets luxury, and hospitality becomes art.",
    },
  },
};
