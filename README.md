# HavenSUUMO — Japan Bilingual Real Estate Marketplace (住まい・賃貸・売買)

HavenSUUMO is a commercial-grade, SUUMO-inspired real estate marketplace web application built for the Japanese market with full bilingual support (**日本語 + English**), connected to a live **Supabase PostgreSQL** cloud database, and prepared for instant deployment to **Vercel**.

Inspired by Japan's leading property portal **SUUMO** ([https://suumo.jp/](https://suumo.jp/)), HavenSUUMO adapts Japanese residential real estate conventions:
- **Station & Transit Focus**: e.g., `JR山手線 渋谷駅 徒歩4分` (Station name, railway line, and walk minutes).
- **Japanese Pricing Notation**: JPY pricing with **万円** formatting (e.g. `14.5万円` for rent, `6,800万円` for sale).
- **Lease Terms**: 敷金 (Deposit), 礼金 (Key Money), and 管理費・共益費 (Management & Common Fees).
- **Japanese Floorplans**: `1R`, `1K`, `1DK`, `1LDK`, `2LDK`, `3LDK`, `4LDK+`.
- **Building Structures**: `RC` (鉄筋コンクリート造), `SRC` (鉄骨鉄筋コンクリート造), `鉄骨造`, `木造`.
- **Japanese Amenities**: バストイレ別, 浴室乾燥機, オートロック, 宅配ボックス, 温水洗浄便座, 追い焚き機能, 24時間ゴミ出し可, ネット無料, 床暖房.

---

## Live Architecture & Tech Stack

- **Framework**: Next.js 14 (App Router, Server Components & Actions)
- **Language**: TypeScript (strict mode)
- **Database**: **Supabase PostgreSQL** (Cloud Managed Database in AWS `ap-northeast-2` Seoul)
- **ORM**: Prisma ORM with connection pooling & direct migration URLs
- **i18n**: Real-time Bilingual Language Context (**EN | JP** switcher in header)
- **Styling**: Tailwind CSS + Responsive SUUMO-inspired Design System
- **Testing**: Vitest unit & database integration test suite (100% passing)
- **Deployment**: Configured for Vercel Serverless & Edge deployment

---

## Cities & Neighborhoods Covered

1. **Tokyo (東京都)**: Shibuya (渋谷区), Shinjuku (新宿区), Minato (港区・六本木・赤坂), Chiyoda (千代田区・丸の内), Setagaya (世田谷区・下北沢・三軒茶屋), Chuo (中央区・銀座), Meguro (目黒区・中目黒・自由が丘).
2. **Osaka (大阪府)**: Kita (北区・梅田・中津), Chuo (中央区・心斎橋・難波), Nishi (西区・堀江), Tennoji (天王寺区).
3. **Kyoto (京都府)**: Nakagyo (中京区・烏丸), Shimogyo (下京区・四条), Higashiyama (東山区・祇園), Kamigyo (上京区・京都御所周辺).
4. **Yokohama (神奈川県横浜市)**: Minato Mirai (西区・みなとみらい), Naka (中区・元町・山手), Kohoku (港北区・新横浜).
5. **Fukuoka (福岡県福岡市)**: Chuo (中央区・天神・大名), Hakata (博多区・博多駅・中洲).

---

## Complete Route Map (28 Routes)

| Route | Functionality |
|---|---|
| `/` | Search-first Hero, Station Quick-Filters, Popular Cities, Featured Japanese Mansions |
| `/search` | Parametric Search, Map & Split View, Layout Filter, Station Walk Filter, 万円 Sorting |
| `/rent` | Rental Properties Filtered (賃貸マンション・アパート) |
| `/buy` | For-Sale Properties Filtered (分譲マンション・一戸建て) |
| `/property/[slug]` | Full Property Detail, SUUMO Pricing Box, Station Info, Floorplan, Map, Inquiry Modal |
| `/city/[citySlug]` | Regional Landing Pages (Tokyo, Osaka, Kyoto, Yokohama, Fukuoka) |
| `/account` | User Hub with Persona Switcher (Seeker, Owner, Agent, Admin) |
| `/account/saved` | Favorited Shortlist with personal notes |
| `/account/searches` | Saved Search Filters & alert subscriptions |
| `/account/compare` | Side-by-side comparison matrix (up to 4 properties) |
| `/account/inquiries` | Message and tour request history |
| `/dashboard` | Owner & Agent Portal with active listings, lead CRM, and inquiry management |
| `/dashboard/listings/new` | Multi-step property publisher |
| `/admin` | Administration & Moderation Queue with 1-click approval & audit trail |
| `/guides`, `/about`, `/contact`, `/privacy`, `/terms` | Informational & legal pages |
| `/api/*` | High-performance JSON REST endpoints for search, favorites, inquiries, and moderation |

---

## Supabase PostgreSQL Setup

The project connects to Supabase using Prisma with connection pooling:

```env
# Supabase Transaction Mode Pooler (Port 6543)
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Supabase Session Mode Pooler (Port 5432) for Migrations & Seed
DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres"
```

To sync schema or re-seed the Supabase database:
```bash
# Push schema to Supabase PostgreSQL
npx prisma db push

# Seed 65+ SUUMO-style properties, agencies, and amenities
npm run db:seed
```

---

## Vercel Deployment Instructions

Deploying this project to Vercel takes 2 minutes:

1. Push this repository to GitHub:
   ```bash
   git push -u origin main
   ```
2. Go to [https://vercel.com/new](https://vercel.com/new) and click **"Import"** next to `kingership321/puspadaiwebsite`.
3. In the Vercel **Environment Variables** section, add:
   - `DATABASE_URL`: `postgresql://postgres.rhenzczhmptgmlkpahmb:[PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true`
   - `DIRECT_URL`: `postgresql://postgres.rhenzczhmptgmlkpahmb:[PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres`
   - `NEXT_PUBLIC_APP_URL`: `https://[your-app-name].vercel.app`
4. Click **Deploy**.
   Vercel will build and deploy the Next.js application automatically!

---

## Local Development & Testing

```bash
# Install dependencies
npm install

# Run automated test suite
npm test

# Run Next.js production build
npm run build

# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
