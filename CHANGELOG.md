# Degisiklik Gunlugu

## [1.0.0-v7-production-submission] - 2026-08-11

### Play Console

- Yerel imzalı `builds/kpss-mini-1.0.0-7-local.aab` production kanalına
  `1.0.0 (7) - Production` adıyla yüklendi; önceki v6 paketi yeni sürüme dahil
  edilmedi.
- Sürüm notları ana ekran/alt navigasyon düzeltmeleri, resmî kaynak bağlantıları,
  seyrek reklamlar, gizlilik tercihleri ve kararlılık iyileştirmeleriyle
  güncellendi.
- Tam mağaza açıklamasındaki reklamsız v6 ifadesi kaldırıldı; ana sayfa banner'ı
  ile yalnızca tamamlanan oturumdan çıkışta, en erken her üç oturumda bir ve en
  az 12 saat arayla gösterilebilen geçiş reklamı açıklandı.
- Reklam beyanı `Reklam içerir`, Reklam Kimliği beyanı `Evet` olarak kaydedildi.
  Reklam kimliği amaçları analiz, reklam/pazarlama ve sahtekârlığı önleme olarak
  işaretlendi.
- Veri Güvenliği formunda Google Mobile Ads için yaklaşık konum, uygulama
  işlemleri, teşhisler ve cihaz/diğer kimlikler hem toplanan hem paylaşılan veri
  olarak beyan edildi. Aktarım sırasında şifreleme, hesap bulunmaması ve reklam,
  analiz ile sahtekârlığı önleme amaçları kaydedildi.
- Eski v6 inceleme paketi geri çekildi; v7, Türkiye production kapsamı, mağaza
  kaydı ve tüm politika/mağaza ayarları tek gönderimde birleştirildi.
- Toplam 10 değişiklik incelemeye yeniden gönderildi. Yayın özeti v7'yi
  `İncelenmekte olan değişiklikler` altında gösteriyor; Play'in hızlı otomatik
  kontrolleri arka planda sürüyor.

### Dogrulama

- Play tarafından işlenen paket: versionCode `7`, versionName `1.0.0`, minSdk
  `24`, targetSdk `36`.
- AAB boyutu: `34.290.877` bayt.
- AAB SHA-256:
  `7344E6D9321771CD8E8AC9D9F3FCBC178B033BF6942CBDAAADDC6AB3DD6552D5`.
- Bu işlemde kod veya AAB değiştirilmedi; mevcut doğrulanmış yerel build
  kullanıldı. Expo/EAS bulut derleme, imzalama veya yükleme hizmeti kullanılmadı.
- Dahili test kanalı duraklatılmış olarak bırakıldı; production erişimi için yeni
  test sürümü oluşturulmadı.

### Agent Devir Notu

- Play hızlı kontrollerinin ve normal incelemenin sonucunu takip et. Yeni bir
  ret/uyarı oluşursa Politika Durumu ve Gönderim etkinliğindeki kesin gerekçeyi
  esas al.
- `https://barisariburnu.github.io/app-ads.txt` kök adresi hâlâ bekleyen AdMob
  doğrulama işidir; bu durum Play inceleme gönderimini engellemez ancak reklam
  sunumunu sınırlayabilir.

## [1.0.0-play-resubmission] - 2026-08-11

### Play Console

- Son yerel `versionCode` 7 AAB yüklenmedi; inceleme kapsamındaki paket reklamsız
  `1.0.0 (6) - Production` olarak korundu.
- Zorunlu test kapısı bulunmadığı için dahili test kanalı duraklatıldı. Test
  kullanıcıları artık sürümü alamaz; yanlışlıkla açılmış boş dahili test taslağı
  silindi. Play'in geçmiş kaydı olan `1.0.0 (5) - Dahili Test` silinemez ancak
  kanal etkin değildir.
- Kullanıcının mağaza açıklamasındaki satır düzenlemeleri korundu. Reklamlı v7
  yüklenmediği için açıklamadaki banner/geçiş reklamı paragrafı kaldırılarak
  mevcut v6 ile uyumlu "Mevcut 1.0.0 (6) sürümü reklam göstermez" ifadesi
  kaydedildi.
- Güncel tam açıklama ve dört telefon ekran görüntüsü incelemeye gönderildi.
  Play'in mevcut incelemenin iptal edilip yeniden başlayacağı uyarısı kabul
  edilerek gönderim güncel mağaza varlıklarıyla yeniden başlatıldı.
- Yayın özetinde incelemeye gönderilmemiş değişiklik kalmadığı ve production v6,
  mağaza kaydı, uygulama içeriği ile mağaza ayarlarının birlikte incelemede olduğu
  doğrulandı.
- Politika Durumu sayfasındaki 10 Ağustos 2026 tarihli Yanıltıcı İddialar kaydı
  geçmiş ret olarak duruyor; sayfa güncel düzeltmenin incelemede olduğunu
  bildiriyor. Yeni veya ayrı bir politika uyarısı görülmedi.

### Dogrulama

- Bu işlemde uygulama kodu veya AAB değiştirilmedi; yeni derleme oluşturulmadı
  ve yüklenmedi.
- Play Console dahili test kanal durumu: `Etkin değil` / `Bu kanal duraklatıldı`.
- Play Console yayın durumu: `İncelenmekte olan değişiklikler`.

