import requests
import json
import pickle
from datetime import datetime, timedelta
from pathlib import Path
import schedule
import time
import os
from dotenv import load_load_dotenv

load_dotenv()

class QuotesETL:
    def __init__(self):
        self.api_url = os.getenv('API_URL', 'http://localhost:8000/api/quotes')
        self.cache_dir = Path("cache")
        self.cache_file = self.cache_dir / "quotes_cache.pkl"
        self.cache_duration = timedelta(minutes=15)

    def get_cached_data(self):
        if not self.cache_file.exists():
            return None
        
        try:
            with open(self.cache_file, 'rb') as f:
                cache_data = pickle.load(f)
                if datetime.now() - cache_data['timestamp'] < self.cache_duration:
                    return cache_data['data']
        except Exception as e:
            print(f"Error reading cache: {e}")
        return None

    def save_to_cache(self, data):
        self.cache_dir.mkdir(exist_ok=True)
        try:
            with open(self.cache_file, 'wb') as f:
                pickle.dump({
                    'timestamp': datetime.now(),
                    'data': data
                }, f)
        except Exception as e:
            print(f"Error saving cache: {e}")

    def get_top_quotes(self):
        # Try to get data from cache first
        cached_data = self.get_cached_data()
        if cached_data:
            print("Returning cached data")
            return cached_data

        try:
            # Get fresh data from API
            response = requests.get(self.api_url)
            response.raise_for_status()
            quotes = response.json()

            # Process and sort quotes
            sorted_quotes = sorted(
                quotes,
                key=lambda x: (x['rating'], x['created_at']),
                reverse=True
            )

            # Get top 5
            top_5_quotes = sorted_quotes[:5]
            
            # Save to cache
            self.save_to_cache(top_5_quotes)
            
            return top_5_quotes

        except requests.RequestException as e:
            print(f"Error fetching data from API: {e}")
            return []

    def process_and_save(self):
        top_quotes = self.get_top_quotes()
        if top_quotes:
            output_file = 'output/top_quotes.json'
            os.makedirs('output', exist_ok=True)
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(top_quotes, f, indent=2, ensure_ascii=False)
            print(f"Processed and saved top quotes to {output_file}")

def run_etl():
    etl = QuotesETL()
    etl.process_and_save()

if __name__ == "__main__":
    print("Starting ETL process...")
    
    # Run immediately on start
    run_etl()
    
    # Schedule to run every 15 minutes
    schedule.every(15).minutes.do(run_etl)
    
    while True:
        schedule.run_pending()
        time.sleep(1)