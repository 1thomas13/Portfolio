import english from './en.json';
import spanish from './es.json';

// Indexable pages: Spanish path → English path
export const LOCALIZED_PATHS: Record<string, string> = { '/': '/en/', '/versiones': '/en/versions' };

export const getLocale = (url: URL) => (url.pathname.startsWith('/en') ? 'en' : 'es');

export const getI18N = ({
	currentLocale = 'es',
}: {
	currentLocale: string | undefined;
}) => {
	if (currentLocale === 'en') return english;
	return spanish;
};

// v3 has its own English route; the others read ?lang (see src/scripts/archive)
const getVersionHref = (id: string, currentLocale: string) =>
	id === 'v3' && currentLocale === 'en' ? '/v3/en/?lang=en' : `/${id}/?lang=${currentLocale}`;

// 23/03/2026 in Spanish, 03/23/2026 in English
export const formatDate = (iso: string, currentLocale: string) => {
	const [year, month, day] = iso.split('-');
	return currentLocale === 'en' ? `${month}/${day}/${year}` : `${day}/${month}/${year}`;
};

// "1ª" in Spanish, "1st" in English
export const ordinal = (n: number, currentLocale: string) =>
	currentLocale === 'en' ? `${n}${['st', 'nd', 'rd'][n - 1] ?? 'th'}` : `${n}ª`;

export const getEditions = (currentLocale: string) =>
	getI18N({ currentLocale }).editions.map((version, i) => ({ ...version, number: ordinal(i + 1, currentLocale), href: getVersionHref(version.id, currentLocale) }));

// Copy for the old editions' scripts, which don't go through Astro: injected at build time
export const getArchiveData = () => {
	const versions: Record<string, Record<string, unknown>> = {};
	const copy: Record<string, unknown> = {};
	for (const locale of ['es', 'en']) {
		const t = getI18N({ currentLocale: locale });
		copy[locale] = { ...t.archive, months: t.versions.months, years: t.versions.years };
		for (const edition of getEditions(locale)) {
			const version = (versions[edition.id] ??= { year: edition.year, months: edition.months, edition: {} });
			(version.edition as Record<string, string>)[locale] = `${edition.number} ${t.edition.edition}`;
			version[locale] = { sub: edition.story, note: 'note' in edition ? edition.note : undefined };
		}
	}
	return { versions, copy };
};
