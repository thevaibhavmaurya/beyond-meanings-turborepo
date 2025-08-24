import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center space-x-2 sm:space-x-3 transition-all duration-300 hover:scale-105"
    >
      <div className="relative">
        <Image
          src="/logo.png"
          alt="Beyond Meanings Logo"
          width={32}
          height={32}
          className="rounded-full"
          priority
        />
        <div className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
      </div>
      <div className="flex flex-col -ml-3">
        <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          eyondMeanings
        </span>
        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500 rounded-full" />
      </div>
    </Link>
  );
}
