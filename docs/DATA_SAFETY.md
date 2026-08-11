# Google Play Data Safety Taslağı

## Play'de incelemedeki versionCode 7

AdMob'lu v7 paketi 11 Ağustos 2026'da production kanalına yüklenmiş ve bu
belgedeki yanıtlarla birlikte incelemeye gönderilmiştir.

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

Play formunda yaklaşık konum, uygulama işlemleri, teşhisler ve cihaz/diğer
kimlikler Google Mobile Ads SDK'nın güncel veri açıklamasına göre hem toplanan hem
paylaşılan olarak işaretlendi. Her veri türü için reklam/pazarlama, analiz ve
sahtekârlığı önleme amaçları; aktarım sırasında şifreleme ve zorunlu toplama
yanıtları kaydedildi.
