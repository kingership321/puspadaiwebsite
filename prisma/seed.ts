import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CITIES = [
  {
    name: "Tokyo",
    nameJa: "東京都",
    slug: "tokyo",
    state: "Kanto",
    country: "Japan",
    latitude: 35.6762,
    longitude: 139.6503,
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80",
    description: "The dynamic capital of Japan, featuring iconic metropolitan wards, world-class transit, and serene historic gardens.",
    areas: [
      { name: "Shibuya", nameJa: "渋谷区", slug: "shibuya", postalCode: "150-0002", lat: 35.6580, lng: 139.7016 },
      { name: "Shinjuku", nameJa: "新宿区", slug: "shinjuku", postalCode: "160-0022", lat: 35.6938, lng: 139.7034 },
      { name: "Minato (Roppongi / Akasaka)", nameJa: "港区（六本木・赤坂）", slug: "minato", postalCode: "106-0032", lat: 35.6628, lng: 139.7314 },
      { name: "Chiyoda (Marunouchi / Kanda)", nameJa: "千代田区（丸の内・神田）", slug: "chiyoda", postalCode: "100-0001", lat: 35.6869, lng: 139.7556 },
      { name: "Setagaya (Shimokitazawa / Sangenjaya)", nameJa: "世田谷区（下北沢・三軒茶屋）", slug: "setagaya", postalCode: "154-0004", lat: 35.6465, lng: 139.6533 },
      { name: "Chuo (Ginza / Nihonbashi)", nameJa: "中央区（銀座・日本橋）", slug: "chuo-ginza", postalCode: "104-0061", lat: 35.6719, lng: 139.7658 },
      { name: "Meguro (Nakameguro / Jiyugaoka)", nameJa: "目黒区（中目黒・自由が丘）", slug: "meguro", postalCode: "153-0051", lat: 35.6413, lng: 139.6981 },
    ],
  },
  {
    name: "Osaka",
    nameJa: "大阪府",
    slug: "osaka",
    state: "Kansai",
    country: "Japan",
    latitude: 34.6937,
    longitude: 135.5023,
    imageUrl: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=1200&auto=format&fit=crop&q=80",
    description: "Japan's gourmet food capital and commercial powerhouse, celebrated for its warmth and vibrant waterways.",
    areas: [
      { name: "Kita (Umeda / Nakatsu)", nameJa: "北区（梅田・中津）", slug: "kita-umeda", postalCode: "530-0001", lat: 34.7024, lng: 135.4959 },
      { name: "Chuo (Shinsaibashi / Namba)", nameJa: "中央区（心斎橋・難波）", slug: "chuo-namba", postalCode: "542-0085", lat: 34.6695, lng: 135.5013 },
      { name: "Nishi (Horie / Utsubo)", nameJa: "西区（堀江・靱公園）", slug: "nishi-horie", postalCode: "550-0014", lat: 34.6750, lng: 135.4920 },
      { name: "Tennoji", nameJa: "天王寺区", slug: "tennoji", postalCode: "543-0055", lat: 34.6525, lng: 135.5135 },
    ],
  },
  {
    name: "Kyoto",
    nameJa: "京都府",
    slug: "kyoto",
    state: "Kansai",
    country: "Japan",
    latitude: 35.0116,
    longitude: 135.7681,
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&auto=format&fit=crop&q=80",
    description: "The ancient imperial cultural heart of Japan, featuring traditional machiya townhouses and tranquil temple gardens.",
    areas: [
      { name: "Nakagyo (Karasuma / Kawaramachi)", nameJa: "中京区（烏丸・河原町）", slug: "nakagyo", postalCode: "604-8151", lat: 35.0088, lng: 135.7592 },
      { name: "Shimogyo (Kyoto Station / Shijo)", nameJa: "下京区（京都駅・四条）", slug: "shimogyo", postalCode: "600-8216", lat: 34.9858, lng: 135.7588 },
      { name: "Higashiyama (Gion / Kiyomizu)", nameJa: "東山区（祇園・清水）", slug: "higashiyama", postalCode: "605-0073", lat: 35.0037, lng: 135.7770 },
      { name: "Kamigyo (Imperial Palace)", nameJa: "上京区（御所周辺）", slug: "kamigyo", postalCode: "602-0898", lat: 35.0285, lng: 135.7562 },
    ],
  },
  {
    name: "Yokohama",
    nameJa: "神奈川県横浜市",
    slug: "yokohama",
    state: "Kanto",
    country: "Japan",
    latitude: 35.4437,
    longitude: 139.6380,
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&auto=format&fit=crop&q=80",
    description: "Sophisticated port city known for modern skyline promenades, harbor cruises, and seaside international cuisine.",
    areas: [
      { name: "Minato Mirai", nameJa: "西区（みなとみらい）", slug: "minato-mirai", postalCode: "220-0012", lat: 35.4549, lng: 139.6314 },
      { name: "Naka (Motomachi / Yamate)", nameJa: "中区（元町・山手）", slug: "naka-motomachi", postalCode: "231-0861", lat: 35.4388, lng: 139.6508 },
      { name: "Kohoku (Hiyoshi / Shin-Yokohama)", nameJa: "港北区（日吉・新横浜）", slug: "kohoku", postalCode: "222-0033", lat: 35.5074, lng: 139.6176 },
    ],
  },
  {
    name: "Fukuoka",
    nameJa: "福岡県福岡市",
    slug: "fukuoka",
    state: "Kyushu",
    country: "Japan",
    latitude: 33.5904,
    longitude: 130.4017,
    imageUrl: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=1200&auto=format&fit=crop&q=80",
    description: "Japan's rapidly growing western gateway, famous for open-air yatai food stalls and coastal tech living.",
    areas: [
      { name: "Chuo (Tenjin / Daimyo)", nameJa: "中央区（天神・大名）", slug: "tenjin", postalCode: "810-0001", lat: 33.5916, lng: 130.3989 },
      { name: "Hakata (Hakata Station / Nakasu)", nameJa: "博多区（博多駅・中洲）", slug: "hakata", postalCode: "812-0011", lat: 33.5902, lng: 130.4206 },
    ],
  },
];

