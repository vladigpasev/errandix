// types.ts

export type CategoryMap = {
    [key: string]: string[];
};

export type CategorySelectorProps = {
    onCategoryChange: (selectedCategory: string, subcategories: string[]) => void;
};
