import { authMiddleware } from "@clerk/nextjs";

// Public routes that don't require authentication
export default authMiddleware({
  publicRoutes: [
    "/",
    "/features",
    "/pricing",
    "/contact",
    "/terms",
    "/privacy",
    "/api/webhooks/stripe",
    "/api/webhooks/clerk",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
