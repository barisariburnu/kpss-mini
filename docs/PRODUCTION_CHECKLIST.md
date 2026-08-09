# Production Kontrol Listesi

## Kod ve yerel paket

- [x] Android paket kimliği `com.gearapps.kpsshapnot`
- [x] Sürüm `1.0.0`, Android `versionCode` 5
- [x] Android target API 36
- [x] SQLite içerik ve ilerleme veritabanı
- [x] Android otomatik yedekleme kapalı
- [x] Reklam, analitik ve izleme SDK'sı yok
- [x] EAS bağlantısı ve `eas.json` kaldırıldı
- [x] JDK 21 + yerel Gradle ile production AAB üretimi
- [x] Yerel upload key ile AAB sertifika eşleşmesi doğrulandı
- [x] Release R8 küçültmesi, kaynak küçültmesi ve Play kod eşleme çıktısı

## Play Console

- [x] `KPSS Mini: Bilgi Kartları` uygulama kaydı
- [x] Reklam yok beyanı
- [x] Resmi kurum uygulaması değil beyanı
- [x] Finans özelliği yok beyanı
- [x] Sağlık özelliği yok beyanı
- [x] 18 yaş ve üzeri hedef kitle
- [x] Eğitim kategorisi
- [x] Veri toplama/paylaşma yok beyanı kaydedildi
- [x] Mağaza adı, kısa/tam açıklama, simge, özellik grafiği ve dört telefon ekran görüntüsü
- [x] Simge ve özellik grafiği için yapay zekâ öğe etiketi
- [x] Herkese açık gizlilik URL'si Play Console'a eklendi
- [x] `destek@barisariburnu.com.tr` mağaza iletişimine girildi
- [x] İçerik derecelendirme anketi tamamlandı
- [x] Veri Güvenliği beyanı gizlilik URL'siyle kaydedildi
- [x] Android reklam kimliği kullanılmıyor beyanı kaydedildi
- [x] Yerel AAB Play App Signing akışına yüklendi
- [x] Play App Signing ve otomatik koruma etkin
- [x] Dahili test sürüm adı ve Türkçe sürüm notları hazır
- [x] Dahili test `1.0.0 (5)` iki tester için etkin ve kullanılabilir
- [x] Dahili test sürüm doğrulaması hata ve uyarı olmadan geçti
- [x] Production dağıtım ülkesi Türkiye olarak ayarlandı
- [x] `1.0.0 (5) - Production` ve bekleyen mağaza değişiklikleri incelemeye gönderildi
- [ ] Google Play production incelemesi tamamlanmalı

## Yerel imzalama

- [x] `*.keys`, `*.jks`, `credentials.json`, `builds/*.aab` ve R8 eşleme dosyaları Git dışında
- [x] Uygulamaya özel `kpss-mini-upload.jks` ve yerel `credentials.json`
- [x] Parolaları ekrana yazdırmayan yerel build betiği
- [x] Windows Unicode/yol sınırı için kısa ASCII geçici build dizini
- [x] JDK 21 ve ARM mimarileri (`armeabi-v7a`, `arm64-v8a`)
- [ ] Upload key ve parolalar proje dışındaki güvenli yedek konumuna kopyalanmalı

> `builds/kpss-mini-1.0.0-2.aab` ve `builds/kpss-mini-1.0.0-4.aab` eski EAS
> çıktılarıdır; Play'e yüklenmemelidir.

## Play'e yüklenen production adayı

- Dosya: `builds/kpss-mini-1.0.0-5-local.aab`
- Android versionCode: `5`
- SHA-256: `F943B56E33DB18B1744684881A67DB398B459613A3E9047761BF35ED7FFC9598`
- R8 eşleme dosyası: `builds/kpss-mini-1.0.0-5-mapping.txt`
- R8 eşleme SHA-256: `D8DB9025A68F8BD14AA8AA73B69BD3B8590073515224FD58CCE1B1A409153C25`
- İmza sertifikası: `kpss-mini-upload.jks` sertifikasıyla eşleşiyor

## Release komutları

```bash
npm run typecheck
npm run lint
npm test
npm run android:bundle
```

Android production build doğrudan yerel Gradle ile alınır. Expo/EAS bulut
derlemesi, yüklemesi veya uzaktan keystore yönetimi kullanılmaz. Uygulama çalışma
zamanında yerel Expo SDK modüllerini kullanmaya devam eder.
