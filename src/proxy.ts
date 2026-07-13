// import { type NextRequest, NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";

// export async function middleware(request: NextRequest) {
//   let response = NextResponse.next({
//     request: {
//       headers: request.headers,
//     },
//   });

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             request.cookies.set(name, value),
//           );
//           response = NextResponse.next({
//             request,
//           });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             response.cookies.set(name, value, options),
//           );
//         },
//       },
//     },
//   );

//   // Cek apakah user sedang login
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // Jika belum login dan mencoba akses halaman selain '/login', redirect ke '/login'
//   if (!user && request.nextUrl.pathname !== "/login") {
//     const url = request.nextUrl.clone();
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   // Jika sudah login dan mencoba akses '/login', arahkan ke dashboard '/'
//   if (user && request.nextUrl.pathname === "/login") {
//     const url = request.nextUrl.clone();
//     url.pathname = "/";
//     return NextResponse.redirect(url);
//   }

//   return response;
// }

// // Konfigurasi agar middleware tidak berjalan pada aset statis (gambar, css, dll)
// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  // Isi logika Anda tetap sama...
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Update request agar bisa dibaca di server component selanjutnya
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          // Update response agar cookie tersimpan di browser
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect ke login jika belum login
  if (!user && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect ke dashboard jika sudah login dan akses halaman login
  if (user && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match semua path kecuali:
     * - api (routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
