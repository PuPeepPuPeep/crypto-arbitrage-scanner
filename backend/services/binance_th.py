import httpx

base_url = "https://api.binance.th/api/v1"
  
async def get_ticker():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{base_url}/ticker/price")
        return response.json()