import React, { useRef, useState, useEffect, useMemo } from "react";
import { Search, Filter, Mic } from "lucide-react";
import Fuse from "fuse.js";
import type { ServiceSearch } from "../types/service";
import { CATEGORIES } from "../lib/constants";

interface SearchBarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  search: string;
  setSearch: (s: string) => void;
  onOpenFilters?: () => void;
  allServices?: ServiceSearch[];
  onSuggestionClick?: (s: string) => void;
}

type WebkitSpeechRecognitionEvent = {
  results: { 0: { 0: { transcript: string } } };
};

export default function SearchBar({
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
  onOpenFilters,
  allServices = [],
  onSuggestionClick,
}: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fuse = useMemo(
    () =>
      new Fuse(allServices, {
        keys: ["title", "description", "tags"],
        threshold: 0.4,
      }),
    [allServices],
  );
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  useEffect(() => {
    if (search.length > 0 && allServices.length > 0) {
      const results = fuse.search(search).slice(0, 5);
      setSuggestions(results.map((r) => r.item.title));
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [search, allServices, fuse]);

  useEffect(() => {
    setActiveSuggestion(-1);
  }, [suggestions]);

  // Voice input handler
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) return;
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event: WebkitSpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
      inputRef.current?.focus();
    };
    recognition.start();
  };

  // Keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length,
      );
    } else if (e.key === "Enter" && activeSuggestion >= 0) {
      setSearch(suggestions[activeSuggestion]);
      setShowDropdown(false);
      onSuggestionClick?.(suggestions[activeSuggestion]);
    }
  };

  return (
    <div className="flex gap-2 items-center rounded-xl p-2 bg-base-100 text-base-content transition-all relative">
      <div className="relative w-full max-w-xs">
        <input
          ref={inputRef}
          className="input input-bordered input-sm w-full pl-10 bg-base-100 text-base-content placeholder:text-muted-foreground"
          placeholder="Search schemes, services, or portals…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search schemes, services, or portals"
          onFocus={() => setShowDropdown(suggestions.length > 0)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls="search-suggestions-list"
          aria-activedescendant={
            activeSuggestion >= 0 ? `suggestion-${activeSuggestion}` : undefined
          }
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content" />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs p-1"
          aria-label="Voice search"
          tabIndex={0}
          onClick={handleVoiceInput}
        >
          <Mic className="w-4 h-4" />
        </button>
        {showDropdown && suggestions.length > 0 && (
          <ul
            id="search-suggestions-list"
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full absolute z-10 mt-1 border"
            role="listbox"
          >
            {suggestions.map((s, i) => (
              <li
                key={s}
                id={`suggestion-${i}`}
                role="option"
                aria-selected={activeSuggestion === i}
              >
                <button
                  type="button"
                  className={`w-full text-left ${activeSuggestion === i ? "bg-primary text-primary-content" : ""}`}
                  onMouseDown={() => {
                    setSearch(s);
                    setShowDropdown(false);
                    onSuggestionClick?.(s);
                  }}
                  tabIndex={0}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <select
        className="select select-bordered input-sm text-base-content bg-base-100 rounded-xl"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        aria-label="Select category"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <button
        type="button"
        className="btn btn-outline btn-sm flex items-center gap-2 focus:ring"
        aria-label="Open filters"
        onClick={onOpenFilters}
      >
        <Filter className="w-4 h-4" />
        <span className="hidden md:inline">Filters</span>
      </button>
      <button
        type="submit"
        className="btn btn-primary btn-sm flex items-center gap-2 focus:ring"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline">Search</span>
      </button>
    </div>
  );
}
