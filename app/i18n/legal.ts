/**
 * Pravni tekstovi sajta, po jeziku.
 *
 * Odvojeni od `translations.ts` iz istog razloga kao i `seoContent.ts` — ovo je
 * dug, zaokružen dokument koji se menja retko i po sopstvenoj logici, pa bi
 * samo zatrpao rečnik sa kratkim natpisima interfejsa.
 *
 * POLITIKA PRIVATNOSTI je pisana prema Zakonu o zaštiti podataka o ličnosti
 * („Sl. glasnik RS“, br. 87/2018) i opisuje ono što sajt STVARNO radi:
 *   · kontakt forma  → ime, imejl, naslov (opciono), poruka
 *     (app/actions/contact.ts → backend `contact_messages` + mejl adminu)
 *   · zahtev za rezervaciju → ime, imejl, telefon (opciono), broj gostiju,
 *     datumi, napomena (app/actions/booking.ts → backend `reservations`)
 *   · IP adresa se prosleđuje backendu radi ograničenja broja zahteva
 *     (5 na sat po IP za forme, 300 na 15 minuta globalno)
 *   · NEMA kolačića za analitiku, profilisanje ni oglašavanje, nema piksela
 *     društvenih mreža i nema localStorage-a — jezik živi u samoj putanji
 *
 * Ako se neki od ovih tokova promeni, MORA da se promeni i tekst ispod.
 *
 * Podaci rukovaoca (adresa, imejl, telefon, PIB) se NE prepisuju ovde — blok sa
 * kontaktom sklapa komponenta iz `lib/site.ts`, pa ostaje na jednom mestu.
 */

import type { LangCode } from "./translations";

export type LegalSection = {
  /** Sidro za direktan link, npr. `#kolacici` iz futera. */
  id: string;
  heading: string;
  /** Pasusi pre nabrajanja. */
  body?: string[];
  /** Stavke nabrajanja; `term` je podebljan uvod stavke kad postoji. */
  list?: { term?: string; text: string }[];
  /** Pasusi posle nabrajanja. */
  after?: string[];
  /** Veza ka drugom pravnom dokumentu na kraju sekcije (putanja bez jezika). */
  link?: { href: string; label: string };
};

export type LegalDoc = {
  eyebrow: string;
  title: string;
  /** „Poslednje ažuriranje: …" */
  updated: string;
  intro: string[];
  /** Naslov iznad indeksa sekcija. */
  contentsLabel: string;
  /** Blok sa podacima rukovaoca — vrednosti stižu iz `lib/site.ts`. */
  controller: {
    id: string;
    heading: string;
    body: string[];
    labels: {
      name: string;
      address: string;
      email: string;
      phone: string;
      pib: string;
      reg: string;
    };
    after: string[];
  };
  sections: LegalSection[];
};

