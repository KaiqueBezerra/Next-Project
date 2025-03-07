import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const publicRoutes = [
  {
    path: "/sign-in",
    whenAuthenticated: "redirect",
  },
  {
    path: "/register",
    whenAuthenticated: "redirect",
  },
  {
    path: "/about",
    whenAuthenticated: "next",
  },
  {
    path: "/",
    whenAuthenticated: "next",
  },
  {
    path: "/demand",
    whenAuthenticated: "next",
  },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/sign-in";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(`Request path: ${pathname}`);

  const publicRoute = publicRoutes.find(
    (route) => pathname === route.path || pathname.startsWith(route.path + "/")
  );

  const authToken = request.cookies.get("token")?.value;

  // Se não houver token e a rota for pública, permite o acesso
  if (!authToken && publicRoute) {
    console.log("Acesso permitido, rota pública sem token.");
    return NextResponse.next();
  }

  // Se não houver token e a rota não for pública, redireciona para login
  if (!authToken && !publicRoute) {
    console.log("Redirecionando para login devido à falta de token.");
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  // Se houver token e a rota for pública, mas quando o usuário já estiver autenticado,
  // redireciona para a página principal
  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    console.log(
      "Redirecionando para a página principal porque o usuário já está autenticado."
    );
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  // Se houver token, mas a rota não for pública, verifica se o token é válido
  if (authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

    try {
      const decoded: { exp: number } = jwtDecode(authToken);

      // Verifica se o token está expirado
      if (decoded.exp * 1000 < Date.now()) {
        console.log("Token expirado, redirecionando para login.");
        request.cookies.delete("token");
        return NextResponse.redirect(new URL(redirectUrl));
      }

      console.log("Token válido, permitindo o acesso.");
      return NextResponse.next();
    } catch (error) {
      console.log(
        "Erro ao decodificar o token, redirecionando para login",
        error
      );
      return NextResponse.redirect(new URL(redirectUrl));
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!_next/static|_next/image|assets|favicon.ico|sitemap.xml|robots.txt).*)", // Alteração no matcher para garantir que o middleware seja chamado em todas as rotas exceto as estáticas.
  ],
};
