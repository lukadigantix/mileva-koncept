import type { LangCode } from "../i18n/translations";

/**
 * Blog content. Posts are a static data module (client- and server-safe, no
 * secrets) with fully localised fields per language. Bodies are structured
 * blocks so the article renderer can style paragraphs, subheadings and pull
 * quotes consistently. Newest first.
 *
 * IMAGES are placeholders from the existing set - swap for real editorial shots.
 */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string };

export type BlogLocale = {
  category: string;
  title: string;
  excerpt: string;
  body: BlogBlock[];
};

export type Post = {
  slug: string;
  image: string;
  date: string; // ISO YYYY-MM-DD
  readMinutes: number;
  content: Record<LangCode, BlogLocale>;
};

export const POSTS: Post[] = [
  {
    slug: "vatra-i-drvo",
    image: "/rest3.webp",
    date: "2026-06-20",
    readMinutes: 6,
    content: {
      "sr-cyrl": {
        category: "Кухиња",
        title: "Ватра и дрво: филозофија споре хране",
        excerpt:
          "Зашто нам треба више времена да укус вратимо тамо где припада - за сто, међу људе.",
        body: [
          { type: "p", text: "У Милеви се не жури. Ватра се пали пре него што сване, дрво тиња сатима, а јело настаје ритмом који диктира природа, а не сат на зиду. Спора храна овде није помодарство - то је начин живота наслеђен од предака." },
          { type: "p", text: "Док варош још спава, у дворишту већ мирише на дим. Огњиште се не пали да би било брзо готово, него да би полако отпустило све што дрво носи у себи: топлину, мирис и стрпљење. Из тог стрпљења, полако, рађа се укус." },
          { type: "h2", text: "Оно што се не може убрзати" },
          { type: "p", text: "Намирнице стижу из околних домаћинстава, често убране истог јутра. Месо са жара, поврће из баште, хлеб мешен руком - свака компонента има свој ритам и своје време. Ништа се не ставља на ватру пре него што буде спремно, и ништа се не скида пре него што сазри." },
          { type: "p", text: "Кад пламен пређе у жар, почиње право кување: тихо, равномерно, без журбе. То је начин на који се у Шумадији одувек кувало, и разлог зашто јело с ватре има дубину укуса до које пречице никада не воде." },
          { type: "quote", text: "Најбољи зачин је време." },
          { type: "h2", text: "Сто као место сусрета" },
          { type: "p", text: "Спора храна није само техника, него позив да успорите. Док се јело припрема, људи се окупљају, разговор тече, а ишчекивање постаје део ужитка. Мирис који се шири двориштем ради свој посао много пре првог залогаја." },
          { type: "p", text: "Зато сваки оброк на имању почиње далеко пре него што седнете за сто. Почиње код ватре - а кад узмете први залогај, схватите да је управо то чекање било најважнији део рецепта." },
        ],
      },
      "sr-latn": {
        category: "Kuhinja",
        title: "Vatra i drvo: filozofija spore hrane",
        excerpt:
          "Zašto nam treba više vremena da ukus vratimo tamo gde pripada - za sto, među ljude.",
        body: [
          { type: "p", text: "U Milevi se ne žuri. Vatra se pali pre nego što svane, drvo tinja satima, a jelo nastaje ritmom koji diktira priroda, a ne sat na zidu. Spora hrana ovde nije pomodarstvo - to je način života nasleđen od predaka." },
          { type: "p", text: "Dok varoš još spava, u dvorištu već miriše na dim. Ognjište se ne pali da bi bilo brzo gotovo, nego da bi polako otpustilo sve što drvo nosi u sebi: toplinu, miris i strpljenje. Iz tog strpljenja, polako, rađa se ukus." },
          { type: "h2", text: "Ono što se ne može ubrzati" },
          { type: "p", text: "Namirnice stižu iz okolnih domaćinstava, često ubrane istog jutra. Meso sa žara, povrće iz bašte, hleb mešen rukom - svaka komponenta ima svoj ritam i svoje vreme. Ništa se ne stavlja na vatru pre nego što bude spremno, i ništa se ne skida pre nego što sazri." },
          { type: "p", text: "Kad plamen pređe u žar, počinje pravo kuvanje: tiho, ravnomerno, bez žurbe. To je način na koji se u Šumadiji oduvek kuvalo, i razlog zašto jelo s vatre ima dubinu ukusa do koje prečice nikada ne vode." },
          { type: "quote", text: "Najbolji začin je vreme." },
          { type: "h2", text: "Sto kao mesto susreta" },
          { type: "p", text: "Spora hrana nije samo tehnika, nego poziv da usporite. Dok se jelo priprema, ljudi se okupljaju, razgovor teče, a iščekivanje postaje deo užitka. Miris koji se širi dvorištem radi svoj posao mnogo pre prvog zalogaja." },
          { type: "p", text: "Zato svaki obrok na imanju počinje daleko pre nego što sednete za sto. Počinje kod vatre - a kad uzmete prvi zalogaj, shvatite da je upravo to čekanje bilo najvažniji deo recepta." },
        ],
      },
      en: {
        category: "Kitchen",
        title: "Fire and wood: the philosophy of slow food",
        excerpt:
          "Why we need more time to return flavour to where it belongs - to the table, among people.",
        body: [
          { type: "p", text: "At Mileva, no one hurries. The fire is lit before dawn, the wood smoulders for hours, and the meal takes shape at a rhythm set by nature, not the clock on the wall. Slow food here is no passing trend - it is a way of life inherited from those who came before." },
          { type: "p", text: "While the town still sleeps, the yard already smells of woodsmoke. The hearth is not lit to be done quickly, but to slowly release everything the wood holds within it: warmth, aroma and patience. From that patience, slowly, flavour is born." },
          { type: "h2", text: "What cannot be rushed" },
          { type: "p", text: "The ingredients come from the surrounding households, often picked the same morning. Meat from the grill, vegetables from the garden, bread kneaded by hand - each part has its own rhythm and its own time. Nothing goes on the fire before it is ready, and nothing comes off before it is done." },
          { type: "p", text: "When the flame turns to embers, the real cooking begins: quiet, even, unhurried. It is the way Šumadija has always cooked, and the reason food from the fire has a depth of flavour that shortcuts never reach." },
          { type: "quote", text: "The best seasoning is time." },
          { type: "h2", text: "The table as a meeting place" },
          { type: "p", text: "Slow food is not only a technique but an invitation to slow down. While the meal is prepared, people gather, conversation flows, and the waiting becomes part of the pleasure. The aroma drifting across the yard does its work long before the first bite." },
          { type: "p", text: "So every meal on the estate begins long before you sit down at the table. It begins at the fire - and when you take that first bite, you realise the waiting was the most important part of the recipe." },
        ],
      },
    },
  },
  {
    slug: "bazen-slana-voda",
    image: "/bazeni1.webp",
    date: "2026-05-28",
    readMinutes: 5,
    content: {
      "sr-cyrl": {
        category: "Оаза",
        title: "Базен са сланом водом: дашак мора у Шумадији",
        excerpt: "Осећај приморја усред брда - зашто слана вода мења цео доживљај лета.",
        body: [
          { type: "p", text: "Има нечег парадоксалног у сланој води усред Шумадије. Далеко од сваке обале, отворени базен дочарава осећај мора - оног тренутка кад закорачите и кожа препозна со уместо оштрине хлора." },
          { type: "p", text: "Окружен зеленилом, ливадама и тишином брда, базен постаје место на ком дан успори. Јутро припада миру и првим круговима, а поподне дугим, лењим сатима поред воде." },
          { type: "h2", text: "Зашто слана, а не хлор" },
          { type: "p", text: "Слана вода је блажа према кожи и очима, не суши и не штипа, и оставља осећај свежине који траје и после купања. За децу је нежнија, за одрасле пријатнија, а за оне који воде рачуна о кожи - природнији избор." },
          { type: "p", text: "Уз то, вода са малим уделом соли има мекшу, готово свилену текстуру. После неколико сати не осећате онај замор и надражај који хлор уме да остави - само чисту свежину и мирис лета на кожи." },
          { type: "quote", text: "Море је далеко, али осећај није." },
          { type: "h2", text: "Ритуал спорог лета" },
          { type: "p", text: "Најлепша поподнева овде миришу на со, траву и сунце. Пешкир на лежаљци, књига која чека, поглед на шумадијска брда - купање постаје мали ритуал, а не само освежење." },
          { type: "p", text: "Кад сунце крене ка западу, вода се стишава, а имање улази у онај златни сат због ког ћете пожелети да останете још један дан." },
        ],
      },
      "sr-latn": {
        category: "Oaza",
        title: "Bazen sa slanom vodom: dašak mora u Šumadiji",
        excerpt: "Osećaj primorja usred brda - zašto slana voda menja ceo doživljaj leta.",
        body: [
          { type: "p", text: "Ima nečeg paradoksalnog u slanoj vodi usred Šumadije. Daleko od svake obale, otvoreni bazen dočarava osećaj mora - onog trenutka kad zakoračite i koža prepozna so umesto oštrine hlora." },
          { type: "p", text: "Okružen zelenilom, livadama i tišinom brda, bazen postaje mesto na kom dan uspori. Jutro pripada miru i prvim krugovima, a popodne dugim, lenjim satima pored vode." },
          { type: "h2", text: "Zašto slana, a ne hlor" },
          { type: "p", text: "Slana voda je blaža prema koži i očima, ne suši i ne štipa, i ostavlja osećaj svežine koji traje i posle kupanja. Za decu je nežnija, za odrasle prijatnija, a za one koji vode računa o koži - prirodniji izbor." },
          { type: "p", text: "Uz to, voda sa malim udelom soli ima mekšu, gotovo svilenu teksturu. Posle nekoliko sati ne osećate onaj zamor i nadražaj koji hlor ume da ostavi - samo čistu svežinu i miris leta na koži." },
          { type: "quote", text: "More je daleko, ali osećaj nije." },
          { type: "h2", text: "Ritual sporog leta" },
          { type: "p", text: "Najlepša popodneva ovde mirišu na so, travu i sunce. Peškir na ležaljci, knjiga koja čeka, pogled na šumadijska brda - kupanje postaje mali ritual, a ne samo osveženje." },
          { type: "p", text: "Kad sunce krene ka zapadu, voda se stišava, a imanje ulazi u onaj zlatni sat zbog kog ćete poželeti da ostanete još jedan dan." },
        ],
      },
      en: {
        category: "Oasis",
        title: "Saltwater pool: a breath of the sea in Šumadija",
        excerpt: "The feeling of the coast among the hills - why saltwater changes the whole of summer.",
        body: [
          { type: "p", text: "There is something paradoxical about saltwater in the middle of Šumadija. Far from any coast, the open pool evokes the feeling of the sea - the moment you step in and your skin recognises salt instead of the sharpness of chlorine." },
          { type: "p", text: "Surrounded by greenery, meadows and the quiet of the hills, the pool becomes a place where the day slows down. The morning belongs to calm and the first few laps; the afternoon to long, lazy hours by the water." },
          { type: "h2", text: "Why salt, not chlorine" },
          { type: "p", text: "Saltwater is gentler on skin and eyes, it neither dries nor stings, and it leaves a freshness that lasts long after the swim. It is kinder to children, more pleasant for adults, and for those mindful of their skin - the more natural choice." },
          { type: "p", text: "It also has a softer, almost silken texture. After a few hours you feel none of the fatigue and irritation chlorine can leave behind - only clean freshness and the scent of summer on your skin." },
          { type: "quote", text: "The sea is far, but the feeling isn't." },
          { type: "h2", text: "The ritual of a slow summer" },
          { type: "p", text: "The finest afternoons here smell of salt, grass and sun. A towel on the lounger, a book that waits, a view of the Šumadija hills - a swim becomes a small ritual rather than merely a refreshment." },
          { type: "p", text: "As the sun moves west, the water stills and the estate enters that golden hour that will make you want to stay one more day." },
        ],
      },
    },
  },
  {
    slug: "jesen-na-imanju",
    image: "/drvo.webp",
    date: "2026-05-06",
    readMinutes: 6,
    content: {
      "sr-cyrl": {
        category: "Природа",
        title: "Јесен на имању: боје, мириси и тишина",
        excerpt: "Кад се Шумадија обоји, имање дише спорије - водич кроз најлепше годишње доба.",
        body: [
          { type: "p", text: "Јесен у Гривцу не долази нагло. Прво омекша светло, па се лишће позлати, а ваздух добије мирис дима и зрелих јабука. Имање тада дише спорије, као да и само зна да је дошло време за успоравање." },
          { type: "p", text: "То је годишње доба које награђује оне који не журе. Магла се диже са ливада, роса блиста до подне, а боје се мењају из дана у дан - ниједно јутро није исто као претходно." },
          { type: "h2", text: "Шетња која враћа дах" },
          { type: "p", text: "Стазе око имања воде до видика са којих се Шумадија види у сновима боја. Понесите топлији слој, јер су јутра свежа, а тишина потпуна - прекида је само шкрипа лишћа под ногама и понеки далеки лавеж." },
          { type: "p", text: "Успут ћете проћи поред воћњака, старих салаша и потока који је лети готово нечујан, а у јесен добије свој глас. Нема правог циља - циљ је сама шетња." },
          { type: "quote", text: "Тишина овде има боју." },
          { type: "h2", text: "Топлина после шетње" },
          { type: "p", text: "Кад се вратите, чека вас ватра, топли напитак и мирис куваног јела. Јесен је позив да се увучете унутра, успорите и препустите се ономе што спољашњи свет тако лако заборавља." },
          { type: "p", text: "У то доба, чак и мировање делује као догађај. А имање, окупано бојама, изгледа најлепше баш кад мисли да га нико не гледа." },
        ],
      },
      "sr-latn": {
        category: "Priroda",
        title: "Jesen na imanju: boje, mirisi i tišina",
        excerpt: "Kad se Šumadija oboji, imanje diše sporije - vodič kroz najlepše godišnje doba.",
        body: [
          { type: "p", text: "Jesen u Grivcu ne dolazi naglo. Prvo omekša svetlo, pa se lišće pozlati, a vazduh dobije miris dima i zrelih jabuka. Imanje tada diše sporije, kao da i samo zna da je došlo vreme za usporavanje." },
          { type: "p", text: "To je godišnje doba koje nagrađuje one koji ne žure. Magla se diže sa livada, rosa blista do podne, a boje se menjaju iz dana u dan - nijedno jutro nije isto kao prethodno." },
          { type: "h2", text: "Šetnja koja vraća dah" },
          { type: "p", text: "Staze oko imanja vode do vidika sa kojih se Šumadija vidi u snovima boja. Ponesite topliji sloj, jer su jutra sveža, a tišina potpuna - prekida je samo škripa lišća pod nogama i poneki daleki lavež." },
          { type: "p", text: "Usput ćete proći pored voćnjaka, starih salaša i potoka koji je leti gotovo nečujan, a u jesen dobije svoj glas. Nema pravog cilja - cilj je sama šetnja." },
          { type: "quote", text: "Tišina ovde ima boju." },
          { type: "h2", text: "Toplina posle šetnje" },
          { type: "p", text: "Kad se vratite, čeka vas vatra, topli napitak i miris kuvanog jela. Jesen je poziv da se uvučete unutra, usporite i prepustite se onome što spoljašnji svet tako lako zaboravlja." },
          { type: "p", text: "U to doba, čak i mirovanje deluje kao događaj. A imanje, okupano bojama, izgleda najlepše baš kad misli da ga niko ne gleda." },
        ],
      },
      en: {
        category: "Nature",
        title: "Autumn on the estate: colours, scents and quiet",
        excerpt: "When Šumadija turns to colour, the estate breathes slower - a guide to the finest season.",
        body: [
          { type: "p", text: "Autumn does not arrive suddenly in Grivac. First the light softens, then the leaves turn to gold, and the air takes on the scent of smoke and ripe apples. The estate breathes slower then, as if it too knows the time has come to slow down." },
          { type: "p", text: "It is the season that rewards those who do not hurry. Mist rises from the meadows, dew glistens until noon, and the colours shift from one day to the next - no morning is the same as the last." },
          { type: "h2", text: "A walk that returns your breath" },
          { type: "p", text: "The paths around the estate lead to vistas where Šumadija appears in a dream of colour. Bring a warmer layer, for the mornings are crisp and the quiet is complete - broken only by the rustle of leaves underfoot and the odd distant bark." },
          { type: "p", text: "Along the way you pass orchards, old homesteads and a stream that is almost silent in summer but finds its voice in autumn. There is no real destination - the walk itself is the point." },
          { type: "quote", text: "Here, silence has a colour." },
          { type: "h2", text: "Warmth after the walk" },
          { type: "p", text: "When you return, a fire awaits you, a warm drink and the scent of a home-cooked meal. Autumn is an invitation to come inside, slow down and give yourself over to what the outside world forgets so easily." },
          { type: "p", text: "In this season, even stillness feels like an event. And the estate, bathed in colour, looks its finest just when it thinks no one is watching." },
        ],
      },
    },
  },
  {
    slug: "znamenitosti-oko-grivca",
    image: "/midhero.webp",
    date: "2026-04-15",
    readMinutes: 7,
    content: {
      "sr-cyrl": {
        category: "Путовања",
        title: "Водич кроз знаменитости око Гривца",
        excerpt: "Од језера и планинских врхова до средњовековних манастира - све на дохват руке.",
        body: [
          { type: "p", text: "Гривац је мирно полазиште за откривање срца Шумадије. У кругу од педесетак километара сместило се више векова историје, вере и природе него што бисте очекивали од овако тихог краја." },
          { type: "p", text: "Не морате далеко да бисте видели много. Довољан је један дан, добра обућа и воља да завирите иза првог брда." },
          { type: "h2", text: "Природа на дохват руке" },
          { type: "p", text: "Гружанско језеро је најближе за спор дан у природи - риболов, шетња и десетине врста птица. За планински ваздух ту је Рудник, највиши врх Шумадије, а за освежење усред лета - сенка старих шума и обале мирних потока." },
          { type: "p", text: "Ко воли да фотографише, наћи ће видике који се мењају са сваким годишњим добом. Пролеће доноси зеленило, лето злато житних поља, а јесен читаву палету боја." },
          { type: "quote", text: "Најбоља путовања почињу близу куће." },
          { type: "h2", text: "Сусрет са историјом" },
          { type: "p", text: "Опленац и Топола чувају причу о српским краљевима, Жича и Каленић вековно духовно наслеђе, а Шумарице у Крагујевцу опомену коју не треба заборавити. Свако од ових места лако стаје у један излет, а заједно чине причу о читавом крају." },
          { type: "p", text: "Комплетан списак са удаљеностима и предлозима чека вас на страници Знаменитости - а најлепше од свега је што се увече враћате кући, на имање, где вас чека тишина и топла вечера." },
        ],
      },
      "sr-latn": {
        category: "Putovanja",
        title: "Vodič kroz znamenitosti oko Grivca",
        excerpt: "Od jezera i planinskih vrhova do srednjovekovnih manastira - sve na dohvat ruke.",
        body: [
          { type: "p", text: "Grivac je mirno polazište za otkrivanje srca Šumadije. U krugu od pedesetak kilometara smestilo se više vekova istorije, vere i prirode nego što biste očekivali od ovako tihog kraja." },
          { type: "p", text: "Ne morate daleko da biste videli mnogo. Dovoljan je jedan dan, dobra obuća i volja da zavirite iza prvog brda." },
          { type: "h2", text: "Priroda na dohvat ruke" },
          { type: "p", text: "Gružansko jezero je najbliže za spor dan u prirodi - ribolov, šetnja i desetine vrsta ptica. Za planinski vazduh tu je Rudnik, najviši vrh Šumadije, a za osveženje usred leta - senka starih šuma i obale mirnih potoka." },
          { type: "p", text: "Ko voli da fotografiše, naći će vidike koji se menjaju sa svakim godišnjim dobom. Proleće donosi zelenilo, leto zlato žitnih polja, a jesen čitavu paletu boja." },
          { type: "quote", text: "Najbolja putovanja počinju blizu kuće." },
          { type: "h2", text: "Susret sa istorijom" },
          { type: "p", text: "Oplenac i Topola čuvaju priču o srpskim kraljevima, Žiča i Kalenić vekovno duhovno nasleđe, a Šumarice u Kragujevcu opomenu koju ne treba zaboraviti. Svako od ovih mesta lako staje u jedan izlet, a zajedno čine priču o čitavom kraju." },
          { type: "p", text: "Kompletan spisak sa udaljenostima i predlozima čeka vas na stranici Znamenitosti - a najlepše od svega je što se uveče vraćate kući, na imanje, gde vas čeka tišina i topla večera." },
        ],
      },
      en: {
        category: "Travel",
        title: "A guide to the landmarks around Grivac",
        excerpt: "From lakes and mountain peaks to medieval monasteries - all within easy reach.",
        body: [
          { type: "p", text: "Grivac is a quiet starting point for discovering the heart of Šumadija. Within some fifty kilometres lie more centuries of history, faith and nature than you would expect from such a peaceful corner." },
          { type: "p", text: "You need not go far to see a great deal. A single day is enough, with good shoes and the will to look beyond the first hill." },
          { type: "h2", text: "Nature within reach" },
          { type: "p", text: "Gruža Lake is the closest for a slow day outdoors - fishing, walking and dozens of bird species. For mountain air there is Rudnik, the highest peak of Šumadija, and for relief in high summer - the shade of old forests and the banks of quiet streams." },
          { type: "p", text: "Those who love to photograph will find vistas that change with every season. Spring brings green, summer the gold of wheat fields, and autumn a whole palette of colour." },
          { type: "quote", text: "The best journeys begin close to home." },
          { type: "h2", text: "An encounter with history" },
          { type: "p", text: "Oplenac and Topola keep the story of Serbian kings, Žiča and Kalenić centuries of spiritual heritage, and Šumarice in Kragujevac a reminder that should not be forgotten. Each of these places fits easily into a single outing, and together they tell the story of the whole region." },
          { type: "p", text: "The full list, with distances and suggestions, awaits you on the Landmarks page - and the finest part of all is that in the evening you return home, to the estate, where quiet and a warm dinner are waiting." },
        ],
      },
    },
  },
  {
    slug: "kako-organizovati-proslavu",
    image: "/proslave1.webp",
    date: "2026-03-22",
    readMinutes: 6,
    content: {
      "sr-cyrl": {
        category: "Догађаји",
        title: "Како организовати незаборавну прославу на имању",
        excerpt: "Ватра, музика и домаћа трпеза - рецепт за вече које се памти.",
        body: [
          { type: "p", text: "Имање је створено за окупљања. Отворени простор, базен и башта лако постају позорница за прославе, породична дружења и приватне догађаје - од венчања до крштења и рођендана." },
          { type: "p", text: "Али незаборавна прослава није ствар среће, него плана. Иза сваког опуштеног вечера стоји неко ко је унапред мислио на детаље, тако да ниједан гост то не примети." },
          { type: "h2", text: "Три ствари које чине разлику" },
          { type: "p", text: "Прво, добра храна с ватре - јер се гости памте по ономе што су јели и осетили. Друго, простор који дише, да се сви крећу слободно, од баште до терасе. Треће, људи који воде рачуна о детаљима, да домаћин може да буде гост на сопственој прослави." },
          { type: "p", text: "Кад се та три елемента поклопе, атмосфера долази сама. Не морате да журите од стола до стола нити да бринете да ли је свега довољно - све је већ на свом месту." },
          { type: "quote", text: "Најлепше прославе делују једноставно - јер је неко други мислио на све." },
          { type: "h2", text: "Од идеје до вечери за памћење" },
          { type: "p", text: "Почните од броја гостију и атмосфере коју желите, а остало ћемо испланирати заједно: мени, распоред, музику и оне ситнице због којих вече тече само од себе." },
          { type: "p", text: "Јавите нам шта славите, а ми ћемо се побринути за позадину - да вама остане само оно најважније: да будете присутни и да уживате са својима." },
        ],
      },
      "sr-latn": {
        category: "Događaji",
        title: "Kako organizovati nezaboravnu proslavu na imanju",
        excerpt: "Vatra, muzika i domaća trpeza - recept za veče koje se pamti.",
        body: [
          { type: "p", text: "Imanje je stvoreno za okupljanja. Otvoreni prostor, bazen i bašta lako postaju pozornica za proslave, porodična druženja i privatne događaje - od venčanja do krštenja i rođendana." },
          { type: "p", text: "Ali nezaboravna proslava nije stvar sreće, nego plana. Iza svakog opuštenog večera stoji neko ko je unapred mislio na detalje, tako da nijedan gost to ne primeti." },
          { type: "h2", text: "Tri stvari koje čine razliku" },
          { type: "p", text: "Prvo, dobra hrana s vatre - jer se gosti pamte po onome što su jeli i osetili. Drugo, prostor koji diše, da se svi kreću slobodno, od bašte do terase. Treće, ljudi koji vode računa o detaljima, da domaćin može da bude gost na sopstvenoj proslavi." },
          { type: "p", text: "Kad se ta tri elementa poklope, atmosfera dolazi sama. Ne morate da žurite od stola do stola niti da brinete da li je svega dovoljno - sve je već na svom mestu." },
          { type: "quote", text: "Najlepše proslave deluju jednostavno - jer je neko drugi mislio na sve." },
          { type: "h2", text: "Od ideje do večeri za pamćenje" },
          { type: "p", text: "Počnite od broja gostiju i atmosfere koju želite, a ostalo ćemo isplanirati zajedno: meni, raspored, muziku i one sitnice zbog kojih veče teče samo od sebe." },
          { type: "p", text: "Javite nam šta slavite, a mi ćemo se pobrinuti za pozadinu - da vama ostane samo ono najvažnije: da budete prisutni i da uživate sa svojima." },
        ],
      },
      en: {
        category: "Events",
        title: "How to host an unforgettable celebration on the estate",
        excerpt: "Fire, music and a home-cooked table - the recipe for an evening to remember.",
        body: [
          { type: "p", text: "The estate is made for gatherings. The open grounds, the pool and the garden easily become a stage for celebrations, family get-togethers and private events - from weddings to baptisms and birthdays." },
          { type: "p", text: "But an unforgettable celebration is not a matter of luck, it is a matter of planning. Behind every relaxed evening stands someone who thought of the details in advance, so that no guest ever notices them." },
          { type: "h2", text: "Three things that make the difference" },
          { type: "p", text: "First, good food from the fire - for guests remember what they ate and felt. Second, a space that breathes, so everyone moves freely, from the garden to the terrace. Third, people who mind the details, so the host can be a guest at their own celebration." },
          { type: "p", text: "When those three come together, the atmosphere takes care of itself. You need not rush from table to table or worry whether there is enough of everything - it is all already in its place." },
          { type: "quote", text: "The finest celebrations feel effortless - because someone else thought of everything." },
          { type: "h2", text: "From an idea to an evening to remember" },
          { type: "p", text: "Start with the number of guests and the atmosphere you want, and we will plan the rest together: the menu, the layout, the music and the small touches that make an evening flow on its own." },
          { type: "p", text: "Tell us what you are celebrating, and we will take care of the background - so that all that remains for you is the most important thing: to be present and enjoy it with your own." },
        ],
      },
    },
  },
  {
    slug: "cetiri-jedinice-cetiri-price",
    image: "/smestaj.webp",
    date: "2026-02-18",
    readMinutes: 5,
    content: {
      "sr-cyrl": {
        category: "Смештај",
        title: "Апартман Милева: четири простора, једна прича",
        excerpt: "Спаваћа соба, дневни боравак, кухиња и тераса - сваки кутак апартмана има свој ритам.",
        body: [
          { type: "p", text: "Апартман Милева није велик, али је осмишљен тако да сваки квадрат има свој смисао. Шездесет квадрата за до четворо гостију, а простор се отвара пред вама као мала прича у четири поглавља." },
          { type: "p", text: "Дрво, светли зидови и топли теракота детаљи спајају се у дом који делује познато чим уђете. Ништа није сувишно, а ништа не недостаје - све је ту где треба да буде." },
          { type: "h2", text: "Од спаваће собе до трпезе" },
          { type: "p", text: "Спаваћа соба доноси миран сан уз климу и звучну изолацију. Дневни боравак са каучем на развлачење прима још двоје и позива на опуштање. Кухиња је потпуно опремљена, за оне који воле да кувају и на одмору, а трпезаријски кутак спаја све за столом." },
          { type: "quote", text: "Право место осети се чим уђете." },
          { type: "h2", text: "Тераса која гледа у зеленило" },
          { type: "p", text: "Најлепши део долази напоље. Приватан улаз, тераса и башта отварају се ка зеленилу, а базен са сланом водом је на дохват руке. Јутро уз кафу на тераси и вече уз тишину брда - то је ритам који се брзо заволи." },
          { type: "p", text: "Погледајте све детаље и проверите доступност на страници Смештај, па изаберите своје поглавље ове приче." },
        ],
      },
      "sr-latn": {
        category: "Smeštaj",
        title: "Apartman Mileva: četiri prostora, jedna priča",
        excerpt: "Spavaća soba, dnevni boravak, kuhinja i terasa - svaki kutak apartmana ima svoj ritam.",
        body: [
          { type: "p", text: "Apartman Mileva nije velik, ali je osmišljen tako da svaki kvadrat ima svoj smisao. Šezdeset kvadrata za do četvoro gostiju, a prostor se otvara pred vama kao mala priča u četiri poglavlja." },
          { type: "p", text: "Drvo, svetli zidovi i topli terakota detalji spajaju se u dom koji deluje poznato čim uđete. Ništa nije suvišno, a ništa ne nedostaje - sve je tu gde treba da bude." },
          { type: "h2", text: "Od spavaće sobe do trpeze" },
          { type: "p", text: "Spavaća soba donosi miran san uz klimu i zvučnu izolaciju. Dnevni boravak sa kaučem na razvlačenje prima još dvoje i poziva na opuštanje. Kuhinja je potpuno opremljena, za one koji vole da kuvaju i na odmoru, a trpezarijski kutak spaja sve za stolom." },
          { type: "quote", text: "Pravo mesto oseti se čim uđete." },
          { type: "h2", text: "Terasa koja gleda u zelenilo" },
          { type: "p", text: "Najlepši deo dolazi napolje. Privatan ulaz, terasa i bašta otvaraju se ka zelenilu, a bazen sa slanom vodom je na dohvat ruke. Jutro uz kafu na terasi i veče uz tišinu brda - to je ritam koji se brzo zavoli." },
          { type: "p", text: "Pogledajte sve detalje i proverite dostupnost na stranici Smeštaj, pa izaberite svoje poglavlje ove priče." },
        ],
      },
      en: {
        category: "Stay",
        title: "Mileva Apartment: four spaces, one story",
        excerpt: "Bedroom, living room, kitchen and terrace - every corner of the apartment has its own rhythm.",
        body: [
          { type: "p", text: "The Mileva Apartment is not large, but it is designed so that every square metre has its purpose. Sixty square metres for up to four guests, and the space unfolds before you like a small story in four chapters." },
          { type: "p", text: "Wood, light walls and warm terracotta details come together into a home that feels familiar the moment you step in. Nothing is superfluous, and nothing is missing - everything is where it should be." },
          { type: "h2", text: "From the bedroom to the table" },
          { type: "p", text: "The bedroom brings restful sleep with air conditioning and soundproofing. The living room, with its sofa bed, sleeps two more and invites you to unwind. The kitchen is fully equipped, for those who love to cook even on holiday, and the dining corner brings everyone together at the table." },
          { type: "quote", text: "The right place is felt the moment you step in." },
          { type: "h2", text: "A terrace that looks out on green" },
          { type: "p", text: "The finest part is outside. A private entrance, terrace and garden open onto the greenery, and the saltwater pool is within reach. Morning coffee on the terrace and evenings with the quiet of the hills - a rhythm that is easy to love." },
          { type: "p", text: "See all the details and check availability on the Accommodation page, then choose your chapter of this story." },
        ],
      },
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

const DATE_LOCALE: Record<LangCode, string> = {
  "sr-cyrl": "sr-Cyrl-RS",
  "sr-latn": "sr-Latn-RS",
  en: "en-GB",
};

/** Format an ISO date for display in the active language. */
export function formatDate(iso: string, lang: LangCode): string {
  return new Intl.DateTimeFormat(DATE_LOCALE[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
