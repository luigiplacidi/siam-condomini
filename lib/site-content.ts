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
  name: "SIAM s.r.l.",
  tagline: "SIAM s.r.l. al servizio del tuo condominio",
  headline: "Amministratori di condomini a L'Aquila",
  subheadline:
    "Vi garantiamo una organizzazione professionale, trasparente, competente e all'avanguardia.",
  aboutShort:
    "La SIAM s.r.l. opera da anni nella gestione dei condomini in tutto il territorio aquilano, con l'obiettivo di salvaguardare il condominio tramite una gestione attenta e scrupolosa sia dal punto di vista economico che di manutenzione."
};

export const contactInfo = {
  phone: "+390862319151",
  phoneDisplay: "(+39) 0862319151",
  email: "info@siamcondomini.com",
  legalName: "SIAM s.r.l.",
  vatNumber: "01956310666",
  sdiCode: "USAL8PV",
  address: "Via Carlo Forti snc, 67100 L'Aquila"
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
    title: "Contatta SIAM s.r.l.",
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
    slug: "prevenzione-incendi-condominio-regole-e-adempimenti",
    title: "Prevenzione incendi in condominio: regole, adempimenti e gestione quotidiana",
    excerpt:
      "Un articolo operativo sulle principali regole di prevenzione incendi che interessano gli edifici residenziali e il lavoro dell'amministratore.",
    category: "Prevenzione incendi",
    publishedAt: "2026-04-30",
    author: "SIAM s.r.l.",
    intro:
      "La prevenzione incendi in condominio non riguarda solo i grandi edifici: e un tema di organizzazione, controllo e manutenzione che interessa molte parti comuni.",
    body: [
      "Il DM 25 gennaio 2019 ha aggiornato le norme di sicurezza antincendio per gli edifici di civile abitazione, introducendo un quadro piu attento alla gestione della sicurezza e alle misure da applicare anche negli edifici esistenti.",
      "Per l'amministratore il punto centrale non e soltanto l'adeguamento formale, ma la tenuta ordinata della documentazione, la manutenzione delle parti comuni e la consapevolezza di quali spazi possano richiedere verifiche e aggiornamenti.",
      "In condominio la prevenzione incendi vive nella pratica quotidiana: corretta gestione delle vie di esodo, attenzione ai locali tecnici, verifica dei materiali e coordinamento con i professionisti quando si interviene su impianti o facciate.",
      "L'approccio migliore resta quello semplice ma rigoroso: sapere quali obblighi esistono, controllare cosa manca e tenere il condominio in uno stato di manutenzione che riduca il rischio prima ancora dell'adempimento documentale."
    ],
    externalLinks: [
      {
        label: "Gazzetta Ufficiale - DM 25 gennaio 2019",
        url: "https://www.gazzettaufficiale.it/eli/id/2019/02/05/19A00734/sg"
      },
      {
        label: "CondominioWeb - prevenzione incendi",
        url: "https://www.condominioweb.com/il-perimento-parziale-del-condominio.13026"
      }
    ]
  },
  {
    slug: "verifica-cancelli-automatizzati-impianti-e-documentazione",
    title: "Verifica cancelli automatizzati: impianti, documentazione e controlli",
    excerpt:
      "Un approfondimento sulle automazioni di cancelli e basculanti, tra impianto elettrico, manutenzione e adempimenti da non dimenticare.",
    category: "Impianti",
    publishedAt: "2026-04-29",
    author: "SIAM s.r.l.",
    intro:
      "I cancelli automatizzati richiedono una gestione attenta: impianto elettrico, sicurezza, documenti di conformita e manutenzione devono viaggiare insieme.",
    body: [
      "Il DM 22 gennaio 2008, n. 37 disciplina le attivita di installazione degli impianti negli edifici e resta il primo riferimento da tenere presente quando un condominio ha automazioni elettriche per cancelli, portoni o barriere.",
      "Nella pratica amministrativa, oltre al rispetto della regola tecnica dell'impianto, conta la documentazione che l'installatore e i manutentori devono consegnare: dichiarazioni di conformita, eventuale marcatura CE, fascicolo tecnico e manuali di uso e manutenzione.",
      "Le verifiche devono essere lette anche in chiave di sicurezza quotidiana: sensori, dispositivi anti-schiacciamento, chiusure, sistemi di sblocco e alimentazione elettrica vanno tenuti sotto controllo per ridurre il rischio per utenti e terzi.",
      "Per l'amministratore una buona routine e semplice: tracciare gli interventi, verificare chi ha effettuato i controlli, chiedere aggiornamenti sulla documentazione e programmare la manutenzione prima che il guasto diventi emergenza."
    ],
    externalLinks: [
      {
        label: "Gazzetta Ufficiale - DM 22 gennaio 2008 n. 37",
        url: "https://www.gazzettaufficiale.it/eli/id/2008/03/12/008G0060/sg"
      },
      {
        label: "INAIL - CIVA servizi di verifica",
        url: "https://www.inail.it/portale/it/inail-comunica/news/notizia.2019.05.dal-27-maggio-i-servizi-di-certificazione-e-verifica-di-impianti-e-apparecchi-si-richiedono-on-line-civa.html"
      },
      {
        label: "CondominioWeb - cancello automatico",
        url: "https://www.condominioweb.com/linstallazione-di-un-cancello-non-rappresenta-uninnovazione.11741"
      }
    ]
  },
  {
    slug: "potabilita-dell-acqua-in-condominio-controlli-e-responsabilita",
    title: "Potabilità dell'acqua in condominio: controlli, responsabilità e buone prassi",
    excerpt:
      "La qualità dell'acqua nei fabbricati interessa approvvigionamento, serbatoi, controlli e gestione corretta degli impianti.",
    category: "Acqua",
    publishedAt: "2026-04-26",
    author: "SIAM s.r.l.",
    intro:
      "La potabilita dell'acqua non e un tema solo sanitario: in condominio richiede manutenzione, attenzione ai serbatoi e una gestione ordinata degli impianti.",
    body: [
      "Il riferimento normativo di base e il Decreto legislativo 23 febbraio 2023, n. 18, che disciplina la qualita delle acque destinate al consumo umano e aggiorna l'impianto normativo italiano in materia.",
      "Per un condominio significa controllare l'intero percorso dell'acqua: punti di approvvigionamento, eventuali accumuli, distribuzione interna, pulizia di serbatoi e vasche e manutenzione degli impianti collegati.",
      "Quando esistono impianti centralizzati o depositi di accumulo, la prevenzione e piu importante del problema: piano dei controlli, interventi di pulizia periodica e verifiche affidate a professionisti riducono molto il rischio di criticita.",
      "La gestione corretta della documentazione aiuta l'amministratore anche nel rapporto con i condomini, perche rende chiaro cosa e stato fatto, quando e con quali esiti, evitando discussioni poco utili e verifiche duplicate."
    ],
    externalLinks: [
      {
        label: "Gazzetta Ufficiale - D.Lgs. 18/2023",
        url: "https://www.gazzettaufficiale.it/eli/id/2023/03/06/23G00025/sg"
      },
      {
        label: "Ministero della Salute - acqua destinata al consumo umano",
        url: "https://www.salute.gov.it/portale/acqua/homeAcqua.jsp"
      },
      {
        label: "CondominioWeb - salute e qualità della vita in condominio",
        url: "https://www.condominioweb.com/come-garantire-la-salute-in-condominio.18856"
      }
    ]
  },
  {
    slug: "verifiche-impianti-elettrici-cancelli-basculanti-automatizzate",
    title: "Verifiche impianti elettrici, cancelli e basculanti automatizzate",
    excerpt:
      "Un vademecum pratico sugli adempimenti tecnici e documentali da tenere sotto controllo quando l'impianto serve cancelli e basculanti automatizzate.",
    category: "Normativa",
    publishedAt: "2026-04-28",
    author: "SIAM s.r.l.",
    intro:
      "Approfondimento tecnico sulla manutenzione, sulla documentazione e sui profili di sicurezza da valutare in condomini con automazioni elettriche.",
    body: [
      "Quando un condominio dispone di cancelli, portoni o basculanti automatizzate, l'impianto va considerato nel suo insieme: parte elettrica, organi meccanici, dispositivi di sicurezza e documentazione di conformita.",
      "Il riferimento operativo principale per installazione e manutenzione resta il DM 37/2008, mentre per le verifiche periodiche in ambito lavorativo possono entrare in gioco gli adempimenti previsti dal DPR 462/2001 e dalla piattaforma CIVA dell'INAIL.",
      "Per i profili di prevenzione incendi, il DM 25 gennaio 2019 e rilevante nei casi in cui l'edificio o alcuni suoi spazi ricadano nelle condizioni di applicazione della disciplina antincendio per gli edifici di civile abitazione.",
      "Nella pratica condominiale conviene verificare la disponibilita della dichiarazione di conformita, della marcatura CE ove prevista, del fascicolo tecnico dell'automazione e di un piano di manutenzione affidato a soggetti qualificati."
    ],
    externalLinks: [
      {
        label: "Gazzetta Ufficiale - DM 25 gennaio 2019",
        url: "https://www.gazzettaufficiale.it/eli/id/2019/02/05/19A00734/sg"
      },
      {
        label: "INAIL - servizio CIVA",
        url: "https://www.inail.it/portale/it/inail-comunica/news/notizia.2019.05.dal-27-maggio-i-servizi-di-certificazione-e-verifica-di-impianti-e-apparecchi-si-richiedono-on-line-civa.html"
      },
      {
        label: "CondominioWeb - cancelli automatici e ripartizione spese",
        url: "https://www.condominioweb.com/cancello-automatico-in-condominio-ripartizione-costi-riguardanti-linstallazione-e-quelli-inerenti-luso.470"
      }
    ]
  },
  {
    slug: "convivenza-in-condominio-regole-pratiche",
    title: "Convivenza in condominio: regole pratiche per vivere meglio insieme",
    excerpt:
      "Piccoli accorgimenti quotidiani, buon senso e regole chiare aiutano a ridurre conflitti e a migliorare la vita comune.",
    category: "Vita di condominio",
    publishedAt: "2026-04-24",
    author: "SIAM s.r.l.",
    intro:
      "La convivenza condominiale funziona quando comunicazione, rispetto degli spazi comuni e regole interne lavorano nella stessa direzione.",
    body: [
      "La convivenza in condominio nasce dal rispetto reciproco: orari di quiete, uso corretto degli spazi comuni, attenzione ai rumori e gestione ordinata dei rifiuti sono i primi ingredienti di una comunità serena.",
      "Anche il regolamento condominiale ha un ruolo importante: non deve essere percepito come un elenco di divieti, ma come uno strumento per rendere prevedibili le regole di uso delle parti comuni e prevenire i conflitti prima che diventino contenziosi.",
      "Una comunicazione chiara con l'amministratore e con gli altri condomini aiuta a gestire meglio lavori, accessi, urgenze e segnalazioni. Quando esiste un problema, affrontarlo presto evita che si trasformi in una frattura stabile tra vicini.",
      "Un condominio ordinato e piu semplice da amministrare e spesso anche meno costoso, perche riduce interventi correttivi, discussioni ripetute e tempi morti nella gestione delle decisioni comuni."
    ],
    externalLinks: [
      {
        label: "CondominioWeb - vita di condominio",
        url: "https://www.condominioweb.com/-vita-di-condominio/"
      },
      {
        label: "CondominioWeb - rumori e regolamento di condominio",
        url: "https://www.condominioweb.com/rumori-e-regolamento-di-condominio.21469"
      }
    ]
  },
  {
    slug: "assicurazione-del-fabbricato-e-tutela-del-condominio",
    title: "L'assicurazione del fabbricato e la tutela del condominio",
    excerpt:
      "Per proteggere il fabbricato e i condomini da danni materiali e responsabilita verso terzi, la polizza e uno strumento sempre utile da valutare.",
    category: "Assicurazione",
    publishedAt: "2026-04-18",
    author: "SIAM s.r.l.",
    intro:
      "Una buona polizza fabbricati non elimina il rischio, ma aiuta il condominio a gestirne meglio gli effetti economici e responsabilita potenziali.",
    body: [
      "L'assicurazione del fabbricato non e in genere un obbligo generalizzato, ma rappresenta una scelta di prudenza molto utile per i condomini, soprattutto quando l'immobile ha impianti complessi, spazi comuni frequenti o una storia di sinistri.",
      "Le polizze globali fabbricati servono a coprire danni all'edificio e, in molti casi, la responsabilita civile verso terzi. Prima della sottoscrizione va sempre verificato il perimetro delle coperture, le esclusioni, le franchigie e i massimali.",
      "In ambito condominiale la polizza va anche coordinata con la manutenzione ordinaria, perche un'assicurazione non sostituisce la prevenzione: controlli periodici, documentazione in ordine e interventi tempestivi restano fondamentali.",
      "Un amministratore attento dovrebbe rileggere la polizza almeno in occasione di lavori importanti, cambi di impianti, installazione di automazioni o variazioni significative dell'esposizione al rischio."
    ],
    externalLinks: [
      {
        label: "CondominioWeb - assicurazione fabbricato",
        url: "https://www.condominioweb.com/contratto-di-assicurazione-polizza-globale-fabbricati-e-responsabilita-dellamministratore.12937"
      },
      {
        label: "CondominioWeb - assicurazione fabbricato: elementi essenziali",
        url: "https://www.condominioweb.com/assicurazione-globale-fabbricati-gli-elementi-essenziali-da-conoscere.17447"
      }
    ]
  },
  {
    slug: "ricostruzione-e-open-data-laquila",
    title: "Ricostruzione e open data: strumenti utili per i condomini dell'Aquila",
    excerpt:
      "Open data, dati di avanzamento e portali istituzionali possono aiutare i condomini a orientarsi meglio nei processi di ricostruzione.",
    category: "Ricostruzione",
    publishedAt: "2026-04-10",
    author: "SIAM s.r.l.",
    intro:
      "I dati aperti e i portali istituzionali sulla ricostruzione rendono piu facile controllare informazioni, pratiche e avanzamento degli interventi.",
    body: [
      "Per il territorio dell'Aquila, gli open data sulla ricostruzione rappresentano una risorsa concreta per leggere lo stato delle pratiche, i numeri della ricostruzione e le informazioni georeferenziate disponibili per cittadini e tecnici.",
      "Gli strumenti di consultazione pubblica aiutano anche i condomini a orientarsi quando devono verificare lo stato di un fabbricato, i riferimenti di una pratica o l'avanzamento degli interventi gia avviati.",
      "Accanto ai portali istituzionali, alcuni articoli di approfondimento giuridico possono essere utili per comprendere gli effetti del perimento parziale o totale del condominio e il diritto alla ricostruzione delle parti comuni.",
      "Per chi lavora in amministrazione condominiale, collegare dati pubblici, documenti tecnici e consulenza operativa significa avere una base piu solida per spiegare ai condomini cosa sta accadendo e quali sono i passaggi successivi."
    ],
    externalLinks: [
      {
        label: "USRA - Open data",
        url: "https://usra.it/open-data/"
      },
      {
        label: "USRA - Dati e numeri",
        url: "https://usra.it/dati-e-numeri/"
      },
      {
        label: "Comune dell'Aquila - Ricostruzione",
        url: "https://www.comune.laquila.it/pagina943_ricostruzione.html"
      },
      {
        label: "CondominioWeb - perimento totale del condominio",
        url: "https://www.condominioweb.com/il-perimento-totale-del-condominio.13027"
      },
      {
        label: "CondominioWeb - perimento parziale del condominio",
        url: "https://www.condominioweb.com/il-perimento-parziale-del-condominio.13026"
      }
    ]
  },
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
