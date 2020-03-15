export interface currentPageItem {
  id: string;
  sequence_id: string;
  sequence_index: string;
  lat: string;
  lng: string;
  name: string;
  lth_name: string;
  th_name: string;
  date_added: string;
  timestamp: string;
  match_segment_id: string | undefined,
  match_lat: string;
  match_lng: string;
  way_id: string;
  shot_date: string;
  heading: string;
  headers: string;
  gps_accuracy: string;
  username: string;
}

export interface OSCResponse {
  status: {
    apiCode: string;
    apiMessage: string;
    httpCode: number;
    httpMessage: string;
  };
  currentPageItems: currentPageItem[];
  totalFilteredItems: string[]
}
