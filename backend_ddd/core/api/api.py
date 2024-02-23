from flask import Flask, request
from core.api import utils
from core.authentication.entrypoint import commands as auth_cmd
from core.entrypoint.uow import UnitOfWork
from core.authentication.entrypoint import exceptions as auth_svc_ex
from core.launch.entrypoint import queries as launch_qry

app = Flask(__name__)
app.config["PROPAGATE_EXCEPTIONS"] = True



@app.route("/")
def base():
    """base endpoint"""

    return utils.Response(message="Welcome to the backend", status_code=200).__dict__


@app.route("/create-user", methods=["POST"])
def create_user():
    """create user endpoint"""
    req = request.get_json(force=True)
    uow = UnitOfWork()
    try:
        auth_cmd.create_user(
            email=req["email"],
            password=req["password"],
            name=req["name"],
            type=req["type"],
            uow=uow
        )
    except auth_svc_ex.UserAlreadyExists as e:
        uow.close_connection()
        return utils.Response(message=str(e), status_code=400).__dict__

    uow.commit_close_connection()
    return utils.Response(message="User Created", status_code=201).__dict__

@app.route("/verify-password", methods=["GET"])
def verify_password():
    """verify password endpoint"""
    req = request.get_json(force=True)
    uow = UnitOfWork()
    try:
        auth_cmd.verify_password(
            email=req["email"],
            password=req["password"],
            uow=uow
        )
    except auth_svc_ex.InvalidPassword as e:
        uow.close_connection()
        return utils.Response(message=str(e), status_code=400).__dict__

    uow.close_connection()
    return utils.Response(message="Password Verified", status_code=200).__dict__

@app.route("/get-all-valid-missiles", methods=["GET"])