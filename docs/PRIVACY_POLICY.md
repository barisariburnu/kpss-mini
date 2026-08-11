# KPSS Mini Gizlilik Politikası

Son güncelleme: 11 Ağustos 2026

KPSS Mini, `gearapps` tarafından geliştirilen bağımsız bir eğitim
uygulamasıdır. Uygulama ÖSYM'yi veya başka bir kamu kurumunu temsil etmez.

## Toplanan veriler

Uygulama kullanıcı hesabı oluşturmaz, ad, e-posta veya telefon numarası istemez
ve çalışma kayıtlarını `gearapps` sunucularına göndermez.

Aşağıdaki çalışma verileri yalnızca kullanıcının cihazındaki yerel SQLite
veritabanında saklanır:

- öğrenilen ve tekrar bekleyen kartlar,
- kaydedilen kartlar,
- günlük çalışma kaydı,
- tamamlanan çalışma turu sayısı.

Bu çalışma verileri üçüncü taraflarla paylaşılmaz. Android yedekleme özelliği
uygulama yapılandırmasında kapalıdır.

## Reklam ve Google Mobile Ads

Uygulama, ana ekranın alt bölümünde rahatsız etmeyen bir banner reklam
göstermek için Google AdMob ve Google Mobile Ads SDK kullanır. Açılışta, bilgi
kartları arasında veya tam ekran reklam gösterilmez. Reklam istekleri varsayılan
olarak kişiselleştirilmemiş reklamlarla sınırlandırılmıştır.

Google Mobile Ads SDK; reklam sunumu, ölçüm, analiz ve sahtekârlığın önlenmesi
amaçlarıyla aşağıdaki verileri otomatik olarak toplayabilir ve Google ile
paylaşabilir:

- IP adresinden çıkarılabilen yaklaşık konum,
- uygulama açılışı, reklam görüntüleme ve dokunma gibi ürün etkileşimleri,
- uygulama ve SDK performansına ilişkin teşhis verileri,
- reklam kimliği, uygulama seti kimliği ve benzeri cihaz tanımlayıcıları.

Bu aktarım TLS ile şifrelenir. Verilerin işlenmesine ilişkin ayrıntılar
[Google Gizlilik Politikası](https://policies.google.com/privacy) ve
[Google reklam teknolojileri](https://policies.google.com/technologies/ads)
sayfalarında açıklanır.

Avrupa Ekonomik Alanı, Birleşik Krallık ve ilgili diğer bölgelerde gerekli
olduğunda Google User Messaging Platform aracılığıyla kullanıcı tercihi alınır;
reklam SDK'sı izin durumu reklam isteğine uygun olmadan başlatılmaz. Gerekli
bölgelerde kullanıcı ana sayfadaki "Reklam gizlilik tercihleri" bağlantısından
tercihini yeniden açabilir.

## Verilerin silinmesi

Uygulama hesap oluşturmadığı için gearapps tarafından uzaktan tutulan bir
kullanıcı profili yoktur. Kullanıcı, Android ayarlarından uygulama verisini
temizleyerek veya uygulamayı kaldırarak cihazdaki çalışma verilerini silebilir.
Google tarafından reklam amaçlı işlenen veriler için Google hesabındaki reklam
ve gizlilik kontrolleri kullanılabilir.

## Çocukların gizliliği

Google Play hedef kitlesi 18 yaş ve üzeridir. Uygulama çocuklara yönelik olarak
tasarlanmamıştır ve reklam istekleri çocuklara yönelik olarak etiketlenmez.

## Değişiklikler ve iletişim

Bu politika uygulamanın işleyişi değiştiğinde güncellenebilir. Gizlilikle ilgili
talepler `destek@barisariburnu.com.tr` adresine iletilebilir.
