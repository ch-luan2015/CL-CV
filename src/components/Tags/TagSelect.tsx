import React, { useState, useEffect } from "react";
import { MenuItem, Button } from "@blueprintjs/core";
import { TagProps, TagSelectProp } from "../../resources/models/TagProps";
import { MultiSelect, ItemRenderer } from "@blueprintjs/select";
import { tagAPI } from "../../resources/api/tags";
import { useDebouncedSearch } from "../Comment/useDebouncedSearch";

const TagMultiSelect = MultiSelect.ofType<TagProps>();
const getTagProps = (tags?: string[]) => {
  if (tags == null) return [] as TagProps[];
  return tags.map((tag) => {
    const p: TagProps = {
      value: tag,
    };
    return p;
  });
};

const useSearch = () =>
  useDebouncedSearch<TagProps[]>((text) =>
    tagAPI.get(text ?? "").then((u) => u ?? [])
  );

export const TagSelect = (props: TagSelectProp) => {
  return (
    <TagMultiSelect
      fill={props.fill}
      noResults={<MenuItem disabled={true} text="Không có kết quả" />}
      itemRenderer={itemRender}
      tagRenderer={(tag) => tag.value}
      items={searchResults.result ?? []}
      onItemSelect={handleSelect}
      selectedItems={selectedTags}
      openOnKeyDown={props.onEnter != null}
      onQueryChange={handleQueryChange}
      query={inputText}
      tagInputProps={{
        onRemove: handleRemove,
        rightElement: clearButton,
        tagProps: { intent: "primary" },
        onKeyDown: handleEnter,
      }}
    />
  );
};