## [1.0.0-interstitial-and-listing-refresh] - 2026-08-11

### Eklendi

- AdMob production hesabında `Çalışma Tamamlama Geçiş - Production` reklam
  birimi oluşturuldu; birim kimliği
  `ca-app-pub-8939295877328751/8794011621` olarak release yapılandırmasına eklendi.
- Geçiş reklamı yalnızca kullanıcı bir çalışma oturumunu tamamlayıp sonuç
  ekranından ayrılırken, her 3 tamamlanan oturumda bir ve son gösterimden en az
  12 saat sonra uygun olacak şekilde sınırlandı. Erken çıkışta, uygulama
  açılışında, kartlar arasında veya reklam hazır değilken akış bekletilmez.
- Son geçiş reklamı zamanını cihazdaki SQLite ayarlarında saklayan idempotent
  veritabanı v3 migrasyonu ve reklam uygunluk kuralları için otomatik testler
  eklendi.
- Gerçek KPSS içeriğini editoryal staging veritabanına hazırlamak için
  `docs/AI_CONTENT_GENERATION_PROMPT.md` ve makinece doğrulanabilir
  `docs/ai-content-card.schema.json` eklendi. JSONL yalnızca aktarım biçimidir;
  uygulama çalışma zamanında JSON dosyası okumaz.

### Play Console

- `versionCode` 6 kaynak kodundan yerel Android emülatöründe 1080x1920 boyutunda
  dört güncel telefon ekran görüntüsü alındı. Ana ekranda sağ üst sayaç yoktur,
  hedef halkası ortalıdır ve alt navigasyon beyaz zemini sistem çubuğuna uzanır.
- Eski dört telefon görseli varsayılan mağaza kaydından kaldırıldı; yeni görseller
  ana ekran, konu seçimi, kart ve cevap/resmî kaynak sırasıyla yüklendi.
- Resmî kaynaklar, bağımsızlık beyanı ve kullanıcı faydalarını açıklayan 2.671
  karakterlik ayrıntılı mağaza açıklaması kaydedildi. Değişiklikler taslaktadır;
  incelemedeki reklamsız v6 geri çekilmedi.
- Hesapta production erişimi açık olduğu için gelecek sürümlerde yeni bir
  12 kullanıcı/14 gün zorunluluğu yoktur. Reklamlı v7 için dahili test zorunlu
  değil ancak UMP, reklam sıklığı, çökme ve cihaz davranışını production öncesi
  doğrulamak üzere önerilen yayın adımıdır.

### Dogrulama

- `npm run typecheck`: Başarılı.
- `npm run lint`: Başarılı.
- `npm test`: 3 test dosyasında 14/14 test başarılı.
- Yerel Gradle `bundleRelease`: Başarılı.
- Yerel staging AAB: `builds/kpss-mini-1.0.0-7-local.aab`, 34.290.877 bayt.
- AAB SHA-256:
  `7344E6D9321771CD8E8AC9D9F3FCBC178B033BF6942CBDAAADDC6AB3DD6552D5`.
- R8 mapping SHA-256:
  `B607006F647810009F884B2A21772F5ED69BEE1E1D802B3306CA3E38C4FD9834`.
- AAB yerel upload key ile imzalandı; Expo/EAS bulut derleme veya imzalama
  hizmeti kullanılmadı.

### Agent Devir Notu

- v7 paketi henüz Play'e yüklenmedi. Önce reklamsız v6 incelemesi sonuçlanmalı;
  ardından mağaza-AdMob bağlantısı, kök `app-ads.txt`, reklam/Reklam Kimliği/Veri
  Güvenliği beyanları ve dahili test aynı v7 sürümüyle tamamlanmalıdır.

## [1.0.0-admob-production-prep] - 2026-08-11

### Degistirildi

- Android `versionCode` 7 adayına Google Mobile Ads ve User Messaging Platform
  eklendi; geliştirmede test, release'te production banner kimliği kullanılır.
- Reklam SDK'sı yalnızca UMP rıza durumu reklam isteğine izin verdiğinde başlatılır;
  ölçüm başlatması rıza alınana kadar geciktirilir.
- Yalnızca ana sayfada, ders kartlarından sonra gösterilen ve çalışma akışını
  kesmeyen adaptive banner eklendi. Açılış, tam ekran, geçiş ve kart arası reklam
  eklenmedi.
- Kullanıcının gerektiğinde UMP gizlilik tercihlerini yeniden açabileceği bağlantı
  ana sayfa bilgi alanına eklendi.
- Gizlilik politikası Google Mobile Ads veri davranışları, iletişim adresi ve
  kullanıcı kontrol yollarıyla güncellendi.
- `docs/app-ads.txt`, ilk yayın/yasal süreç ve anahtar yedekleme rehberi eklendi.
- README ve production kontrol listesi reklamsız v6 ile AdMob'lu v7 arasındaki
  aşamalı yayın sırasını açıklayacak biçimde güncellendi.

### AdMob

- `huseyinariburnu@gmail.com` hesabında `KPSS Mini: Bilgi Kartları` Android
  uygulaması ve `Ana Sayfa Alt Banner - Production` reklam birimi oluşturuldu.
- Türkçe varsayılan ve İngilizce ek dilli Avrupa rıza mesajı, izin verme,
  seçenekleri yönetme ve izin vermeme seçenekleriyle yayınlandı.
