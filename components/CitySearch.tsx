import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";

export interface GeoResult {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface Props {
  onSelect: (city: GeoResult) => void;
}

const CitySearch = ({ onSelect }: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            query
          )}&count=6&language=fr&format=json`,
          { signal: ctrl.signal }
        );
        const data = await res.json();
        setResults(data.results ?? []);
        setOpen(true);
      } catch (e) {
        if ((e as Error).name !== "AbortError") setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => {
      ctrl.abort();
      clearTimeout(t);
    };
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="glass-card rounded-full flex items-center gap-2 px-4 py-2.5">
        <Search className="h-4 w-4 opacity-80" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          placeholder="Rechercher une ville"
          className="bg-transparent flex-1 outline-none placeholder:text-white/70 text-sm"
        />
        {loading && <Loader2 className="h-4 w-4 animate-spin opacity-80" />}
      </div>

      {open && results.length > 0 && (
        <ul className="glass-card-strong absolute z-20 mt-2 w-full rounded-2xl overflow-hidden">
          {results.map((r) => (
            <li key={r.id}>
              <button
                onClick={() => {
                  onSelect(r);
                  setOpen(false);
                  setQuery("");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition"
              >
                <MapPin className="h-4 w-4 opacity-80 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{r.name}</p>
                  <p className="text-xs opacity-75 truncate">
                    {[r.admin1, r.country].filter(Boolean).join(", ")}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
