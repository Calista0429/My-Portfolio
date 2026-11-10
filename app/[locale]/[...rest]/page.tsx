import { notFound } from 'next/navigation';

// Any path that isn't a page shows the not-found page in its language.
export default function UnknownPage() {
  notFound();
}
