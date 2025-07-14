import React from "react";

interface ResultsHeaderProps {
  count: number;
  search: string;
  selectedDepartments?: string[];
  selectedCategories?: string[];
}

export default function ResultsHeader({
  count,
  search,
  selectedDepartments = [],
  selectedCategories = [],
}: ResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <div className="text-lg font-semibold text-base-content">
        {count} services found
        {search ? (
          <span className="text-base-content/70">
            {" "}
            for &quot;{search}&quot;
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedDepartments.length > 0 && (
          <span className="badge badge-outline badge-info">
            Departments: {selectedDepartments.length}
          </span>
        )}
        {selectedCategories.length > 0 && (
          <span className="badge badge-outline badge-primary">
            Categories: {selectedCategories.length}
          </span>
        )}
      </div>
    </div>
  );
}
