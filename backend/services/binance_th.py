import httpx

base_url = "https://api.binance.th/api/v1"

async def get_ticker(symbol: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{base_url}/ticker/price", params={"symbol": symbol})
        return response.json()
    