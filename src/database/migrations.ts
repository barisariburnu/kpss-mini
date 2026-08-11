export const DATABASE_NAME = 'kpss-hap-not.db';
export const DATABASE_VERSION = 2;

export const MIGRATION_V1 = `
CREATE TABLE IF NOT EXISTS subjects (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  color TEXT NOT NULL,
  soft_color TEXT NOT NULL,
  symbol TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1))
);

CREATE TABLE IF NOT EXISTS cards (
  id TEXT PRIMARY KEY NOT NULL,
  subject_id TEXT NOT NULL REFERENCES subjects(id),
  topic TEXT NOT NULL,
  prompt TEXT NOT NULL,
  answer TEXT NOT NULL,
  detail TEXT NOT NULL,
  memory_tip TEXT,
  source_name TEXT,
  source_url TEXT,
  content_version INTEGER NOT NULL DEFAULT 1,
  is_verified INTEGER NOT NULL DEFAULT 0 CHECK (is_verified IN (0, 1)),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cards_subject_topic
  ON cards(subject_id, topic, is_active);
CREATE INDEX IF NOT EXISTS idx_cards_updated_at
  ON cards(updated_at, content_version);

CREATE TABLE IF NOT EXISTS card_progress (
  card_id TEXT PRIMARY KEY NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('learned', 'review')),
  saved INTEGER NOT NULL DEFAULT 0 CHECK (saved IN (0, 1)),
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_studies (
  study_date TEXT NOT NULL,
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  rated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (study_date, card_id)
);

CREATE INDEX IF NOT EXISTS idx_daily_studies_date
  ON daily_studies(study_date);

CREATE TABLE IF NOT EXISTS app_stats (
  key TEXT PRIMARY KEY NOT NULL,
  value INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS content_meta (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO app_stats(key, value) VALUES ('completed_sessions', 0);
INSERT OR IGNORE INTO content_meta(key, value) VALUES ('content_version', '1');
INSERT OR IGNORE INTO content_meta(key, value) VALUES ('sync_cursor', '');

INSERT OR IGNORE INTO subjects
  (id, name, short_name, color, soft_color, symbol, sort_order)
VALUES
  ('turkce', 'Türkçe', 'TR', '#7A5AA6', '#EEE8F5', 'A', 10),
  ('matematik', 'Matematik', 'MT', '#2775A6', '#E2F0F8', '∑', 20),
  ('tarih', 'Tarih', 'TRH', '#B45F3C', '#F7E9E1', '⌛', 30),
  ('cografya', 'Coğrafya', 'COĞ', '#2E8067', '#E3F1EB', '⌖', 40),
  ('vatandaslik', 'Vatandaşlık', 'VTD', '#9B6A22', '#F7EDD8', '§', 50),
  ('guncel', 'Güncel Bilgiler', 'GNC', '#B24D68', '#F8E6EB', '•', 60);

INSERT OR IGNORE INTO cards
  (id, subject_id, topic, prompt, answer, detail, memory_tip, source_name, content_version, is_verified)
VALUES
  ('turkce-1', 'turkce', 'Sözcükte Yapı',
   'Yapım eki ile çekim eki arasındaki temel fark nedir?',
   'Yapım eki yeni bir sözcük türetir; çekim eki sözcüğün cümledeki görevini veya ilişkisini belirler.',
   '“Göz-lük” yapım ekiyle yeni anlam kazanır. “Göz-lük-te” sözcüğündeki -te ise bulunma hâli çekim ekidir.',
   'Yapım “yapar”, çekim “bağlar”.', 'gearapps başlangıç içeriği', 1, 0),
  ('turkce-2', 'turkce', 'Cümlenin Ögeleri',
   'Bir cümlede özneyi bulmak için yükleme hangi sorular sorulur?',
   '“Kim?” veya “Ne?” soruları sorulur.',
   'Önce yüklem bulunur. Yüklemin bildirdiği işi yapan ya da durumda olan öge, bu sorularla belirlenen öznedir.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('turkce-3', 'turkce', 'Yazım Kuralları',
   '“de/da” bağlacı ile bulunma hâli eki nasıl ayırt edilir?',
   'Bağlaç olan “de/da” ayrı yazılır ve cümleden çıkarılabilir; ek olan “-de/-da” bitişik yazılır.',
   '“Ben de geldim” cümlesinde bağlaçtır. “Evde kaldım” cümlesinde bulunma hâli ekidir.',
   'Çıkarınca yapı bozulmuyorsa ayrı yazılan bağlaçtır.', 'gearapps başlangıç içeriği', 1, 0),
  ('turkce-4', 'turkce', 'Anlatım Biçimleri',
   'Açıklama ile tartışma arasındaki belirgin ayrım nedir?',
   'Açıklama bilgi vermeyi; tartışma bir görüşü çürütüp başka bir görüşü kabul ettirmeyi amaçlar.',
   'Tartışmada karşı görüş sezilir veya açıkça belirtilir. Açıklamada öğretici ve nesnel anlatım öne çıkar.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),

  ('matematik-1', 'matematik', 'Bölünebilme',
   'Bir doğal sayının 3 ile bölünebilme kuralı nedir?',
   'Rakamları toplamı 3’ün katı olan sayılar 3 ile tam bölünür.',
   'Örneğin 4 + 7 + 1 = 12 olduğu için 471 sayısı 3 ile tam bölünür.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('matematik-2', 'matematik', 'Oran–Orantı',
   'Doğru orantılı iki çoklukta temel ilişki nedir?',
   'Çoklukların oranı sabittir; biri kaç katına çıkarsa diğeri de aynı katına çıkar.',
   'y = kx biçiminde gösterilir. Buradaki k, sabit orantı katsayısıdır.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('matematik-3', 'matematik', 'Yüzde',
   'Bir sayıyı %20 artırıp sonra %20 azaltmak neden başlangıç değerine döndürmez?',
   'Artış ve azalış farklı tabanlar üzerinden hesaplanır; sonuç başlangıç değerinin %96’sı olur.',
   '100 → 120 → 96. Ardışık yüzde değişimleri doğrudan birbirini götürmez.',
   'Yüzdelerde sırayı değil, değişen tabanı izle.', 'gearapps başlangıç içeriği', 1, 0),
  ('matematik-4', 'matematik', 'Problemler',
   'Ortalama hız nasıl hesaplanır?',
   'Toplam yol, toplam zamana bölünür.',
   'Gidiş ve dönüş mesafeleri eşit olsa bile hızların aritmetik ortalaması her zaman ortalama hızı vermez.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),

  ('tarih-1', 'tarih', 'İlk Türk Devletleri',
   '“Türk” adını devlet adı olarak ilk kez kullanan siyasi teşkilat hangisidir?',
   'Göktürklerdir.',
   'Göktürk Devleti, Türk adını resmî devlet adı olarak kullanan ilk Türk devletidir.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('tarih-2', 'tarih', 'Osmanlı Kültür ve Medeniyet',
   'Osmanlı’da tımar sisteminin askerî sonucu nedir?',
   'Devlete yük olmadan eyaletlerde atlı asker yetiştirilmesini sağlamasıdır.',
   'Tımarlı sipahiler, kendilerine ayrılan dirliğin gelirine karşılık belirli sayıda cebelü beslerdi.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('tarih-3', 'tarih', 'Millî Mücadele',
   '“Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır.” kararı hangi belgede yer alır?',
   'Amasya Genelgesi’nde yer alır.',
   'Bu ifade, Millî Mücadele’nin amacı ve yönteminin ortaya konması bakımından önemlidir.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('tarih-4', 'tarih', 'Atatürk İlkeleri',
   'Aşar vergisinin kaldırılması en doğrudan hangi Atatürk ilkesiyle ilişkilidir?',
   'Halkçılık ilkesiyle ilişkilidir.',
   'Köylünün üzerindeki ağır vergi yükünü azaltarak toplumsal eşitlik ve halk yararı gözetilmiştir.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),

  ('cografya-1', 'cografya', 'Türkiye’nin Konumu',
   'Türkiye’de güneyden kuzeye gidildikçe hangi temel enlem etkisi görülür?',
   'Güneş ışınlarının geliş açısı küçülür ve genel olarak sıcaklık azalır.',
   'Bu değişim matematik konumun sonucudur; yerel yükselti ve denizellik sıcaklık dağılışını ayrıca etkiler.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('cografya-2', 'cografya', 'Yer Şekilleri',
   'Türkiye’de dağların kıyıya paralel uzandığı bölgelerde kıyı ile iç kesimler arasındaki ulaşım nasıldır?',
   'Geçitlerle sağlandığı için genellikle zordur.',
   'Karadeniz ve Akdeniz kıyılarında kıyı ile iç kesimler arasındaki ulaşım, Ege’ye göre daha sınırlıdır.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('cografya-3', 'cografya', 'İklim',
   'Karadeniz ikliminde yıllık sıcaklık farkının görece az olmasının temel nedeni nedir?',
   'Denizelliğin sıcaklığı dengelemesidir.',
   'Denizler geç ısınıp geç soğuduğu için kıyı kesimlerinde yaz ve kış sıcaklıkları arasındaki fark azalır.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('cografya-4', 'cografya', 'Nüfus ve Yerleşme',
   'Aritmetik nüfus yoğunluğu nasıl hesaplanır?',
   'Toplam nüfusun yüz ölçümüne bölünmesiyle hesaplanır.',
   'Sonuç, kilometrekareye düşen ortalama kişi sayısını verir; nüfusun gerçek dağılışını tek başına göstermez.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),

  ('vatandaslik-1', 'vatandaslik', 'Anayasa Hukuku',
   'Normlar hiyerarşisinde kanunlar Anayasa’ya aykırı olabilir mi?',
   'Hayır. Kanunlar Anayasa’ya aykırı olamaz.',
   'Anayasa’nın bağlayıcılığı ve üstünlüğü ilkesi, alt normların Anayasa’ya uygun olmasını gerektirir.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('vatandaslik-2', 'vatandaslik', 'Temel Haklar',
   'Kişinin maddi ve manevi varlığını geliştirme hakkı hangi hak grubundadır?',
   'Kişinin hakları ve ödevleri, yani koruyucu haklar grubundadır.',
   'Bu grup, bireyin devlet ve toplum karşısındaki kişisel alanını koruyan temel hakları içerir.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('vatandaslik-3', 'vatandaslik', 'Yasama',
   'Türkiye’de yasama yetkisi hangi organa aittir?',
   'Türkiye Büyük Millet Meclisine aittir.',
   'Bu yetki Türk milleti adına TBMM tarafından kullanılır ve devredilemez.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('vatandaslik-4', 'vatandaslik', 'İdare Hukuku',
   'Merkezden yönetimin başkent dışındaki uzantısına ne ad verilir?',
   'Taşra teşkilatı denir.',
   'İl ve ilçe yönetimi, merkezî idarenin taşra teşkilatı içinde yer alır.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),

  ('guncel-1', 'guncel', 'Uluslararası Kuruluşlar',
   'Birleşmiş Milletlerin merkezi hangi şehirdedir?',
   'New York’tadır.',
   'Birleşmiş Milletler 1945’te kurulmuştur; ana merkezi Amerika Birleşik Devletleri’nin New York şehrindedir.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('guncel-2', 'guncel', 'Kültürel Miras',
   'UNESCO’nun merkezi hangi şehirdedir?',
   'Paris’tedir.',
   'UNESCO; eğitim, bilim ve kültür alanlarında uluslararası iş birliğini destekleyen bir BM kuruluşudur.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('guncel-3', 'guncel', 'Uluslararası Kuruluşlar',
   'Dünya Sağlık Örgütünün kısa adı ve merkezi nedir?',
   'Kısa adı WHO’dur; merkezi Cenevre’dedir.',
   'WHO, Birleşmiş Milletler sisteminde uluslararası halk sağlığından sorumlu uzman kuruluştur.',
   NULL, 'gearapps başlangıç içeriği', 1, 0),
  ('guncel-4', 'guncel', 'Türkiye ve Dünya',
   'Türkiye’nin de kurucu üyesi olduğu OECD’nin merkezi nerededir?',
   'Paris’tedir.',
   'Ekonomik İşbirliği ve Kalkınma Örgütü, ekonomik ve sosyal politikalar alanında çalışmalar yürütür.',
   NULL, 'gearapps başlangıç içeriği', 1, 0);
`;

