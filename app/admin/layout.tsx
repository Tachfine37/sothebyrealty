// Root admin layout — no session check here.
// The login page lives at /admin/login/ which inherits this empty layout.
// Protected pages live in app/admin/(protected)/ which has its own layout with session checks.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
