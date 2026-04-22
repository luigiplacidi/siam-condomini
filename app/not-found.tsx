import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-shell pt-24 pb-24 text-center">
      <p className="kicker">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-primary">Pagina non trovata</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        La risorsa richiesta non e disponibile o e stata spostata.
      </p>
      <Link href="/" className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
        Torna alla home
      </Link>
    </section>
  );
}
