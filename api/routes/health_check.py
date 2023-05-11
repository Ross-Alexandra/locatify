from api.app import app

@app.route('/health-check', methods=['GET'])
def health_check():
    return 'Healthy!'