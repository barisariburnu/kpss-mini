# Production Kontrol Listesi

## Kod ve yerel paket

- [x] Android paket kimliği `com.gearapps.kpsshapnot`
- [x] Sürüm `1.0.0`, Android `versionCode` 4
- [x] Android target API 36
- [x] SQLite içerik ve ilerleme veritabanı
- [x] Android otomatik yedekleme kapalı
- [x] Reklam, analitik ve izleme SDK'sı yok
- [x] EAS bağlantısı ve `eas.json` kaldırıldı
- [x] JDK 21 + yerel Gradle ile production AAB üretimi
- [x] Yerel upload key ile AAB sertifika eşleşmesi doğrulandı

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
- [ ] Herkese açık destek e-postası mağaza iletişimine girilmeli
- [x] İçerik derecelendirme anketi tamamlandı
- [x] Veri Güvenliği beyanı gizlilik URL'siyle kaydedildi
- [ ] Yerel AAB Play App Signing akışına yüklenmeli
- [x] Play App Signing ve otomatik koruma etkin
- [x] Dahili test sürüm adı ve Türkçe sürüm notları hazır
- [ ] Dahili/kapalı test ve production erişim şartları tamamlanmalı

## Yerel imzalama

- [x] `*.keys`, `*.jks`, `credentials.json` ve `builds/*.aab` Git dışında
- [x] Uygulamaya özel `kpss-mini-upload.jks` ve yerel `credentials.json`
- [x] Parolaları ekrana yazdırmayan yerel build betiği
- [x] Windows Unicode/yol sınırı için kısa ASCII geçici build dizini
- [x] JDK 21 ve ARM mimarileri (`armeabi-v7a`, `arm64-v8a`)
- [ ] Upload key ve parolalar proje dışındaki güvenli yedek konumuna kopyalanmalı

> `builds/kpss-mini-1.0.0-2.aab` ve `builds/kpss-mini-1.0.0-4.aab` eski EAS
> çıktılarıdır; Play'e yüklenmemelidir.

## Play'e yüklenecek production paketi

- Dosya: `builds/kpss-mini-1.0.0-4-local.aab`
- Android versionCode: `4`
- SHA-256: `6809CB6118FB624AC13B641E5FF085333B9F85838828DEF908C291FF0A233A52`
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
