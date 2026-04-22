export type ModalId = "contactModal" | "quoteModal" | "faultReportModal" | "documentRequestModal";

type ModalFieldType = "text" | "email" | "tel" | "textarea" | "checkbox";

export type ModalField = {
  name: string;
  label: string;
  type: ModalFieldType;
  required: boolean;
};

export type ModalDefinition = {
  id: ModalId;
  title: string;
  description: string;
  submitLabel: string;
  fields: ModalField[];
};

export const brand = {
  name: "SIAM Condomini",
  tagline: "SIAM al servizio del tuo condominio",
  headline: "Amministratori di condomini a L'Aquila",
  subheadline:
    "Vi garantiamo una organizzazione professionale, trasparente, competente e all'avanguardia.",
  aboutShort:
    "La SIAM opera da anni nella gestione dei condomini in tutto il territorio aquilano, con l'obiettivo di salvaguardare il condominio tramite una gestione attenta e scrupolosa sia dal punto di vista economico che di manutenzione."
};

export const contactInfo = {
  phone: "+390862319151",
  phoneDisplay: "(+39) 0862319151",
  emergencyPhone: "800978551",
  emergencyPhoneDisplay: "800 978551",
  email: "siam.condomini@gmail.com",
  address: "Via Carlo Forti, Nucleo industriale Bazzano Nord, L'Aquila"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "News", href: "/news" },
  { label: "Contatti", href: "/contatti" }
] as const;

