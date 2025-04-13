// app/api/getToken/route.js

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const language = searchParams.get("language");
  
    if (!name || !language) {
      return new Response("Missing parameters", { status: 400 });
    }
  
    try {
      const res = await fetch(`http://localhost:5000/getToken?name=${encodeURIComponent(name)}&language=${encodeURIComponent(language)}`);
      
      if (!res.ok) {
        return new Response("Failed to fetch token from backend", { status: 500 });
      }
  
      const token = await res.text();
      return new Response(token, { status: 200 });
    } catch (err) {
      console.error("Error in proxy route:", err);
      return new Response("Server error", { status: 500 });
    }
  }
  