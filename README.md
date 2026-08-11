# KPSS Mini: Bilgi Kartları

KPSS adaylarının kısa boşluklarda aktif hatırlama yapabilmesi için hazırlanmış,
çevrimdışı çalışan mobil MVP. Uygulama `gearapps` için React Native, yerel Expo
SDK modülleri ve SQLite ile geliştirilmiştir. Android production paketi Expo/EAS
bulutu kullanılmadan, doğrudan yerel Gradle ve kullanıcıya ait upload key ile
üretilir.

## MVP'de Neler Var?

- Altı ders ve 24 örnek hap bilgi kartı
- Ders ve konu seçimi
- Cevabı açmadan önce düşünmeye yönlendiren aktif hatırlama akışı
- `Öğrendim` ve `Tekrar et` işaretleri
- Günlük 10 kart hedefi
- Kaydedilen kartlar
- Genel ve ders bazlı ilerleme
- İçerik ve ilerleme için cihazda kalıcı SQLite veritabanı
- Hesap gerektirmeyen kullanım ve cihazda tutulan çalışma ilerlemesi

Hesap, sunucu, bildirim, sosyal özellik, lig, yapay zekâ, ödeme ve kapsamlı
deneme sınavı motoru bilinçli olarak MVP dışında tutulmuştur.

## Çalıştırma

Gereksinimler: Node.js 22.13 veya üzeri, JDK 21 ve Android SDK.

```bash
npm install
npm start
```

```bash
npm run android
npm run android:bundle
```

Her iki Android komutu da aynı yerel production AAB akışını çalıştırır. Betik
`credentials.json` ve uygulamaya özel JKS dosyasını kullanır; sırları çıktıya
yazmaz, AAB sertifikasını keystore ile karşılaştırır ve sonucu `builds/` altına
kopyalar. Expo veya EAS hesabına veri gönderilmez.

Windows üzerinde `npm.ps1` çalıştırma ilkesi engeline rastlanırsa komutlar
`npm.cmd` ile çalıştırılabilir.

## Kalite Komutları

```bash
npm run typecheck
npm run lint
npm test
npm run android:bundle
```

## Ürün Araştırması ve MVP Kararı

Ağustos 2026 mağaza incelemesinde şu ürün kalıpları görüldü:

| Ürün | Öne çıkan yapı | MVP kararı |
| --- | --- | --- |
| [KPSS Digital 2026](https://apps.apple.com/tr/app/kpss-digital-2026/id6760217150?l=tr) | Plan, büyük soru havuzu, yapay zekâ, hata defteri, ayrıntılı analiz | Hata/tekrar mantığı alındı; plan ve yapay zekâ ertelendi |
| [KPSS Cepte](https://play.google.com/store/apps/details?hl=tr&id=com.pandorina.kpss) | Ders bazlı testler ve yanlış analizi | Ders ayrımı ve tekrar listesi alındı; test motoru ertelendi |
| [KPSS 2026 Deneme Sınavı & Soru](https://apps.apple.com/tr/app/kpss-2026-deneme-s%C4%B1nav%C4%B1-soru/id1482779937) | Kısa bilgiler, flash kart, denemeler ve topluluk | Hap bilgi/flash kart çekirdeği alındı; topluluk ertelendi |
| [KPSS Boost](https://apps.apple.com/tr/app/kpss-boost-2026-haz%C4%B1rl%C4%B1k/id6749249542?l=tr) | Çalışma yolu, tekrar, analiz ve lig | Basit ilerleme alındı; lig ve kişisel plan ertelendi |

Sonuç olarak uygulamanın temel döngüsü şudur:

`Ders seç → konu seç → soruyu düşün → cevabı aç → öğrendim/tekrar et → ilerlemeyi gör`

## Veritabanı

Uygulama ekranları JSON veya TypeScript kart listesi okumaz. İlk açılışta
`kpss-hap-not.db` oluşturulur; dersler ve başlangıç kartları sürümlü SQL
migrasyonuyla eklenir. Kart, ders, ilerleme, günlük çalışma ve kaydedilenler
repository üzerinden SQLite sorgularıyla gelir.

- Şema ve ilk içerik: `src/database/migrations.ts`
- Parametreli sorgular: `src/database/repository.ts`
- Uygulama veri durumu: `src/hooks/useAppData.ts`
- 10.000+ içerik planı: `docs/CONTENT_PIPELINE.md`
- Editoryal PostgreSQL şeması: `docs/content-backend-schema.sql`

## Reklam Stratejisi

Android `versionCode` 7 adayı, Google AdMob'u ana sayfadaki sabit banner ve
tamamlanan çalışma oturumlarındaki seyrek doğal geçiş için kullanır.

- Geliştirme yapılarında Google'ın test reklam birimi, release yapılarında
  production reklam birimi kullanılır.
- Geçiş reklamı yalnızca sonuç ekranından çıkarken, her üç tamamlanan oturumda
  bir ve en az 12 saat arayla gösterilebilir.
- Açılışta, cevap öncesinde, kartlar arasında ve alt ekranlarda reklam gösterilmez.
- Çalışma, kaydedilenler ve ilerleme ekranları reklamsızdır.
- Reklam alanı açıkça `REKLAM` etiketi taşır; yüklenemezse ekrandan kaldırılır.
- Google User Messaging Platform rıza durumu uygun olmadan reklam SDK'sı
  başlatılmaz; gerekli kullanıcılar tercihlerini uygulamadan yeniden açabilir.
- Reklam istekleri kişiselleştirilmemiş reklamlarla sınırlandırılmıştır.

Play'de incelemede olan `versionCode` 6 reklamsızdır. Reklamlı `versionCode` 7,
v6 mağazada yayınlandıktan, uygulama AdMob'a mağaza üzerinden bağlandıktan ve Play
reklam/Veri Güvenliği beyanları güncellendikten sonra yüklenmelidir.

## Kaynak Yapısı

```text
App.tsx                    Uygulama kabuğu ve basit ekran yönlendirme
src/components             Ortak görsel bileşenler
src/database               SQLite migrasyonu ve repository
src/domain                 Saf ilerleme ve çalışma sırası kuralları
src/hooks                  Veritabanı destekli uygulama durumu
src/screens                Ana, konu, kaydedilen, ilerleme ve çalışma ekranları
docs                       Play Store ve içerik ölçekleme belgeleri
```

Detaylı geliştirme kuralları için `AGENTS.md`, kronolojik devir notları için
`CHANGELOG.md` kullanılır.