export const modalDefinitions: ModalDefinition[] = [
  {
    id: "contactModal",
    title: "Contatta SIAM Condomini",
    description: "Invia una richiesta rapida di informazioni.",
    submitLabel: "Invia richiesta",
    fields: [
      { name: "fullName", label: "Nome e cognome", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Telefono", type: "tel", required: false },
      { name: "message", label: "Messaggio", type: "textarea", required: true },
      {
        name: "privacyConsent",
        label: "Acconsento al trattamento dei dati personali",
        type: "checkbox",
        required: true
      }
    ]
  },
  {
    id: "quoteModal",
    title: "Richiedi un preventivo",
    description: "Compila il modulo per essere ricontattato.",
    submitLabel: "Richiedi preventivo",
    fields: [
      { name: "fullName", label: "Nome e cognome", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Telefono", type: "tel", required: true },
      { name: "buildingType", label: "Tipologia immobile / condominio", type: "text", required: false },
      { name: "notes", label: "Dettagli richiesta", type: "textarea", required: true },
      {
        name: "privacyConsent",
        label: "Acconsento al trattamento dei dati personali",
        type: "checkbox",
        required: true
      }
    ]
  },
  {
    id: "faultReportModal",
    title: "Segnala un guasto",
    description: "Invia una segnalazione rapida relativa al tuo condominio.",
    submitLabel: "Invia segnalazione",
    fields: [
      { name: "fullName", label: "Nome e cognome", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Telefono", type: "tel", required: true },
      { name: "building", label: "Condominio / indirizzo", type: "text", required: true },
      { name: "faultType", label: "Tipo di guasto", type: "text", required: true },
      { name: "message", label: "Descrizione", type: "textarea", required: true },
      {
        name: "privacyConsent",
        label: "Acconsento al trattamento dei dati personali",
        type: "checkbox",
        required: true
      }
    ]
  },
  {
    id: "documentRequestModal",
    title: "Richiedi documentazione",
    description: "Richiedi documenti, avvisi o informazioni relative al tuo condominio.",
    submitLabel: "Invia richiesta",
    fields: [
      { name: "fullName", label: "Nome e cognome", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "building", label: "Condominio / riferimento", type: "text", required: true },
      { name: "requestType", label: "Documento richiesto", type: "text", required: true },
      { name: "message", label: "Dettagli", type: "textarea", required: false },
      {
        name: "privacyConsent",
        label: "Acconsento al trattamento dei dati personali",
        type: "checkbox",
        required: true
      }
    ]
  }
];

export const serviceGroups = [
  {
    id: "gestione",
    title: "Gestione",
    description: "Servizi operativi e amministrativi per la gestione completa del condominio.",
    items: [
      "Visite periodiche con controlli in prima persona",
      "Gestione computerizzata e personalizzata dei condomini",
      "Gestione spese condominiali, contatti con fornitori e gestione dei contratti di manutenzione",
      "Reperibilita telefonica fissa, mobile, fax e email",
      "Convocazione e tenuta delle assemblee condominiali",
      "Predisposizione ed invio del rendiconto e del preventivo",
      "Esecuzione delibere assembleari",
      "Controlli diretti durante i lavori di manutenzione ordinaria e straordinaria"
    ]
  },
  {
    id: "consulenza",
    title: "Consulenza",
    description: "Supporto su aspetti tecnici, normativi e organizzativi del condominio.",
    items: [
      "Consulenza per osservanze relative agli impianti",
      "Consulenza per tutte le problematiche relative al condominio",
      "Redazione di regolamenti condominiali",
      "Collegamento continuo con un consulente legale, fiscale e del lavoro"
    ]
  },
  {
    id: "pratiche-condominiali",
    title: "Pratiche condominiali",
    description: "Gestione documentale, fiscale e di rappresentanza del condominio.",
    items: [
      "Compilazione del modello 770",
      "Copertura assicurativa dell'amministratore e tutela dei condomini",
      "Conservazione in archivio dei documenti per i tempi previsti dalla legge",
      "Rappresentanza legale del condominio",
      "Disciplina dell'uso delle cose comuni e della prestazione dei servizi"
    ]
  }
] as const;

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  author: string;
  intro?: string;
  body: string[];
  externalLinks?: { label: string; url: string }[];
};

export const staticNewsPosts: NewsArticle[] = [
  {
    slug: "il-vademecum-per-la-cura-del-verde-condominiale-anaci",
    title: "Il vademecum per la cura del verde condominiale (ANACI)",
    excerpt:
      "Pubblicato il vademecum per la corretta gestione del verde e degli alberi all'interno dei giardini e dei parchi condominiali.",
    category: "ANACI",
    publishedAt: "2020-09-11",
    author: "admin",
    intro: "Comunicato Stampa ANACI - ASSOFLORO del 06.03.2020.",
    body: [
      "Pubblicato il vademecum per la cura del verde condominiale.",
      "Il documento nasce per aiutare l'amministratore di condominio a scegliere professionisti e aziende per la gestione e la cura di giardini e parchi condominiali, con particolare attenzione alle procedure di sicurezza.",
      "L'articolo evidenzia l'importanza del rispetto degli obblighi legislativi e della corretta manutenzione del verde per evitare danni, pericoli e contenziosi.",
      "Sono presenti riferimenti al protocollo d'intesa ANACI-ASSOFLORO e ai link per la consultazione del documento."
    ],
    externalLinks: [
      {
        label: "Protocollo d'Intesa ANACI-ASSOFLORO",
        url: "https://www.assofloromagazine.it"
      },
      {
        label: "ANACI",
        url: "https://www.anaci.it"
      },
      {
        label: "Assofloro",
        url: "https://www.assofloromagazine.it"
      }
    ]
  },
  {
    slug: "bonus-110-laquila",
    title: "Bonus 110% L'Aquila",
    excerpt:
      "Ecobonus e Sisma bonus: le misure per rilanciare il settore edilizio con detrazioni al 110%.",
    category: "News",
    publishedAt: "2020-09-11",
    author: "admin",
    body: [
      "Articolo informativo su Ecobonus e Sisma bonus con detrazione fiscale al 110% per interventi di riqualificazione energetica o miglioramento sismico.",
      "Vengono descritti i principali interventi ammessi, come isolamento termico dell'involucro, sostituzione degli impianti di climatizzazione e installazione di impianti fotovoltaici.",
      "Il testo menziona la possibilita di cessione del credito e i tetti massimi di spesa per gli interventi.",
      "E presente anche una sezione sul Sisma bonus e una riflessione sull'impatto del provvedimento sul settore edilizio locale."
    ]
  }
];

export const trustBullets = [
  "Onesta e trasparenza",
  "Disponibilita e mediazione",
  "Rapidita di intervento",
  "Coinvolgimento dei consiglieri",
  "Ricerca di soluzioni per contenere i costi"
];

export const punctualityHighlights = [
  "Servizi richiesti entro 24 ore",
  "Urgenze gestite entro poche ore",
  "Sopralluoghi diretti nei condomini amministrati",
  "Collaborazione con professionisti qualificati"
];

export const reservedAreaUrl = process.env.NEXT_PUBLIC_RESERVED_AREA_URL ?? "#";