- Uygulama Play mağazasında henüz herkese açık olmadığı için AdMob mağaza bağlantısı
  ve uygulama hazırlık incelemesi bekleyen production adımı olarak bırakıldı.
- Proje Pages altındaki `/kpss-mini/app-ads.txt` HTTP 200 ve doğru içerikle
  yayınlandı; AdMob tarayıcısının hostname kökünde `/app-ads.txt` aradığı
  doğrulandığından kök dosya/redirect ayrıca bekleyen adım olarak kaydedildi.

### Play Console

- Mağaza iletişim sitesi `https://barisariburnu.github.io/kpss-mini/` olarak
  kaydedilip yayınlandı.
- 2.554 karakterlik ayrıntılı, fayda ve ASO odaklı tam açıklama mağaza kaydına
  taslak olarak kaydedildi; mevcut v6 incelemesi geri çekilmedi.
- İncelemedeki v6 paketi reklamsız olduğu için reklam, Reklam Kimliği ve Veri
  Güvenliği beyanları değiştirilmedi. Bu alanlar AdMob'lu v7 yüklenirken birlikte
  güncellenmelidir.

### Agent Devir Notu

- Production erişimi bu hesapta açıktır ve v6 incelemededir; 12 kullanıcı/14 gün
  kapısı mevcut yayını engellememektedir.
- v6 yayınlandıktan sonra Play mağaza kaydını AdMob uygulamasına bağla,
  hostname kökündeki `app-ads.txt` dosyasını yayınla, AdMob doğrulamasını bekle,
  Play beyanlarını güncelle ve ancak sonra yerel imzalı v7 AAB'yi yükle.

### Dogrulama

- `react-native-google-mobile-ads` 16.4.0 / Google Ads 25.4.0'ın Expo 57 Kotlin
  2.1.20 zinciriyle uyumsuz olduğu yerel build'de yakalandı; aynı API'yi kullanan
  15.8.0 / Google Ads 24.6.0 sürümü kesin olarak sabitlendi.
- Yerel Gradle `bundleRelease`: Başarılı (314 görev).
- Yerel staging AAB: `builds/kpss-mini-1.0.0-7-local.aab`, 34.289.286 bayt.
- AAB SHA-256:
  `D38B1038407DBAEFA3E7B3EE47424277A90AB5C9DBA753C5E255FAFABC4AA3B1`.
- R8 mapping SHA-256:
  `B607006F647810009F884B2A21772F5ED69BEE1E1D802B3306CA3E38C4FD9834`.
- AAB imza sertifikası yerel upload key ile eşleşiyor.
- AAB manifestinde paket kimliği, production AdMob App ID, gecikmeli ölçüm,
  internet ve Reklam Kimliği izinleri doğrulandı.
- `npm run typecheck`: Başarılı.
- `npm run lint`: Başarılı.
- `npm test`: 2 test dosyasında 10/10 test başarılı.
- `npm audit --omit=dev`: Expo/Metro dolaylı araç zincirinde 8 orta ve 12 yüksek
  bulgu; önerilen `--force` çözümü React Native/Expo'yu kırıcı biçimde geriye
  düşürdüğü için uygulanmadı.

## [1.0.0-policy-compliance] - 2026-08-11

### Degistirildi

- Google Play'in "Yaniltici Iddialar" ret gerekcesi dogrultusunda Android
  `versionCode` 6'ya yukseltildi.
- Kullanici ekran goruntusundeki gereksiz ana sayfa sag ust sayaci kaldirildi.
- Gunluk hedef halkasindaki `2/10` benzeri degerler ortak bir satir kapsayicisiyla
  hem yatay hem dikey olarak merkeze alindi.
- Alt navigasyon, Android sistem gezinme inset'ini kendi beyaz zemini icinde
  kapsayacak sekilde ayrildi; beyaz alan artik ekranin en altina kadar uzanir.
- Yerel build basariyla AAB urettiği halde Windows'un gecici `classes.dex`
  kilidi nedeniyle basarisiz cikis vermemesi icin guvenli tekrarli temizlik ve
  uyari akisi eklendi.
- SQLite icerik semasi 2. surume tasindi; mevcut 24 kartin her birine resmi veya
  birincil kaynak adi ve calisir HTTPS kaynak adresi eklendi.
- Kart cevabi ekranina kaynak adi ve URL'sini gosteren, erisilebilir ve
  acilabilir "RESMI KAYNAK" alani eklendi.
- Ana sayfadaki bagimsizlik beyanina gorunur `osym.gov.tr` resmi sinav bilgisi
  baglantisi eklendi.
- Google Play tam aciklamasinin en ustune uygulamanin OSYM/kamu kurumu olmadigi
  beyan edildi; resmi kaynaklar adlari ve acik URL'leriyle listelendi.

### Play Console

- 10 Agustos 2026 tarihli ret, "Resmi Bilgilerle Ilgili Kaynak Baglantisi
  Eksik" kanitiyla Yaniltici Iddialar Politikasi ihlali olarak tespit edildi.
- Google'in duzeltme talebi, resmi kaynak URL'leri ve belirgin kamu kurumu
  bagimsizlik beyaninin hem uygulamada hem magaza aciklamasinda bulunmasi olarak
  kaydedildi.
