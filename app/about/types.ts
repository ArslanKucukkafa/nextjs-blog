export interface Experience {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  schoolName: string;
  schoolDegree: string;
  department: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  skillName: string;
  skillLevel: string;
  skillDescription: string;
}

export interface AboutData {
  id: string;
  name: string;
  location: string;
  status: string;
  email: string;
  aboutSelf: string;
  experiences: Experience[];
  education: Education[];
  goal: string;
  skills: Skill[];
}

// Örnek veri
export const exampleAboutData: AboutData = {
  id: "about",
  name: "ARSLAN KUCUKKAFA",
  location: "Corum, Turkey",
  status: "Çalışmıyor, Aktif İş Arıyor",
  email: "arslankucukkafa@gmail.com",
  aboutSelf: `Merhaba! Ben Arslan Küçükkafa, yazılım dünyasında çözüm üretmeyi ve öğrenmeyi bir yaşam biçimi haline getirmiş bir geliştiriciyim. Özellikle web teknolojilerine ilgi duyuyor ve frontend ile backend geliştirme süreçlerini uçtan uca ele almayı seviyorum.

Kariyerimde, küçük ve orta ölçekli işletmeler için kullanıcı dostu, modern ve etkili web siteleri oluşturma üzerine yoğunlaştım. HTML, CSS3, PHP, jQuery, WordPress ve SEO konularında deneyimliyim. Aynı zamanda ReactJS, Spring Boot ve MongoDB gibi teknolojilerle ölçeklenebilir uygulamalar geliştirme konusunda uzmanlık kazandım.

Yazılım geliştirme sürecinde en çok değer verdiğim şeylerden biri düzenli ve açık iletişimdir. Kullanıcı ihtiyaçlarını anlamak ve onları en iyi şekilde karşılayacak çözümler üretmek benim için önceliklidir.

Bunun yanı sıra, sürekli öğrenmeye ve yeni teknolojilere adapte olmaya inanıyorum. Rust, Kubernetes ve Cloud Computing gibi alanlarda kendimi geliştirerek, daha etkili ve yenilikçi çözümler üretmeye devam ediyorum.

Eğer teknolojiyle hayatı kolaylaştırma fikri sizin için de heyecan vericiyse, birlikte çalışmak için sabırsızlanıyorum!`,
  experiences: [
    {
      companyName: "Şirket Adı",
      position: "Pozisyon",
      startDate: "Başlangıç Tarihi",
      endDate: "Bitiş Tarihi",
      description: "Açıklama",
    },
    {
      companyName: "Şirket Adı",
      position: "Pozisyon",
      startDate: "Başlangıç Tarihi",
      endDate: "Bitiş Tarihi",
      description: "Açıklama",
    },
    {
      companyName: "Şirket Adı",
      position: "Pozisyon",
      startDate: "Başlangıç Tarihi",
      endDate: "Bitiş Tarihi",
      description: "Açıklama",
    },
  ],
  education: [
    {
      schoolName: "Okul Adı",
      schoolDegree: "Derece",
      department: "Bölüm",
      startDate: "Başlangıç Tarihi",
      endDate: "Bitiş Tarihi",
    },
    {
      schoolName: "Okul Adı",
      schoolDegree: "Derece",
      department: "Bölüm",
      startDate: "Başlangıç Tarihi",
      endDate: "Bitiş Tarihi",
    },
  ],
  goal: `Her zaman daha iyi bir versiyonumu oluşturmayı hedefleyen bir yazılım geliştiriciyim. Temel hedefim, teknolojiyi kullanarak insanların hayatlarını kolaylaştıran ve değer katan çözümler üretmek.

Kariyerimde, kullanıcı dostu, hızlı ve güvenilir yazılımlar geliştirme konusunda uzmanlaşmayı ve büyük ölçekli projelerde fark yaratmayı istiyorum. Özellikle yapay zeka, bulut bilişim ve dağıtık sistemler alanlarında derinlemesine bilgi sahibi olarak, yazılım dünyasına yenilikçi yaklaşımlar kazandırmayı hedefliyorum.

Kısa vadede, İngilizce becerilerimi geliştirmeye odaklanarak, global platformlarda daha fazla bilgiye erişmeyi ve uluslararası projelerde yer almayı amaçlıyorum. Uzun vadede ise hem teknik bilgimi hem de liderlik yeteneklerimi geliştirerek büyük ekiplerin yönlendirilmesine katkıda bulunmak ve sektörde ilham veren bir isim olmak istiyorum.

Her gün küçük adımlarla büyümeye, öğrenmeye ve hayallerimi gerçekleştirmek için çalışmaya devam ediyorum. Çünkü inanıyorum ki gerçek başarı, sürekliliği olan bir gelişim yolculuğudur.`,
  skills: [
    {
      skillName: "Yetenek Adı",
      skillLevel: "Yetenek Seviyesi",
      skillDescription: "Yetenek Açıklaması",
    },
    {
      skillName: "Yetenek Adı",
      skillLevel: "Yetenek Seviyesi",
      skillDescription: "Yetenek Açıklaması",
    },
    {
      skillName: "Yetenek Adı",
      skillLevel: "Yetenek Seviyesi",
      skillDescription: "Yetenek Açıklaması",
    },
    {
      skillName: "Yetenek Adı",
      skillLevel: "Yetenek Seviyesi",
      skillDescription: "Yetenek Açıklaması",
    },
  ],
};
