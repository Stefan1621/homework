from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///produse.db'
db = SQLAlchemy(app)

class Produs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nume = db.Column(db.String(100), nullable=False)
    pret = db.Column(db.Float, nullable=False)

@app.route('/')
def index():
    return jsonify({'mesaj': 'Bine ati venit la aplicatia mea Flask!'})

@app.route('/produse', methods=['GET'])
def get_produse():
    produse = Produs.query.all()
    rezultat = []
    for produs in produse:
        date_produs = {
            'id': produs.id,
            'nume': produs.nume,
            'pret': produs.pret
        }
        rezultat.append(date_produs)
    return jsonify(rezultat)

@app.route('/produse/<int:id_produs>', methods=['GET'])
def get_produs(id_produs):
    produs = Produs.query.get(id_produs)
    if produs:
        date_produs = {
            'id': produs.id,
            'nume': produs.nume,
            'pret': produs.pret
        }
        return jsonify(date_produs)
    else:
        return jsonify({'mesaj': 'Produsul nu a fost găsit'}), 404

@app.route('/produse', methods=['POST'])
def adauga_produs():
    data = request.get_json()
    produs_nou = Produs(nume=data['nume'], pret=data['pret'])
    db.session.add(produs_nou)
    db.session.commit()
    return jsonify({'mesaj': 'Produs adăugat cu succes'}), 201

@app.route('/produse/<int:id_produs>', methods=['PUT'])
def actualizeaza_produs(id_produs):
    produs = Produs.query.get(id_produs)
    if not produs:
        return jsonify({'mesaj': 'Produsul nu a fost găsit'}), 404
    
    data = request.get_json()
    produs.nume = data['nume']
    produs.pret = data['pret']
    db.session.commit()
    
    return jsonify({'mesaj': 'Produs actualizat cu succes'})

@app.route('/produse/<int:id_produs>', methods=['DELETE'])
def sterge_produs(id_produs):
    produs = Produs.query.get(id_produs)
    if not produs:
        return jsonify({'mesaj': 'Produsul nu a fost găsit'}), 404
    
    db.session.delete(produs)
    db.session.commit()
    
    return jsonify({'mesaj': 'Produs șters cu succes'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)