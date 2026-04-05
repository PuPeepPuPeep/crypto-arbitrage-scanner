from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services import bitkub, binance_th
import asyncio

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"])

@app.get("/arbitrage")
async def get_arbitrage():
    bitkub_data, binance_data = await asyncio.gather(
        bitkub.get_ticker(),
        binance_th.get_ticker()
    )
    
    usdt_thb_rate = bitkub.parse_price(bitkub_data, "THB_USDT")
    
    bitkub_coins = set(
        key.replace("THB_", "")
        for key in bitkub_data.keys()
        if key.startswith("THB_")
    )
    
    binance_coins = set(
        item["symbol"].replace("USDT", "")
        for item in binance_data
    )
    
    pairs = (bitkub_coins & binance_coins) - {"USDT"}
    results = []
    
    for coin in pairs:
        bitkub_price = bitkub.parse_price(bitkub_data, f"THB_{coin}")
        
        binance_price = float(next(
            item["price"] for item in binance_data
            if item["symbol"] == f"{coin}USDT"
        ))
        binance_price_thb = binance_price * usdt_thb_rate
        
        if bitkub_price == 0 or binance_price_thb == 0:
            continue
        
        spread = ((binance_price_thb - bitkub_price) / bitkub_price) * 100
        
        results.append({
            "coin": coin,
            "bitkub_price": bitkub_price,
            "binance_price": binance_price,
            "binance_price_thb": round(binance_price_thb, 4),
            "usdt_thb_rate": usdt_thb_rate,
            "spread_percent": round(spread, 2)
        })
        
    return sorted(results, key=lambda x: abs(x["spread_percent"]), reverse=True)