const AMENITIES = [
  { name: "Auto-Lock Entrance", nameJa: "オートロック", slug: "auto-lock", category: "Building", icon: "Shield" },
  { name: "Separate Bath & Toilet", nameJa: "バストイレ別", slug: "separate-bath-toilet", category: "Interior", icon: "CheckCircle" },
  { name: "Bathroom Ventilation Dryer", nameJa: "浴室乾燥機", slug: "bathroom-dryer", category: "Interior", icon: "Wind" },
  { name: "Delivery Parcel Locker", nameJa: "宅配ボックス", slug: "delivery-box", category: "Building", icon: "Box" },
  { name: "Washlet Bidet Toilet", nameJa: "温水洗浄便座", slug: "washlet", category: "Interior", icon: "Sparkles" },
  { name: "Reheating Bath Function", nameJa: "追い焚き機能", slug: "reheating-bath", category: "Interior", icon: "Flame" },
  { name: "System Kitchen", nameJa: "システムキッチン", slug: "system-kitchen", category: "Interior", icon: "Coffee" },
  { name: "Air Conditioner", nameJa: "エアコン", slug: "air-conditioner", category: "Interior", icon: "Fan" },
  { name: "Indoor Washing Space", nameJa: "室内洗濯機置場", slug: "indoor-laundry", category: "Interior", icon: "Shirt" },
  { name: "Hardwood Flooring", nameJa: "フローリング", slug: "hardwood-floors", category: "Interior", icon: "Home" },
  { name: "Elevator", nameJa: "エレベーター", slug: "elevator", category: "Building", icon: "ArrowUpDown" },
  { name: "24-Hour Trash Disposal", nameJa: "24時間ゴミ出し可", slug: "24h-trash", category: "Building", icon: "Trash2" },
  { name: "Security Surveillance", nameJa: "防犯カメラ", slug: "security-cameras", category: "Building", icon: "Camera" },
  { name: "Bicycle Parking Area", nameJa: "駐輪場あり", slug: "bicycle-parking", category: "Building", icon: "Bike" },
  { name: "Dedicated Car Parking", nameJa: "敷地内駐車場", slug: "car-parking", category: "Building", icon: "Car" },
  { name: "Pet Negotiable", nameJa: "ペット相談可", slug: "pet-friendly", category: "Building", icon: "Dog" },
  { name: "Free High-Speed Fiber Internet", nameJa: "インターネット無料", slug: "free-internet", category: "Interior", icon: "Wifi" },
  { name: "South-Facing Bright Sunlight", nameJa: "南向き・日当たり良好", slug: "south-facing", category: "Interior", icon: "Sun" },
  { name: "Corner Residence", nameJa: "角部屋", slug: "corner-unit", category: "Interior", icon: "Maximize" },
  { name: "Private Balcony", nameJa: "バルコニー付き", slug: "balcony", category: "Exterior", icon: "SunMedium" },
  { name: "Floor Heating", nameJa: "床暖房", slug: "floor-heating", category: "Interior", icon: "Thermometer" },
  { name: "Designer Renovation", nameJa: "デザイナーズ・リノベーション", slug: "designers", category: "Interior", icon: "Layers" },
];

