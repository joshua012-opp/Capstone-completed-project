export type DashboardStat = {
  title: string;
  value: string;
  trend: string;
  trendCaption: string;
};

export type ClusterUnits = {
  name: string;
  units: number;
  percentage: number;
  color: string;
};

export type TourRequest = {
  name: string;
  initials: string;
  cluster: string;
  unit: string;
  email: string;
  phone: string;
  date: string;
  time: string;
};

export type LineChartPoint = {
  month: string;
  requests: number;
};

export type ClusterTourPoint = {
  cluster: string;
  shortName: string;
  requests: number;
};

export type InquiryCategory = {
  name: string;
  value: number;
  color: string;
};

export type SearchProperty = {
  title: string;
  description: string;
  image: string;
  size: string;
  beds: number;
  baths: number;
  href: string;
};

export type SearchBlog = {
  title: string;
  excerpt: string;
  href: string;
};