- Dahili test magazasinda paket adi ve varsayilan Android simgesi gorunmesinin,
  ilk magaza kaydi reddedildigi icin Play'in `unreviewed` gecici gorunumunu
  kullanmasindan kaynaklandigi ekran goruntuleriyle dogrulandi.
- Magaza kaydinda 512x512 simgenin, ozellik grafiginin ve dort telefon ekran
  goruntusunun halen yuklu oldugu dogrulandi.
- Politika uyumlu sorumluluk reddi ve on resmi/birincil kaynak URL'si tam
  aciklamaya kaydedildi.
- Yerelde imzalanan `versionCode` 6 AAB production taslagina yuklendi; eski
  `versionCode` 5 paket taslaktan cikarildi.
- `1.0.0 (6) - Production` surumu Play dogrulamasinda "Yayinlamaya hazir"
  sonucunu aldi; yeni yukleme boyutu 13,1 MB ve tahmini indirme suresi 7 saniye.
- Production surumu, magaza kaydi ve icerik beyanlarini kapsayan 10 degisiklik
  yeniden incelemeye gonderildi; Yayin Ozeti "Incelenmekte olan degisiklikler"
  durumunda dogrulandi.

### Dogrulama

- Yerel Gradle `bundleRelease`: Basarili (276 gorev).
- Yerel AAB: `builds/kpss-mini-1.0.0-6-local.aab`, 30.347.005 bayt.
- AAB SHA-256:
  `0F78941FEE72003C95DFD4D20043045E81C662D6A2F0AB20BD8A50A04D883291`.
- R8 esleme SHA-256:
  `D8DB9025A68F8BD14AA8AA73B69BD3B8590073515224FD58CCE1B1A409153C25`.
- AAB sertifika parmak izi yerel upload key sertifikasi ile eslesiyor.
- `npm run typecheck`: Basarili.
- `npm run lint`: Basarili.
- `npm test`: 2 test dosyasinda 10/10 test basarili.
- `git diff --check`: Basarili.

### Agent Devir Notu

- Policy issue ID: `4986534170940223184`.
- Google Play'in otomatik hizli kontrolleri ve production incelemesi
  beklenmelidir. Kayit onaylanana kadar dahili test sayfasinda gecici paket adi
  ve varsayilan simge gorunmeye devam edebilir.

## [1.0.0-internal-test] - 2026-08-09

### Degistirildi

- Android `versionCode` 5'e yukseltildi.
- Release yapilarinda R8 kod kucultme ve Android kaynak kucultme etkinlestirildi.
- Yerel Android build betigi, AAB ile birlikte gercek R8 `mapping.txt` dosyasini
  uretip `builds/` altina kopyalayacak ve dosya yoksa build'i durduracak sekilde
  guncellendi.
- R8 esleme dosyalari gizli build artefakti olarak Git disinda birakildi.

### Play Console

- Android 13+ Reklam Kimligi beyaninda, uygulamada reklam/analitik/izleme SDK'si
  ve `AD_ID` izni bulunmadigi icin "Hayir" secenegi kaydedildi.
- Dahili test taslagindaki paket eksikliginden kaynaklanan uc yayin hatasi,
  yerelde imzalanmis AAB eklenerek giderildi.
- Eski `versionCode` 4 paketi taslaktan cikarildi; yerel `versionCode` 5 AAB
  paketi yuklendi.
- Play, R8 kod esleme verisini yeni App Bundle icinden algiladi; kod gosterme
  dosyasi uyarisi giderildi.
- `1.0.0 (5) - Dahili Test` surumu Turkce notlarla hata ve uyari olmadan
  dogrulandi ve dahili test kanalinda yayinlandi.
- `Test Kullanicilari` listesinin secili, iki tester'in yetkili ve dahili test
  katilim baglantisinin etkin oldugu dogrulandi.
- Dahili testteki dogrulanmis `versionCode` 5 paketi `1.0.0 (5) - Production`
  adiyla production kanalina yukseltildi.
- Ilk production dagitim alani, Turkce ve KPSS odakli MVP icin Turkiye olarak
  ayarlandi.
- Production surumu, magazaya kayit bilgileri ve icerik beyanlari dahil dokuz
  bekleyen degisiklik Google Play incelemesine gonderildi; Yayin Ozeti durumu
  "Incelenmekte olan degisiklikler" olarak dogrulandi.

### Dogrulama

- Yerel Gradle `bundleRelease`: Basarili (276 gorev); R8
  `minifyReleaseWithR8` calisti.
- Yerel AAB: `builds/kpss-mini-1.0.0-5-local.aab`, 30.345.390 bayt.
- AAB SHA-256:
  `F943B56E33DB18B1744684881A67DB398B459613A3E9047761BF35ED7FFC9598`.
- R8 esleme SHA-256:
  `D8DB9025A68F8BD14AA8AA73B69BD3B8590073515224FD58CCE1B1A409153C25`.
- AAB sertifika parmak izi yerel `kpss-mini-upload.jks` sertifikasi ile
  eslesiyor.
- `npm run typecheck`: Basarili.
- `npm run lint`: Basarili.
- `npm test`: 2 test dosyasinda 9/9 test basarili.
- Play dogrulama sonucu: "Yayinlamaya hazir"; 0 hata, 0 uyari.
- Play tahmini yeni yukleme boyutu 13,1 MB ve indirme suresi 7 saniye.

