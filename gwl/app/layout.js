export const metadata = {
  title: 'Grifball World League',
  description: 'Grifball World League',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}