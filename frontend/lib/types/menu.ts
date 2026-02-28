// frontend/src/lib/types/menu.ts
export enum MenuCategory {
  APPETIZERS_SMALL_CHOPS = "appetizers_small_chops",
  SOUPS = "soups",
  SWALLOW = "swallow",
  SALADS = "salads",
  RICE_DISHES = "rice_dishes",
  PROTEINS = "proteins",
  STEWS_SAUCES = "stews_sauces",
  BEAN_DISHES = "bean_dishes",
  YAM_DISHES = "yam_dishes",
  GRILLS_BARBECUE = "grills_barbecue",
  SPECIAL_DELICACIES = "special_delicacies",
  DRINKS = "drinks",
  DESSERTS = "desserts",
  PASTA = "pasta",
}

export enum MoodTag {
  SPICY = "spicy",
  COMFORT = "comfort",
  LIGHT = "light",
  ADVENTUROUS = "adventurous",
  TRADITIONAL = "traditional",
  HEALTHY = "healthy",
  INDULGENT = "indulgent",
  FESTIVE = "festive",
  HEARTY = "hearty",
  QUICK_BITE = "quick_bite",
  STREET_FOOD = "street_food",
  RICH = "rich",
  REFRESHING = "refreshing",
}

export enum TimeOfDay {
  MORNING = "morning",
  AFTERNOON = "afternoon",
  EVENING = "evening",
  NIGHT = "night",
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  isAvailable: boolean;
  preparationTime?: number;
  clickCount: number;
  moodTags?: string[];
  timeOfDay?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateMenuItemData {
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  isAvailable?: boolean;
  preparationTime?: number;
  moodTags?: string[];
  timeOfDay?: string[];
}

export type UpdateMenuItemData = Partial<CreateMenuItemData>;
