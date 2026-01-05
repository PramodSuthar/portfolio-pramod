import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LoadingScreen } from "@/components/loading-screen";
import { ThemeProvider, ThemeTransition, FloatingThemeToggle } from "@/components/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pramod Suthar - Full-stack Software Developer",
  description:
    "Seasoned full-stack developer, building calm, high-impact digital experiences that translate complex problems into elegant solutions.",
  openGraph: {
    title: "Pramod Suthar - Full-stack Software Developer",
    description:
      "Seasoned full-stack developer, building calm, high-impact digital experiences that translate complex problems into elegant solutions.",
    url: "https://pramodsuthar.com",
    siteName: "Pramod Suthar - Portfolio",
    type: "website",
    images: [
      {
        url: "images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pramod Suthar - Full-stack Software Developer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts are loaded via @font-face in globals.css with font-display: swap */}
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ThemeTransition />
          <LoadingScreen />
          <SmoothScroll>
            <CustomCursor />
            <FloatingThemeToggle />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