### Agent Devir Notu

- Dahili test `1.0.0 (5)` 9 Agustos 2026 22:32 itibariyla kullanima sunuldu.
- Tester katilim adresi Play Console dahili test kanalindaki "Test
  kullanicilari" sekmesinde bulunur; tester e-postalari gunluge yazilmadi.
- Production erisimi bu hesapta kapali test engeli olmadan acildi. Surum Google
  Play incelemesindedir; sonraki adim inceleme sonucunu izlemek ve varsa Google
  geri bildirimini ele almaktir.

## [1.0.0-local-release] - 2026-08-09

### Eklendi

- Expo/EAS bulutuna baglanmadan JDK 21 ve yerel Gradle ile imzali Android App
  Bundle olusturan `scripts/build-android-local.ps1` eklendi.
- Native Android projesi, `com.gearapps.kpsshapnot` namespace/applicationId,
  versionCode 4, release signing ve yalnizca gerekli INTERNET izni eklendi.
- GitHub Pages icin mobil uyumlu `docs/index.html` gizlilik sayfasi eklendi.
- Yerel production paketi `builds/kpss-mini-1.0.0-4-local.aab` olusturuldu.

### Degistirildi

- EAS proje kimligi, owner ayari ve `eas.json` kaldirildi; Android release
  derlemesi tamamen kullaniciya ait yerel upload key ve Gradle akisina tasindi.
- JavaScript release bundle girisi React Native Community CLI ve Metro'ya
  tasindi; `npm start` artik `react-native start` calistiriyor.
- Windows Unicode ve 260 karakter CMake siniri, kisa ASCII gecici build dizini
  ve kalici yerel Gradle cache ile giderildi.
- Android release mimarileri Play cihazlari icin `armeabi-v7a` ve `arm64-v8a`
  ile sinirlandi.
- README ve production kontrol listesi eski EAS komutlari/ciktilari yerine yerel
  build ve imza dogrulama akisina gore guncellendi.
- Gizlilik politikasi yayin metnine cevrildi ve yayin-oncesi yer tutucusu
  kaldirildi.

### Play Console

- Reklam yok, resmi kurum degil, finans ozelligi yok ve saglik ozelligi yok
  beyanlari kaydedildi.
- Hedef kitle 18+, kategori Egitim olarak kaydedildi.
- Veri Guvenligi formu veri toplama/paylasma yok olarak kaydedildi.
- Magaza metinleri, 512x512 simge, 1024x500 ozellik grafigi ve dort telefon
  ekran goruntusu kaydedildi.
- Simge ve ozellik grafigi yapay zeka ile uretilmis/duzenlenmis olarak dogru
  bicimde etiketlendi.
- GitHub deposu herkese acik hale getirildi; GitHub Pages `main/docs`
  kaynagindan etkinlestirildi ve gizlilik politikasi
  `https://barisariburnu.github.io/kpss-mini/` adresinde yayinlandi.
- Herkese acik gizlilik URL'si Play Console'a kaydedildi; icerik
  derecelendirmesi dahil 11 ilk kurulum gorevinin 10'u tamamlandi.
- Play App Signing ve otomatik korumanin etkin oldugu dogrulandi; dahili test
  kanali icin `1.0.0 (4) - Dahili Test` taslagi ve Turkce surum notlari
  hazirlandi. Yerel AAB yuklemesi sistem dosya secicisinde kullanici secimini
  bekliyor.
- `destek@barisariburnu.com.tr` herkese acik magaza iletisim e-postasi olarak
  kaydedildi ve Play Console ilk kurulum gorevlerinin tamami tamamlandi.

### Dogrulama

- Yerel Gradle `bundleRelease`: Basarili (285 gorev).
- AAB SHA-256:
  `6809CB6118FB624AC13B641E5FF085333B9F85838828DEF908C291FF0A233A52`.
- AAB sertifika parmak izi yerel `kpss-mini-upload.jks` sertifikasi ile
  eslesiyor.
- Expo CLI `prebuild` denemesi Windows'ta MainApplication yolu nedeniyle
  basarisiz oldu ve geri alindi; production native proje elle yerlestirildi.
- JDK 25 CMake kisitli metot hatasi JDK 21'e gecilerek giderildi.
- `npm run typecheck`: Basarili.
- `npm run lint`: Basarili.
- `npm test`: 2 test dosyasinda 9/9 test basarili.
- `git diff --check`: Basarili.

### Agent Devir Notu

- Play'e yalnizca `builds/kpss-mini-1.0.0-4-local.aab` yuklenmeli; eski EAS
  paketleri yayin disidir.
- Uygulama Expo/EAS hizmetlerini kullanmaz; ancak SQLite, status bar, splash ve
  asset gibi yerel Expo SDK modulleri native build icinde bulunur.
- Play Console ilk kurulumu tamamlandi. Dahili test taslaginda yerel AAB dosya
  secimi, test kullanicilari ve surumu kullanima sunma adimlari bekliyor.

Bu dosya hem urun degisikliklerini hem de agent devir notlarini kronolojik olarak
kaydeder. En yeni kayit en ustte yer alir.

## [Unreleased]

### Eklendi

