"use client";

import Link from "next/link";
import { Button } from "../ui/button";

type BackButtonProps = {
  href: string;
  label: string;
};

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button className="font-medium w-full" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
