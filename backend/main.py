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
    
    bitkub_coins = set(
        key.replace("THB_", "")
        for key in bitkub_data.keys()
        if key.startswith("THB_")
    )
    
    binance_coins = set(
        item["symbol"].replace("THB", "")
        for item in binance_data
        if item["symbol"].endswith("THB")
    )
    
    pairs = bitkub_coins & binance_coins
    results = []
    
    for coin in pairs:
        bitkub_price = bitkub.parse_price(bitkub_data, f"THB_{coin}")
        binance_price = float(next(
            item["price"] for item in binance_data
            if item["symbol"] == f"{coin}THB"
        ))
        if bitkub_price == 0 or binance_price == 0:
            continue
        
        spread = ((binance_price - bitkub_price) / bitkub_price) * 100
        
        results.append({
            "coin": coin,
            "bitkub_price": bitkub_price,
            "binance_price": binance_price,
            "spread_percent": round(spread, 2),
        })
        
    return sorted(results, key=lambda x: abs(x["spread_percent"]), reverse=True)