const AGENCIES = [
  {
    name: "Tokyo Prime Real Estate",
    slug: "tokyo-prime-realty",
    logoUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&auto=format&fit=crop&q=80",
    description: "Specializing in premier residential towers, Shibuya apartments, and bilingual expatriate relocations across Tokyo.",
    website: "https://tokyoprime.example.jp",
    email: "contact@tokyoprime.example.jp",
    phone: "+81 3-5555-0101",
    address: "1-1-1 Shibuya, Shibuya-ku, Tokyo",
  },
  {
    name: "Mitsui Living Residences",
    slug: "mitsui-living",
    logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=80",
    description: "Trusted nationwide brand offering quality mansions, urban condominiums, and family residences throughout Japan.",
    website: "https://mitsuiproperties.example.jp",
    email: "info@mitsuiproperties.example.jp",
    phone: "+81 3-5555-0102",
    address: "2-3-4 Nihonbashi, Chuo-ku, Tokyo",
  },
  {
    name: "Kansai Urban Housing",
    slug: "kansai-urban",
    logoUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=300&auto=format&fit=crop&q=80",
    description: "The top brokerage for Osaka Umeda high-rises, Namba apartments, and Kyoto historic machiya preservation.",
    website: "https://kansaiurban.example.jp",
    email: "osaka@kansaiurban.example.jp",
    phone: "+81 6-6555-0103",
    address: "3-1-2 Umeda, Kita-ku, Osaka",
  },
  {
    name: "Kyoto Heritage Estates",
    slug: "kyoto-heritage",
    logoUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?w=300&auto=format&fit=crop&q=80",
    description: "Curating authentic Kyoto machiyas, modern luxury condominiums, and quiet residential sanctuaries.",
    website: "https://kyotoheritage.example.jp",
    email: "info@kyotoheritage.example.jp",
    phone: "+81 75-555-0104",
    address: "100 Karasuma-dori, Nakagyo-ku, Kyoto",
  },
  {
    name: "Bayfront Yokohama Properties",
    slug: "bayfront-yokohama",
    logoUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&auto=format&fit=crop&q=80",
    description: "Minato Mirai waterfront towers and quiet hillside family residences across Yokohama and Kanagawa.",
    website: "https://bayfrontyokohama.example.jp",
    email: "yokohama@bayfrontyokohama.example.jp",
    phone: "+81 45-555-0105",
    address: "2-2-1 Minatomirai, Nishi-ku, Yokohama",
  },
];

const PROPERTY_IMAGE_POOLS = [
  [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&auto=format&fit=crop&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&auto=format&fit=crop&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1502005229762-ee1b2b93e083?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&auto=format&fit=crop&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80",
  ],
];

