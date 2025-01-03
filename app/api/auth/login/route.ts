export {}; // Bu satır, dosyanın bir modül olarak kabul edilmesini sağlar

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";
// import fetch from "node-fetch";

// interface AuthResponse {
//   token: string; // API'den dönen token
// }

// export async function POST(request: NextRequest) {
//   // GitHub OAuth URL'si
//   const oauthUrl = "http://158.180.14.175:8080/oauth/github/authenticate";

//   // GitHub'dan token almak için istek gönderin
//   const response = await fetch(oauthUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     // Eğer gerekli ise body ekleyin, örneğin client_id ve client_secret
//     // body: JSON.stringify({
//     //   client_id: process.env.CLIENT_ID,
//     //   client_secret: process.env.CLIENT_SECRET,
//     // }),
//   });

//   const data = await response.json();

//   if (response.ok) {
//     // data'nın AuthResponse tipinde olup olmadığını kontrol et
//     if (typeof data === "object" && data !== null && "token" in data) {
//       const token = (data as AuthResponse).token; // Türü belirle

//       const cookieStore = await cookies(); // Promise'ı çöz
//       cookieStore.set("auth-token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 86400, // 1 gün
//       });

//       return NextResponse.json({ success: true });
//     }
//   }

//   return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
// }
