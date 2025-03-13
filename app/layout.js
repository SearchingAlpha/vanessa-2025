// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Retro Gaming Hub',
  description: 'A special retro gaming hub with a girly twist',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}