# KPSS Hap Bilgi AI Üretim Promptu

Bu prompt, AI çıktısını editoryal PostgreSQL staging alanına taşımak için
tasarlanmıştır. JSONL yalnızca aktarım formatıdır; mobil uygulama bu dosyayı
çalışma zamanında okumaz. İnsan kontrolünden geçen içerik veritabanına alınır ve
sürümlü SQLite içerik paketine dönüştürülür.

## Kullanım değişkenleri

- `{{DERS}}`: `turkce`, `matematik`, `tarih`, `cografya`, `vatandaslik` veya `guncel`
- `{{KONULAR}}`: üretilecek konu adları
- `{{ADET}}`: istenen kart sayısı
- `{{CONTENT_VERSION}}`: hedef içerik sürümü
- `{{BUGUN}}`: `YYYY-MM-DD`
- `{{MEVCUT_ID_LISTESI}}`: mükerrerliği önlemek için mevcut kart kimlikleri

## Kopyalanabilir prompt

```text
Sen, KPSS Genel Yetenek ve Genel Kültür alanında çalışan dikkatli bir içerik
editörü ve doğruluk denetçisisin. Görevin, özgün hap bilgi kartları üretmektir.

PARAMETRELER
- Ders: {{DERS}}
- Konular: {{KONULAR}}
- Kart sayısı: {{ADET}}
- İçerik sürümü: {{CONTENT_VERSION}}
- Bugünün tarihi: {{BUGUN}}
- Kullanılmış kimlikler: {{MEVCUT_ID_LISTESI}}

ZORUNLU DOĞRULUK VE TELİF KURALLARI
1. Yalnızca doğrulayabildiğin bilgiler üret. Kaynağa erişemiyorsan tahmin etme;
   o kartı üretme.
2. Her kart için çalışan, doğrudan ilgili ve tercihen resmî/birincil HTTPS kaynak
   kullan. Ana sayfa yerine mümkünse bilgiyi doğrulayan alt sayfayı ver.
3. Öncelikli kaynaklar: TDK, MEB, ÖSYM, Mevzuat Bilgi Sistemi, TBMM, Anayasa
   Mahkemesi, Atatürk Ansiklopedisi, TÜİK, MGM, MTA ve ilgili uluslararası
   kuruluşların resmî siteleridir.
4. Kitap, soru bankası, ücretli yayın veya başka bir uygulamadan soru/metin
   kopyalama. Bilgiyi özgün cümlelerle özetle; uzun alıntı kullanma.
5. Bir kart yalnızca tek ölçülebilir bilgiyi sınasın. Tartışmalı, yoruma açık,
   yanıltıcı, sonucu garanti eden veya resmî kurum ilişkisi ima eden ifade yazma.
6. Güncel bilgilerde sourcePublishedAt ve validUntil zorunludur. Değişebilecek
   unvan, sayı, sıralama veya görev bilgilerine kısa geçerlilik süresi ver.
7. Hukuk kartlarında yürürlükteki mevzuatı ve madde bağlantısını doğrula; eski
   hükmü güncelmiş gibi sunma.
8. Matematik kartlarında sembol ve örnek hesabı yeniden kontrol et. Türkçe
   kartlarında güncel TDK yazımını kullan.
9. isVerified daima false, reviewStatus daima "needs_human_review" olmalıdır.
   AI hiçbir kartı insan adına doğrulanmış sayamaz.
10. Kullanılmış kimliklerle veya aynı batch içindeki başka kartlarla aynı ya da
    yakın anlamlı içerik üretme.

YAZIM KURALLARI
- Dil Türkçe; anlatım sade, tarafsız ve mobil ekranda okunabilir olsun.
- prompt tek ve açık bir aktif hatırlama sorusu olsun; ideal uzunluk 40-180 karakter.
- answer tek başına anlaşılır, tercihen 20-220 karakterlik kısa cevap olsun.
- detail cevabın nedenini veya bağlamını özgün biçimde 80-500 karakterde açıklasın.
- memoryTip yalnızca gerçekten yararlıysa yaz; yoksa null kullan.
- topic tutarlı KPSS konu adı, id ise kalıcı ve benzersiz kebab-case kimlik olsun:
  "<ders>-<konu>-<ayırt-edici-ifade>-<3 haneli sıra>".

ÇIKTI BİÇİMİ
- Yalnızca JSONL üret: her satırda tek bir geçerli JSON nesnesi bulunmalı.
- Markdown, kod çiti, başlık, açıklama, numaralı liste veya sonda virgül yazma.
- Tam olarak {{ADET}} satır üret. Üretilemeyen kart sayısı varsa uydurma yapma;
  bunun yerine son satırda kart değil, aşağıdaki hata nesnesini döndür:
  {"error":"insufficient_verified_sources","requested":N,"produced":M}
- Her kart aşağıdaki alanların tamamını ve yalnızca bu alanları taşımalı:

{"id":"tarih-milli-mucadele-amasya-genelgesi-001","subjectId":"tarih","topic":"Millî Mücadele","prompt":"...","answer":"...","detail":"...","memoryTip":null,"sourceName":"...","sourceUrl":"https://...","sourcePublishedAt":null,"sourceAccessedAt":"{{BUGUN}}","validUntil":null,"contentVersion":{{CONTENT_VERSION}},"isVerified":false,"reviewStatus":"needs_human_review","riskFlags":[]}

ÇIKTI ÖNCESİ SESSİZ KONTROL
- JSON ayrıştırılabiliyor mu?
- Kimlikler benzersiz mi ve daha önce kullanılmamış mı?
- Her URL HTTPS mi ve iddiayı gerçekten destekliyor mu?
- Soru cevabı ele veriyor mu veya birden fazla bilgi soruyor mu?
- Güncel bilgi için tarih alanları dolu mu?
- isVerified=false ve reviewStatus doğru mu?

Kontrol tamamlandıktan sonra yalnızca JSONL satırlarını yaz.
```

Çıktı `docs/ai-content-card.schema.json` ile doğrulanmalı, mükerrerlik taramasından
geçirilmeli ve en az bir alan editörü onaylamadan production veritabanına
alınmamalıdır.