export const PRIVACY: Record<LangCode, LegalDoc> = {
  "sr-cyrl": {
    eyebrow: "Правно",
    title: "Политика приватности",
    updated: "Последње ажурирање: 4. август 2026.",
    contentsLabel: "Садржај",
    intro: [
      "Ваша приватност нам је важна и трудимо се да о њој говоримо јасно, без ситних слова. Ова политика објашњава које податке о личности прикупљамо преко сајта milevakoncept.rs, зашто их прикупљамо, колико их чувамо и која права имате.",
      "Политика је написана у складу са Законом о заштити података о личности („Службени гласник РС“, бр. 87/2018).",
    ],
    controller: {
      id: "rukovalac",
      heading: "1. Ко управља вашим подацима",
      body: [
        "Руковалац подацима о личности, у смислу члана 4 Закона, јесте:",
      ],
      labels: {
        name: "Назив",
        address: "Адреса",
        email: "Имејл",
        phone: "Телефон",
        pib: "ПИБ",
        reg: "Матични број",
      },
      after: [
        "Нисмо у обавези да одредимо лице за заштиту података о личности (члан 56 Закона), јер обрада података није наша основна делатност, не вршимо систематски надзор нити обрађујемо посебне врсте података у великом обиму. Сва питања и захтеве у вези са вашим подацима шаљете на наведени имејл.",
      ],
    },
    sections: [
      {
        id: "podaci",
        heading: "2. Које податке прикупљамо",
        body: [
          "Прикупљамо само оно што нам сами пошаљете преко образаца на сајту, уз минимум техничких података неопходних за безбедан рад сајта.",
        ],
        list: [
          {
            term: "Контакт форма",
            text: "име и презиме, имејл адреса, наслов поруке (необавезно) и садржај поруке.",
          },
          {
            term: "Захтев за резервацију смештаја",
            text: "име и презиме, имејл адреса, број телефона (необавезно), број гостију, датуми доласка и одласка и напомена коју унесете.",
          },
          {
            term: "Технички подаци",
            text: "IP адреса, време приступа и основни подаци о прегледачу, из безбедносних записа сервера.",
          },
        ],
        after: [
          "Не тражимо и не желимо посебне врсте података о личности - податке о здрављу, вероисповести, политичком опредељењу, националној припадности или сличне. Молимо вас да их не уписујете у поље за поруку.",
          "Сајт нема ни један образац који захтева ЈМБГ, број личне карте или податке о платној картици.",
        ],
      },
      {
        id: "svrha",
        heading: "3. Зашто обрађујемо податке и по ком основу",
        body: [
          "Сваку обраду везујемо за конкретну сврху и правни основ из члана 12 Закона:",
        ],
        list: [
          {
            term: "Одговор на ваш упит",
            text: "да бисмо одговорили на поруку послату преко контакт форме. Основ: предузимање радњи на ваш захтев пре закључења уговора и наш легитимни интерес да одговоримо на упит (члан 12 став 1 тачке 2 и 6).",
          },
          {
            term: "Обрада захтева за резервацију",
            text: "да бисмо проверили слободне термине, потврдили резервацију и договорили детаље боравка. Основ: закључење и извршење уговора, односно радње пре закључења уговора (члан 12 став 1 тачка 2).",
          },
          {
            term: "Заштита сајта од злоупотребе",
            text: "ограничавамо број порука и захтева са исте IP адресе како обрасци не би били канал за нежељену пошту. Основ: наш легитимни интерес да сајт ради исправно и безбедно (члан 12 став 1 тачка 6).",
          },
          {
            term: "Испуњење законских обавеза",
            text: "вођење прописаних евиденција и чување рачуноводствених исправа када до боравка заиста дође. Основ: поштовање правних обавеза руковаоца (члан 12 став 1 тачка 3).",
          },
        ],
        after: [
          "Ваше податке не користимо за слање рекламних порука без вашег пристанка и не шаљемо newsletter.",
        ],
      },
      {
        id: "cuvanje",
        heading: "4. Колико дуго чувамо податке",
        body: ["Податке не чувамо дуже него што је потребно за сврху због које су прикупљени."],
        list: [
          {
            term: "Поруке са контакт форме",
            text: "најдуже две године од последње преписке, а затим их бришемо.",
          },
          {
            term: "Захтеви за резервацију који не постану резервација",
            text: "најдуже дванаест месеци.",
          },
          {
            term: "Потврђене резервације",
            text: "за време боравка и након тога у роковима које прописују прописи о угоститељству и рачуноводству.",
          },
          {
            term: "Безбедносни записи сервера",
            text: "најдуже дванаест месеци.",
          },
        ],
        after: [
          "И пре истека ових рокова податке бришемо чим затражите брисање, осим ако смо законом обавезани да их задржимо.",
        ],
      },
      {
        id: "primaoci",
        heading: "5. Коме подаци могу бити достављени",
        body: ["Подацима приступа само мали број наших запослених и сарадника којима је то потребно за рад. Изван тога, подаци могу бити достављени:"],
        list: [
          {
            text: "пружаоцу услуге смештаја сајта и базе података (хостинг), који их чува у наше име и по нашим упутствима;",
          },
          {
            text: "пружаоцу услуге електронске поште, преко које нам стижу обавештења о вашим порукама и захтевима;",
          },
          {
            text: "надлежним државним органима, када за то постоји законска обавеза.",
          },
        ],
        after: [
          "Ваше податке не продајемо, не размењујемо и не уступамо трећим лицима за рекламирање.",
          "Уколико се неки од наших пружалаца услуга налази ван Републике Србије, пренос података вршимо само у складу са одредбама Закона о преношењу података у друге државе (чланови 63 до 69), односно у државе за које је утврђен примерен ниво заштите или уз одговарајуће мере заштите.",
        ],
      },
      {
        id: "kolacici",
        heading: "6. Колачићи",
        body: [
          "Овај сајт не користи колачиће за аналитику, профилисање нити оглашавање. Нема Google Analytics-а, нема пиксела друштвених мрежа, нема рекламних мрежа и нема праћења вашег кретања кроз интернет.",
          "Изабрани језик не памтимо у колачићу - он стоји у самој адреси странице (/sr, /sr-latn, /en).",
          "Могу се поставити искључиво технички неопходни колачићи, које сервер користи да би сајт исправно радио и био безбедан. За такве колачиће, у складу са прописима, пристанак се не тражи, јер без њих услуга коју сте затражили не би могла да се пружи.",
          "Колачиће трећих страна можете у сваком тренутку блокирати у подешавањима свог прегледача, што неће утицати на рад овог сајта.",
        ],
        link: { href: "/politika-kolacica", label: "Прочитајте политику колачића" },
      },
      {
        id: "prava",
        heading: "7. Ваша права",
        body: ["У складу са Законом, у сваком тренутку имате право на:"],
        list: [
          { term: "приступ", text: "да сазнате да ли обрађујемо ваше податке и да добијете копију (члан 26);" },
          { term: "исправку и допуну", text: "да исправите нетачне и допуните непотпуне податке (члан 29);" },
          { term: "брисање", text: "да затражите да ваше податке избришемо (члан 30);" },
          { term: "ограничење обраде", text: "да привремено зауставите обраду (члан 31);" },
          { term: "преносивост", text: "да ваше податке добијете у машински читљивом облику или да их пренесемо другом руковаоцу (члан 36);" },
          { term: "приговор", text: "да уложите приговор на обраду засновану на легитимном интересу (члан 37);" },
          { term: "опозив пристанка", text: "када се обрада заснива на пристанку, можете га опозвати у сваком тренутку, што не утиче на законитост обраде пре опозива." },
        ],
        after: [
          "Захтев шаљете на info@milevakoncept.rs. Одговарамо у најкраћем року, а најкасније у року од 30 дана од пријема захтева; изузетно, тај рок може бити продужен за још 30 дана, о чему ћемо вас обавестити уз образложење.",
          "Остваривање ових права је бесплатно. Наплату можемо затражити само ако је захтев очигледно неоснован или се понавља учестало.",
        ],
      },
      {
        id: "poverenik",
        heading: "8. Притужба Поверенику",
        body: [
          "Ако сматрате да обрадом ваших података кршимо Закон, имате право да поднесете притужбу Поверенику за информације од јавног значаја и заштиту података о личности:",
          "Булевар краља Александра 15, 11120 Београд · office@poverenik.rs · 011 3408 900 · www.poverenik.rs",
          "Право на притужбу можете искористити и без претходног обраћања нама, али бисмо волели да нам прво пружите прилику да ствар решимо.",
        ],
      },
      {
        id: "bezbednost",
        heading: "9. Безбедност података",
        body: [
          "Веза између вашег прегледача и сајта је шифрована (HTTPS), а подаци из образаца се преносе преко нашег сервера, тако да адреса базе никада није изложена у прегледачу.",
          "Приступ подацима у админ панелу имају само овлашћена лица, уз лозинку. Обрасци су заштићени од аутоматизованог слања и ограничени бројем захтева са исте адресе.",
          "Ниједна мера, међутим, не пружа апсолутну сигурност. Ако би дошло до повреде података која може да проузрокује висок ризик по ваша права, обавестићемо вас у складу са члановима 53 и 54 Закона.",
        ],
      },
      {
        id: "deca",
        heading: "10. Малолетна лица",
        body: [
          "Сајт није намењен деци и не прикупљамо свесно податке о деци. У складу са чланом 16 Закона, лице млађе од 15 година може дати пристанак само уз сагласност родитеља или другог законског заступника.",
          "Ако сазнате да нам је дете послало своје податке, јавите нам се и одмах ћемо их обрисати.",
        ],
      },
      {
        id: "odlucivanje",
        heading: "11. Аутоматизовано одлучивање",
        body: [
          "Не доносимо одлуке које се заснивају искључиво на аутоматизованој обради података и не вршимо профилисање у смислу члана 38 Закона. Сваку резервацију и сваки упит гледа човек.",
        ],
      },
      {
        id: "izmene",
        heading: "12. Измене ове политике",
        body: [
          "Политику можемо да изменимо ако се промени начин на који радимо или ако то захтевају прописи. Важећа верзија је увек на овој страници, а датум последњег ажурирања стоји на њеном врху.",
          "Ако измене буду значајне, обавестићемо вас на видљив начин пре него што почну да се примењују.",
        ],
      },
    ],
  },

  "sr-latn": {
    eyebrow: "Pravno",
    title: "Politika privatnosti",
    updated: "Poslednje ažuriranje: 4. avgust 2026.",
    contentsLabel: "Sadržaj",
    intro: [
      "Vaša privatnost nam je važna i trudimo se da o njoj govorimo jasno, bez sitnih slova. Ova politika objašnjava koje podatke o ličnosti prikupljamo preko sajta milevakoncept.rs, zašto ih prikupljamo, koliko ih čuvamo i koja prava imate.",
      "Politika je napisana u skladu sa Zakonom o zaštiti podataka o ličnosti („Službeni glasnik RS“, br. 87/2018).",
    ],
    controller: {
      id: "rukovalac",
      heading: "1. Ko upravlja vašim podacima",
      body: ["Rukovalac podacima o ličnosti, u smislu člana 4 Zakona, jeste:"],
      labels: {
        name: "Naziv",
        address: "Adresa",
        email: "Imejl",
        phone: "Telefon",
        pib: "PIB",
        reg: "Matični broj",
      },
      after: [
        "Nismo u obavezi da odredimo lice za zaštitu podataka o ličnosti (član 56 Zakona), jer obrada podataka nije naša osnovna delatnost, ne vršimo sistematski nadzor niti obrađujemo posebne vrste podataka u velikom obimu. Sva pitanja i zahteve u vezi sa vašim podacima šaljete na navedeni imejl.",
      ],
    },
    sections: [
      {
        id: "podaci",
        heading: "2. Koje podatke prikupljamo",
        body: [
          "Prikupljamo samo ono što nam sami pošaljete preko obrazaca na sajtu, uz minimum tehničkih podataka neophodnih za bezbedan rad sajta.",
        ],
        list: [
          {
            term: "Kontakt forma",
            text: "ime i prezime, imejl adresa, naslov poruke (neobavezno) i sadržaj poruke.",
          },
          {
            term: "Zahtev za rezervaciju smeštaja",
            text: "ime i prezime, imejl adresa, broj telefona (neobavezno), broj gostiju, datumi dolaska i odlaska i napomena koju unesete.",
          },
          {
            term: "Tehnički podaci",
            text: "IP adresa, vreme pristupa i osnovni podaci o pregledaču, iz bezbednosnih zapisa servera.",
          },
        ],
        after: [
          "Ne tražimo i ne želimo posebne vrste podataka o ličnosti - podatke o zdravlju, veroispovesti, političkom opredeljenju, nacionalnoj pripadnosti ili slične. Molimo vas da ih ne upisujete u polje za poruku.",
          "Sajt nema ni jedan obrazac koji zahteva JMBG, broj lične karte ili podatke o platnoj kartici.",
        ],
      },
      {
        id: "svrha",
        heading: "3. Zašto obrađujemo podatke i po kom osnovu",
        body: ["Svaku obradu vezujemo za konkretnu svrhu i pravni osnov iz člana 12 Zakona:"],
        list: [
          {
            term: "Odgovor na vaš upit",
            text: "da bismo odgovorili na poruku poslatu preko kontakt forme. Osnov: preduzimanje radnji na vaš zahtev pre zaključenja ugovora i naš legitimni interes da odgovorimo na upit (član 12 stav 1 tačke 2 i 6).",
          },
          {
            term: "Obrada zahteva za rezervaciju",
            text: "da bismo proverili slobodne termine, potvrdili rezervaciju i dogovorili detalje boravka. Osnov: zaključenje i izvršenje ugovora, odnosno radnje pre zaključenja ugovora (član 12 stav 1 tačka 2).",
          },
          {
            term: "Zaštita sajta od zloupotrebe",
            text: "ograničavamo broj poruka i zahteva sa iste IP adrese kako obrasci ne bi bili kanal za neželjenu poštu. Osnov: naš legitimni interes da sajt radi ispravno i bezbedno (član 12 stav 1 tačka 6).",
          },
          {
            term: "Ispunjenje zakonskih obaveza",
            text: "vođenje propisanih evidencija i čuvanje računovodstvenih isprava kada do boravka zaista dođe. Osnov: poštovanje pravnih obaveza rukovaoca (član 12 stav 1 tačka 3).",
          },
        ],
        after: [
          "Vaše podatke ne koristimo za slanje reklamnih poruka bez vašeg pristanka i ne šaljemo newsletter.",
        ],
      },
      {
        id: "cuvanje",
        heading: "4. Koliko dugo čuvamo podatke",
        body: ["Podatke ne čuvamo duže nego što je potrebno za svrhu zbog koje su prikupljeni."],
        list: [
          {
            term: "Poruke sa kontakt forme",
            text: "najduže dve godine od poslednje prepiske, a zatim ih brišemo.",
          },
          {
            term: "Zahtevi za rezervaciju koji ne postanu rezervacija",
            text: "najduže dvanaest meseci.",
          },
          {
            term: "Potvrđene rezervacije",
            text: "za vreme boravka i nakon toga u rokovima koje propisuju propisi o ugostiteljstvu i računovodstvu.",
          },
          { term: "Bezbednosni zapisi servera", text: "najduže dvanaest meseci." },
        ],
        after: [
          "I pre isteka ovih rokova podatke brišemo čim zatražite brisanje, osim ako smo zakonom obavezani da ih zadržimo.",
        ],
      },
      {
        id: "primaoci",
        heading: "5. Kome podaci mogu biti dostavljeni",
        body: [
          "Podacima pristupa samo mali broj naših zaposlenih i saradnika kojima je to potrebno za rad. Izvan toga, podaci mogu biti dostavljeni:",
        ],
        list: [
          {
            text: "pružaocu usluge smeštaja sajta i baze podataka (hosting), koji ih čuva u naše ime i po našim uputstvima;",
          },
          {
            text: "pružaocu usluge elektronske pošte, preko koje nam stižu obaveštenja o vašim porukama i zahtevima;",
          },
          { text: "nadležnim državnim organima, kada za to postoji zakonska obaveza." },
        ],
        after: [
          "Vaše podatke ne prodajemo, ne razmenjujemo i ne ustupamo trećim licima za reklamiranje.",
          "Ukoliko se neki od naših pružalaca usluga nalazi van Republike Srbije, prenos podataka vršimo samo u skladu sa odredbama Zakona o prenošenju podataka u druge države (članovi 63 do 69), odnosno u države za koje je utvrđen primeren nivo zaštite ili uz odgovarajuće mere zaštite.",
        ],
      },
      {
        id: "kolacici",
        heading: "6. Kolačići",
        body: [
          "Ovaj sajt ne koristi kolačiće za analitiku, profilisanje niti oglašavanje. Nema Google Analytics-a, nema piksela društvenih mreža, nema reklamnih mreža i nema praćenja vašeg kretanja kroz internet.",
          "Izabrani jezik ne pamtimo u kolačiću - on stoji u samoj adresi stranice (/sr, /sr-latn, /en).",
          "Mogu se postaviti isključivo tehnički neophodni kolačići, koje server koristi da bi sajt ispravno radio i bio bezbedan. Za takve kolačiće, u skladu sa propisima, pristanak se ne traži, jer bez njih usluga koju ste zatražili ne bi mogla da se pruži.",
          "Kolačiće trećih strana možete u svakom trenutku blokirati u podešavanjima svog pregledača, što neće uticati na rad ovog sajta.",
        ],
        link: { href: "/politika-kolacica", label: "Pročitajte politiku kolačića" },
      },
      {
        id: "prava",
        heading: "7. Vaša prava",
        body: ["U skladu sa Zakonom, u svakom trenutku imate pravo na:"],
        list: [
          { term: "pristup", text: "da saznate da li obrađujemo vaše podatke i da dobijete kopiju (član 26);" },
          { term: "ispravku i dopunu", text: "da ispravite netačne i dopunite nepotpune podatke (član 29);" },
          { term: "brisanje", text: "da zatražite da vaše podatke izbrišemo (član 30);" },
          { term: "ograničenje obrade", text: "da privremeno zaustavite obradu (član 31);" },
          {
            term: "prenosivost",
            text: "da vaše podatke dobijete u mašinski čitljivom obliku ili da ih prenesemo drugom rukovaocu (član 36);",
          },
          { term: "prigovor", text: "da uložite prigovor na obradu zasnovanu na legitimnom interesu (član 37);" },
          {
            term: "opoziv pristanka",
            text: "kada se obrada zasniva na pristanku, možete ga opozvati u svakom trenutku, što ne utiče na zakonitost obrade pre opoziva.",
          },
        ],
        after: [
          "Zahtev šaljete na info@milevakoncept.rs. Odgovaramo u najkraćem roku, a najkasnije u roku od 30 dana od prijema zahteva; izuzetno, taj rok može biti produžen za još 30 dana, o čemu ćemo vas obavestiti uz obrazloženje.",
          "Ostvarivanje ovih prava je besplatno. Naplatu možemo zatražiti samo ako je zahtev očigledno neosnovan ili se ponavlja učestalo.",
        ],
      },
      {
        id: "poverenik",
        heading: "8. Pritužba Povereniku",
        body: [
          "Ako smatrate da obradom vaših podataka kršimo Zakon, imate pravo da podnesete pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti:",
          "Bulevar kralja Aleksandra 15, 11120 Beograd · office@poverenik.rs · 011 3408 900 · www.poverenik.rs",
          "Pravo na pritužbu možete iskoristiti i bez prethodnog obraćanja nama, ali bismo voleli da nam prvo pružite priliku da stvar rešimo.",
        ],
      },
      {
        id: "bezbednost",
        heading: "9. Bezbednost podataka",
        body: [
          "Veza između vašeg pregledača i sajta je šifrovana (HTTPS), a podaci iz obrazaca se prenose preko našeg servera, tako da adresa baze nikada nije izložena u pregledaču.",
          "Pristup podacima u admin panelu imaju samo ovlašćena lica, uz lozinku. Obrasci su zaštićeni od automatizovanog slanja i ograničeni brojem zahteva sa iste adrese.",
          "Nijedna mera, međutim, ne pruža apsolutnu sigurnost. Ako bi došlo do povrede podataka koja može da prouzrokuje visok rizik po vaša prava, obavestićemo vas u skladu sa članovima 53 i 54 Zakona.",
        ],
      },
      {
        id: "deca",
        heading: "10. Maloletna lica",
        body: [
          "Sajt nije namenjen deci i ne prikupljamo svesno podatke o deci. U skladu sa članom 16 Zakona, lice mlađe od 15 godina može dati pristanak samo uz saglasnost roditelja ili drugog zakonskog zastupnika.",
          "Ako saznate da nam je dete poslalo svoje podatke, javite nam se i odmah ćemo ih obrisati.",
        ],
      },
      {
        id: "odlucivanje",
        heading: "11. Automatizovano odlučivanje",
        body: [
          "Ne donosimo odluke koje se zasnivaju isključivo na automatizovanoj obradi podataka i ne vršimo profilisanje u smislu člana 38 Zakona. Svaku rezervaciju i svaki upit gleda čovek.",
        ],
      },
      {
        id: "izmene",
        heading: "12. Izmene ove politike",
        body: [
          "Politiku možemo da izmenimo ako se promeni način na koji radimo ili ako to zahtevaju propisi. Važeća verzija je uvek na ovoj stranici, a datum poslednjeg ažuriranja stoji na njenom vrhu.",
          "Ako izmene budu značajne, obavestićemo vas na vidljiv način pre nego što počnu da se primenjuju.",
        ],
      },
    ],
  },

  en: {
    eyebrow: "Legal",
    title: "Privacy policy",
    updated: "Last updated: 4 August 2026",
    contentsLabel: "Contents",
    intro: [
      "Your privacy matters to us, and we would rather explain it plainly than bury it in fine print. This policy sets out what personal data we collect through milevakoncept.rs, why we collect it, how long we keep it and what rights you have.",
      "It is written under the Serbian Personal Data Protection Act (Zakon o zaštiti podataka o ličnosti, Official Gazette of the RS no. 87/2018), which closely follows the GDPR.",
    ],
    controller: {
      id: "rukovalac",
      heading: "1. Who controls your data",
      body: ["The data controller, within the meaning of Article 4 of the Act, is:"],
      labels: {
        name: "Name",
        address: "Address",
        email: "E-mail",
        phone: "Phone",
        pib: "Tax ID (PIB)",
        reg: "Company number",
      },
      after: [
        "We are not required to appoint a data protection officer (Article 56 of the Act): processing personal data is not our core activity, we carry out no systematic monitoring, and we do not process special categories of data on a large scale. Please send any question or request about your data to the e-mail address above.",
      ],
    },
    sections: [
      {
        id: "podaci",
        heading: "2. What data we collect",
        body: [
          "We collect only what you send us through the forms on this site, plus the minimum technical data needed to run it securely.",
        ],
        list: [
          {
            term: "Contact form",
            text: "your name, e-mail address, subject (optional) and the message itself.",
          },
          {
            term: "Accommodation booking request",
            text: "your name, e-mail address, phone number (optional), number of guests, arrival and departure dates and any note you add.",
          },
          {
            term: "Technical data",
            text: "IP address, time of access and basic browser information, from the server's security logs.",
          },
        ],
        after: [
          "We neither ask for nor want special categories of personal data - health, religion, political opinion, ethnicity or the like. Please do not enter them in the message field.",
          "No form on this site asks for a national ID number, identity card number or payment card details.",
        ],
      },
      {
        id: "svrha",
        heading: "3. Why we process it, and on what legal basis",
        body: ["Every processing operation is tied to a specific purpose and a legal basis under Article 12 of the Act:"],
        list: [
          {
            term: "Answering your enquiry",
            text: "so we can reply to a message sent through the contact form. Basis: steps taken at your request before entering into a contract, and our legitimate interest in responding (Article 12(1)(2) and (6)).",
          },
          {
            term: "Handling a booking request",
            text: "so we can check availability, confirm the booking and arrange the details of your stay. Basis: performance of a contract, or steps prior to it (Article 12(1)(2)).",
          },
          {
            term: "Protecting the site from abuse",
            text: "we limit how many messages and requests may come from one IP address, so the forms do not become a spam channel. Basis: our legitimate interest in keeping the site working and secure (Article 12(1)(6)).",
          },
          {
            term: "Meeting legal obligations",
            text: "keeping the records and accounting documents required by law once a stay actually takes place. Basis: compliance with a legal obligation (Article 12(1)(3)).",
          },
        ],
        after: [
          "We do not use your data for marketing messages without your consent, and we do not run a newsletter.",
        ],
      },
      {
        id: "cuvanje",
        heading: "4. How long we keep it",
        body: ["We keep data no longer than the purpose it was collected for requires."],
        list: [
          { term: "Contact form messages", text: "at most two years from our last exchange, then deleted." },
          { term: "Booking requests that do not become bookings", text: "at most twelve months." },
          {
            term: "Confirmed bookings",
            text: "for the duration of the stay and afterwards for the periods required by hospitality and accounting regulations.",
          },
          { term: "Server security logs", text: "at most twelve months." },
        ],
        after: [
          "We will delete your data sooner than that as soon as you ask us to, unless the law requires us to keep it.",
        ],
      },
      {
        id: "primaoci",
        heading: "5. Who else may receive it",
        body: [
          "Access is limited to the few people on our team who need it for their work. Beyond that, data may be disclosed to:",
        ],
        list: [
          {
            text: "our website and database hosting provider, which stores it on our behalf and on our instructions;",
          },
          {
            text: "our e-mail provider, through which notifications about your messages and requests reach us;",
          },
          { text: "competent state authorities, where the law requires it." },
        ],
        after: [
          "We do not sell, trade or hand your data to third parties for advertising.",
          "If any of our service providers is located outside the Republic of Serbia, we transfer data only in line with Articles 63 to 69 of the Act - that is, to countries with an adequate level of protection or subject to appropriate safeguards.",
        ],
      },
      {
        id: "kolacici",
        heading: "6. Cookies",
        body: [
          "This site uses no cookies for analytics, profiling or advertising. There is no Google Analytics, no social media pixel, no ad network and no tracking of your movements across the web.",
          "Your language choice is not stored in a cookie - it lives in the page address itself (/sr, /sr-latn, /en).",
          "Only strictly necessary cookies may be set, used by the server to keep the site working and secure. Regulations do not require consent for these, since without them the service you asked for could not be delivered.",
          "You can block third-party cookies in your browser settings at any time; it will not affect how this site works.",
        ],
        link: { href: "/politika-kolacica", label: "Read the cookies policy" },
      },
      {
        id: "prava",
        heading: "7. Your rights",
        body: ["Under the Act, you have the right at any time to:"],
        list: [
          { term: "access", text: "find out whether we process your data and obtain a copy (Article 26);" },
          { term: "rectification", text: "correct inaccurate and complete incomplete data (Article 29);" },
          { term: "erasure", text: "ask us to delete your data (Article 30);" },
          { term: "restriction", text: "have processing temporarily suspended (Article 31);" },
          {
            term: "portability",
            text: "receive your data in a machine-readable format, or have us transfer it to another controller (Article 36);",
          },
          { term: "object", text: "object to processing based on legitimate interest (Article 37);" },
          {
            term: "withdraw consent",
            text: "where processing rests on consent, withdraw it at any time, without affecting the lawfulness of processing before withdrawal.",
          },
        ],
        after: [
          "Send your request to info@milevakoncept.rs. We reply as soon as we can and within 30 days of receiving it at the latest; exceptionally that period may be extended by a further 30 days, and we will tell you why.",
          "Exercising these rights is free. We may charge only where a request is manifestly unfounded or repeated excessively.",
        ],
      },
      {
        id: "poverenik",
        heading: "8. Complaint to the Commissioner",
        body: [
          "If you believe our processing breaches the Act, you may lodge a complaint with the Commissioner for Information of Public Importance and Personal Data Protection:",
          "Bulevar kralja Aleksandra 15, 11120 Belgrade, Serbia · office@poverenik.rs · +381 11 3408 900 · www.poverenik.rs",
          "You can go to the Commissioner without contacting us first, though we would appreciate the chance to put things right.",
        ],
      },
      {
        id: "bezbednost",
        heading: "9. Keeping your data safe",
        body: [
          "The connection between your browser and this site is encrypted (HTTPS), and form data travels through our own server, so the database address is never exposed in the browser.",
          "Only authorised people can reach the data in the admin panel, and only with a password. The forms are protected against automated submissions and rate-limited per address.",
          "No measure is absolute, however. Should a data breach occur that is likely to pose a high risk to your rights, we will notify you in line with Articles 53 and 54 of the Act.",
        ],
      },
      {
        id: "deca",
        heading: "10. Children",
        body: [
          "This site is not aimed at children and we do not knowingly collect their data. Under Article 16 of the Act, a person under 15 may give consent only with the authorisation of a parent or legal guardian.",
          "If you learn that a child has sent us their data, please tell us and we will delete it straight away.",
        ],
      },
      {
        id: "odlucivanje",
        heading: "11. Automated decision-making",
        body: [
          "We make no decisions based solely on automated processing and carry out no profiling within the meaning of Article 38 of the Act. Every booking and every enquiry is read by a person.",
        ],
      },
      {
        id: "izmene",
        heading: "12. Changes to this policy",
        body: [
          "We may update this policy if the way we work changes or regulations require it. The version in force is always the one on this page, with the date of the last update at the top.",
          "If the changes are significant, we will make them visible before they take effect.",
        ],
      },
    ],
  },
};

