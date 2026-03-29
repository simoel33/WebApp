import json

# Read fr.json
with open('messages/fr.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Remove pricing and add contact
if 'pricing' in data:
    del data['pricing']

data['contact'] = {
    'title': 'Nous contacter',
    'subtitle': "Des questions ? Nous aimerions vous entendre.",
    'fields': {
      'name': 'Nom complet',
      'email': 'Email professionnel',
      'role': 'Poste',
      'country': 'Pays',
      'phone': 'Numéro de téléphone',
      'message': 'Message',
      'captcha': 'Je ne suis pas un robot',
      'captchaLabel': 'Je confirme que je ne suis pas un robot'
    },
    'button': {
      'send': 'Envoyer le message',
      'sending': 'Envoi en cours...'
    },
    'success': {
      'title': 'Message envoyé !',
      'message': 'Merci de nous contacter. Nous vous répondrons bientôt.'
    }
}

# Write back
with open('messages/fr.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("French messages updated successfully!")
