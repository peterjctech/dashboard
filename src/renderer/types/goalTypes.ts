export interface GoalProps {
    goal: string;
    deadline: string | number;
}

export interface GoalModel {
    goal_id: string;
    goal: string;
    length: string;
    timestamp: number;
    date: string;
    color: string;
}

export interface Goal {
    goal_id: string;
    goal: string;
    length: string;
    timestamp: number;
    date: string;
    color: string;
    status: string;
}
