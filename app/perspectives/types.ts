export interface Perspective {
  id: number;
  title: string;
  shortDescription: string;
  date: Date;
  tags: string[];
  content: string;
  isResult: boolean;
  result?: string;
}

export const perspectives: Perspective[] = [
  {
    id: 1,
    title: "İlk Perspektif",
    shortDescription: "Yeni başlayanlar için temel kavramlar ve öneriler.",
    date: new Date("2023-10-01"),
    tags: ["Yeni", "Önemli"],
    content: `
## Başlarken Dikkat Edilmesi Gerekenler

### 1. Temel Prensipler
- Düzenli çalışma
- Pratik yapma
- Geri bildirim alma

> **İpucu**: Acele etmeden, adım adım ilerlemek önemlidir.

Daha fazla bilgi için [kaynak merkezi](https://example.com/resources) sayfasını ziyaret edebilirsiniz.
    `,
    isResult: true,
    result:
      "Temel kavramların öğrenilmesi ve pratik uygulamaların geliştirilmesi konusunda başarılı sonuçlar elde edildi. Özellikle geri bildirimlerin olumlu olması, yaklaşımın doğruluğunu kanıtladı.",
  },
  {
    id: 2,
    title: "Yapay Zeka ve Etik",
    shortDescription:
      "Yapay zeka teknolojilerinin etik boyutları üzerine bir inceleme.",
    date: new Date("2023-11-15"),
    tags: ["Teknoloji", "Etik", "AI"],
    content: `
## Yapay Zeka ve Etik Sorunlar


### Önemli Noktalar:
- [x] Veri koruma politikaları
- [ ] Şeffaflık düzenlemeleri
- [ ] İş gücü adaptasyonu

> Not: Bu konular sürekli güncellenmekte ve yeni başlıklar eklenmektedir.

Detaylı bilgi için [etik kurallar](https://example.com) sayfasını ziyaret edebilirsiniz.

    `,
    isResult: false,
  },
  {
    id: 3,
    title: "Sürdürülebilir Yaşam",
    shortDescription:
      "Günlük hayatta sürdürülebilirlik pratikleri ve etkileri.",
    date: new Date("2023-12-01"),
    tags: ["Çevre", "Yaşam", "Sürdürülebilirlik"],
    content: `
## Sürdürülebilir Yaşam Rehberi

### Günlük Alışkanlıklar
1. **Enerji Tasarrufu**
   - LED ampul kullanımı
   - Enerji verimli cihazlar
   - Doğal aydınlatma

2. **Atık Yönetimi**
   - Geri dönüşüm
   - Kompost yapımı
   - Sıfır atık hedefi

### Tüketim Alışkanlıkları Karşılaştırması


> 💡 **Önemli Not**: Küçük değişiklikler büyük etkiler yaratabilir.

#### İlerleme Durumu:
- [x] Enerji tasarrufu planı
- [x] Geri dönüşüm sistemi
- [ ] Sıfır atık hedefi
- [ ] Yerel üretici desteği

Daha detaylı bilgi için [sürdürülebilir yaşam rehberi](https://example.com/sustainable) sayfamızı ziyaret edin.
    `,
    isResult: true,
    result:
      "Sürdürülebilir yaşam pratiklerinin uygulanması sonucunda enerji tüketimi ve atık miktarında önemli azalmalar gözlemlendi. Karbon ayak izinin küçültülmesi hedefine büyük oranda ulaşıldı.",
  },
  {
    id: 4,
    title: "Dijital Minimalizm",
    shortDescription:
      "Modern çağda dijital minimalizmin önemi ve uygulama yöntemleri.",
    date: new Date("2024-01-10"),
    tags: ["Yaşam Tarzı", "Teknoloji", "Minimalizm"],
    content: `
## Dijital Minimalizm Kılavuzu

### Neden Dijital Minimalizm?
Günümüzde teknoloji bağımlılığı giderek artıyor. İşte bazı istatistikler:



### Uygulama Adımları
1. **Dijital Detoks**
   - Bildirimleri kapatma
   - Uygulama sınırlamaları
   - Ekran molası planı

2. **Verimlilik Odaklı Kullanım**
   - Önemli uygulamalar listesi
   - Zaman yönetimi araçları
   - Otomatikleştirme

> **Hatırlatma**: Teknoloji bir araçtır, amaç değil.

#### İlerleme Takibi:
- [x] Bildirim optimizasyonu
- [x] Uygulama düzenlemesi
- [ ] Dijital detoks planı
- [ ] Verimlilik takibi

Daha fazla ipucu için [dijital denge](https://example.com/digital-balance) sayfamızı inceleyin.
    `,
    isResult: true,
    result:
      "Dijital minimalizm prensiplerinin uygulanması, ekran süresinde ve dijital stres seviyesinde belirgin düşüş sağladı. Verimlilik artışı gözlemlendi ve daha sağlıklı bir teknoloji kullanımı alışkanlığı geliştirildi.",
  },
  {
    id: 5,
    title: "Uzaktan Çalışma Kültürü",
    shortDescription: "Uzaktan çalışmanın iş kültürüne etkileri ve geleceği.",
    date: new Date("2024-02-20"),
    tags: ["İş Yaşamı", "Teknoloji", "Kültür"],
    content: `
## Uzaktan Çalışma Rehberi

### Avantajlar ve Dezavantajlar



### Başarılı Uzaktan Çalışma İçin:
1. **İş Ortamı Düzenleme**
   - Ergonomik çalışma alanı
   - Profesyonel arka plan
   - Teknik altyapı


2. **İletişim Stratejileri**
   - Düzenli check-in'ler
   - Sanal kahve molaları
   - Dokümentasyon kültürü

> **Önemli**: Uzaktan çalışma, bir zorunluluk değil fırsat olarak görülmeli.

#### Geçiş Süreci:
- [x] Altyapı hazırlığı
- [x] Ekip eğitimi
- [ ] Süreç optimizasyonu
- [ ] Performans metrikleri
![image](https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=800)

Detaylı bilgi için [uzaktan çalışma klavuzu](https://example.com/remote-work) sayfamızı ziyaret edin.
    `,
    isResult: false,
  },
];
