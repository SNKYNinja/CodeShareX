export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-full flex justify-center items-center">
            {children}
        </div>
    );
}
