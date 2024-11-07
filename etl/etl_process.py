import requests
import json
import pickle
from datetime import datetime, timedelta
from pathlib import Path
import schedule
import time
import os
from dotenv import load_dotenv

# Cargar las variables de entorno
load_dotenv()

# Clase ELT para manejar citas
class QuotesETL:
    def __init__(self):
        # URL de la API y configuración de la caché
        self.api_url = os.getenv('API_URL', 'http://localhost:8000/api/quotes')
        self.cache_dir = Path("cache")
        self.cache_file = self.cache_dir / "quotes_cache.pkl"
        self.cache_duration = timedelta(minutes=15)

    # Obtener datos de la caché si están disponibles y aún son válidos
    def get_cached_data(self):
        if not self.cache_file.exists():
            return None
        
        try:
            with open(self.cache_file, 'rb') as f:
                cache_data = pickle.load(f)
                if datetime.now() - cache_data['timestamp'] < self.cache_duration:
                    return cache_data['data']
        except Exception as e:
            print(f"Error al leer la caché: {e}")
        return None

    # Guardar datos en caché con la marca de tiempo actual
    def save_to_cache(self, data):
        self.cache_dir.mkdir(exist_ok=True)
        try:
            with open(self.cache_file, 'wb') as f:
                pickle.dump({
                    'timestamp': datetime.now(),
                    'data': data
                }, f)
        except Exception as e:
            print(f"Error al guardar en caché: {e}")

    # Obtener las 5 citas principales, ya sea desde la caché o desde la API
    def get_top_quotes(self):
        cached_data = self.get_cached_data()
        if cached_data:
            print("Devolviendo datos de caché")
            return cached_data

        try:
            response = requests.get(self.api_url)
            response.raise_for_status()
            quotes = response.json()

            # Ordenar citas por calificación y fecha, luego obtener las 5 principales
            sorted_quotes = sorted(
                quotes,
                key=lambda x: (x['rating'], x['created_at']),
                reverse=True
            )
            top_5_quotes = sorted_quotes[:5]
            
            self.save_to_cache(top_5_quotes)
            return top_5_quotes

        except requests.RequestException as e:
            print(f"Error al obtener datos de la API: {e}")
            return []

    # Procesar citas y guardarlas en un archivo JSON
    def process_and_save(self):
        top_quotes = self.get_top_quotes()
        if top_quotes:
            output_file = 'output/top_quotes.json'
            os.makedirs('output', exist_ok=True)
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(top_quotes, f, indent=2, ensure_ascii=False)
            print(f"Citas procesadas y guardadas en {output_file}")

# Ejecutar el ELT
def run_etl():
    etl = QuotesETL()
    etl.process_and_save()

if __name__ == "__main__":
    print("Iniciando el proceso ELT...")
    
    # Ejecutar ELT inmediatamente y cada 15 minutos
    run_etl()
    schedule.every(15).minutes.do(run_etl)
    
    while True:
        schedule.run_pending()
        time.sleep(1)
