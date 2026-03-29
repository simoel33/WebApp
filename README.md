# DataSync Pro Landing Page

A modern, SEO-optimized landing page for DataSync Pro built with Next.js 14, featuring internationalization and XML-based contact message storage.

## Features

- 🌐 **Internationalization**: Support for English, Arabic, Spanish, French, and Chinese
- 🎨 **Modern UI**: Built with Tailwind CSS and Framer Motion
- 📱 **Responsive Design**: Mobile-first approach with dark/light mode
- 🔍 **SEO Optimized**: Meta tags, sitemap, robots.txt, and structured data
- 📧 **Contact System**: XML-based message storage with admin dashboard
- 🚀 **Production Ready**: Optimized build and deployment configurations

## SEO Setup

The application includes comprehensive SEO features for discoverability by Google and AI tools:

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
GOOGLE_SITE_VERIFICATION=your_google_verification_code
YANDEX_VERIFICATION=your_yandex_verification_code
BING_VERIFICATION=your_bing_verification_code
```

### Search Engine Optimization

- **Meta Tags**: Comprehensive metadata with Open Graph and Twitter cards
- **Sitemap**: Auto-generated sitemap at `/sitemap.xml`
- **Robots.txt**: SEO-friendly robots configuration
- **Structured Data**: JSON-LD schema for better AI understanding
- **International SEO**: Hreflang tags for multi-language support

### OG Image

Add an Open Graph image (`public/og-image.jpg`) for better social media sharing. Recommended size: 1200x630px.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Deployment

### Recommended Platforms

1. **Railway** (Best for XML storage)
2. **Vercel** (Easiest deployment)
3. **Netlify**
4. **Render**

### Deployment Steps

1. **Railway:**
   ```bash
   railway login
   railway init
   railway up
   ```

2. **Vercel:**
   ```bash
   vercel
   ```

## Admin Setup

Configure admin credentials in your environment variables:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

Access the admin dashboard at `/admin-space/dashboard`.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── admin-space/       # Admin dashboard
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── robots.ts          # Robots.txt generation
│   └── sitemap.ts         # Sitemap generation
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── providers/        # Context providers
│   ├── sections/         # Page sections
│   └── ui/               # UI components
├── lib/                  # Utility libraries
├── i18n/                 # Internationalization config
└── messages/             # Translation files
```

## Technologies

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Fonts**: Inter, Noto Sans Arabic, Noto Sans SC
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: next-intl
- **Storage**: XML file-based (migrated from SQLite)
- **Authentication**: Config-based admin auth
