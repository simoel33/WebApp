import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Include "/" so the root is locale-redirected; the catch-all alone can miss `/`
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
