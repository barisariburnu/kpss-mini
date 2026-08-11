# Production Kontrol Listesi

## Kod ve yerel paket (Play'de incelemedeki v6)

- [x] Android paket kimliği `com.gearapps.kpsshapnot`
- [x] Sürüm `1.0.0`, Android `versionCode` 6
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
- [x] Dahili test `1.0.0 (5)` sürüm doğrulaması hata ve uyarı olmadan geçti
- [x] Production erişimi açık; yeni sürümler için zorunlu 12 kullanıcı/14 gün kapısı yok
- [x] Dahili test kanalı duraklatıldı ve boş test taslağı silindi
- [x] Production dağıtım ülkesi Türkiye olarak ayarlandı
- [x] Politika uyumlu tam açıklama, bağımsızlık beyanı ve resmî kaynak URL'leri kaydedildi
- [x] `1.0.0 (6) - Production` ve 10 bekleyen değişiklik yeniden incelemeye gönderildi
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

- Dosya: `builds/kpss-mini-1.0.0-6-local.aab`
- Android versionCode: `6`
- SHA-256: `0F78941FEE72003C95DFD4D20043045E81C662D6A2F0AB20BD8A50A04D883291`
- R8 eşleme dosyası: `builds/kpss-mini-1.0.0-6-mapping.txt`
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

## versionCode 7 AdMob production adayı

- [x] AdMob hesabı `huseyinariburnu@gmail.com` altında Android uygulaması oluşturuldu
- [x] AdMob uygulama kimliği, ana sayfa banner ve çalışma tamamlama geçiş birimi tanımlandı
- [x] Development için Google test reklam kimliği, release için production birim kimliği ayrıldı
- [x] UMP rıza akışı ve gecikmeli reklam SDK başlatması uygulandı
- [x] Geçiş reklamı her 3 oturum ve en az 12 saat sınırıyla doğal çıkış anına bağlandı
- [x] Türkçe varsayılan, İngilizce ek dilli Avrupa rıza mesajı yayınlandı
- [x] Gizlilik politikası Google Mobile Ads veri davranışıyla güncellendi
- [x] `docs/app-ads.txt` yayıncı kaydı eklendi
- [x] Proje Pages adresinde `/kpss-mini/app-ads.txt` içeriği HTTP 200 ile doğrulandı
- [x] Play mağaza iletişim sitesi `https://barisariburnu.github.io/kpss-mini/` olarak yayınlandı
- [x] Ayrıntılı ve ASO odaklı tam açıklama Play Console'a taslak olarak kaydedildi
- [ ] İncelemedeki reklamsız `versionCode` 6 production'da yayınlanmalı
- [ ] Yayındaki Play mağaza kaydı AdMob uygulamasına bağlanmalı
- [ ] `https://barisariburnu.github.io/app-ads.txt` kök URL'si dosyayı sunmalı veya çalışan dosyaya yönlendirmeli
- [ ] `app-ads.txt` AdMob tarafından doğrulanmalı ve uygulama hazırlık incelemesi tamamlanmalı
- [ ] Play Console reklam beyanı, Reklam Kimliği ve Veri Güvenliği alanları v7 ile uyumlu güncellenmeli
- [ ] Yerel imzalı `versionCode` 7 AAB yalnızca yukarıdaki beyanlarla birlikte Play'e yüklenmeli

Yerel staging doğrulaması:

- Dosya: `builds/kpss-mini-1.0.0-7-local.aab`
- Android versionCode: `7`
- Boyut: `34.290.877` bayt
- SHA-256: `7344E6D9321771CD8E8AC9D9F3FCBC178B033BF6942CBDAAADDC6AB3DD6552D5`
- R8 mapping SHA-256: `B607006F647810009F884B2A21772F5ED69BEE1E1D802B3306CA3E38C4FD9834`
- İmza sertifikası: yerel `kpss-mini-upload.jks` sertifikasıyla eşleşiyor
- AAB manifesti: production AdMob App ID, gecikmeli ölçüm, `AD_ID` ve internet izni doğrulandı

> İncelemedeki v6 paketi reklam SDK'sı içermediği için mevcut “reklam yok”,
> “Reklam Kimliği kullanılmıyor” ve veri toplanmıyor beyanları bugün doğrudur.
> Bu beyanlar v7 yüklenmeden önce değiştirilirse paket ile mağaza beyanı
> çelişeceğinden mevcut incelemeye dokunulmamıştır.

> AdMob, geliştirici web sitesi URL'sindeki `/kpss-mini/` yolunu kullanmaz;
> yalnızca hostname kökündeki `/app-ads.txt` adresini tarar. Bu nedenle mevcut
> proje Pages dosyası herkese açık olsa da doğrulama için `barisariburnu.github.io`
> kullanıcı sitesi deposunda kök dosya veya başka bir kök alan adı/redirect gerekir.
