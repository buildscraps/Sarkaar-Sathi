import React, { useState } from "react";
import { ListFilter, Tag, Building2, Layers } from "lucide-react";
import TagChip from "./TagChip";
import type { Service } from "../types/service";
import { CATEGORIES } from "../lib/constants";

interface FiltersSidebarProps {
  sort: string;
  setSort: (s: string) => void;
  showStateOnly: boolean;
  setShowStateOnly: (b: boolean) => void;
  departments: string[];
  selectedDepartments: string[];
  setSelectedDepartments: (d: string[]) => void;
  tags: string[];
  selectedTags: string[];
  setSelectedTags: (t: string[]) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  filteredServices: Service[];
}

export default function FiltersSidebar({
  sort,
  setSort,
  showStateOnly,
  setShowStateOnly,
  departments,
  selectedDepartments,
  setSelectedDepartments,
  tags,
  selectedTags,
  setSelectedTags,
  selectedCategory,
  setSelectedCategory,
  filteredServices,
}: FiltersSidebarProps) {
  const [deptSearch, setDeptSearch] = useState("");
  const filteredDepartments = departments.filter((dept) =>
    dept.toLowerCase().includes(deptSearch.toLowerCase()),
  );
  const [openAccordion, setOpenAccordion] = useState<
    "categories" | "departments" | "tags" | null
  >(null);

  function clearFilters() {
    setSelectedDepartments([]);
    setSelectedTags([]);
    setShowStateOnly(false);
    setSort("Relevance");
    setSelectedCategory("All Categories");
  }

  // Dummy counts for demo; replace with real counts if available
  const getDepartmentCount = (dept: string) =>
    filteredServices.filter((s) => s.department === dept).length;
  const getCategoryCount = (cat: string) =>
    cat === "All Categories"
      ? filteredServices.length
      : filteredServices.filter((s) => s.category === cat).length;

  return (
    <aside className="bg-base-200 text-base-content shadow rounded-xl p-4 md:p-6 gap-4 mb-4 overflow-y-auto max-h-[80vh] w-full">
      <button
        className="btn btn-outline btn-sm w-full text-sm text-base-content mb-4"
        onClick={clearFilters}
        aria-label="Clear all filters"
      >
        Clear All Filters
      </button>
      <div className="join join-vertical w-full">
        {/* Categories Accordion */}
        <div className="collapse collapse-arrow join-item bg-base-100 mb-2">
          <input
            type="checkbox"
            checked={openAccordion === "categories"}
            onChange={() =>
              setOpenAccordion(
                openAccordion === "categories" ? null : "categories",
              )
            }
            className="peer"
            aria-label="Toggle Categories"
          />
          <div className="collapse-title text-base font-medium flex items-center gap-2 text-base-content">
            <Layers className="w-4 h-4 text-muted-foreground" /> Categories
          </div>
          <div className="collapse-content">
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer text-base-content"
                >
                  <input
                    type="radio"
                    name="category"
                    className="radio radio-primary radio-xs"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    aria-label={`Select category ${cat}`}
                  />
                  <span className="truncate w-full tooltip" data-tip={cat}>
                    {cat}
                  </span>
                  <span className="badge badge-ghost badge-xs ml-auto">
                    {getCategoryCount(cat)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* Departments Accordion */}
        <div className="collapse collapse-arrow join-item bg-base-100 mb-2">
          <input
            type="checkbox"
            checked={openAccordion === "departments"}
            onChange={() =>
              setOpenAccordion(
                openAccordion === "departments" ? null : "departments",
              )
            }
            className="peer"
            aria-label="Toggle Departments"
          />
          <div className="collapse-title text-base font-medium flex items-center gap-2 text-base-content">
            <Building2 className="w-4 h-4 text-muted-foreground" /> Departments
          </div>
          <div className="collapse-content">
            <input
              type="text"
              className="input input-bordered input-sm h-8 text-base-content bg-base-100 w-full mb-2"
              placeholder="Search departments"
              value={deptSearch}
              onChange={(e) => setDeptSearch(e.target.value)}
              aria-label="Search departments"
            />
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
              {filteredDepartments.length === 0 ? (
                <div className="text-muted-foreground text-xs md:text-sm italic">
                  No departments to filter
                </div>
              ) : (
                filteredDepartments.map((dept) => (
                  <label
                    key={dept}
                    className="flex items-center gap-2 cursor-pointer text-base-content"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-xs"
                      checked={selectedDepartments.includes(dept)}
                      onChange={() => {
                        setSelectedDepartments(
                          selectedDepartments.includes(dept)
                            ? selectedDepartments.filter((d) => d !== dept)
                            : [...selectedDepartments, dept],
                        );
                      }}
                      aria-label={`Toggle department ${dept}`}
                    />
                    <span className="truncate w-full tooltip" data-tip={dept}>
                      {dept}
                    </span>
                    <span className="badge badge-ghost badge-xs ml-auto">
                      {getDepartmentCount(dept)}
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
        {/* Tags Accordion */}
        <div className="collapse collapse-arrow join-item bg-base-100 mb-2">
          <input
            type="checkbox"
            checked={openAccordion === "tags"}
            onChange={() =>
              setOpenAccordion(openAccordion === "tags" ? null : "tags")
            }
            className="peer"
            aria-label="Toggle Tags"
          />
          <div className="collapse-title text-base font-medium flex items-center gap-2 text-base-content">
            <Tag className="w-4 h-4 text-muted-foreground" /> Tags
          </div>
          <div className="collapse-content">
            <div className="flex flex-wrap gap-2">
              {tags.length === 0 ? (
                <span className="text-muted-foreground text-xs md:text-sm italic">
                  No tags to filter
                </span>
              ) : (
                tags.map((tag) => (
                  <TagChip
                    key={tag}
                    label={tag}
                    selected={selectedTags.includes(tag)}
                    tabIndex={0}
                    aria-label={`Toggle tag ${tag}`}
                    onClick={() =>
                      setSelectedTags(
                        selectedTags.includes(tag)
                          ? selectedTags.filter((t) => t !== tag)
                          : [...selectedTags, tag],
                      )
                    }
                    className={
                      selectedTags.includes(tag)
                        ? "cursor-pointer badge-primary text-primary-content"
                        : "cursor-pointer"
                    }
                  />
                ))
              )}
            </div>
          </div>
        </div>
        {/* State-specific services toggle */}
        <div className="bg-base-100 rounded-lg p-3 mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            className="toggle toggle-primary scale-90 md:scale-100"
            checked={showStateOnly}
            onChange={(e) => setShowStateOnly(e.target.checked)}
            aria-label="State-specific services only"
          />
          <span>State-specific services</span>
        </div>
        {/* Sort by dropdown */}
        <div className="mt-4">
          <label className="text-base font-medium mb-2 flex items-center gap-2 text-base-content">
            <ListFilter className="w-4 h-4 text-base-content" /> Sort by
          </label>
          <select
            className="select select-bordered input-sm h-8 text-base-content bg-base-100 w-full"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort by"
          >
            <option>Relevance</option>
            <option>Newest</option>
            <option>Estimated Time</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
