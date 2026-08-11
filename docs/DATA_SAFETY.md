# Google Play Data Safety Taslağı

## Play'de incelemedeki versionCode 6

Bu paket reklam SDK'sı içermez; mevcut “veri toplanmıyor/paylaşılmıyor” ve
“Reklam Kimliği kullanılmıyor” beyanları v6 için geçerlidir.

## AdMob'lu versionCode 7 adayı

Bu taslak yeni AAB yüklenmeden önce Play Console'a işlenmelidir.
Play Console beyanı gönderilmeden önce üretilen AAB içindeki tüm SDK'lar yeniden
kontrol edilmelidir.

| Soru | Mevcut sürüm yanıtı |
| --- | --- |
| Uygulama kullanıcı verisi topluyor mu? | Evet; Google Mobile Ads SDK tarafından |
| Kullanıcı verisi üçüncü taraflarla paylaşılıyor mu? | Evet; Google ile reklam sunumu, ölçüm, analiz ve sahtekârlığı önleme amaçlarıyla |
| Veriler aktarım sırasında şifreleniyor mu? | Evet, TLS ile |
| Kullanıcı veri silme talebinde bulunabilir mi? | Hesap/uzak veri yok; yerel veri uygulama verisi temizlenerek silinir |
| Hesap oluşturma var mı? | Hayır |
| Reklam SDK'sı var mı? | Evet; Google Mobile Ads ve UMP |
| Analiz veya çökme raporlama SDK'sı var mı? | Hayır |

Yerel çalışma ilerlemesi cihazdaki `kpss-hap-not.db` SQLite veritabanında tutulur.
Android otomatik yedekleme kapalıdır.

Play formunda yaklaşık konum, uygulama etkileşimleri, teşhis verileri ve cihaz/
diğer tanımlayıcılar Google Mobile Ads SDK'nın güncel veri açıklamasına göre
işaretlenmelidir. Amaç ve “toplanıyor/paylaşılıyor” seçimleri yüklenen SDK sürümü
ve AdMob yapılandırmasıyla son kez karşılaştırılmalıdır.
