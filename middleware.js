import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  // ⚠️ এখন আমরা বলে দিচ্ছি কোন কোন পেজে যেতে লগইন লাগবে।
  // আপনার প্রজেক্টে যেসব পেজ সিকিউরড রাখতে চান শুধু সেগুলোর নাম এখানে দিন।
  matcher: [
    "/dashboard/:path*",  // ড্যাশবোর্ড এবং এর ভেতরের সব পেজ লক থাকবে
    "/profile/:path*",    // প্রোফাইল পেজ লক থাকবে
    "/checkout/:path*",   // চেকআউট পেজ লক থাকবে (যদি থাকে)
    "/orders/:path*"      // অর্ডার পেজ লক থাকবে (যদি থাকে)
  ],
};