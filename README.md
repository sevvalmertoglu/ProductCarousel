# ProductCarousel

Bu proje, **Ebebek** web sitesindeki ana sayfada bulunan ürün kaydırıcısının bir replikasını oluşturmayı amaçlamaktadır. Proje, JavaScript kullanılarak geliştirilmiş ve kullanıcı etkileşimleri ile ürünler hakkında dinamik bilgiler göstermektedir. 

# NOT: stories bölümü sitede yer almadığı için b-banner-with-product-carousel'ın altına eklenmiştir.

## Proje Özellikleri

- **Ürün Listesi**: Ürünler, sağlanan API linki üzerinden alınır.
- **Kaydırıcı Başlığı**: Kaydırıcı başlığı “Beğenebileceğinizi düşündüklerimiz” olarak belirlenmiştir.
- **Responsive Tasarım**: Tasarım, tüm platformlarda düzgün çalışacak şekilde responsive olarak tasarlanmıştır.
- **Ürün Detayları**: Kullanıcı bir ürüne tıkladığında, ilgili ürün sayfası yeni bir sekmede açılır.
- **Fiyat ve İndirim**: Eğer ürünün `price` ve `original_price` değerleri farklı ise, her iki fiyat gösterilir ve indirim miktarı hesaplanır.
- **Favori Ürünler**: Kullanıcı, ürünün kalp simgesine tıkladığında bu ürün favorilerine eklenir ve bu tercih yerel depolamada saklanır.
- **Favori Ürünler**: Kod ikinci kez çalıştırıldığında, favorilere eklenen ürünler tekrar gösterilir ve dolu kalp simgeleri ile işaretlenir.

## Gereksinimler

- **JavaScript**: Tüm mantık yalnızca JavaScript ile yazılmıştır.
- **jQuery**: jQuery (isteğe bağlı) kullanılabilir.
- **Chrome Developer Tools**: Proje, Chrome Developer Tools konsolunda çalıştırılabilir olmalıdır.

### Proje Dosyaları

- `productCarousel.js`: JavaScript dosyası. Tüm mantık burada yer almaktadır.
