from api.app import app

@app.route('/health-check')
def health_check():
    return 'Healthy!'