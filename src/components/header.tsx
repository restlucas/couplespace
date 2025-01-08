import Link from "next/link";

export function Header() {
  return (
    <header className="w-full min-h-[10vh] flex items-center justify-start px-8">
      <Link href="/" className="font-bold text-gradient text-4xl">
        couplespace
      </Link>
    </header>
  );
}