// Station lists mapped by city
const TRANSIT_HUBS = {
  tokyo: [
    { station: "渋谷駅 (Shibuya Stn)", line: "JR山手線 (JR Yamanote Line)" },
    { station: "新宿駅 (Shinjuku Stn)", line: "JR山手線・中央線 (JR Yamanote/Chuo Line)" },
    { station: "六本木駅 (Roppongi Stn)", line: "東京メトロ日比谷線 (Tokyo Metro Hibiya Line)" },
    { station: "恵比寿駅 (Ebisu Stn)", line: "JR山手線・埼京線 (JR Yamanote Line)" },
    { station: "表参道駅 (Omotesando Stn)", line: "東京メトロ銀座線・千代田線" },
    { station: "中目黒駅 (Nakameguro Stn)", line: "東急東横線・日比谷線" },
    { station: "銀座駅 (Ginza Stn)", line: "東京メトロ銀座線・丸ノ内線" },
    { station: "下北沢駅 (Shimokitazawa Stn)", line: "小田急線・京王井の頭線" },
    { station: "東京駅 (Tokyo Stn)", line: "JR各線・丸ノ内線" },
    { station: "三軒茶屋駅 (Sangenjaya Stn)", line: "東急田園都市線" },
  ],
  osaka: [
    { station: "梅田駅 (Umeda Stn)", line: "大阪メトロ御堂筋線 (Midosuji Line)" },
    { station: "大阪駅 (Osaka Stn)", line: "JR東海道本線・大阪環状線" },
    { station: "難波駅 (Namba Stn)", line: "大阪メトロ御堂筋線・南海本線" },
    { station: "心斎橋駅 (Shinsaibashi Stn)", line: "大阪メトロ御堂筋線・長堀鶴見緑地線" },
    { station: "本町駅 (Hommachi Stn)", line: "大阪メトロ四つ橋線・中央線" },
    { station: "天王寺駅 (Tennoji Stn)", line: "JR大阪環状線・御堂筋線" },
  ],
  kyoto: [
    { station: "京都駅 (Kyoto Stn)", line: "JR東海道本線・近鉄京都線" },
    { station: "烏丸御池駅 (Karasuma-Oike Stn)", line: "京都市営烏丸線・東西線" },
    { station: "四条駅 (Shijo Stn)", line: "京都市営烏丸線・阪急京都線" },
    { station: "祇園四条駅 (Gion-Shijo Stn)", line: "京阪本線 (Keihan Line)" },
  ],
  yokohama: [
    { station: "みなとみらい駅 (Minatomirai Stn)", line: "みなとみらい線 (Minatomirai Line)" },
    { station: "横浜駅 (Yokohama Stn)", line: "JR東海道線・東急東横線" },
    { station: "元町・中華街駅 (Motomachi-Chukagai Stn)", line: "みなとみらい線" },
    { station: "桜木町駅 (Sakuragicho Stn)", line: "JR根岸線・横浜市営地下鉄" },
  ],
  fukuoka: [
    { station: "博多駅 (Hakata Stn)", line: "JR山陽新幹線・福岡市地下鉄空港線" },
    { station: "天神駅 (Tenjin Stn)", line: "福岡市地下鉄空港線・西鉄天神大牟田線" },
    { station: "薬院駅 (Yakuin Stn)", line: "西鉄天神大牟田線・地下鉄七隈線" },
  ],
};

