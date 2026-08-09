# KPSS Mini - Agent Rehberi

## Proje Amaci

KPSS adaylarinin kisa bosluklarda temel bilgileri tekrar edebilmesini saglayan,
mobil oncelikli ve sade bir "hap bilgi" uygulamasi gelistirmek.

## MVP Sinirlari

- Ana ekran: gunluk hedef, dersler ve son calisma ozeti.
- Ders/konu secimi ve kaydirilabilir hap bilgi kartlari.
- Kart icin "ogrendim" / "tekrar et" ilerleme kaydi.
- Kaydedilen kartlar ve temel ilerleme ozeti.
- Cevrimdisi calisan yerel ornek icerik ve kalici yerel durum.
- Rahatsiz etmeyen reklam icin yalnizca dogal yerlestirme alani; tam ekran,
  acilista veya kartlar arasinda zorlayici reklam yok.

MVP disi: hesap sistemi, sosyal ozellikler, liderlik tablosu, sohbet, yapay zeka,
odeme/abonelik, bildirim altyapisi, uzaktan yonetim paneli ve kapsamli sinav
motoru.

## Gelistirme Ilkeleri

- Yeni bagimlilik eklemeden once mevcut yigin ve gereklilik kontrol edilir.
- Mobil erisilebilirlik, okunabilirlik ve tek elle kullanim onceliklidir.
- Kullanici verisi varsayilan olarak cihazda tutulur.
- Her davranis degisikligi uygun test veya dogrulama ile teslim edilir.
- Ilgisiz dosyalar ve kullanici degisiklikleri korunur.
- Her anlamli islem ayni calisma oturumunda `CHANGELOG.md` dosyasina eklenir.

## Teslim Kontrol Listesi

1. Tip/lint kontrolleri geciyor.
2. Testler geciyor.
3. Mobil gorunum ve temel akislar dogrulandi.
4. Reklam yerlestirmesi ana gorevi kesmiyor.
5. `CHANGELOG.md` guncel ve sonraki agent icin acik not iceriyor.
