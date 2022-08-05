export interface AchievementProps {
    achievement: string;
    timestamp: number;
    category_id: string;
}

export interface AchievementModel {
    achievement_id: string;
    achievement: string;
    timestamp: number;
    date: string;
    category_id: string;
}

export interface Achievement {
    achievement_id: string;
    achievement: string;
    timestamp: number;
    date: string;
    category_id: string;
    category: string;
    color: string;
}
