# Degisiklik Gunlugu

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
