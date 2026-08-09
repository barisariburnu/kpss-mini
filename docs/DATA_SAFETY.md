# Google Play Data Safety Taslağı

Bu taslak yalnızca uygulamanın mevcut `1.0.0` davranışına göre hazırlanmıştır.
Play Console beyanı gönderilmeden önce üretilen AAB içindeki tüm SDK'lar yeniden
kontrol edilmelidir.

| Soru | Mevcut sürüm yanıtı |
| --- | --- |
| Uygulama kullanıcı verisi topluyor mu? | Hayır |
| Kullanıcı verisi üçüncü taraflarla paylaşılıyor mu? | Hayır |
| Veriler aktarım sırasında şifreleniyor mu? | Uygulama kullanıcı verisi aktarmıyor |
| Kullanıcı veri silme talebinde bulunabilir mi? | Hesap/uzak veri yok; yerel veri uygulama verisi temizlenerek silinir |
| Hesap oluşturma var mı? | Hayır |
| Reklam SDK'sı var mı? | Hayır |
| Analiz veya çökme raporlama SDK'sı var mı? | Hayır |

Yerel çalışma ilerlemesi cihazdaki `kpss-hap-not.db` SQLite veritabanında tutulur.
Android otomatik yedekleme kapalıdır.

Reklam, analiz, uzaktan içerik senkronizasyonu veya hesap özelliği eklendiğinde
bu belge geçersiz olur; ilgili SDK'nın Data Safety bildirimi incelenmeli ve Play
Console beyanı güncellenmelidir.