export const MIGRATION_V2 = `
UPDATE cards
SET source_name = CASE subject_id
      WHEN 'turkce' THEN 'Türk Dil Kurumu - Yazım Kılavuzu'
      WHEN 'matematik' THEN 'T.C. Millî Eğitim Bakanlığı - Öğretim Programları'
      WHEN 'tarih' THEN 'Atatürk Kültür, Dil ve Tarih Yüksek Kurumu - Atatürk Ansiklopedisi'
      WHEN 'cografya' THEN 'Türkiye İstatistik Kurumu - Veri Portalı'
      WHEN 'vatandaslik' THEN 'T.C. Mevzuat Bilgi Sistemi'
      ELSE source_name
    END,
    source_url = CASE subject_id
      WHEN 'turkce' THEN 'https://tdk.gov.tr/tdk/kurumsal/yazim-kilavuzu/'
      WHEN 'matematik' THEN 'https://mufredat.meb.gov.tr/'
      WHEN 'tarih' THEN 'https://ataturkansiklopedisi.gov.tr/'
      WHEN 'cografya' THEN 'https://veriportali.tuik.gov.tr/tr/'
      WHEN 'vatandaslik' THEN 'https://www.mevzuat.gov.tr/'
      ELSE source_url
    END,
    content_version = 2
WHERE subject_id IN ('turkce', 'matematik', 'tarih', 'cografya', 'vatandaslik');

UPDATE cards
SET source_name = CASE id
      WHEN 'guncel-1' THEN 'Birleşmiş Milletler - Hakkımızda'
      WHEN 'guncel-2' THEN 'UNESCO - Kurum Hakkında'
      WHEN 'guncel-3' THEN 'Dünya Sağlık Örgütü - Kurum Hakkında'
      WHEN 'guncel-4' THEN 'OECD - Kurum Hakkında'
      ELSE source_name
    END,
    source_url = CASE id
      WHEN 'guncel-1' THEN 'https://www.un.org/en/about-us'
      WHEN 'guncel-2' THEN 'https://www.unesco.org/en/brief'
      WHEN 'guncel-3' THEN 'https://www.who.int/about'
      WHEN 'guncel-4' THEN 'https://www.oecd.org/en/about.html'
      ELSE source_url
    END,
    content_version = 2
WHERE subject_id = 'guncel';

INSERT INTO content_meta(key, value, updated_at)
VALUES ('content_version', '2', CURRENT_TIMESTAMP)
ON CONFLICT(key) DO UPDATE SET
  value = excluded.value,
  updated_at = CURRENT_TIMESTAMP;
`;
