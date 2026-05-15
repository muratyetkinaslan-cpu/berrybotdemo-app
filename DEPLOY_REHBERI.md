# 🚀 ROBOGPT Panel — Deploy Rehberi (20 dakika)

## Adım 1: Supabase Kurulumu (Veritabanı) — 5 dk

1. Tarayıcıda **supabase.com** → "Start for free" → Google ile giriş yap
2. **"New project"** → İsim: `robogpt` → Şifre bir yere yaz → Region: **Europe West** → Create
3. Proje kurulana kadar bekle (~1-2 dk)
4. Sol menü → **SQL Editor** → "New query" tıkla
5. `supabase_setup.sql` dosyasının içeriğini yapıştır → **Run** butonuna bas
6. Sol menü → **Project Settings** → **API**:
   - **Project URL** kopyala → not al (VITE_SUPABASE_URL)
   - **anon/public** key kopyala → not al (VITE_SUPABASE_ANON_KEY)

---

## Adım 2: Vercel'e Deploy — 10 dk

### Seçenek A: GitHub üzerinden (önerilir)

1. **github.com** → üye değilsen kayıt ol → "New repository" → İsim: `robogpt-panel` → Create
2. Bilgisayarında terminal aç, proje klasörüne git:
   ```bash
   cd robogpt-panel
   git init
   git add .
   git commit -m "ilk kurulum"
   git remote add origin https://github.com/KULLANICI_ADIN/robogpt-panel.git
   git push -u origin main
   ```
3. **vercel.com** → Google ile giriş → "New Project" → GitHub bağla → `robogpt-panel` seç → Import
4. **Environment Variables** ekle:
   - `VITE_SUPABASE_URL` = supabase url'in
   - `VITE_SUPABASE_ANON_KEY` = supabase key'in
5. **Deploy** tıkla → 2 dakika bekle
6. ✅ URL al → telefonuna kaydet!

### Seçenek B: Doğrudan yükleme (daha hızlı)

1. Terminalde:
   ```bash
   npm install
   npm run build
   ```
2. `dist` klasörü oluşur
3. **vercel.com** → "New Project" → "Browse" → `dist` klasörünü sürükle bırak
4. Ama ortam değişkenlerini ekleyemezsin → Seçenek A daha iyi

---

## Adım 3: Telefon Kısayolu

1. Telefonunda Chrome/Safari ile vercel URL'ini aç
2. Tarayıcı menüsü → **"Ana ekrana ekle"**
3. ✅ Artık uygulama gibi açılır!

---

## Yaygın Sorunlar

| Sorun | Çözüm |
|-------|-------|
| Öğrenciler yüklenmiyor | Supabase URL/Key kontrol et |
| WhatsApp açılmıyor | Telefon numarasını başında 0 ile gir |
| Sayfa açılmıyor | Vercel build loglarını kontrol et |

---

## Sonra Geliştirme

Yeni özellik istersen burada sohbette söyle:
- Aylık muhasebe girişi (gelir-gider ekleme)
- Eğitmen yönetimi
- Öğrenci ödeme geçmişi
- Otomatik SMS/e-posta
- PDF rapor alma
