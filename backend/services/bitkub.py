import httpx

base_url = "https://api.bitkub.com/api/v3"

async def get_ticker():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{base_url}/market/ticker")
        return response.json()
    