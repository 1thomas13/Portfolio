# Builds the English and Spanish CV from the same data. From the cv folder:
#   python cv.py && node cv.mjs   (cv.mjs needs playwright-core: `npm i --no-save playwright-core`; it uses the installed Edge)
# cv.py writes the HTML files and updates meta.cvUpdated in src/i18n; cv.mjs renders the PDFs, which are copied by hand
# to public/ as "Thomas Barreto CV - English.pdf" and "Thomas Barreto CV - Español.pdf".
# Single column with real text, so ATS parsers read it correctly.
import datetime, html, json

CV = {
    "en": {
        "role": "Full-Stack Developer",
        "summary": "Full-stack developer with 4+ years of experience building web and mobile products for startups and small teams, across front-end, back-end, mobile and infrastructure, including technical leadership. Working remotely from Río Grande, Argentina.",
        "h": {"exp": "Professional experience", "projects": "Projects", "edu": "Education", "skills": "Skills", "langs": "Languages"},
        "jobs": [
            ("Amaze", "Full-Stack Developer", "Argentina", "June 2026 – Present", [
                "Build personalized experiences at scale, delivering a different version of each campaign to every user.",
                "Develop internal AI-powered tools that automate team workflows.",
            ]),
            ("Bitskingdom", "Full-Stack Developer", "Uruguay (remote)", "November 2024 – May 2026", [
                "Worked on two products for agency clients: an events app and a referee assignment platform.",
                "Events app (Expo): implemented most features, including iOS in-app payments.",
                "Referee platform (8,700+ users): notifications and performance improvements.",
            ]),
            ("IPES", "Full-Stack Developer · project lead (freelance, part-time)", "Río Grande, Argentina", "June 2024 – December 2025", [
                "Academic management system for a higher-education institute: students, programs, subjects and exam sessions.",
                "Developed most of the system and managed the project, including the client relationship.",
            ]),
            ("WeGoGreenR", "Web Developer → Tech Lead", "France (remote)", "March 2023 – November 2024", [
                "Sustainable travel platform: B2B SaaS for managing accommodations' sustainability and certifications, plus a B2C booking site for travelers.",
                "Joined as a front-end developer and took over leadership of the 4-person tech team.",
                "Progressively migrated the front-end to a new version running alongside the legacy one.",
                "Developed new features and improved the interface and navigation of the B2C platform.",
                "Reduced monthly AWS costs by 38%.",
                "During my time at the company, the platform gained half of its total users and 43% of its all-time bookings.",
            ]),
            ("DAIRA IT Groups", "Front-End Developer", "Río Grande, Argentina", "November 2022 – April 2023", [
                "Front-end development with Svelte for a financial company, focused on automating customer service.",
            ]),
            ("CHINOA", "Full-Stack Developer · internship", "Río Grande, Argentina", "January 2022 – July 2022", [
                "Order, inventory and cost management system for a chocolate factory in Río Grande, developed independently in 4 months.",
            ]),
        ],
        "projects": [
            ("The Rockin' Chair", "Accessible concert platform. Sole developer, working with a designer: landing page, mobile app (App Store and Google Play) and web app.", "Expo · React Native · Supabase · RevenueCat · Next.js"),
        ],
        "edu": ("Universidad Tecnológica Nacional (UTN)", "University Technical Degree in Programming (degree pending issuance)", "Río Grande, Argentina", "2021 – 2025"),
        "skills": [
            ("Front-end", "TypeScript, JavaScript, React, Next.js, Astro, Svelte, Redux, Tailwind, Sass"),
            ("Mobile", "React Native, Expo, RevenueCat"),
            ("Back-end", "Node.js, Express, Nest.js, Supabase, PostgreSQL, MongoDB, MySQL, Drizzle, Stripe"),
            ("Cloud", "AWS (EC2, Lambda, S3, RDS, CloudFront), Docker, Linux"),
        ],
        "langs": "Spanish (native) · English (intermediate)",
    },
    "es": {
        "role": "Desarrollador Full-Stack",
        "summary": "Desarrollador full-stack con más de 4 años de experiencia en productos web y móviles para startups y equipos reducidos, abarcando front-end, back-end, desarrollo móvil e infraestructura, incluido el liderazgo técnico. Trabajo en modalidad remota desde Río Grande, Argentina.",
        "h": {"exp": "Experiencia profesional", "projects": "Proyectos", "edu": "Educación", "skills": "Habilidades técnicas", "langs": "Idiomas"},
        "jobs": [
            ("Amaze", "Desarrollador Full-Stack", "Argentina", "Junio 2026 – Actualidad", [
                "Desarrollo de experiencias personalizadas a escala, en las que cada usuario recibe una versión distinta de cada campaña.",
                "Desarrollo de herramientas internas basadas en IA para automatizar tareas del equipo.",
            ]),
            ("Bitskingdom", "Desarrollador Full-Stack", "Uruguay (remoto)", "Noviembre 2024 – Mayo 2026", [
                "Desarrollo de dos productos para clientes de la agencia: una aplicación de eventos y una plataforma de asignación de árbitros.",
                "Aplicación de eventos (Expo): implementación de la mayoría de las funcionalidades, incluidos los pagos in-app en iOS.",
                "Plataforma de árbitros (más de 8.700 usuarios): sistema de notificaciones y mejoras de rendimiento.",
            ]),
            ("IPES", "Desarrollador Full-Stack · líder de proyecto (freelance, medio tiempo)", "Río Grande, Argentina", "Junio 2024 – Diciembre 2025", [
                "Sistema de gestión académica para un instituto de nivel superior: alumnos, carreras, materias y mesas de examen.",
                "Responsable de la mayor parte del desarrollo y de la gestión del proyecto, incluida la relación con el cliente.",
            ]),
            ("WeGoGreenR", "Desarrollador Web → Tech Lead", "Francia (remoto)", "Marzo 2023 – Noviembre 2024", [
                "Plataforma de turismo sostenible: SaaS B2B de sostenibilidad y certificaciones para alojamientos, y sitio B2C de reservas.",
                "Ingresé como desarrollador front-end y asumí el liderazgo del equipo técnico, de 4 personas.",
                "Migración progresiva del front-end a una nueva versión, en convivencia con la anterior.",
                "Desarrollo de nuevas funcionalidades y mejoras de interfaz y navegación en la plataforma B2C.",
                "Reducción del 38 % en los costos mensuales de AWS.",
                "Durante mi etapa en la empresa, la plataforma incorporó la mitad de sus usuarios totales y el 43 % de sus reservas históricas.",
            ]),
            ("DAIRA IT Groups", "Desarrollador Front-End", "Río Grande, Argentina", "Noviembre 2022 – Abril 2023", [
                "Desarrollo front-end con Svelte para una entidad financiera, orientado a automatizar la atención al cliente.",
            ]),
            ("CHINOA", "Desarrollador Full-Stack · pasantía", "Río Grande, Argentina", "Enero 2022 – Julio 2022", [
                "Sistema de gestión de pedidos, stock y costos para una fábrica de chocolates de Río Grande, desarrollado de forma individual en 4 meses.",
            ]),
        ],
        "projects": [
            ("The Rockin' Chair", "Plataforma de conciertos accesibles. Único desarrollador del proyecto, en colaboración con un diseñador: landing page, aplicación móvil (App Store y Google Play) y aplicación web.", "Expo · React Native · Supabase · RevenueCat · Next.js"),
        ],
        "edu": ("Universidad Tecnológica Nacional (UTN)", "Tecnicatura Universitaria en Programación (título en trámite)", "Río Grande, Argentina", "2021 – 2025"),
        "skills": [
            ("Front-end", "TypeScript, JavaScript, React, Next.js, Astro, Svelte, Redux, Tailwind, Sass"),
            ("Mobile", "React Native, Expo, RevenueCat"),
            ("Back-end", "Node.js, Express, Nest.js, Supabase, PostgreSQL, MongoDB, MySQL, Drizzle, Stripe"),
            ("Cloud", "AWS (EC2, Lambda, S3, RDS, CloudFront), Docker, Linux"),
        ],
        "langs": "Español (nativo) · Inglés (intermedio)",
    },
}