- Eski `gearapps` anahtar dosyalarina dokunmadan, `kpss-mini-upload.jks` icin
  rastgele guclu parola ile yerel Android yukleme anahtari ve buna bagli
  `credentials.json` uretecek `scripts/create-kpss-mini-keystore.ps1` eklendi.
- `kpss-mini-upload.jks` Android yukleme anahtari olusturuldu; `credentials.json`
  yeni anahtara yonlendirildi. Parolalar veya gizli anahtar verisi gunluge
  yazilmadi.
- KPSS Mini gizlilik politikasi icin mobil uyumlu, Turkce ve marka renkleriyle
  tasarlanmis web sayfasi hazirlandi; sosyal paylasim gorseli uretildi,
  production build'i alindi ve yayimlanabilir Sites surumu kaydedildi.

- Google Play geliştirici sayfası için 512x512 `gearapps` simgesi ile
  4096x2304 üst bilgi görseli üretildi ve `assets/` altına kaydedildi.
- Geliştirici profiline İngilizce ve Türkçe tanıtım metinleri eklendi.
- Mağaza metnine ASO isim seçiminin gerekçesi eklendi.
- Play mağazası için ana ekran, konu seçimi, kart sorusu ve açıklamalı yanıtı
  gösteren dört adet 390x844 gerçek uygulama ekran görüntüsü eklendi.
- Alias ve parolaları ekrana yazdırmadan yerel `credentials.json` oluşturan
  `scripts/configure-local-signing.ps1` yardımcısı eklendi.

### Degistirildi

- Uygulamanın görünen adı ve proje slug'ı, mağazadaki mevcut isimlerle
  çakışmayı azaltmak ve `KPSS` + `bilgi kartları` arama niyetlerini korumak için
  `KPSS Mini: Bilgi Kartları` / `kpss-mini` olarak değiştirildi.
- Uygulama scheme'i `kpssmini`, ana ekran marka satırı `KPSS MINI` olarak
  güncellendi. Play paket kimliği `com.gearapps.kpsshapnot` değişmedi.
- EAS production profili `credentialsSource: local` olarak değiştirildi;
  keystore yalnızca proje sahibinin sağladığı yerel dosyadan alınacak.
- `.gitignore`, `*.keys`, `credentials.json` ve `builds/*.aab` sırlarını ve
  imzalı paketleri Git dışında tutacak şekilde genişletildi.

### Play Console

- `GEAR APPS` kişisel geliştirici hesabı incelendi; kimlik, e-posta ve telefon
  doğrulamalarının tamam olduğu ve hesap düzeyinde politika sorunu bulunmadığı
  görüldü.
- Eksik geliştirici simgesi, üst bilgi resmi ve tanıtım metinleri Play Console'a
  yüklenip kaydedildi.
- Yeni uygulama formunda ad, Türkçe varsayılan dil, ücretsiz uygulama türü ve
  `com.gearapps.kpsshapnot` paket adı hazırlandı; paket adının kullanılabilir
  olduğu Play Console tarafından doğrulandı.
- Uygulama kaydı, hesap sahibinin politika ve ABD ihracat yasası beyanlarını
  açıkça onaylamasını gerektirdiği için bu iki hukuki onay öncesinde durduruldu.
- Hesap sahibi iki beyanı Play Console arayüzünde kabul etti; ardından
  `KPSS Mini: Bilgi Kartları` uygulama kaydı oluşturuldu. Play uygulama kimliği
  `4973727151592484965`.
- Expo/EAS hesabında oturum olmadığı, ayrıca yerel Java/Android SDK bulunmadığı
  ilk kontrolde doğrulandı. Ardından Expo tarayıcı oturumu yetkilendirildi,
  `@barisariburnu/kpss-mini` EAS projesi oluşturuldu ve proje kimliği
  `app.json` dosyasına bağlandı.
- Expo bulutunda Android keystore oluşturuldu, `versionCode` 2'ye yükseltildi
  ve imzalı production AAB başarıyla üretildi.
- `builds/kpss-mini-1.0.0-2.aab` dosyası indirildi; SHA-256 değeri
  `38378732E177270AB511A59F6149FB347ADE6D65348085C3573086AD4A006B18`.
- Proje sahibi `gearapps.keys` ve `gearapps-keystore.jks` dosyalarını sağladı.
  İki dosyanın da parola korumalı PKCS#12 kapsayıcı olduğu, boş parola ile
  açılamadığı ve Git tarafından yok sayıldığı doğrulandı. Gizli değerler
  çıktılara yazdırılmadı.
- İlk yerel anahtarlı EAS denemesi, girilen alias keystore içinde bulunmadığı
  için `EAS_BUILD_INVALID_KEYSTORE_ALIAS_ERROR` ile paket üretmeden durdu.
- Uygulamaya özel `kpss-mini-upload.jks` dosyasının açıldığı, yapılandırılan
  alias'ın mevcut olduğu ve tek bir özel anahtar girdisi içerdiği parolalar
  yazdırılmadan yerel `keytool` ile doğrulandı. Build 4 bu yerel anahtarla
  yeniden başlatıldı.
- Gizlilik politikası Sites projesi oluşturuldu ve kaynak/build sürümü hazır
  edildi; herkese açık deployment hesap sahibinin açık onayı beklenerek
  başlatılmadı.
