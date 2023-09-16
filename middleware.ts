import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // debug: true,
  // Ensure that locale specific sign-in pages are public
  publicRoutes: ["/", "/api/links/totalLinks", "/api/links/createLink", "/api/links/getLinks", "/api/links/deleteLink"],
  ignoredRoutes: ['/api/og']
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};