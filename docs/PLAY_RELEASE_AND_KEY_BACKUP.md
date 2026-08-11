# Google Play İlk Yayın ve Anahtar Yedekleme Rehberi

Son güncelleme: 11 Ağustos 2026

## İlk production erişimi

13 Kasım 2023'ten sonra açılan yeni kişisel geliştirici hesaplarında, production
erişimine başvurmadan önce en az 12 test kullanıcısının kapalı teste aralıksız
14 gün katılmış olması gerekir. Kullanıcıların bu süre boyunca testten
çıkmaması gerekir. Bu koşul kuruluş hesaplarına ve daha eski kişisel hesaplara
aynı şekilde uygulanmaz.

KPSS Mini hesabında production kanalı açık ve sürüm Google incelemesinde olduğu
için 12 kullanıcı/14 gün kapısı bu uygulamanın mevcut yayınını engellemiyor.

Resmî kaynak:
https://support.google.com/googleplay/android-developer/answer/14151465

## İlk yayın kontrolü

1. Geliştirici kimliği, iletişim bilgileri ve ödeme profili doğrulanır.
2. Benzersiz paket kimliği ve artan `versionCode` ile imzalı AAB hazırlanır.
3. Mağaza adı, açıklamalar, simge, özellik grafiği ve ekran görüntüleri girilir.
4. Gizlilik politikası, Veri Güvenliği, reklam, hedef kitle, içerik
   derecelendirmesi ve diğer uygulama içeriği beyanları gerçeğe uygun doldurulur.
5. Resmî bilgi sunuluyorsa kamu kurumu bağımsızlık beyanı ve çalışan resmî
   kaynak URL'leri hem uygulamada hem mağaza kaydında gösterilir.
6. Reklam SDK'ları ve üçüncü taraf SDK'ların veri davranışı beyanlara eklenir.
7. Play ön kontrolleri geçtikten sonra production değişiklikleri incelemeye
   gönderilir. İlk inceleme yedi gün veya istisnai olarak daha uzun sürebilir.
8. Türkiye'de kullanıcı verisi işleniyorsa KVKK kapsamındaki aydınlatma,
   veri minimizasyonu, saklama ve kullanıcı başvuru süreçleri güncel tutulur.
   Bu madde hukuki danışmanlık yerine geçmez.

AdMob `app-ads.txt` doğrulaması için dosya geliştirici web sitesinin hostname
kökünde bulunmalıdır. Örneğin mağaza web sitesi
`https://barisariburnu.github.io/kpss-mini/` ise taranan adres
`https://barisariburnu.github.io/app-ads.txt` olur; alt dizindeki dosya tek başına
yeterli değildir.

## Saklanması gereken imzalama dosyaları

- `kpss-mini-upload.jks`: Yerel upload anahtarının kendisi.
- `credentials.json`: Keystore yolu, alias ve parolalar. Ayrı ve şifreli
  saklanmalıdır.
- Anahtar alias'ı, keystore ve key parolalarının çevrimdışı yedeği.
- Keystore sertifikasının SHA-1 ve SHA-256 parmak izleri.
- Play App Signing sayfasındaki uygulama imzalama ve upload sertifikalarının
  indirilen kopyaları.
- Her production sürümünün AAB dosyası, `mapping.txt` çıktısı, sürüm notları,
  `versionCode`, Git etiketi/commit'i ve SHA-256 özeti.
- Play Console/AdMob hesap sahibi ve kurtarma yöntemleri için güvenli erişim
  kayıtları.

`credentials.json` ve JKS dosyası korunursa aynı upload anahtarıyla sonraki
sürümler yerelde imzalanıp Play'e yüklenebilir. Play App Signing etkin olduğu
için son kullanıcıya dağıtılan uygulama Google'ın uygulama imzalama anahtarıyla
imzalanır. Upload anahtarı kaybolursa Play Console üzerinden sıfırlama süreci
vardır; uygulama imzalama anahtarının yönetimi ise Play App Signing kurallarına
tabidir.
