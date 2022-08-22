export interface LaunchData {
    name: string;
    date_utc: Date;
    rocket: string;
    details: string;
    success: boolean;
    launchpad: string;
}

export interface Column {
    id: 'name' | 'date_utc' | 'rocket' | 'details' ;
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: 'right' | 'left';
  }

