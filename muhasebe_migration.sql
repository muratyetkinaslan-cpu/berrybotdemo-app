-- 1) Öğrencilere ödeme alındı alanı ekle
ALTER TABLE ogrenciler ADD COLUMN IF NOT EXISTS odeme_alindi boolean DEFAULT false;
ALTER TABLE ogrenciler ADD COLUMN IF NOT EXISTS odeme_alindi_tarihi date;

-- 2) Muhasebe tablosu (gelir + gider tek tabloda)
CREATE TABLE IF NOT EXISTS muhasebe (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tip text NOT NULL CHECK (tip IN ('gelir','gider')),
  kategori text NOT NULL,
  aciklama text NOT NULL,
  tutar integer NOT NULL,
  tarih date DEFAULT CURRENT_DATE,
  ogrenci_id uuid REFERENCES ogrenciler(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE muhasebe ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all muhasebe" ON muhasebe FOR ALL USING (true) WITH CHECK (true);

-- 3) Mevcut sabit verileri (eski excel) tabloya aktar
INSERT INTO muhasebe (tip, kategori, aciklama, tutar, tarih) VALUES
('gelir','Şirket/Kurum','Aselsan',65000,'2026-03-01'),
('gelir','Öğrenci','Mustafa Ali',3500,'2026-03-01'),
('gelir','Öğrenci','Nurullah Cicioğlu',4500,'2026-03-01'),
('gelir','Öğrenci','Hakan Gülüm',7000,'2026-03-01'),
('gelir','Öğrenci','Muhammet',6000,'2026-03-01'),
('gelir','Öğrenci','Cihanlar',11800,'2026-03-01'),
('gelir','Öğrenci','Eymen Yalvı',10000,'2026-03-01'),
('gelir','Öğrenci','Büyük Hüseyin',5000,'2026-03-01'),
('gelir','Öğrenci','Davut Hazar',6500,'2026-03-01'),
('gelir','Öğrenci','Eymen İlhan',6000,'2026-03-01'),
('gelir','Öğrenci','Özkan Üreyener',6500,'2026-03-01'),
('gelir','Öğrenci','Kapucu',10000,'2026-03-01'),
('gelir','Öğrenci','Umut Şirin',5000,'2026-03-01'),
('gelir','Öğrenci','Kerem Kaya',8000,'2026-03-01'),
('gider','Malzeme','Robotistan',13000,'2026-03-01'),
('gider','Ofis','Ofis Kirası',10000,'2026-03-01'),
('gider','Eğitim','Matematik',6000,'2026-03-01'),
('gider','Malzeme','Robot Kol',2000,'2026-03-01'),
('gider','Ofis','Temizlik',2500,'2026-03-01'),
('gider','Yazılım','Claude AI',1200,'2026-03-01'),
('gider','Ofis','Market-Yemek',1000,'2026-03-01'),
('gider','Ulaşım','BeKod Proje / Taksi',1000,'2026-03-01'),
('gider','Malzeme','Motorobit',300,'2026-03-01'),
('gider','Personel','Yetkin-Alper',0,'2026-03-01')
ON CONFLICT DO NOTHING;
