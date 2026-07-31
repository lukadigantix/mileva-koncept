/**
 * Preslovljavanje srpske latinice u ćirilicu — za sadržaj koji stiže iz admin
 * panela. U adminu se sve kuca latinicom, a sajt na ćiriličnoj verziji treba da
 * ga prikaže ćirilicom. Hardkodovani rečnik (`translations.ts`) ima svoja tri
 * ručna prevoda i ovo ga ne dotiče (ćirilični unosi ionako prolaze nepromenjeni,
 * jer se preslovljavaju samo latinična slova).
 *
 * Čiste funkcije bez zavisnosti — koriste se i na serveru (metapodaci stranica)
 * i na klijentu (kroz `useCms` iz LanguageProvider-a).
 */

/** Digrafi idu pre pojedinačnih slova, inače bi se raspali na dva znaka. */
const DIGRAPHS: [RegExp, string][] = [
  [/D[žŽ]/g, "Џ"],
  [/d[žŽ]/g, "џ"],
  [/L[jJ]/g, "Љ"],
  [/l[jJ]/g, "љ"],
  [/N[jJ]/g, "Њ"],
  [/n[jJ]/g, "њ"],
];

const LETTERS: Record<string, string> = {
  a: "а", b: "б", c: "ц", č: "ч", ć: "ћ", d: "д", đ: "ђ", e: "е", f: "ф",
  g: "г", h: "х", i: "и", j: "ј", k: "к", l: "л", m: "м", n: "н", o: "о",
  p: "п", r: "р", s: "с", š: "ш", t: "т", u: "у", v: "в", z: "з", ž: "ж",
  A: "А", B: "Б", C: "Ц", Č: "Ч", Ć: "Ћ", D: "Д", Đ: "Ђ", E: "Е", F: "Ф",
  G: "Г", H: "Х", I: "И", J: "Ј", K: "К", L: "Л", M: "М", N: "Н", O: "О",
  P: "П", R: "Р", S: "С", Š: "Ш", T: "Т", U: "У", V: "В", Z: "З", Ž: "Ж",
};

/** Reč sa okolnim znacima koji mogu činiti mejl/domen (@ . _ + -). */
const TOKEN_RE = /[\p{L}\p{N}][\p{L}\p{N}@._+-]*/gu;

/**
 * Da li reč treba ostaviti u latinici. Strani nazivi i skraćenice se u
 * ćiriličnom tekstu po pravilu pišu izvorno (Yamaha, CFMoto, ATV, GPX).
 */
function keepLatin(token: string): boolean {
  if (token.includes("@")) return true; // mejl adresa
  if (/^[\w.+-]+\.[a-z]{2,}$/i.test(token)) return true; // domen / URL
  const core = token.replace(/[@._+-]+$/g, "");
  if (!core) return true;
  // q, w, x, y ne postoje u srpskoj latinici → sigurno strana reč.
  if (/[qwxy]/i.test(core)) return true;
  const isUpper = core === core.toUpperCase() && core !== core.toLowerCase();
  // Kratke reči velikim slovima su skraćenice (ATV, GPX, RSD); duže su naslovi.
  if (isUpper) return core.length <= 4;
  // Veliko slovo unutar reči → naziv brenda ili modela (CFMoto, MapLibre).
  return /\p{Lu}/u.test(core.slice(1));
}

function transliterateToken(token: string): string {
  let out = token;
  for (const [re, ch] of DIGRAPHS) out = out.replace(re, ch);
  return Array.from(out)
    .map((c) => LETTERS[c] ?? c)
    .join("");
}

/** Srpska latinica → ćirilica, uz čuvanje stranih naziva i skraćenica. */
export function toCyrillic(text: string): string {
  if (!text) return text;

  let out = "";
  let last = 0;
  // Prethodna reč je zadržana u latinici i počinje velikim slovom — tada i
  // sledeća velika reč ostaje latinična ("Kawasaki Brute Force"). Tip je
  // eksplicitan jer se vrednost izvodi iz izraza koji je i sam čita.
  let prevBrand: boolean = false;

  for (const match of text.matchAll(TOKEN_RE)) {
    const token = match[0];
    const start = match.index;
    const gap = text.slice(last, start);
    out += gap;

    const capitalized = /^\p{Lu}/u.test(token);
    // Nastavak višečlanog naziva važi samo preko običnog razmaka.
    const brandRun: boolean = prevBrand && capitalized && /^[  ]*$/.test(gap);
    const keep: boolean = brandRun || keepLatin(token);

    out += keep ? token : transliterateToken(token);
    prevBrand = keep && capitalized;
    last = start + token.length;
  }

  return out + text.slice(last);
}

/**
 * Isto, ali nad HTML-om iz CMS-a (Tiptap): preslovljava samo tekst, dok tagovi,
 * atributi i HTML entiteti ostaju netaknuti.
 */
export function toCyrillicHtml(html: string): string {
  if (!html) return html;
  return html
    .split(/(<[^>]*>)/)
    .map((part, i) => {
      if (i % 2 === 1) return part; // <tag ...>
      return part
        .split(/(&[a-zA-Z][a-zA-Z0-9]*;|&#\d+;)/)
        .map((chunk, j) => (j % 2 === 1 ? chunk : toCyrillic(chunk)))
        .join("");
    })
    .join("");
}
