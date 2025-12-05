import Link from 'next/link'
import Container from '@/components/container'

export default function NotFound() {
  return (
    <Container>
      <h1>404 - Side ikke funnet / Page Not Found</h1>
      <p>
        <Link href="/">Gå til forsiden / Go to homepage</Link>
      </p>
    </Container>
  )
}
