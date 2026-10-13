/**
 * Naslovi i opisi stranica, po jeziku.
 *
 * Stoje odvojeno od `translations.ts` jer ovo nije tekst koji se vidi na sajtu
 * nego ono što Google prikazuje u rezultatima — piše se drugačije: ključna reč
 * napred, naslov do ~60 znakova sa brendom, opis do ~160.
 *
 * Ćirilica i latinica gađaju iste pojmove (pretraga u Srbiji se kuca oba pisma,
 * pretežno latinicom), engleski gađa strane goste i dijasporu.
 */

import type { LangCode } from "./translations";

export type PageKey =
  | "home"
  | "smestaj"
  | "restoran"
  | "bazen"
  | "dogadjaji"
  | "kvadovi"
  | "znamenitosti"
  | "blog"
  | "kontakt"
  | "privatnost"
  | "kolacici";

type PageSeo = { title: string; description: string };

type SeoDict = {
  /** Ime brenda u sufiksu naslova - pismo prati jezik rute. */
  brand: string;
  /** Naslov naslovne strane - jedini bez brend sufiksa. */
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  pages: Record<PageKey, PageSeo>;
};

export const SEO: Record<LangCode, SeoDict> = {
  "sr-cyrl": {
    brand: "Милева Концепт",
    siteTitle: "Ресторан и смештај у Шумадији - Милева Концепт, Гривац",
    siteDescription:
      "Ресторан са домаћом кухињом, апартман са базеном од слане воде и простор за прославе у Гривцу код Кнића - надомак Гружанског језера, 30 минута од Крагујевца.",
    keywords: [
      "ресторан Шумадија",
      "смештај Шумадија",
      "ресторан Кнић",
      "смештај Кнић",
      "Гружанско језеро смештај",
      "ресторан код Гружанског језера",
      "апартман са базеном Шумадија",
      "базен са сланом водом",
      "свадбе и прославе Шумадија",
      "сала за прославе Крагујевац",
      "домаћа кухиња Крагујевац",
      "викенд у Шумадији",
      "сеоски туризам Кнић",
      "Гривац",
      "Милева Концепт",
    ],
    pages: {
      home: {
        title: "Ресторан и смештај у Шумадији - Милева Концепт, Гривац",
        description:
          "Ресторан са домаћом кухињом, апартман са базеном од слане воде и простор за прославе у Гривцу код Кнића - надомак Гружанског језера, 30 минута од Крагујевца.",
      },
      smestaj: {
        title: "Смештај у Шумадији - апартман са базеном",
        description:
          "Апартман од 60 m² за четворо у Гривцу код Кнића - башта, тераса, базен са сланом водом, паркинг и Wi-Fi. Надомак Гружанског језера, 30 минута од Крагујевца.",
      },
      restoran: {
        title: "Ресторан код Гружанског језера",
        description:
          "Ресторан Милева Концепт у Гривцу код Кнића - домаћа шумадијска кухиња са ватре, локалне намирнице и башта са погледом. Двадесетак минута од Крагујевца.",
      },
      bazen: {
        title: "Базен са сланом водом у Шумадији",
        description:
          "Отворени базен са сланом и загреваном водом у Гривцу код Кнића - прелив са погледом на брда, лежаљке, плићак за децу и бар уз воду. Дневне карте и резервације.",
      },
      dogadjaji: {
        title: "Свадбе и прославе у Шумадији",
        description:
          "Свадбе, крштења, славе и рођендани у Милева Концепту код Кнића - башта, тераса, базен и домаћа кухиња. Простор за прославе надомак Крагујевца.",
      },
      kvadovi: {
        title: "Рентирање квадова у Шумадији",
        description:
          "Изнајмљивање квадова у Гривцу код Кнића - вожња кроз шумадијска брда и шумске путеве, обележене руте на мапи и GPX за навигацију. Резервације преко контакта.",
      },
      znamenitosti: {
        title: "Знаменитости Кнића и Груже - шта посетити",
        description:
          "Шта посетити око Кнића и Груже: Борачки крш, Гружанско језеро, манастир Каменац, црква у Борчу, Гледићке планине и Котленик - све у пола сата вожње од Милеве.",
      },
      blog: {
        title: "Блог о Шумадији и домаћој кухињи",
        description:
          "Приче са имања Милева Концепт у Гривцу - домаћа кухиња, природа Шумадије, савети за излете око Кнића, Груже и Гружанског језера.",
      },
      kontakt: {
        title: "Контакт и резервације - Гривац, Кнић",
        description:
          "Контакт Милева Концепта у Гривцу код Кнића - адреса, телефон, имејл и радно време. Пишите нам за резервацију стола, смештаја или прославе у срцу Шумадије.",
      },
      privatnost: {
        title: "Политика приватности",
        description:
          "Које податке о личности прикупљамо преко сајта, зашто, колико их чувамо и која права имате - по Закону о заштити података о личности Републике Србије.",
      },
      kolacici: {
        title: "Политика колачића",
        description:
          "Овај сајт не користи колачиће за аналитику, профилисање ни оглашавање - зато нема ни траке за пристанак. Шта се ипак може појавити у прегледачу и како тиме управљате.",
      },
    },
  },

  "sr-latn": {
    brand: "Mileva Koncept",
    siteTitle: "Restoran i smeštaj u Šumadiji - Mileva Koncept, Grivac",
    siteDescription:
      "Restoran sa domaćom kuhinjom, apartman sa bazenom od slane vode i prostor za proslave u Grivcu kod Knića - nadomak Gružanskog jezera, 30 minuta od Kragujevca.",
    keywords: [
      "restoran Šumadija",
      "smeštaj Šumadija",
      "restoran Knić",
      "smeštaj Knić",
      "Gružansko jezero smeštaj",
      "restoran kod Gružanskog jezera",
      "apartman sa bazenom Šumadija",
      "bazen sa slanom vodom",
      "svadbe i proslave Šumadija",
      "sala za proslave Kragujevac",
      "domaća kuhinja Kragujevac",
      "vikend u Šumadiji",
      "seoski turizam Knić",
      "Grivac",
      "Mileva Koncept",
    ],
    pages: {
      home: {
        title: "Restoran i smeštaj u Šumadiji - Mileva Koncept, Grivac",
        description:
          "Restoran sa domaćom kuhinjom, apartman sa bazenom od slane vode i prostor za proslave u Grivcu kod Knića - nadomak Gružanskog jezera, 30 minuta od Kragujevca.",
      },
      smestaj: {
        title: "Smeštaj u Šumadiji - apartman sa bazenom",
        description:
          "Apartman od 60 m² za četvoro u Grivcu kod Knića - bašta, terasa, bazen sa slanom vodom, parking i Wi-Fi. Nadomak Gružanskog jezera, 30 minuta od Kragujevca.",
      },
      restoran: {
        title: "Restoran kod Gružanskog jezera",
        description:
          "Restoran Mileva Koncept u Grivcu kod Knića - domaća šumadijska kuhinja sa vatre, lokalne namirnice i bašta sa pogledom. Dvadesetak minuta od Kragujevca.",
      },
      bazen: {
        title: "Bazen sa slanom vodom u Šumadiji",
        description:
          "Otvoreni bazen sa slanom i zagrevanom vodom u Grivcu kod Knića - preliv sa pogledom na brda, ležaljke, plićak za decu i bar uz vodu. Dnevne karte i rezervacije.",
      },
      dogadjaji: {
        title: "Svadbe i proslave u Šumadiji",
        description:
          "Svadbe, krštenja, slave i rođendani u Mileva Konceptu kod Knića - bašta, terasa, bazen i domaća kuhinja. Prostor za proslave nadomak Kragujevca.",
      },
      kvadovi: {
        title: "Rentiranje kvadova u Šumadiji",
        description:
          "Iznajmljivanje kvadova u Grivcu kod Knića - vožnja kroz šumadijska brda i šumske puteve, obeležene rute na mapi i GPX za navigaciju. Rezervacije preko kontakta.",
      },
      znamenitosti: {
        title: "Znamenitosti Knića i Gruže - šta posetiti",
        description:
          "Šta posetiti oko Knića i Gruže: Borački krš, Gružansko jezero, manastir Kamenac, crkva u Borču, Gledićke planine i Kotlenik - sve u pola sata vožnje od Mileve.",
      },
      blog: {
        title: "Blog o Šumadiji i domaćoj kuhinji",
        description:
          "Priče sa imanja Mileva Koncept u Grivcu - domaća kuhinja, priroda Šumadije, saveti za izlete oko Knića, Gruže i Gružanskog jezera.",
      },
      kontakt: {
        title: "Kontakt i rezervacije - Grivac, Knić",
        description:
          "Kontakt Mileva Koncepta u Grivcu kod Knića - adresa, telefon, imejl i radno vreme. Pišite nam za rezervaciju stola, smeštaja ili proslave u srcu Šumadije.",
      },
      privatnost: {
        title: "Politika privatnosti",
        description:
          "Koje podatke o ličnosti prikupljamo preko sajta, zašto, koliko ih čuvamo i koja prava imate - po Zakonu o zaštiti podataka o ličnosti Republike Srbije.",
      },
      kolacici: {
        title: "Politika kolačića",
        description:
          "Ovaj sajt ne koristi kolačiće za analitiku, profilisanje ni oglašavanje - zato nema ni trake za pristanak. Šta se ipak može pojaviti u pregledaču i kako time upravljate.",
      },
    },
  },

  en: {
    brand: "Mileva Koncept",
    siteTitle: "Restaurant & Stay in Šumadija, Serbia - Mileva Koncept",
    siteDescription:
      "Home-cooked Serbian food, an apartment with a saltwater pool and a venue for celebrations in Grivac near Knić - by Gruža Lake, 30 minutes from Kragujevac.",
    keywords: [
      "restaurant Šumadija Serbia",
      "accommodation Šumadija",
      "where to stay near Kragujevac",
      "Gruža Lake accommodation",
      "apartment with pool Serbia",
      "saltwater pool Serbia",
      "Serbian countryside stay",
      "rural tourism Serbia",
      "wedding venue Serbia",
      "traditional Serbian restaurant",
      "things to do in Šumadija",
      "Grivac Knić",
      "Mileva Koncept",
    ],
    pages: {
      home: {
        title: "Restaurant & Stay in Šumadija, Serbia - Mileva Koncept",
        description:
          "Home-cooked Serbian food, an apartment with a saltwater pool and a venue for celebrations in Grivac near Knić - by Gruža Lake, 30 minutes from Kragujevac.",
      },
      smestaj: {
        title: "Stay in Šumadija - Apartment with Pool",
        description:
          "A 60 m² apartment for four in Grivac near Knić - garden, terrace, saltwater pool, free parking and Wi-Fi. Close to Gruža Lake, 30 minutes from Kragujevac.",
      },
      restoran: {
        title: "Restaurant by Gruža Lake, Serbia",
        description:
          "Mileva Koncept restaurant in Grivac near Knić - traditional Šumadija cooking over fire, local produce and a garden with a view. Twenty minutes from Kragujevac.",
      },
      bazen: {
        title: "Saltwater Pool in Šumadija, Serbia",
        description:
          "An outdoor heated saltwater pool in Grivac near Knić - infinity edge over the hills, sunbeds, a shallow end for children and a bar by the water. Day passes available.",
      },
      dogadjaji: {
        title: "Weddings & Celebrations in Šumadija",
        description:
          "Weddings, christenings, slava feasts and birthdays at Mileva Koncept near Knić - garden, terrace, pool and home cooking. A celebration venue close to Kragujevac.",
      },
      kvadovi: {
        title: "Quad Bike Rental in Šumadija, Serbia",
        description:
          "Rent a quad bike in Grivac near Knić - ride the hills and forest tracks of Šumadija, with marked routes on the map and GPX files for your navigation.",
      },
      znamenitosti: {
        title: "Things to Do around Knić and Gruža",
        description:
          "What to see near Knić and Gruža: Borački krš, Gruža Lake, Kamenac monastery, the church at Borač, the Gledić mountains and Kotlenik - all within half an hour.",
      },
      blog: {
        title: "Šumadija Stories & Serbian Home Cooking",
        description:
          "Stories from the Mileva Koncept estate in Grivac - home cooking, the nature of Šumadija and ideas for day trips around Knić, Gruža and Gruža Lake.",
      },
      kontakt: {
        title: "Contact & Reservations - Grivac, Knić",
        description:
          "Contact Mileva Koncept in Grivac near Knić - address, phone, email and opening hours. Write to us to book a table, a stay or a celebration in the heart of Šumadija.",
      },
      privatnost: {
        title: "Privacy policy",
        description:
          "What personal data we collect through this site, why, how long we keep it and what rights you have - under the Serbian Personal Data Protection Act.",
      },
      kolacici: {
        title: "Cookies policy",
        description:
          "This site sets no cookies for analytics, profiling or advertising - which is why there is no consent banner. What may still appear in your browser, and how to control it.",
      },
    },
  },
};