- Yerel `kpss-mini-upload.jks` ile Android production build 4 başarıyla
  tamamlandı. `builds/kpss-mini-1.0.0-4.aab` indirildi; SHA-256 değeri
  `FC35BB530A9CBAF07640B717830FBE0F13A7FB5A8570FE678F24A8F8A0F47433`.
- AAB içindeki imza sertifikası ile yerel keystore sertifikasının parmak izleri
  eşleştirildi; üretim paketi uygulamaya özel yerel anahtarla imzalıdır.

### Dogrulama

- `npm run typecheck`: Başarılı.
- `npm run lint`: Başarılı.
- `npm test`: 2 test dosyasında 9/9 test başarılı.
- `npx expo config --type public`: Yeni ad, slug, scheme, paket kimliği,
  versionCode 4 ve EAS proje bağlantısı doğrulandı.
- Gizlilik politikası Sites `npm run build`: Başarılı; yayım paketi giriş
  noktası ve hosting metadatası doğrulandı.
- `git diff --check`: Başarılı.

### Agent Devir Notu

- Play Console'daki eski `KPSS Hazırlık 2022` uygulaması Google tarafından
  kaldırılmış durumda ve yeni uygulama için yeniden kullanılmadı. Yeni paket
  kimliği ayrı ve kullanılabilir durumdadır.
- Play uygulama kaydı ve yerel anahtarlı production AAB hazırdır. Yayına devam
  etmek için hazırlanan gizlilik politikası herkese açık yayımlanmalı ve
  uygulama içeriği/Data Safety beyanları hesap sahibi onayıyla gönderilmelidir.
- Expo anahtarıyla üretilen build 2 Play'e yüklenmemelidir. Yerel `gearapps`
  yerine uygulamaya özel `kpss-mini-upload.jks` ile imzalanan build 4
  kullanılmalıdır.
- `kpss-mini-upload.jks` ve `credentials.json` parolaları proje dışında güvenli
  bir parola yöneticisine/yedek konumuna kopyalanmalıdır.

## [1.0.0] - 2026-08-08

### Eklendi

- `expo-sqlite` tabanli `kpss-hap-not.db` veritabani, surumlu sema
  migrasyonlari, indeksler ve parametreli repository sorgulari eklendi.
- Dersler, kartlar, kart ilerlemesi, gunluk calisma, uygulama istatistikleri ve
  icerik surumu icin iliskisel tablolar eklendi; 6 ders ve 24 baslangic karti
  ilk SQL migrasyonu ile cihaza kuruluyor.
- Ders seciminden sonra konu secimini tamamlayan konu ekrani ve konu bazli
  calisma kuyrugu eklendi.
- Veritabani acilis/yazma hatalari icin yeniden deneme ekrani ve kesintisiz hata
  bildirimi eklendi.
- `com.gearapps.kpsshapnot` Android/iOS kimlikleri, 1.0.0 surumu, Android
  `versionCode`, iOS `buildNumber`, acilis ekrani, uygulama simgesi ve EAS AAB
  uretim profili eklendi.
- Google Play icin 512x512 simge ile 1024x500 tanitim grafigi olusturuldu.
- Gizlilik politikasi, Data Safety taslagi, Google Play magazasi metinleri,
  production kontrol listesi, on binlerce kart icin icerik boru hatti ve
  PostgreSQL yonetim semasi `docs/` altina eklendi.
- SQLite sema kurulumu, migrasyon idempotency'si ve veri kisitlari icin 3 yeni
  otomatik test eklendi.
- Expo SQLite web onizlemesinin WASM varligini paketleyebilmesi icin Metro ayari
  eklendi.

### Degistirildi

- Gelistirici/marka adi `gearapps`, paket surumu `1.0.0` ve uygulama paket adi
  `com.gearapps.kpsshapnot` olarak ayarlandi.
- Calisma zamani icerigi ve kullanici ilerlemesi TypeScript/JSON listeleri ile
  AsyncStorage yerine tamamen SQLite sorgularindan okunup yazilir hale getirildi.
- Statik icerik dosyalari, AsyncStorage hook'u ve sahte sponsor/reklam alani
  kaldirildi. Uretim paketinde reklam veya analitik SDK'si bulunmuyor.
- Alt navigasyon ve kart aksiyonlarindaki metin karakterleri yerine erisilebilir
  Ionicons simgeleri kullanildi.
- 320 px genislikte tasan ana sayfa basligi, rozet boyutu, metin sarma davranisi
  ve calisma sonrasi geri donus akisi duzeltildi.
- Ana ekrana `gearapps` ve uygulamanin OSYM ile baglantili olmadigini belirten
  bagimsizlik aciklamasi eklendi.
- Kart modeline kaynak adi/URL'si, icerik surumu ve dogrulanma durumu eklendi.

### Dogrulama

- `npm run typecheck`: Basarili.
- `npm run lint`: Basarili.
- `npm test`: 2 test dosyasinda 9/9 test basarili.
- `npx expo install --check`: Tum bagimliliklar Expo SDK 57 ile uyumlu.
- `npx expo config --type public`: Paket kimlikleri, surumler ve magazaya yonelik
  uygulama ayarlari dogrulandi.
- `npx expo export --platform all --output-dir dist`: Android, iOS ve web uretim
  paketleri basariyla olusturuldu.
