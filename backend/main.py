from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services import bitkub, binance_th

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"])

@app.get("/arbitrage")
async def get_arbitrage():
    pairs = ["BTC", "ETH"]
    results = []
    bitkub_data = await bitkub.get_ticker()
    
    for coin in pairs:
        bitkub_price = bitkub.parse_price(bitkub_data, f"THB_{coin}")
        binance_data = await binance_th.get_ticker(f"{coin}THB")
        binance_price = float(binance_data.get("price", 0))
        spread = ((binance_price - bitkub_price) / bitkub_price) * 100
        
        results.append({
            "coin": coin,
            "bitkub_price": bitkub_price,
            "binance_price": binance_price,
            "spread_percent": round(spread, 2),
        })
        
    return results