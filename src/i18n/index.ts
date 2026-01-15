import english from './en.json';
import spanish from './es.json';

const LANG = {
	ENGLISH: 'en',
	SPANISH: 'es',
};

export const getCurrentLocale = (): string => {
	if (typeof window !== 'undefined') {
		return window.location.pathname.startsWith('/en/') || window.location.pathname === '/en' ? 'en' : 'es';
	}
	return 'es';
};

export const getI18N = ({
	currentLocale = 'es',
}: {
	currentLocale: string | undefined;
}) => {
	if (currentLocale === LANG.ENGLISH) return english;
	return spanish;
};

export type Translations = typeof spanish;