- 320x568, 360x740 ve 390x844 gorunumlerde ana sayfa, ders-konu-kart akisi,
  cevap acma, kaydetme, ogrenme, oturum bitirme ve sayfa yenilemesi sonrasi
  SQLite kaliciligi dogrulandi; son tarayici konsolu temizdi.

### Agent Devir Notu

- Uygulama kodu production adayi durumunda; Google Play'e gonderimden once
  `gearapps` hesabinda destek e-postasi, herkese acik HTTPS gizlilik politikasi,
  Data Safety formu, icerik derecelendirmesi, Play App Signing, gercek Android
  ekran goruntuleri ve kapali test tamamlanmali.
- Mevcut 24 kart yalnizca baslangic verisidir. 10.000+ gercek kart icin
  `docs/CONTENT_PIPELINE.md` icindeki lisansli kaynak, cift editor onayi,
  PostgreSQL staging, surumlu SQLite paket/delta ve checksum akisi izlenmeli.
  Ucuncu taraf uygulama/kitap icerigi izinsiz kopyalanmamalidir.
- 10.000 kart sinirina yaklasmadan repository sorgulari sayfalanmali ve arama
  icin SQLite FTS5 eklenmelidir; mevcut MVP kucuk veri setini bellekte tutuyor.
- `npm audit --omit=dev`, Expo/Metro arac zincirindeki dolayli paketlerden 8 orta
  ve 11 yuksek uyari bildiriyor. Onerilen `--force` cozumu Expo 57'yi uyumsuz
  Expo 53'e dusurdugu icin uygulanmadi; Expo'nun uyumlu guncellemesi izlenmeli.
- Uretim paketinde reklam SDK'si yoktur. Daha sonra reklam eklenecekse yalnizca
  ana ekran altinda dogal/sabit alan kullanilmali; SDK eklendiginde gizlilik ve
  Data Safety beyanlari yeniden degerlendirilmelidir.

## [0.1.0] - 2026-08-08

### Eklendi

- Proje amaci, MVP sinirlari, gelistirme ilkeleri ve teslim kontrol listesini
  tanimlayan `AGENTS.md` olusturuldu.
- Agent calismalarinin izlenebilmesi icin bu degisiklik gunlugu olusturuldu.
- Expo SDK 57, React Native ve TypeScript tabanli Android/iOS mobil uygulama
  iskeleti kuruldu.
- Turkce, Matematik, Tarih, Cografya, Vatandaslik ve Guncel Bilgiler icin 24
  cevrimdisi ornek hap bilgi karti eklendi.
- Gunluk hedef, ders bazli calisma, aktif hatirlama, "ogrendim/tekrar et",
  kart kaydetme ve oturum sonu ozeti akislari eklendi.
- Cihazda kalici ilerleme, gunluk calisma ve kaydedilen kart durumu eklendi.
- Ana sayfa, kaydedilenler ve ders bazli ilerleme ekranlari ile erisilebilir alt
  gezinme eklendi.
- Saf ilerleme kurallari icin otomatik davranis testleri eklendi.
- Kurulum, urun arastirmasi, reklam stratejisi, kaynak yapisi ve kalite
  komutlarini aciklayan `README.md` eklendi.
- Expo web onizlemesi icin SDK ile uyumlu React DOM ve React Native Web
  bagimliliklari eklendi.

### Degistirildi

- Reklam stratejisi; acilista, kartlar arasinda veya calisma oturumunda reklam
  gostermeyecek, yalnizca ana sayfanin alt bolumunde kapatilabilir ve sabit bir
  sponsor alani kullanacak sekilde sinirlandi.

### Dogrulama

- `npx expo install --check`: Tum bagimliliklar Expo SDK 57 ile uyumlu.
- `npm run typecheck`: Basarili.
- `npm run lint`: Basarili.
- `npm test`: 1 test dosyasinda 6/6 test basarili.
- 390x844 ve 360x740 mobil gorunumlerde ana sayfa, kart cevabi, kaydetme,
  ilerleme ve kalici yerel durum tarayici onizlemesiyle dogrulandi.
- Onizlemede yakalanan ic ice dokunma hedefi duzeltildi; son konsol kontrolunde
  hata veya uyari kalmadi.
- `npx expo export --platform all`: Android, iOS ve web uretim paketleri
  basariyla olusturuldu.

### Agent Devir Notu

- Baslangic dizini bostu; tum proje dosyalari bu oturumda olusturuldu.
- Magaza incelemesinde rakiplerin soru bankasi, yapay zeka, lig ve sosyal
  ozelliklere yogunlastigi; kisa bilgiler, flash kart, hata/tekrar listesi ve
  konu bazli ilerlemenin ortak cekirdek deger oldugu goruldu.
- MVP bilincli olarak hesap, sunucu, bildirim, sosyal ozellik, yapay zeka ve
  kapsamli deneme sinavi motoru icermiyor.
- `npm audit --omit=dev` Expo/Metro arac zincirindeki dolayli paketlerden 7 orta
  ve 11 yuksek uyarı bildiriyor. Onerilen otomatik cozum React Native'i Expo 57
  ile uyumsuz eski bir surume dusurdugu icin `--force` uygulanmadi; Expo'nun
  uyumlu guvenlik guncellemesi izlenmeli.
- Arayuzdeki sponsor alani yerlesim prototipidir; gercek reklam SDK'si, izleme
  veya reklam agi kimligi eklenmedi.
