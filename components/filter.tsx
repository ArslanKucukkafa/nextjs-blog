"use client";

import React, { useEffect, useState } from "react";
import { Input, Select, SelectItem, Chip, Button } from "@nextui-org/react";
import { tagApi } from "@/services/tagApi";

interface FilterProps {
  selectedTags: string[];
  searchQuery: string;
  sortOrder: string;
  onTagsChange: (tags: string[]) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (order: string) => void;
  type: "projects" | "articles" | "perspectives";
}

export const Filter: React.FC<FilterProps> = ({
  selectedTags,
  searchQuery,
  sortOrder,
  onTagsChange,
  onSearchChange,
  onSortChange,
  type,
}) => {
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        let tags: string[] = [];

        switch (type) {
          case "projects":
            tags = await tagApi.getProjectTags();
            break;
          case "articles":
            tags = await tagApi.getArticleTags();
            break;
          case "perspectives":
            tags = await tagApi.getPerspectiveTags();
            break;
        }

        setAvailableTags(tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, [type]);

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchChange(localSearchQuery);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="Search..."
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="max-w-xs"
          label="Search"
          labelPlacement="outside"
          description="Press Enter to search"
        />
        <Select
          label="Sort by"
          labelPlacement="outside"
          selectedKeys={[sortOrder]}
          onChange={(e) => onSortChange(e.target.value)}
          className="max-w-xs"
          description="choose sort order"
        >
          <SelectItem key="newest" value="newest">
            Newest First
          </SelectItem>
          <SelectItem key="oldest" value="oldest">
            Oldest First
          </SelectItem>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          <div>Loading tags...</div>
        ) : (
          availableTags.map((tag) => (
            <Chip
              key={tag}
              color={selectedTags.includes(tag) ? "warning" : "default"}
              variant="bordered"
              onClick={() => handleTagSelect(tag)}
              className="cursor-pointer"
            >
              {tag}
            </Chip>
          ))
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2">
          <span>Active filters:</span>
          {selectedTags.map((tag) => (
            <Chip
              key={tag}
              onClose={() =>
                onTagsChange(selectedTags.filter((t) => t !== tag))
              }
              color="warning"
              variant="bordered"
            >
              {tag}
            </Chip>
          ))}
          <Button size="sm" variant="light" onClick={() => onTagsChange([])}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};
