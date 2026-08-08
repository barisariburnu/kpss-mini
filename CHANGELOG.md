# Degisiklik Gunlugu

Bu dosya hem urun degisikliklerini hem de agent devir notlarini kronolojik olarak
kaydeder. En yeni kayit en ustte yer alir.

## [Unreleased]

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
