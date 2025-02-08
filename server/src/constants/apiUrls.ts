export interface BotConfig {
  URL: string;
  API_KEY: string;
  MAIN_PAGE_SCRAPER_ID: string;
  ADDITIONAL_DATA_SCRAPER_ID: string;
}

export interface BotApiUrls {
  mishkanAshdod: BotConfig;
  mevalim: BotConfig;
  smarticket: BotConfig;
}

const URL: string = "https://api.browse.ai/v2/robots";
const API_KEY: string = "ce288a74-7afa-494c-9581-ac1d4f70c511:99634440-3a57-45b8-97f5-56db162823a7";

export const BOT_API_URLS: BotApiUrls = {
  mishkanAshdod: {
      URL,
      API_KEY,
      MAIN_PAGE_SCRAPER_ID: "2e161947-200c-408a-8fe2-7ecadcaa5a4e",
      ADDITIONAL_DATA_SCRAPER_ID: "de2bcb2a-248a-42c8-939d-5633a336ee92",
  },
  mevalim: {
      URL,
      API_KEY,
      MAIN_PAGE_SCRAPER_ID: "24326015-2190-4377-8d7d-f17b0af64e25",
      ADDITIONAL_DATA_SCRAPER_ID: "55d177ef-b87f-4172-810b-7cd2407416a3",
  },
  smarticket: {
      URL,
      API_KEY,
      MAIN_PAGE_SCRAPER_ID: "f837acbf-0f15-48b7-8034-775faf1488d8",
      ADDITIONAL_DATA_SCRAPER_ID: "8cd6bfda-cf25-42a9-8549-3a64abc125fb",
  },
};

