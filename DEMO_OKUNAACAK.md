# 🎬 BerryBot LMS Demo — Hızlı Kurulum

## 📂 Yapacakların — 3 Adım

### 1️⃣ Yeni Repo Aç (GitHub)
```bash
git clone https://github.com/muratyetkinaslan-cpu/berrybot-app berrybot-demo
cd berrybot-demo
git checkout -b main
git remote remove origin
# Yeni repo oluştur GitHub'da: berrybot-demo
git remote add origin https://github.com/muratyetkinaslan-cpu/berrybot-demo.git
```

### 2️⃣ Aşağıdaki Dosyaları KOPYALA-YAPIŞTIR

| Hedef Yol | Kullanılacak Dosya | Açıklama |
|---|---|---|
| `src/App.jsx` | **DEMO_App.jsx** | ⚠️ DEMO versiyonu (DEMO_MODE=true) |
| `src/db.js` | db.js | Mevcut, değişmeden |
| `src/useData.js` | useData.js | Mevcut, değişmeden |
| `src/supabaseClient.js` | supabaseClient.js | YENİ — env var okuyor |
| `src/BerryBot3D.jsx` | BerryBot3D.jsx | Mevcut, değişmeden |
| `src/PicoBricks3D.jsx` | PicoBricks3D.jsx | Demo'da kullanılmıyor ama import var, bırak |
| `src/TankRobot3D.jsx` | TankRobot3D.jsx | Aynı, bırak |
| `src/main.jsx` | main.jsx | React entry |
| `index.html` | index.html | Mevcut |
| `package.json` | package.json | Mevcut |
| `vite.config.js` | vite.config.js | Mevcut |
| `public/logos/berrybot.png` | (Mevcut repo'dan) | Logo |
| `public/tasks/gorev_1...10/` | (Opsiyonel) | Görev görselleri |

### 3️⃣ Supabase + Vercel Setup

#### A) Yeni Supabase Projesi
1. supabase.com → New project → "**berrybot-demo**"
2. SQL Editor → **DEMO_setup.sql** yapıştır → Run
3. Settings → API → URL + anon key'i kopyala

#### B) Vercel Deploy
1. vercel.com → Add New Project → repo'yu seç
2. Environment Variables:
   - `VITE_SUPABASE_URL` = (Supabase URL)
   - `VITE_SUPABASE_KEY` = (anon public key)
3. Deploy

---

## ✅ Demo Hesapları

```
👨‍💼 Admin:      admin@demo.com   | demo123
👨‍🏫 Eğitmen:    ahmet@demo.com   | demo123
🎓 Ali (5/10):  ali@demo.com     | demo123
🎓 Ayşe (8/10): ayse@demo.com    | demo123
🎓 Can (Kids):  can@demo.com     | demo123
🏆 Deniz (10/10): deniz@demo.com | demo123
👨‍👩‍👧 Veli (Ali):  veli1@demo.com   | demo123
👨‍👩‍👧 Veli (Ayşe): veli2@demo.com   | demo123
```

---

## 🎯 DEMO_App.jsx'te Yapılan Değişiklikler

Mevcut App.jsx'e göre **6 küçük değişiklik**:

1. ✅ `const DEMO_MODE = true;` eklendi (KITS objesinin üstüne)
2. ✅ Kit selector ekranı atlanıyor (DEMO mode → direkt berrybot)
3. ✅ Topbar'da 🎬 DEMO bandı (turuncu-mor gradient, hafif pulse)
4. ✅ Login'de demo hesap butonları (1 tıkla otomatik doldur)
5. ✅ `demoPulse` keyframe eklendi
6. ✅ Browser tab title'a "— DEMO" suffix

**Production'a geri dönüş:** Sadece `DEMO_MODE = false` yap, hepsi normal moda döner.

---

## 🧪 Local Test

```bash
npm install
echo "VITE_SUPABASE_URL=https://xxxxx.supabase.co" > .env.local
echo "VITE_SUPABASE_KEY=eyJ..." >> .env.local
npm run dev
# http://localhost:3000
```

Görmen gerekenler:
- Açılışta direkt LoginPage (kit selector YOK)
- Topbar'da 🎬 DEMO yazısı
- Browser tab'da "BerryBot LMS — DEMO"
- Login formunun altında 6 demo hesap butonu

---

## 🎤 Sunum Akışı (10 dakika)

| Sahne | Hesap | Göster |
|---|---|---|
| 1. Öğrenci | Ali | MissionBoard macera haritası, 3D robot, görev başlat |
| 2. Eğitmen | Ahmet | Sınıf düzeni, Ayşe'nin bekleyen ödevi, onayla |
| 3. Veli | Murat | Ali'nin ilerleme grafiği, CV/sertifika |
| 4. Admin | Admin | Görev editörü, medya yükleme, kullanıcı yönetimi |

---

## ⚠️ Önemli Notlar

- **Ana projeyi etkilemez** — ayrı Supabase + ayrı Vercel
- Sunum sonrası demo veriyi sıfırlamak istersen: DEMO_setup.sql'i tekrar çalıştır
- Vercel'de demo subdomain seçebilirsin: `demo.berrybot-app.vercel.app`
