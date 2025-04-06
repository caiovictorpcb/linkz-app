 


const apiUrl = `${process.env.API_URL}`

export async function POST(req: Request) {
  const { url } = await req.json()
  const res = await fetch(`${apiUrl}/short`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  }).then((res) => res.json())
  const { shortUrl } = res
 
  return Response.json({ shortUrl })
}