const JAPANESE_PROPERTY_TEMPLATES = [
  {
    titleEn: "Grand Tower Shibuya Crest",
    titleJa: "グランドタワー渋谷クレスト",
    layout: "1LDK",
    propType: "MANSION",
    structure: "RC",
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 42.5,
    descEn: "Stunning high-floor luxury mansion residence located just steps from Shibuya Stream. Features expansive soundproof panoramic windows, heated wood flooring, smart entrance security, and hotel-style concierge services.",
    descJa: "渋谷駅至近、ハイグレード分譲タワーマンション。南向き高層階につき日当たり・眺望良好。床暖房、オートロック、ディスポーザー、コンシェルジュサービス完備の快適な都市型レジデンス。",
  },
  {
    titleEn: "Park Luxe Roppongi Mid-Town",
    titleJa: "パークリュクス六本木ミッドタウン前",
    layout: "2LDK",
    propType: "MANSION",
    structure: "SRC",
    bedrooms: 2,
    bathrooms: 1.5,
    areaSqm: 68.2,
    descEn: "Sophisticated modern living adjacent to Tokyo Midtown and Roppongi Hills. Elegant master suite with walk-in closet, imported designer kitchen, separate washroom, and automatic reheating bath system.",
    descJa: "東京ミッドタウン徒歩圏内のプレミアム分譲賃貸。ウォークインクローゼット、システムキッチン、浴室乾燥機、追焚機能付き。24時間ゴミ出し可能、万全のセキュリティ設備。",
  },
  {
    titleEn: "Aoyama Garden Residence",
    titleJa: "青山ガーデンレジデンス",
    layout: "3LDK",
    propType: "MANSION",
    structure: "RC",
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 92.0,
    descEn: "Distinguished family condominium situated in the peaceful, leafy avenues of Minami-Aoyama. Offers three spacious bedrooms, dual balconies, floor heating, and underground private garage.",
    descJa: "南青山の閑静な高級住宅街に佇む低層レジデンス。広々とした3LDK、南東角部屋で陽当たり抜群。2面バルコニー、床暖房、地下平置き駐車場付き。",
  },
  {
    titleEn: "Shinjuku Sky Terrace Court",
    titleJa: "新宿スカイテラスコート",
    layout: "1K",
    propType: "APARTMENT",
    structure: "RC",
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 28.6,
    descEn: "Efficient, contemporary designer apartment near Shinjuku Gyoen park. Independent bath and toilet, high-speed fiber internet included, delivery box, and private balcony.",
    descJa: "新宿御苑至近のデザイナーズ1K。バストイレ別、室内洗濯機置場、ネット無料、宅配ボックス完備。一人暮らしに最適な機能性と好アクセス。",
  },
  {
    titleEn: "Ebisu Garden Flat",
    titleJa: "恵比寿ガーデンフラット",
    layout: "1DK",
    propType: "APARTMENT",
    structure: "RC",
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 33.4,
    descEn: "Stylish flat within easy walking distance to Ebisu Garden Place and Yebisu station. Beautiful open kitchen, video intercom, and quiet residential neighborhood.",
    descJa: "恵比寿ガーデンプレイス至近の落ち着いた住環境。カウンターキッチン、モニター付きインターホン、浴室乾燥機付き。人気の恵比寿エリアで快適な生活を。",
  },
  {
    titleEn: "Nakameguro Riverside Maison",
    titleJa: "中目黒リバーサイドメゾン",
    layout: "2LDK",
    propType: "MANSION",
    structure: "RC",
    bedrooms: 2,
    bathrooms: 1,
    areaSqm: 56.8,
    descEn: "Overlooking the famed cherry blossoms of Meguro River. Highly sought-after neighborhood brimming with cafes and boutiques. Sunny corner unit with natural light.",
    descJa: "目黒川の桜並木を望むリバーサイドマンション。カフェやセレクトショップが立ち並ぶ人気の中目黒。2面採光の角部屋で明るいリビング。",
  },
  {
    titleEn: "Ginza Premier Residence",
    titleJa: "銀座プレミアレジデンス",
    layout: "1LDK",
    propType: "MANSION",
    structure: "SRC",
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 48.0,
    descEn: "Immaculately appointed residence situated in the center of Ginza. Marble foyer, high-end Miele appliances, triple-glazed windows, and 24-hour security.",
    descJa: "銀座の中心街を身近に暮らすハイグレード物件。大理石調の玄関、高級ビルトインキッチン、二重サッシによる静音設計。24時間セキュリティシステム。",
  },
  {
    titleEn: "Setagaya Sangenjaya Terrace House",
    titleJa: "世田谷三軒茶屋テラスハウス",
    layout: "3LDK",
    propType: "HOUSE",
    structure: "木造",
    bedrooms: 3,
    bathrooms: 1.5,
    areaSqm: 88.5,
    descEn: "Charming contemporary Japanese townhouse with private patio and dedicated vehicle parking. Quiet residential lane near trendy Sangenjaya eateries.",
    descJa: "三軒茶屋の閑静な住宅街に佇む一戸建て住宅。専用庭・駐車場付き。3部屋の居室と充実した収納スペースを備え、ファミリーにも最適です。",
  },
  {
    titleEn: "Shimokitazawa Modern Studio",
    titleJa: "下北沢モダンスクエア",
    layout: "1R",
    propType: "STUDIO",
    structure: "RC",
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 24.5,
    descEn: "Minimalist concrete-accented studio in the creative heart of Shimokitazawa. Close to theaters, live music venues, and express transit to Shibuya and Shinjuku.",
    descJa: "若者に人気のカルチャータウン下北沢に位置するデザイナーズワンルーム。コンクリート打ち放しのお洒落な内装、急行停車駅徒歩5分。",
  },
  {
    titleEn: "Umeda Tower High-Gate",
    titleJa: "梅田タワーハイゲート",
    layout: "2LDK",
    propType: "MANSION",
    structure: "RC",
    bedrooms: 2,
    bathrooms: 1,
    areaSqm: 62.4,
    descEn: "Tower condominium offering sweeping skyline vistas of Osaka Umeda. Features indoor gym access, sky lounge, auto-lock, and heated bathroom dryer.",
    descJa: "大阪・梅田のスカイラインを一望できる免震タワーマンション。共用部にスカイラウンジ、フィットネスジム完備。利便性と優雅さを両立。",
  },
  {
    titleEn: "Namba Parks Court Residence",
    titleJa: "難波パークスコートレジデンス",
    layout: "1LDK",
    propType: "MANSION",
    structure: "SRC",
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 41.2,
    descEn: "Contemporary residence steps from Namba Station and Namba Parks shopping complex. Fast transit to Kansai Airport and Umeda. Modern system kitchen.",
    descJa: "難波駅・なんばパークス直結エリアの便利な好立地。関西国際空港や梅田方面へのアクセスも抜群。システムキッチン、追焚機能付きバス。",
  },
  {
    titleEn: "Kyoto Traditional Modern Machiya",
    titleJa: "京都御所南 伝統美とモダンの京町家",
    layout: "3LDK",
    propType: "HOUSE",
    structure: "木造",
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 110.0,
    descEn: "Meticulously restored Kyoto machiya preserving heritage cypress beams while integrating modern hydronic floor heating, gourmet kitchen, and Japanese rock garden (tsuboniwa).",
    descJa: "京都御所南の風情ある京町家を美しくフルリノベーション。ヒノキの梁や坪庭の趣を残しつつ、最新の床暖房・システムバスを備えた唯一無二の住まい。",
  },
  {
    titleEn: "Minato Mirai Waterfront Tower",
    titleJa: "みなとみらいウォーターフロントタワー",
    layout: "2LDK",
    propType: "MANSION",
    structure: "RC",
    bedrooms: 2,
    bathrooms: 1.5,
    areaSqm: 74.0,
    descEn: "Iconic oceanview residence overlooking Yokohama Bay and the Landmark Tower. Spacious balcony, 24-hour concierge, high-speed elevator, and on-site gym.",
    descJa: "横浜港とみなとみらいの夜景を独占するオーシャンビュータワーマンション。ワイドバルコニー、24時間コンシェルジュ、上質なホテルライク共用部。",
  },
  {
    titleEn: "Hakata Station Urban Suite",
    titleJa: "博多駅アーバンスイート",
    layout: "1LDK",
    propType: "MANSION",
    structure: "RC",
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 38.5,
    descEn: "Bright modern home within 5 minutes walk of Hakata Shinkansen terminal. Direct subway connection to Fukuoka Airport in just 5 minutes.",
    descJa: "新幹線博多駅徒歩5分の抜群の交通利便性。福岡空港へも地下鉄で直通5分。単身のビジネスエグゼクティブや転勤者に人気のレジデンス。",
  },
];

