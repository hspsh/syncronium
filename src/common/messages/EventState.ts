export interface EventState {
  id: string;
  link: string | null;
  title: string;
  description: string | null;
  // base64
  image: string | null;
  // FORMAT
  // new Date().toISOString()
  // '2022-07-07T19:12:43.593Z'
  startDate: string;
  endDate: string;
  location: string;
}
