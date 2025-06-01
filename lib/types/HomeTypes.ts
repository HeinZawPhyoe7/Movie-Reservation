type Period = {
  time: string;
  dimension: string;
  title: string;
  id: number;
};

export type MovieT = {
  title: string;
  description: string;
  images: string; // base64 or path
  genre: string;
  id: number;
};

export type MovieDetailT = {
  cinema_name: string;
  cinema_place: string;
  period_time: string;
  show_day: string;
  time_list: Period[];
  movie_id: number;
  id: number;
  created_at: string;
  updated_at: string;
};
