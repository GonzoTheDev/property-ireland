"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import Select from "@/app/components/ui/Select";
import { counties } from "@/app/lib/counties";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [type, setType] = useState(params.get("type") ?? "");
  const [county, setCounty] = useState(params.get("county") ?? "");

  useEffect(() => {
    setQ(params.get("q") ?? "");
    setType(params.get("type") ?? "");
    setCounty(params.get("county") ?? "");
  }, [params]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (type) sp.set("type", type);
    if (county) sp.set("county", county);
    router.push(`/listings?${sp.toString()}`);
  }

  return (
    <form onSubmit={submit} className="w-full card p-3 md:p-4 grid gap-3 md:grid-cols-[1fr_160px_160px_auto]">
      <Input placeholder="Search by title or town" value={q} onChange={(e) => setQ(e.target.value)} />
      <Select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Type</option>
        <option value="SALE">For Sale</option>
        <option value="RENT">To Rent</option>
      </Select>
      <Select value={county} onChange={(e) => setCounty(e.target.value)}>
        <option value="">County</option>
        {counties.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
}


