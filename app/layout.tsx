import type { Metadata, Viewport } from 'next'
import './globals.css'
import Head from 'next/head'
import Link from 'next/link'

const title = process.env.APP_NAME
const description =
	'Not Apple Music, but stuff that should be available in the Apple Music app'

export const metadata: Metadata = {
	title: title,
	description: description,
	manifest: '/manifest.json',
	// openGraph: {
	// 	title: title,
	// 	description:description,
	// },
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	viewportFit: 'cover',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const musicKitVersion = `v${process.env.MUSICKIT_VERSION || 1}`
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={''}>
				<Head>
					<meta name="application-name" content={title} />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta name="apple-mobile-web-app-title" content={title} />
					<meta name="description" content={description} />
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta
						name="msapplication-config"
						content="/browserconfig.xml"
					/>
					<meta name="msapplication-TileColor" content="#2B5797" />
					<meta name="msapplication-tap-highlight" content="no" />
					{/* <meta name="theme-color" content="#000000" /> */}

					<Link
						rel="apple-touch-icon"
						href="/touch-icon-iphone.png"
					/>
					{/* <Link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/touch-icon-ipad.png"
					/>
					<Link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/touch-icon-iphone-retina.png"
					/>
					<Link
						rel="apple-touch-icon"
						sizes="167x167"
						href="/touch-icon-ipad-retina.png"
					/> */}

					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<Link rel="manifest" href="/manifest.json" />
					<Link
						rel="mask-icon"
						href="/safari-pinned-tab.svg"
						color="#5bbad5"
					/>

					<meta name="twitter:card" content="summary" />
					<meta name="twitter:url" content={process.env.APP_URL} />
					<meta name="twitter:title" content={title} />
					<meta name="twitter:description" content={description} />
					<meta
						name="twitter:image"
						content={`${process.env.APP_URL}/android-chrome-192x192.png`}
					/>
					<meta name="twitter:creator" content="@DavidWShadow" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
					<meta property="og:site_name" content={title} />
					<meta property="og:url" content={process.env.APP_URL} />
					<meta
						property="og:image"
						content={`${process.env.APP_URL}/apple-touch-icon.png`}
					/>
				</Head>
				{children}
				<script
					// src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"
					src={`https://js-cdn.music.apple.com/musickit/${musicKitVersion}/musickit.js`}
					defer
				></script>
			</body>
		</html>
	)
}