/**
 * POLITIKA KOLAČIĆA. Sajt nema nijedan kolačić za praćenje — nema analitike,
 * piksela ni oglašavanja, fontovi su self-hostovani preko `next/font` (prema
 * Google-u ne ide nijedan zahtev iz posetiočevog pregledača), a jezik živi u
 * putanji umesto u kolačiću. Jedini sadržaj treće strane je CARTO podloga mape
 * na `/kvadovi` (`basemaps.cartocdn.com`, videti components/QuadRoutes.tsx).
 *
 * Ako se doda analitika, piksel ili bilo koji ugrađeni sadržaj — tekst ispod
 * MORA da se izmeni, a za kolačiće koji nisu tehnički neophodni mora da se
 * uvede i traka za pristanak.
 */
export const COOKIES: Record<LangCode, LegalDoc> = {
  "sr-cyrl": {
    eyebrow: "Правно",
    title: "Политика колачића",
    updated: "Последње ажурирање: 4. август 2026.",
    contentsLabel: "Садржај",
    intro: [
      "Кратка верзија: овај сајт вас не прати. Не постављамо ниједан колачић за аналитику, профилисање или оглашавање, па зато нећете видети ни досадну траку за пристанак на колачиће.",
      "Испод пише шта то тачно значи, шта се ипак може појавити у вашем прегледачу и како тиме управљате.",
    ],
    controller: {
      id: "rukovalac",
      heading: "1. Ко стоји иза овог сајта",
      body: ["Сајт milevakoncept.rs води:"],
      labels: {
        name: "Назив",
        address: "Адреса",
        email: "Имејл",
        phone: "Телефон",
        pib: "ПИБ",
        reg: "Матични број",
      },
      after: [
        "За свако питање о колачићима или подацима пишите нам на наведени имејл.",
      ],
    },
    sections: [
      {
        id: "sta-su",
        heading: "2. Шта су колачићи",
        body: [
          "Колачићи су мали текстуални записи које сајт оставља у вашем прегледачу да би вас препознао при следећој посети или упамтио нешто током исте. Слично раде и локално складиште прегледача (local storage) и слични механизми.",
          "Сами по себи нису опасни, али могу да послуже за праћење кретања кроз интернет - и управо се на то односи већина прописа о колачићима.",
        ],
      },
      {
        id: "koje",
        heading: "3. Које колачиће овај сајт користи",
        body: ["Држимо се минимума. Конкретно:"],
        list: [
          {
            term: "Аналитика",
            text: "не користимо је. Нема Google Analytics-а, нема Matomo-а, нема ниједног алата који броји и прати посетиоце.",
          },
          {
            term: "Оглашавање и профилисање",
            text: "нема их. Нема Meta (Facebook) пиксела, Google Ads ознака, TikTok или LinkedIn пиксела, нити било које рекламне мреже.",
          },
          {
            term: "Изабрани језик",
            text: "не памти се у колачићу - стоји у самој адреси странице (/sr, /sr-latn, /en).",
          },
          {
            term: "Фонтови",
            text: "смештени су на нашем серверу и оданде се учитавају, па се ваш прегледач не повезује са Google-овим серверима фонтова.",
          },
          {
            term: "Технички неопходни колачићи",
            text: "сервер и хостинг могу поставити колачић сесије или безбедносни колачић, искључиво да би сајт исправно радио и био заштићен од злоупотребе. Они не служе праћењу и не садрже податке којима бисмо вас идентификовали.",
          },
        ],
        after: [
          "Не користимо локално складиште прегледача за праћење, не правимо отисак уређаја (fingerprinting) и не делимо податке ни са једном рекламном мрежом.",
        ],
      },
      {
        id: "pristanak",
        heading: "4. Зашто нема траке за пристанак",
        body: [
          "За технички неопходне колачиће пристанак се, по прописима, не тражи - без њих услуга коју сте затражили не би могла да се пружи.",
          "Пошто немамо ниједан колачић за који је пристанак потребан, нема ни разлога да вам приказујемо траку за пристанак. Радије смо уклонили праћење него што смо додали дугме „Прихватам“.",
          "Ако икада уведемо аналитику или оглашавање, тражићемо ваш пристанак унапред, јасно и уз могућност да одбијете, а ова политика ће бити измењена пре него што то почне да важи.",
        ],
      },
      {
        id: "trece-strane",
        heading: "5. Уграђени садржај трећих страна",
        body: [
          "Један део сајта учитава садржај са туђег сервера, па ваш прегледач у том тренутку одлази директно тамо:",
        ],
        list: [
          {
            term: "Мапа рута за квадове",
            text: "подлога мапе стиже са сервиса CARTO (basemaps.cartocdn.com). Да би се мапа приказала, ваш прегледач се повезује са тим сервисом, који при том види вашу IP адресу и може да користи сопствене колачиће или локално складиште. На то немамо утицаја и важе услови тог сервиса.",
          },
          {
            term: "Линкови ка Instagram-у, Facebook-у и Google мапама",
            text: "то су обични линкови, не уграђени садржај. Колачићи тих компанија почињу да важе тек када њихову страницу заиста отворите.",
          },
          {
            term: "Видео снимци",
            text: "сви се сервирају са нашег сервера. Нема уграђеног YouTube-a ни Vimeo-a, па нема ни њихових колачића.",
          },
        ],
      },
      {
        id: "upravljanje",
        heading: "6. Како да управљате колачићима",
        body: [
          "Колачиће у сваком тренутку можете да прегледате, обришете или унапред блокирате у подешавањима свог прегледача - у Chrome-у, Safari-ју, Firefox-у и Edge-у то стоји под „Приватност и безбедност“.",
          "Приватни (incognito) прозор брише све колачиће чим га затворите.",
          "Блокирање колачића трећих страна неће утицати на рад овог сајта; једино мапа са рутама за квадове може да се понаша другачије или да се не прикаже.",
        ],
      },
      {
        id: "propisi",
        heading: "7. Прописи које примењујемо",
        body: [
          "Складиштење података на вашој опреми и приступ тим подацима уређује Закон о електронским комуникацијама („Службени гласник РС“, бр. 35/2023).",
          "Када колачић садржи податак о личности, на њега се примењује и Закон о заштити података о личности („Службени гласник РС“, бр. 87/2018), а тиме и сва права описана у нашој политици приватности.",
        ],
        link: { href: "/politika-privatnosti", label: "Прочитајте политику приватности" },
      },
      {
        id: "izmene",
        heading: "8. Измене ове политике",
        body: [
          "Политику мењамо ако се промени начин на који сајт ради или ако то захтевају прописи. Важећа верзија је увек на овој страници, а датум последњег ажурирања стоји на њеном врху.",
          "Ако измене буду значајне - на пример, ако уведемо колачиће за које је потребан пристанак - обавестићемо вас пре него што почну да се примењују.",
        ],
      },
    ],
  },

  "sr-latn": {
    eyebrow: "Pravno",
    title: "Politika kolačića",
    updated: "Poslednje ažuriranje: 4. avgust 2026.",
    contentsLabel: "Sadržaj",
    intro: [
      "Kratka verzija: ovaj sajt vas ne prati. Ne postavljamo nijedan kolačić za analitiku, profilisanje ili oglašavanje, pa zato nećete videti ni dosadnu traku za pristanak na kolačiće.",
      "Ispod piše šta to tačno znači, šta se ipak može pojaviti u vašem pregledaču i kako time upravljate.",
    ],
    controller: {
      id: "rukovalac",
      heading: "1. Ko stoji iza ovog sajta",
      body: ["Sajt milevakoncept.rs vodi:"],
      labels: {
        name: "Naziv",
        address: "Adresa",
        email: "Imejl",
        phone: "Telefon",
        pib: "PIB",
        reg: "Matični broj",
      },
      after: ["Za svako pitanje o kolačićima ili podacima pišite nam na navedeni imejl."],
    },
    sections: [
      {
        id: "sta-su",
        heading: "2. Šta su kolačići",
        body: [
          "Kolačići su mali tekstualni zapisi koje sajt ostavlja u vašem pregledaču da bi vas prepoznao pri sledećoj poseti ili upamtio nešto tokom iste. Slično rade i lokalno skladište pregledača (local storage) i slični mehanizmi.",
          "Sami po sebi nisu opasni, ali mogu da posluže za praćenje kretanja kroz internet - i upravo se na to odnosi većina propisa o kolačićima.",
        ],
      },
      {
        id: "koje",
        heading: "3. Koje kolačiće ovaj sajt koristi",
        body: ["Držimo se minimuma. Konkretno:"],
        list: [
          {
            term: "Analitika",
            text: "ne koristimo je. Nema Google Analytics-a, nema Matomo-a, nema nijednog alata koji broji i prati posetioce.",
          },
          {
            term: "Oglašavanje i profilisanje",
            text: "nema ih. Nema Meta (Facebook) piksela, Google Ads oznaka, TikTok ili LinkedIn piksela, niti bilo koje reklamne mreže.",
          },
          {
            term: "Izabrani jezik",
            text: "ne pamti se u kolačiću - stoji u samoj adresi stranice (/sr, /sr-latn, /en).",
          },
          {
            term: "Fontovi",
            text: "smešteni su na našem serveru i odande se učitavaju, pa se vaš pregledač ne povezuje sa Google-ovim serverima fontova.",
          },
          {
            term: "Tehnički neophodni kolačići",
            text: "server i hosting mogu postaviti kolačić sesije ili bezbednosni kolačić, isključivo da bi sajt ispravno radio i bio zaštićen od zloupotrebe. Oni ne služe praćenju i ne sadrže podatke kojima bismo vas identifikovali.",
          },
        ],
        after: [
          "Ne koristimo lokalno skladište pregledača za praćenje, ne pravimo otisak uređaja (fingerprinting) i ne delimo podatke ni sa jednom reklamnom mrežom.",
        ],
      },
      {
        id: "pristanak",
        heading: "4. Zašto nema trake za pristanak",
        body: [
          "Za tehnički neophodne kolačiće pristanak se, po propisima, ne traži - bez njih usluga koju ste zatražili ne bi mogla da se pruži.",
          "Pošto nemamo nijedan kolačić za koji je pristanak potreban, nema ni razloga da vam prikazujemo traku za pristanak. Radije smo uklonili praćenje nego što smo dodali dugme „Prihvatam“.",
          "Ako ikada uvedemo analitiku ili oglašavanje, tražićemo vaš pristanak unapred, jasno i uz mogućnost da odbijete, a ova politika će biti izmenjena pre nego što to počne da važi.",
        ],
      },
      {
        id: "trece-strane",
        heading: "5. Ugrađeni sadržaj trećih strana",
        body: [
          "Jedan deo sajta učitava sadržaj sa tuđeg servera, pa vaš pregledač u tom trenutku odlazi direktno tamo:",
        ],
        list: [
          {
            term: "Mapa ruta za kvadove",
            text: "podloga mape stiže sa servisa CARTO (basemaps.cartocdn.com). Da bi se mapa prikazala, vaš pregledač se povezuje sa tim servisom, koji pri tom vidi vašu IP adresu i može da koristi sopstvene kolačiće ili lokalno skladište. Na to nemamo uticaja i važe uslovi tog servisa.",
          },
          {
            term: "Linkovi ka Instagram-u, Facebook-u i Google mapama",
            text: "to su obični linkovi, ne ugrađeni sadržaj. Kolačići tih kompanija počinju da važe tek kada njihovu stranicu zaista otvorite.",
          },
          {
            term: "Video snimci",
            text: "svi se serviraju sa našeg servera. Nema ugrađenog YouTube-a ni Vimeo-a, pa nema ni njihovih kolačića.",
          },
        ],
      },
      {
        id: "upravljanje",
        heading: "6. Kako da upravljate kolačićima",
        body: [
          "Kolačiće u svakom trenutku možete da pregledate, obrišete ili unapred blokirate u podešavanjima svog pregledača - u Chrome-u, Safari-ju, Firefox-u i Edge-u to stoji pod „Privatnost i bezbednost“.",
          "Privatni (incognito) prozor briše sve kolačiće čim ga zatvorite.",
          "Blokiranje kolačića trećih strana neće uticati na rad ovog sajta; jedino mapa sa rutama za kvadove može da se ponaša drugačije ili da se ne prikaže.",
        ],
      },
      {
        id: "propisi",
        heading: "7. Propisi koje primenjujemo",
        body: [
          "Skladištenje podataka na vašoj opremi i pristup tim podacima uređuje Zakon o elektronskim komunikacijama („Službeni glasnik RS“, br. 35/2023).",
          "Kada kolačić sadrži podatak o ličnosti, na njega se primenjuje i Zakon o zaštiti podataka o ličnosti („Službeni glasnik RS“, br. 87/2018), a time i sva prava opisana u našoj politici privatnosti.",
        ],
        link: { href: "/politika-privatnosti", label: "Pročitajte politiku privatnosti" },
      },
      {
        id: "izmene",
        heading: "8. Izmene ove politike",
        body: [
          "Politiku menjamo ako se promeni način na koji sajt radi ili ako to zahtevaju propisi. Važeća verzija je uvek na ovoj stranici, a datum poslednjeg ažuriranja stoji na njenom vrhu.",
          "Ako izmene budu značajne - na primer, ako uvedemo kolačiće za koje je potreban pristanak - obavestićemo vas pre nego što počnu da se primenjuju.",
        ],
      },
    ],
  },

  en: {
    eyebrow: "Legal",
    title: "Cookies policy",
    updated: "Last updated: 4 August 2026",
    contentsLabel: "Contents",
    intro: [
      "The short version: this site does not track you. We set no cookies for analytics, profiling or advertising - which is also why you will not be met by a consent banner.",
      "Below is what that means in practice, what may still turn up in your browser, and how you stay in control of it.",
    ],
    controller: {
      id: "rukovalac",
      heading: "1. Who runs this site",
      body: ["milevakoncept.rs is run by:"],
      labels: {
        name: "Name",
        address: "Address",
        email: "E-mail",
        phone: "Phone",
        pib: "Tax ID (PIB)",
        reg: "Company number",
      },
      after: ["For any question about cookies or your data, write to the address above."],
    },
    sections: [
      {
        id: "sta-su",
        heading: "2. What cookies are",
        body: [
          "Cookies are small text records a site leaves in your browser, either to recognise you on your next visit or to remember something during the current one. Browser local storage and similar mechanisms work much the same way.",
          "They are not harmful in themselves, but they can be used to follow you around the web - which is what most cookie rules are really about.",
        ],
      },
      {
        id: "koje",
        heading: "3. Which cookies this site uses",
        body: ["We keep it to a minimum. Specifically:"],
        list: [
          {
            term: "Analytics",
            text: "none. No Google Analytics, no Matomo, no tool of any kind counting or following visitors.",
          },
          {
            term: "Advertising and profiling",
            text: "none. No Meta (Facebook) pixel, no Google Ads tags, no TikTok or LinkedIn pixel, and no ad network.",
          },
          {
            term: "Your language choice",
            text: "not stored in a cookie - it lives in the page address itself (/sr, /sr-latn, /en).",
          },
          {
            term: "Fonts",
            text: "served from our own server, so your browser never connects to Google's font servers.",
          },
          {
            term: "Strictly necessary cookies",
            text: "the server and hosting may set a session or security cookie, purely so the site works and stays protected from abuse. They are not used for tracking and hold nothing that identifies you.",
          },
        ],
        after: [
          "We do not use browser storage for tracking, we do not fingerprint your device, and we share nothing with any ad network.",
        ],
      },
      {
        id: "pristanak",
        heading: "4. Why there is no consent banner",
        body: [
          "Strictly necessary cookies do not require consent under the rules - without them the service you asked for could not be delivered.",
          "Since we have no cookie that would require consent, there is no reason to put a banner in your way. We would rather drop the tracking than add an \"Accept\" button.",
          "Should we ever introduce analytics or advertising, we will ask for your consent up front, clearly and with a real option to decline, and this policy will be updated before any of it takes effect.",
        ],
      },
      {
        id: "trece-strane",
        heading: "5. Third-party embedded content",
        body: [
          "One part of the site loads content from someone else's server, so your browser goes there directly at that moment:",
        ],
        list: [
          {
            term: "The quad routes map",
            text: "the base map comes from CARTO (basemaps.cartocdn.com). To display it, your browser connects to that service, which sees your IP address and may use its own cookies or browser storage. That is outside our control and their terms apply.",
          },
          {
            term: "Links to Instagram, Facebook and Google Maps",
            text: "these are plain links, not embeds. Those companies' cookies only come into play once you actually open their page.",
          },
          {
            term: "Video",
            text: "all of it is served from our own server. There is no embedded YouTube or Vimeo, and so none of their cookies.",
          },
        ],
      },
      {
        id: "upravljanje",
        heading: "6. Managing cookies yourself",
        body: [
          "You can inspect, delete or pre-emptively block cookies at any time in your browser settings - in Chrome, Safari, Firefox and Edge this sits under \"Privacy and security\".",
          "A private (incognito) window clears every cookie the moment you close it.",
          "Blocking third-party cookies will not affect how this site works; only the quad routes map may behave differently or fail to load.",
        ],
      },
      {
        id: "propisi",
        heading: "7. The rules we follow",
        body: [
          "Storing information on your equipment and accessing it is governed by the Serbian Electronic Communications Act (Zakon o elektronskim komunikacijama, Official Gazette of the RS no. 35/2023).",
          "Where a cookie holds personal data, the Personal Data Protection Act (Official Gazette of the RS no. 87/2018) applies too - and with it every right set out in our privacy policy.",
        ],
        link: { href: "/politika-privatnosti", label: "Read the privacy policy" },
      },
      {
        id: "izmene",
        heading: "8. Changes to this policy",
        body: [
          "We update this policy if the way the site works changes or the rules require it. The version in force is always the one on this page, with the date of the last update at the top.",
          "If the change is significant - introducing cookies that need consent, say - we will tell you before it takes effect.",
        ],
      },
    ],
  },
};
