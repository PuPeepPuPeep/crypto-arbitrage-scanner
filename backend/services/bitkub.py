import httpx

base_url = "https://api.bitkub.com/api"

async def get_ticker():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{base_url}/market/ticker")
        return response.json()
    
def parse_price(data: dict, symbol: str) -> float:
    return float(data.get(symbol, {}).get("last", 0))