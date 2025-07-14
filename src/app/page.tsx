"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import FiltersSidebar from "@/components/FiltersSidebar";
import ResultsHeader from "@/components/ResultsHeader";
import servicesDataRaw from "../data/services.json";

type Service = {
  title: string;
  description: string;
  link: string;
  department: string;
  category: string;
  tags: string[];
  eligibility: string;
  documents_required: string[];
  estimated_time: string;
  last_updated: string;
  state_specific: boolean;
};

const servicesData: Service[] = servicesDataRaw as Service[];

// Extract unique departments and tags
const allDepartments = Array.from(
  new Set(servicesData.map((s) => s.department)),
);
const allTags = Array.from(new Set(servicesData.flatMap((s) => s.tags)));

export default function Home() {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [showStateOnly, setShowStateOnly] = useState(false);
  const [sort, setSort] = useState("Relevance");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 12; // Show 12 per page for Load More
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [
    selectedCategory,
    search,
    showStateOnly,
    selectedDepartments,
    selectedTags,
    sort,
  ]);

  // Filtered services
  const filteredServices = useMemo(() => {
    return servicesData.filter((service: Service) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        service.category === selectedCategory;
      const searchText = search.toLowerCase();
      const matchesSearch =
        service.title.toLowerCase().includes(searchText) ||
        service.description.toLowerCase().includes(searchText) ||
        service.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchText),
        );
      const matchesState = !showStateOnly || service.state_specific;
      const matchesDepartment =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(service.department);
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => service.tags.includes(tag));
      return (
        matchesCategory &&
        matchesSearch &&
        matchesState &&
        matchesDepartment &&
        matchesTags
      );
    });
  }, [
    selectedCategory,
    search,
    showStateOnly,
    selectedDepartments,
    selectedTags,
  ]);

  // Sorting logic
  const sortedServices = useMemo(() => {
    const sorted = [...filteredServices];
    if (sort === "Newest") {
      sorted.sort((a, b) => (b.last_updated > a.last_updated ? 1 : -1));
    } else if (sort === "Estimated Time") {
      // Try to extract minutes from estimated_time string
      const getMinutes = (s: string) => {
        const match = s.match(/(\d+)(?:-(\d+))?\s*min/);
        if (match) {
          return parseInt(match[1], 10);
        }
        return 9999;
      };
      sorted.sort(
        (a, b) => getMinutes(a.estimated_time) - getMinutes(b.estimated_time),
      );
    }
    // Default is Relevance (filtered order)
    return sorted;
  }, [filteredServices, sort]);

  // Pagination logic
  const pagedServices = sortedServices.slice(0, page * pageSize);
  const hasMore = pagedServices.length < sortedServices.length;

  // For SearchBar suggestions
  const allServicesForSearch = servicesData.map((s) => ({
    title: s.title,
    description: s.description,
    tags: s.tags,
  }));

  // Handle suggestion click
  const handleSuggestionClick = (s: string) => {
    setSearch(s);
  };

  // Handle tag click to filter by tag
  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
    // Optionally scroll to top of results
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-base-100 min-h-screen text-base-content">
      <HeroSection />
      <div className="container mx-auto px-4 py-4">
        <div className="mb-8 sticky top-0 z-30 bg-base-100">
          <SearchBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            search={search}
            setSearch={setSearch}
            allServices={allServicesForSearch}
            onSuggestionClick={handleSuggestionClick}
            onOpenFilters={() => setShowMobileFilters(true)}
          />
        </div>
        <div className="flex gap-4">
          {/* Sidebar for desktop */}
          <div className="hidden lg:block w-full max-w-xs">
            <FiltersSidebar
              sort={sort}
              setSort={setSort}
              showStateOnly={showStateOnly}
              setShowStateOnly={setShowStateOnly}
              departments={allDepartments}
              selectedDepartments={selectedDepartments}
              setSelectedDepartments={setSelectedDepartments}
              tags={allTags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              filteredServices={filteredServices}
            />
          </div>
          {/* Drawer for mobile filters */}
          <div className="lg:hidden">
            <input
              type="checkbox"
              id="mobile-filters"
              className="drawer-toggle"
              checked={showMobileFilters}
              readOnly
            />
            <div className="drawer drawer-end z-40">
              <div className="drawer-content"></div>
              <div className="drawer-side">
                <label
                  htmlFor="mobile-filters"
                  className="drawer-overlay"
                  onClick={() => setShowMobileFilters(false)}
                ></label>
                <div className="p-4 w-80 min-h-full bg-base-200 text-base-content">
                  <FiltersSidebar
                    sort={sort}
                    setSort={setSort}
                    showStateOnly={showStateOnly}
                    setShowStateOnly={setShowStateOnly}
                    departments={allDepartments}
                    selectedDepartments={selectedDepartments}
                    setSelectedDepartments={setSelectedDepartments}
                    tags={allTags}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    filteredServices={filteredServices}
                  />
                  <button
                    className="btn btn-primary btn-block mt-4"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    Close Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <main className="flex-1" ref={mainRef}>
            <ResultsHeader
              count={sortedServices.length}
              search={search}
              selectedDepartments={selectedDepartments}
              selectedCategories={
                selectedCategory !== "All Categories" ? [selectedCategory] : []
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pagedServices.map((service) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  onTagClick={handleTagClick}
                />
              ))}
            </div>
            {/* Load More button for infinite scroll */}
            {hasMore && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => setPage((p) => p + 1)}
                >
                  Load More
                </button>
              </div>
            )}
            {/* Back to Top floating button */}
            <button
              className="fixed bottom-6 right-6 btn btn-circle btn-primary shadow-lg z-50 animate-bounce"
              style={{ display: pagedServices.length > 0 ? "block" : "none" }}
              aria-label="Back to Top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ↑
            </button>
          </main>
        </div>
      </div>
    </div>
  );
}
