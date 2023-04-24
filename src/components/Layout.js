import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
        <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
        </nav>
        <main>{children}</main>      
    </>
  )
}