async function main() {
  console.log("🌸 Starting Japanese Real Estate database seed for Supabase...");

  // 1. Clean existing records in correct relation order
  console.log("Clearing existing records...");
  await prisma.auditLog.deleteMany();
  await prisma.listingReport.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.savedSearch.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.agency.deleteMany();
  await prisma.area.deleteMany();
  await prisma.city.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Core Users
  console.log("Creating demo users...");
  const userSeeker = await prisma.user.create({
    data: {
      name: "Kenji Sato (佐藤 健二)",
      email: "seeker@example.jp",
      phone: "+81 90-1234-5678",
      role: "SEEKER",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    },
  });

  const userOwner = await prisma.user.create({
    data: {
      name: "Yuki Tanaka (田中 由紀)",
      email: "owner@example.jp",
      phone: "+81 80-2345-6789",
      role: "OWNER",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    },
  });

  const userAgent = await prisma.user.create({
    data: {
      name: "Hiroshi Takahashi (高橋 裕)",
      email: "agent@example.jp",
      phone: "+81 3-5555-0199",
      role: "AGENT",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    },
  });

  const userAdmin = await prisma.user.create({
    data: {
      name: "Admin Office (管理者)",
      email: "admin@example.jp",
      phone: "+81 3-5555-0000",
      role: "ADMIN",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    },
  });

  // 3. Create Japanese Amenities
  console.log("Creating Japanese amenities...");
  const createdAmenities = [];
  for (const amen of AMENITIES) {
    const created = await prisma.amenity.create({
      data: amen,
    });
    createdAmenities.push(created);
  }

  // 4. Create Japanese Agencies & Agents
  console.log("Creating agencies and agents...");
  const createdAgencies = [];
  const createdAgents = [];
  const agentNames = [
    { en: "Daiki Watanabe", ja: "渡辺 大樹", email: "watanabe@example.jp" },
    { en: "Aoi Kobayashi", ja: "小林 葵", email: "kobayashi@example.jp" },
    { en: "Ryo Ishikawa", ja: "石川 涼", email: "ishikawa@example.jp" },
    { en: "Misaki Saito", ja: "斉藤 美咲", email: "saito@example.jp" },
    { en: "Shun Nakamura", ja: "中村 駿", email: "nakamura@example.jp" },
  ];

  for (let i = 0; i < AGENCIES.length; i++) {
    const agencyData = AGENCIES[i];
    const agency = await prisma.agency.create({
      data: agencyData,
    });
    createdAgencies.push(agency);

    const agInfo = agentNames[i];
    const agent = await prisma.agent.create({
      data: {
        agencyId: agency.id,
        userId: i === 0 ? userAgent.id : null,
        name: `${agInfo.en} (${agInfo.ja})`,
        slug: slugify(`${agInfo.en}-${agency.slug}`),
        email: agInfo.email,
        phone: `+81 ${3 + i}-5555-01${10 + i}`,
        photoUrl: `https://images.unsplash.com/photo-${1500000000000 + (i * 1234567)}?w=300&auto=format&fit=crop&q=80`,
        bio: `Licensed Japanese Real Estate Transaction Specialist (宅地建物取引士). Over ${7 + i} years serving local and international clients in Tokyo and Kansai.`,
        languages: "Japanese, English",
        serviceAreas: "Tokyo 23 Wards, Yokohama, Osaka, Kyoto",
      },
    });
    createdAgents.push(agent);
  }

  // 5. Create Cities and Neighborhoods
  console.log("Creating Japanese cities and areas...");
  const createdCities = [];
  const createdAreas = [];

  for (const cityData of CITIES) {
    const { areas, ...cityInfo } = cityData;
    const city = await prisma.city.create({
      data: cityInfo,
    });
    createdCities.push(city);

    for (const areaData of areas) {
      const area = await prisma.area.create({
        data: {
          cityId: city.id,
          name: areaData.name,
          nameJa: areaData.nameJa,
          slug: `${city.slug}-${areaData.slug}`,
          postalCode: areaData.postalCode,
          latitude: areaData.lat,
          longitude: areaData.lng,
          description: `${areaData.nameJa} (${areaData.name}) - High convenience, prime transit access, and rich neighborhood amenities.`,
        },
      });
      createdAreas.push({ ...area, citySlug: city.slug });
    }
  }

  // 6. Generate Authentic Japanese Properties
  const TOTAL_PROPERTIES = 65;
  console.log(`Generating ${TOTAL_PROPERTIES} authentic Japanese properties with nested relations...`);
  const createdProperties = [];

  for (let i = 0; i < TOTAL_PROPERTIES; i++) {
    const template = JAPANESE_PROPERTY_TEMPLATES[i % JAPANESE_PROPERTY_TEMPLATES.length];
    const area = createdAreas[i % createdAreas.length];
    const city = createdCities.find((c) => c.slug === area.citySlug)!;
    const agency = createdAgencies[i % createdAgencies.length];
    const agent = createdAgents[i % createdAgents.length];
    const imageSet = PROPERTY_IMAGE_POOLS[i % PROPERTY_IMAGE_POOLS.length];

    // Transit details for this city
    const hubs = TRANSIT_HUBS[city.slug as keyof typeof TRANSIT_HUBS] || TRANSIT_HUBS.tokyo;
    const hub = hubs[i % hubs.length];
    const walkMins = 2 + (i % 11); // 2 to 12 minutes walk

    // 60% Rent, 40% Sale
    const isRent = i % 5 < 3;
    const listingType = isRent ? "RENT" : "SALE";

    let price: number;
    let deposit: number | null = null;
    let keyMoney: number | null = null;
    let managementFee: number | null = null;

    if (isRent) {
      const baseRentMan = 8.5 + (i % 8) * 4.5 + (template.bedrooms * 6.0);
      price = Math.round(baseRentMan * 10000); // in JPY
      deposit = i % 4 === 0 ? 0 : price; // 敷金: 1 month or 0
      keyMoney = i % 3 === 0 ? 0 : price; // 礼金: 1 month or 0
      managementFee = 8000 + (i % 6) * 2500; // 管理費: ¥8,000 ~ ¥20,500
    } else {
      const baseSaleMan = 3200 + (i % 12) * 850 + (template.bedrooms * 2200);
      price = Math.round(baseSaleMan * 10000); // in JPY e.g. 3,200万 to 3.5億円
      managementFee = 15000 + (i % 8) * 4000;
    }

    const titleSuffix = `${i + 1}`;
    const title = `${template.titleEn} #${titleSuffix}`;
    const titleJa = `${template.titleJa} ${100 + i}号室`;
    const slug = slugify(`${template.titleEn}-${city.slug}-${i + 1}`);

    // Coordinates jitter
    const latitude = area.latitude + ((i % 10) - 5) * 0.0035;
    const longitude = area.longitude + (((i * 3) % 10) - 5) * 0.0035;

    // Assign 5-8 Japanese Amenities
    const numAmenities = 5 + (i % 4);
    const chosenAmenities = createdAmenities.slice((i * 2) % 12, ((i * 2) % 12) + numAmenities);

    const property = await prisma.property.create({
      data: {
        slug,
        listingType,
        propertyType: template.propType,
        title,
        titleJa,
        description: template.descEn,
        descriptionJa: template.descJa,
        price,
        deposit,
        keyMoney,
        managementFee,
        currency: "JPY",
        layout: template.layout,
        structure: template.structure,
        stationName: hub.station,
        stationLine: hub.line,
        walkMinutes: walkMins,
        bedrooms: template.bedrooms,
        bathrooms: template.bathrooms,
        area: Math.round((template.areaSqm + (i % 8) * 3.5) * 10) / 10,
        landArea: template.propType === "HOUSE" ? 110.0 + (i % 5) * 15 : null,
        floor: template.propType === "HOUSE" ? null : 1 + (i % 28),
        totalFloors: template.propType === "HOUSE" ? 2 : 12 + (i % 30),
        yearBuilt: 2010 + (i % 15),
        furnished: i % 4 === 0,
        parking: i % 2 === 0,
        address: `${city.nameJa || city.name} ${area.nameJa || area.name} ${1 + (i % 6)}-${1 + (i % 25)}-${101 + i}`,
        cityId: city.id,
        areaId: area.id,
        agencyId: agency.id,
        agentId: agent.id,
        latitude,
        longitude,
        status: "PUBLISHED",
        featured: i % 5 === 0,
        publishedAt: new Date(Date.now() - (i % 30) * 86400000),
        images: {
          create: imageSet.map((url, imgIdx) => ({
            url,
            alt: `${titleJa} 写真 ${imgIdx + 1}`,
            sortOrder: imgIdx,
            isMain: imgIdx === 0,
          })),
        },
        amenities: {
          create: chosenAmenities.map((amen) => ({
            amenityId: amen.id,
          })),
        },
      },
    });

    createdProperties.push(property);
    if ((i + 1) % 15 === 0 || i === TOTAL_PROPERTIES - 1) {
      console.log(`- Created ${i + 1} / ${TOTAL_PROPERTIES} properties...`);
    }
  }

  // 7. Create Demo Favorites for Seeker
  console.log("Creating user favorites and saved searches...");
  for (let i = 0; i < 6; i++) {
    await prisma.favorite.create({
      data: {
        userId: userSeeker.id,
        propertyId: createdProperties[i].id,
        notes: i === 0 ? "Shibuya station 4 min walk, great sunlight!" : "Shortlist for next month",
      },
    });
  }

  // 8. Saved Searches
  await prisma.savedSearch.create({
    data: {
      userId: userSeeker.id,
      name: "Tokyo 1LDK under 18万円 (Shibuya/Minato)",
      searchType: "RENT",
      filtersJson: JSON.stringify({ city: "tokyo", layout: "1LDK", maxPrice: "180000" }),
      notificationFrequency: "DAILY",
    },
  });

  await prisma.savedSearch.create({
    data: {
      userId: userSeeker.id,
      name: "Osaka Umeda Condos for Sale",
      searchType: "SALE",
      filtersJson: JSON.stringify({ city: "osaka", propertyType: "MANSION" }),
      notificationFrequency: "INSTANT",
    },
  });

  // 9. Inquiries
  await prisma.inquiry.create({
    data: {
      propertyId: createdProperties[0].id,
      userId: userSeeker.id,
      agencyId: createdProperties[0].agencyId,
      agentId: createdProperties[0].agentId,
      name: userSeeker.name,
      email: userSeeker.email,
      phone: userSeeker.phone,
      message: "はじめまして。こちらの物件の内見を希望しております。今週土曜日の午後はご案内可能でしょうか？",
      preferredViewingTime: "土曜日 14:00〜",
      inquiryType: "TOUR",
      status: "CONTACTED",
    },
  });

  await prisma.inquiry.create({
    data: {
      propertyId: createdProperties[1].id,
      userId: userSeeker.id,
      agencyId: createdProperties[1].agencyId,
      agentId: createdProperties[1].agentId,
      name: userSeeker.name,
      email: userSeeker.email,
      phone: userSeeker.phone,
      message: "Could you send the latest floor plan and move-in date availability?",
      inquiryType: "MESSAGE",
      status: "NEW",
    },
  });

  // 10. Audit Log
  await prisma.auditLog.create({
    data: {
      actorUserId: userAdmin.id,
      actorName: userAdmin.name,
      action: "LISTING_APPROVE",
      entityType: "Property",
      entityId: createdProperties[0].id,
      metadata: JSON.stringify({ title: createdProperties[0].title, titleJa: createdProperties[0].titleJa }),
    },
  });

  console.log(`\n🎉 Seed successfully completed!`);
  console.log(`- ${createdCities.length} Japanese Cities`);
  console.log(`- ${createdAreas.length} Prime Wards / Transit Areas`);
  console.log(`- ${createdAgencies.length} Real Estate Brokerages`);
  console.log(`- ${createdAgents.length} Licensed Japanese Agents (宅建士)`);
  console.log(`- ${createdProperties.length} SUUMO-Style Bilingual Properties`);
  console.log(`- ${createdAmenities.length} Japanese Equipment & Features (設備・条件)`);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
