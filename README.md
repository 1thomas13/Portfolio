# Personal Portfolio - Thomas Barreto

Personal portfolio developed with Astro, React and TypeScript. Includes multi-language support (Spanish/English) and a modern design with visual effects.

## 🚀 How to run the project

### Installation

1. Clone the repository:
```bash
git clone <your-repository>
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser at `http://localhost:4321`

## 📝 Customization

To adapt this portfolio for yourself, you need to modify the following files:

### 1. Personal Information

#### Translation files (`src/i18n/`)

**`es.json` and `en.json`** - Contains all translatable information:

- Includes meta tags and all site wording
- Personal information, experience, projects, technologies
- URLs for projects, GitHub, LinkedIn, etc.

### 2. Assets

#### Project images
- Add your project images in `src/assets/`
- Name them accordingly (e.g., `project.png`, `projects2.png`)
- Routes are defined in translation files (`es.json` and `en.json`) in the `image` field of each project

#### CV/Resume
- Place your CV in PDF format in `public/`
- Update the path in `Hero.astro` and `ExperienceV2.tsx`:
```astro
href="/your-cv.pdf"
```

## 📦 Technologies used

- [Astro](https://astro.build/) - Web framework
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Static typing
- [TailwindCSS](https://tailwindcss.com/) - Styles
- [Motion](https://motion.dev/) - Animations
- [Lucide React](https://lucide.dev/) - Icons

## 📄 License

This project is open source and available under the MIT license.

## 👤 Author

Thomas Barreto - [LinkedIn](https://www.linkedin.com/in/thomas-barreto-50ab71204/) - [GitHub](https://github.com/1thomas13)
