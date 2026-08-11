# 10.000+ Gerçek İçerik İçin Üretim Hattı

Uygulama artık çalışma sırasında statik JSON/TypeScript kart dosyası okumaz.
Dersler, kartlar ve kullanıcı ilerlemesi yerel SQLite veritabanından sorgulanır.
İlk 24 kart, yalnızca boş veritabanını kuran sürümlü migrasyon içeriğidir.

## Önerilen mimari

```text
Lisanslı kaynak / editör üretimi
             ↓
PostgreSQL staging tabloları
             ↓
Otomatik doğrulama + çift editör onayı
             ↓
Sürümlü içerik yayını
             ↓
İmzalı SQLite içerik paketi veya delta senkronizasyonu
             ↓
Mobil cihazdaki kpss-hap-not.db
```

PostgreSQL için başlangıç şeması `docs/content-backend-schema.sql` dosyasındadır.
AI destekli taslak üretim için `docs/AI_CONTENT_GENERATION_PROMPT.md`, makine
doğrulaması için `docs/ai-content-card.schema.json` kullanılabilir. AI çıktısı
yalnızca staging aktarımıdır; mobil uygulamada JSON/JSONL veri kaynağı olmaz.

## Gerçek içerik nereden gelmeli?

1. `gearapps` bünyesinde alan editörleri tarafından özgün yazım.
2. Yayıncılarla açık lisans anlaşması.
3. Mevzuat, kurum raporu ve resmî istatistik gibi yeniden kullanımı uygun birincil
   kaynaklardan editoryal özet.
4. Her kartta kaynak adı, kaynak adresi, doğrulayan editör ve son doğrulama tarihi.

Başka uygulamalardan, soru bankalarından veya kitaplardan toplu kopyalama
yapılmamalıdır. “Gerçek veri” yalnızca sayıyı büyütmek değil, kaynak ve sürüm
izlenebilirliği demektir.

## Yayınlama aşamaları

1. **Taslak:** Editör kartı ve kaynak kaydını girer.
2. **Otomatik kontrol:** Zorunlu alan, uzunluk, benzerlik, mükerrerlik, yasaklı
   HTML ve kaynak bağlantısı kontrol edilir.
3. **Alan kontrolü:** İkinci bir editör doğruluk ve KPSS kapsamını onaylar.
4. **Dil kontrolü:** Türkçe yazım, açıklık ve tek bilgi ilkesi kontrol edilir.
5. **Yayın:** Onaylı kartlar değişmez bir `content_release` sürümüne bağlanır.
6. **Dağıtım:** İlk kurulum için sıkıştırılmış SQLite paket; güncellemeler için
   `updated_at`/sürüm tabanlı delta gönderilir.
7. **Geri alma:** Hatalı sürüm pasife alınır ve önceki içerik sürümü yeniden
   etkinleştirilebilir.

## Kart kalite sözleşmesi

Her kart şu alanları taşımalıdır:

| Alan | Kural |
| --- | --- |
| `id` | Kalıcı UUID; metin değişse bile değişmez |
| `subject_id`, `topic_id` | Yayındaki ders ve konuya bağlı |
| `prompt` | Tek, açık soru; ideal olarak 180 karakterden kısa |
| `answer` | Tek başına anlaşılır kısa cevap |
| `detail` | Cevabın nedenini açıklayan özgün metin |
| `memory_tip` | İsteğe bağlı; doğruluk yerine ezber kolaylığı sağlar |
| `source_id` | Zorunlu birincil veya lisanslı kaynak |
| `verified_by` | Kartı onaylayan ikinci editör |
| `verified_at` | Son doğrulama zamanı |
| `content_version` | Mobil senkronizasyon sürümü |

## Ölçek hedefi

- 6 ders × yaklaşık 40 konu × konu başına 40–60 kart = 9.600–14.400 kart.
- İlk hedef 1.000 çift editör onaylı kart olmalı; sayıyı kalite kontrolünden hızlı
  büyütmek sınav uygulamasında güven kaybına yol açar.
- Güncel Bilgiler kartları için son kullanma/yeniden doğrulama tarihi zorunlu
  olmalıdır.

## Mobil senkronizasyon

MVP çevrimdışı kalır. Sunucu eklendiğinde mobil uygulama:

1. `content_meta.content_version` değerini sunucudaki son sürümle karşılaştırır.
2. Büyük ilk kurulumda imzalı SQLite paketini indirir.
3. Küçük güncellemelerde eklenen/değişen/pasife alınan kimlikleri sayfalı olarak
   alır.
4. Değişiklikleri tek SQLite transaction içinde `UPSERT` eder.
5. Paket özeti ve imzası doğrulanmadan aktif sürümü değiştirmez.

Bu tasarım 10.000 kart için yeterlidir. Arama gerektiğinde `cards` üzerinde FTS5
indeksi eklenebilir; ana ekran tüm kartları belleğe almak yerine konu/sayfa bazlı
SQL sorgularına geçirilmelidir. Mevcut 24 kartlık MVP tüm kartları belleğe alır;
uzak içerik entegrasyonundan önce repository API'si sayfalama destekleyecek
şekilde genişletilmelidir.
