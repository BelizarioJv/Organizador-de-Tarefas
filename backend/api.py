from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Configuração do banco de dados
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="010500",
    database="taskdb",
)
cursor = db.cursor(dictionary=True)

#testando conexão com o banco de dados
try:
    cursor.execute("SELECT DATABASE()")
    db_name = cursor.fetchone()
    print(f"Conectado ao banco de dados: {db_name['DATABASE()']}")
except mysql.connector.Error as err:
    print(f"Erro ao conectar ao banco de dados: {err}")

# GET tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    return jsonify(tasks)

# POST task
@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    cursor.execute(
        "INSERT INTO tasks (title, description, status, priority) VALUES (%s, %s, %s, %s)",
        (data.get("title"), data.get("description"), data.get("status"), data.get("priority"))
    )
    db.commit()
    new_id = cursor.lastrowid
    return jsonify({"id": new_id, **data}), 201

# PUT task
@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()

    fields = []
    values = []

    for key in ["title", "description", "status", "priority"]:
        if key in data:
            fields.append(f"{key}=%s")
            values.append(data[key])

    values.append(task_id)

    query = f"UPDATE tasks SET {', '.join(fields)} WHERE id=%s"

    cursor.execute(query, tuple(values))
    db.commit()

    cursor.execute("SELECT * FROM tasks WHERE id = %s", (task_id,))
    updated_task = cursor.fetchone()

    return jsonify(updated_task)

# DELETE task
@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    cursor.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
    db.commit()
    return jsonify({"message": f"Tarefa {task_id} deletada com sucesso!"})

if __name__ == "__main__":
    app.run(debug=True)