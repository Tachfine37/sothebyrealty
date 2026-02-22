// Admin login page should NOT use the admin layout
export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
