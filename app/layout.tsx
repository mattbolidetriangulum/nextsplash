import './globals.css';

export const metadata = {
  title: 'please',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}