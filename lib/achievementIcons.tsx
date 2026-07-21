import {
    Users,
    GraduationCap,
    Award,
    Hospital,
    BookOpen,
    Trophy,
    Star,
    Heart,
    Building2,
    Stethoscope,
    CheckCircle,
    TrendingUp,
    Globe,
    Target,
    type LucideIcon,
} from "lucide-react";

// Client-safe: no Sequelize import here, so client components (the admin
// icon picker) can use this without pulling the DB layer into the bundle.
// models/Achievement.ts imports ACHIEVEMENT_ICONS/AchievementIcon from here
// (not the other way around) to keep that direction one-way.
export const ACHIEVEMENT_ICONS = [
    "Users",
    "GraduationCap",
    "Award",
    "Hospital",
    "BookOpen",
    "Trophy",
    "Star",
    "Heart",
    "Building2",
    "Stethoscope",
    "CheckCircle",
    "TrendingUp",
    "Globe",
    "Target",
] as const;
export type AchievementIcon = (typeof ACHIEVEMENT_ICONS)[number];

export const ACHIEVEMENT_ICON_MAP: Record<AchievementIcon, LucideIcon> = {
    Users,
    GraduationCap,
    Award,
    Hospital,
    BookOpen,
    Trophy,
    Star,
    Heart,
    Building2,
    Stethoscope,
    CheckCircle,
    TrendingUp,
    Globe,
    Target,
};