e = html.escape


def render(lang):
    c = CV[lang]
    h = c["h"]

    def side(top, bottom):
        return f'<div class="side"><span>{e(top)}</span><span>{e(bottom)}</span></div>'

    jobs = "".join(
        f"""<article class="item">
  <div class="head"><div><h3>{e(company)}</h3><p class="role">{e(role)}</p></div>{side(where, when)}</div>
  <ul>{"".join(f"<li>{e(b)}</li>" for b in bullets)}</ul>
</article>"""
        for company, role, where, when, bullets in c["jobs"]
    )
    projects = "".join(
        f"""<article class="item"><p><b>{e(name)}:</b> {e(text)}</p><p class="stack">{e(stack)}</p></article>"""
        for name, text, stack in c["projects"]
    )
    school, degree, place, years = c["edu"]
    skills = ", ".join(v for _, v in c["skills"])
    langs = "".join(f"<span>• {e(l)}</span>" for l in c["langs"].split(" · "))
    contact = [
        ("E.", "thomi.b137@gmail.com", "mailto:thomi.b137@gmail.com"),
        ("P.", "+54 2964 477730", None),
        ("A.", "Río Grande, Argentina", None),
        ("W.", "thomasbarreto.vercel.app", "https://thomasbarreto.vercel.app"),
    ]
    contact_html = "".join(
        f'<li><b>{k}</b> ' + (f'<a href="{href}">{e(v)}</a>' if href else e(v)) + "</li>" for k, v, href in contact
    )
    return f"""<!doctype html>
<html lang="{lang}"><head><meta charset="utf-8"><title>Thomas Barreto — CV</title>
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;800&display=block" rel="stylesheet">
<style>
@page {{ size: A4; margin: 12mm 13mm; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{ font: 400 8.6pt/1.5 Rubik, Arial, sans-serif; color: #3a3a3a; }}
a {{ color: inherit; text-decoration: none; }}
header {{ display: flex; justify-content: space-between; gap: 20px; }}
h1 {{ font: 800 27pt/1.05 Rubik, Arial, sans-serif; color: #3f51d1; }}
.title {{ font: 300 19pt/1.2 Rubik, Arial, sans-serif; color: #2b2b2b; }}
.contact {{ list-style: none; font-size: 8.2pt; line-height: 1.6; color: #2b2b2b; }}
.contact b {{ color: #3f51d1; font-weight: 700; }}
.summary {{ margin-top: 12px; padding-bottom: 12px; border-bottom: 1px solid #2b2b2b; color: #555; line-height: 1.75; }}
h2 {{ margin: 12px 0 6px; font: 700 13.5pt/1 Rubik, Arial, sans-serif; text-transform: uppercase; color: #3f51d1; }}
.item {{ break-inside: avoid; margin-bottom: 7px; }}
.head {{ display: flex; justify-content: space-between; gap: 16px; }}
h3 {{ font-size: 9.5pt; font-weight: 700; color: #2b2b2b; }}
.role {{ color: #3a3a3a; }}
.side {{ display: flex; flex-direction: column; align-items: flex-end; color: #3f51d1; white-space: nowrap; line-height: 1.35; }}
ul {{ margin-top: 4px; list-style: none; }}
/* Bullet in the text flow: if positioned, the PDF writes it at the end and ATS parsers read the
   bullets apart from their job */
.item li {{ padding-left: 13px; text-indent: -11px; color: #555; }}
.item li::before {{ content: "●"; display: inline-block; width: 11px; text-indent: 0; font-size: 6.5pt; vertical-align: 1px; }}
.stack {{ color: #3f51d1; font-size: 8pt; }}
.langs span {{ margin-right: 28px; }}
</style></head>
<body>
<header>
  <div><h1>Thomas Barreto</h1><p class="title">{e(c["role"])}</p></div>
  <ul class="contact">{contact_html}</ul>
</header>
<p class="summary">{e(c["summary"])}</p>
<h2>{e(h["exp"])}</h2>
{jobs}
<h2>{e(h["projects"])}</h2>
{projects}
<h2>{e(h["edu"])}</h2>
<article class="item"><div class="head"><div><h3>{e(degree)}</h3><p class="role">{e(school)}</p></div>{side(place, years)}</div></article>
<h2>{e(h["skills"])}</h2>
<p>{e(skills)}</p>
<h2>{e(h["langs"])}</h2>
<p class="langs">{langs}</p>
</body></html>"""


for lang in ("en", "es"):
    open(f"cv-{lang}.html", "w", encoding="utf-8").write(render(lang))

# The update date the site shows under the CV buttons
for lang in ("en", "es"):
    path = f"../src/i18n/{lang}.json"
    data = json.load(open(path, encoding="utf-8"))
    data["meta"]["cvUpdated"] = datetime.date.today().isoformat()
    open(path, "w", encoding="utf-8", newline="\n").write(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print("ok")
