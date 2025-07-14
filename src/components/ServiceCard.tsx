import React, { useState } from "react";
import { Timer, Info, ExternalLink, Star, X } from "lucide-react";

interface Service {
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
}

function isRecentlyUpdated(last_updated: string) {
  const updated = new Date(last_updated);
  const now = new Date();
  const diff = (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 5;
}

export default function ServiceCard({
  service,
  onTagClick,
}: {
  service: Service;
  onTagClick?: (tag: string) => void;
}) {
  const [bookmarked, setBookmarked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const tagsToShow = service.tags.slice(0, 5);
  const extraTags = service.tags.length - 5;
  return (
    <div className="card bg-base-100 text-base-content shadow-md rounded-xl transition-all duration-300 ease-in-out mb-4 hover:shadow-lg h-full lg:max-w-xl">
      <div className="card-body flex flex-col justify-between h-full p-4 sm:p-6 gap-4 relative">
        {/* Bookmark Icon */}
        <button
          className="absolute top-3 right-3 btn btn-ghost btn-xs p-1 z-10"
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark this service"}
          onClick={() => setBookmarked((b) => !b)}
        >
          {bookmarked ? (
            <Star className="w-5 h-5 text-warning fill-warning" />
          ) : (
            <Star className="w-5 h-5 text-base-content/60" />
          )}
        </button>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2
              className="text-lg sm:text-xl font-bold leading-tight line-clamp-2 max-w-[320px] tooltip"
              data-tip={service.title}
              tabIndex={0}
            >
              {service.title}
            </h2>
            {isRecentlyUpdated(service.last_updated) && (
              <span
                className="badge badge-info badge-xs ml-2"
                title="Updated recently"
              >
                Updated recently
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex flex-wrap gap-2">
              {tagsToShow.map((tag) => (
                <button
                  key={tag}
                  className="badge badge-outline badge-sm text-base-content/80 cursor-pointer hover:badge-primary"
                  onClick={() => onTagClick?.(tag)}
                  tabIndex={0}
                  aria-label={`Filter by tag ${tag}`}
                >
                  {tag}
                </button>
              ))}
              {extraTags > 0 && (
                <span
                  className="text-xs text-muted-foreground"
                  tabIndex={0}
                  aria-label={`+${extraTags} more tags`}
                >
                  +{extraTags} more
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <Info className="w-4 h-4" />
            <span className="truncate tooltip" data-tip={service.department}>
              {service.department}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <Timer className="w-4 h-4" />
            <span>{service.estimated_time}</span>
          </div>
          <div className="flex gap-2 mt-2">
            <a
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm flex-1 flex items-center gap-2 transition-transform hover:scale-105 hover:bg-violet-700 tooltip"
              aria-label={`Apply for ${service.title}`}
              data-tip="Opens official government website"
            >
              Apply Now <ExternalLink className="w-4 h-4" />
            </a>
            <button
              className="btn btn-outline btn-sm flex-1 flex items-center gap-2"
              onClick={() => setShowMore(true)}
              aria-label="More info"
            >
              More Info
            </button>
          </div>
        </div>
        {/* More Info Modal */}
        {showMore && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="modal-box max-w-lg bg-base-100 text-base-content">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{service.title}</h3>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => setShowMore(false)}
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="mb-2 text-base-content/80">{service.description}</p>
              <div className="mb-2">
                <span className="font-semibold">Eligibility:</span>{" "}
                {service.eligibility}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Documents Required:</span>{" "}
                {service.documents_required.join(", ")}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Department:</span>{" "}
                {service.department}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Estimated Time:</span>{" "}
                {service.estimated_time}
              </div>
              <a
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm mt-2 w-full"
                aria-label={`Apply for ${service.title}`}
              >
                Apply Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
