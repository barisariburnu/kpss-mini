# KPSS Hap Not

KPSS adaylarının kısa boşluklarda aktif hatırlama yapabilmesi için hazırlanmış,
çevrimdışı çalışan mobil MVP. Uygulama Android ve iOS için Expo + React Native
ile geliştirilmiştir.

## MVP'de Neler Var?

- Altı ders ve 24 örnek hap bilgi kartı
- Cevabı açmadan önce düşünmeye yönlendiren aktif hatırlama akışı
- `Öğrendim` ve `Tekrar et` işaretleri
- Günlük 10 kart hedefi
- Kaydedilen kartlar
- Genel ve ders bazlı ilerleme
- Cihazda kalıcı, hesap gerektirmeyen kullanım
- Çalışma oturumunun dışında kalan, kapatılabilir sponsor alanı

Hesap, sunucu, bildirim, sosyal özellik, lig, yapay zekâ, ödeme ve kapsamlı
deneme sınavı motoru bilinçli olarak MVP dışında tutulmuştur.

## Çalıştırma

Gereksinim: Node.js 22.13 veya üzeri.

```bash
npm install
npm start
```

Expo Go ile QR kodu tarayabilir veya aşağıdaki komutları kullanabilirsiniz:

```bash
npm run android
npm run ios
npm run web
```

Windows üzerinde `npm.ps1` çalıştırma ilkesi engeline rastlanırsa komutlar
`npm.cmd` ile çalıştırılabilir.

## Kalite Komutları

```bash
npm run typecheck
npm run lint
npm test
npx expo install --check
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

`Ders seç → soruyu düşün → cevabı aç → öğrendim/tekrar et → ilerlemeyi gör`

## Reklam Stratejisi

MVP gerçek bir reklam SDK'sı veya takip kodu içermez; arayüzde gelecekteki doğal
reklam konumunu gösteren bir sponsor bileşeni vardır.

- Reklam yalnızca ana sayfada, ders listesinden sonra gösterilir.
- Açılış, tam ekran, geçiş ve ödüllü reklam kullanılmaz.
- Çalışma, kaydedilenler ve ilerleme ekranları reklamsızdır.
- Alan sessiz, sabit, açıkça `Sponsorlu` etiketli ve kapatılabilirdir.
- Reklam ağı bağlanacağı zaman kullanıcı rızası, mağaza politikaları ve çocuklara
  yönelik içerik gereklilikleri ayrıca uygulanmalıdır.

## Kaynak Yapısı

```text
App.tsx                    Uygulama kabuğu ve basit ekran yönlendirme
src/components             Ortak görsel bileşenler
src/data                   Dersler ve çevrimdışı kart içeriği
src/domain                 Saf ilerleme ve çalışma sırası kuralları
src/hooks                  Yerel kalıcılık
src/screens                Ana, kaydedilen, ilerleme ve çalışma ekranları
```

Detaylı geliştirme kuralları için `AGENTS.md`, kronolojik devir notları için
`CHANGELOG.md` kullanılır.
