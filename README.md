# Crypto Arbitrage Scanner

เครื่องมือเปรียบเทียบราคาคริปโตระหว่าง **Bitkub** (คู่ THB) และ **Binance TH** (คู่ USDT แปลงเป็น THB) แสดงส่วนต่างราคา (spread) ระหว่างสองเว็บให้เห็นในที่เดียว

> **คำเตือน:** เครื่องมือนี้จัดทำขึ้นเพื่อการศึกษาเท่านั้น **ไม่ใช่คำแนะนำในการลงทุน** การเทรดคริปโตมีความเสี่ยงสูง ควรศึกษาข้อมูลและตัดสินใจด้วยตัวเองก่อนทำธุรกรรมทางการเงินทุกครั้ง

## Features

- แสดงราคา จาก Bitkub และ Binance TH อัปเดตอัตโนมัติทุก 30 วินาที
- คำนวณ spread % ทั้งสองทิศทาง แสดงค่าที่สูงกว่า
- ปรับค่าธรรมเนียมการเทรดได้เพื่อดู spread จริงหลังหักค่าธรรมเนียม
- ค้นหาและกรองตามชื่อเหรียญ

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, deploy บน Vercel

**Backend:** FastAPI (Python), deploy บน Render

## วิธี Run บนเครื่อง

### Backend

```bash
cd backend
pip install -r requirements.txt
```

สร้างไฟล์ `.env`:
```
ALLOWED_ORIGINS=http://localhost:5173
```

รัน server:
```bash
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
```

สร้างไฟล์ `.env.local`:
```
VITE_API_URL=http://localhost:8000
```

รัน dev server:
```bash
npm run dev
```

## หมายเหตุ

- Backend ใช้ Render free tier อาจใช้เวลา **30–60 วินาที** ในการโหลดครั้งแรกหลังจากไม่มีผู้ใช้งานสักพัก แอปจะแสดงหน้า loading ระหว่างรอ
- ราคาทั้งหมดแสดงเป็น THB โดยราคา USDT ของ Binance จะถูกแปลงโดยใช้อัตรา USDT/THB จาก Bitkub
