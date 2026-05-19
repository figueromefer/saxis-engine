import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="AXISSCAN Admin"',
    },
  });
}

export function middleware(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return unauthorized();
  }

  const authorization = request.headers.get("authorization");

  if (!authorization || !authorization.startsWith("Basic ")) {
    return unauthorized();
  }

  const encodedCredentials = authorization.replace("Basic ", "");
  const decodedCredentials = atob(encodedCredentials);
  const [_username, password] = decodedCredentials.split(":");

  if (password !== adminPassword) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/diagnostics/:path*/analyze",
  ],
};
