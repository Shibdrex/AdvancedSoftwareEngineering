from flask import Blueprint, request, jsonify
from openai_manager import OpenAiManager
from auth_valid_manager import AuthorizationValidationManager

# Define this file as a Blueprint for flask
routes = Blueprint('routes', __name__)
# Instantiate managers
openai_manager = OpenAiManager()
authorization_validation_manager = AuthorizationValidationManager()

# Set a first message to give AI as setup to describe how it is supposed to behave
FIRST_SYSTEM_MESSAGE = {"role": "system", "content": '''
Du bist ein Digitaler Persönlicher Assistent für Studenten. Dein Name ist Isabella Du wirst von Studenten zu verschiedenen Themen befragt.
Der Student wird dich nach Aktivitäten fragen die er ausüben kann falls er an dem Tag keine Vorlesungen hat.
Welche Aktivitäten der Student regelmäßig ausübt wird dir noch gegeben.
Bitte mache für den Studenten Vorschläge welche Aktivität er an dem Tag ausüben kann, abhängig von seinen Präferenzen, Aktivitäten und den aktuellen Wetterbedingungen.


Wenn du als Isabella antwortest beachte bitte folgende Regeln:
1)
2)
3)





Jetzt kann die Konversation beginnen!
'''}

@routes.route('/', methods=['GET'])
def do_healthcheck():
    return jsonify({"message": "Healthy"}), 200


# Route to ask AI a question and send response
@routes.route('/ask-openai-question', methods=['GET'])
def openai_chat():
    prompt = request.json['prompt']
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent'),
        prompt = prompt
    )
    if not message == None:
        return jsonify(message), status
    try:
        openai_answer = openai_manager.chat(prompt)
        return jsonify(openai_answer), 200
    except RuntimeError:
        return jsonify({"message": "Something went wrong"}), 500

# Route to ask AI a question including all previous messages and send response
@routes.route('/ask-openai-question-with-history', methods=['GET'])
def openai_chat_with_history():
    prompt = request.json['prompt']
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent'),
        prompt = prompt
    )
    if not message == None:
        return jsonify(message), status
    try:
        openai_answer = openai_manager.chat_with_history(prompt)
        return jsonify(openai_answer), 200
    except RuntimeError:
        return jsonify({"message": "Something went wrong"}), 500

# Route to add a message as system to setup AI with correct behavior
@routes.route('/add-message-to-openai-history-system', methods=['POST'])
def openai_history_add_system():
    prompt = request.json['prompt']
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent'),
        prompt = prompt
    )
    if not message == None:
        return jsonify(message), status
    openai_manager.chat_history.append({"role": "system", "content": prompt})
    return jsonify({"message": "Adding message with role:system successful!"}), 200

# Route to add a message as user to add messages
@routes.route('/add-message-to-openai-history-user', methods=['POST'])
def openai_history_add_user():
    prompt = request.json['prompt']
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent'),
        prompt = prompt
    )
    if not message == None:
        return jsonify(message), status
    openai_manager.chat_history.append({"role": "user", "content": prompt})
    return jsonify({"message": "Adding message with role:user succesful!"}),200

# Route to delete entire chat history with AI
@routes.route('/delete_history_full', methods=['POST'])
def openai_history_delete_full():
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent')
    )
    if not message == None:
        return jsonify(message), status
    openai_manager.chat_history.clear()
    return jsonify({"message": "History successfully deleted!"}), 200