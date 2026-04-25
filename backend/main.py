from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services import bitkub, binance_th
from dotenv import load_dotenv
import asyncio
import os

load_dotenv()

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=origins)

@app.get("/arbitrage")
async def get_arbitrage():
    bitkub_data, bitkub_status, binance_data, binance_status = await asyncio.gather(
        bitkub.get_ticker(),
        bitkub.get_status(),
        binance_th.get_ticker(),
        binance_th.get_status()
    )
    
    usdt_thb = next(
        (item for item in bitkub_data if item["symbol"] == "USDT_THB"), None
    )
    
    if usdt_thb is None:
        raise ValueError("USDT_THB pair not found")
    usdt_thb_rate = float(usdt_thb["last"])
    
    duplicate_symbols = {"LUNA"}
    pairs = (bitkub_status & binance_status) - duplicate_symbols
    results = []
    
    for coin in pairs:
        bitkub_price = float(next(
            item["last"] for item in bitkub_data
            if item["symbol"] == f"{coin}_THB"
        ))
        binance_price = float(next(
            item["price"] for item in binance_data
            if item["symbol"] == f"{coin}USDT"
        ))
        
        binance_price_thb = binance_price * usdt_thb_rate
        
        if bitkub_price == 0 or binance_price_thb == 0:
            continue
        
        spread_bitkub_to_binance = ((binance_price_thb - bitkub_price) / bitkub_price) * 100
        spread_binance_to_bitkub = ((bitkub_price - binance_price_thb) / binance_price_thb) * 100
        
        spread = round(max(spread_bitkub_to_binance, spread_binance_to_bitkub), 2)
        
        results.append({
            "coin": coin,
            "bitkub_price": bitkub_price,
            "binance_price": binance_price,
            "binance_price_thb": round(binance_price_thb, 4),
            "usdt_thb_rate": usdt_thb_rate,
            "spread_percent": spread
        })
        
    return sorted(results, key=lambda x: abs(x["spread_percent"]), reverse=True)