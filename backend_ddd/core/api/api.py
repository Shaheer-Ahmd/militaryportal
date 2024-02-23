from flask import Flask, request
from core.api import utils
from core.authentication.entrypoint import commands as auth_cmd
from core.launch.entrypoint import commands as launch_cmd
from core.entrypoint.uow import UnitOfWork
from core.authentication.entrypoint import exceptions as auth_svc_ex
from core.launch.entrypoint import queries as launch_qry
from core.launch.domain import model as mdl
from core.launch.domain import exceptions as launch_mdl_ex
app = Flask(__name__)
app.config["PROPAGATE_EXCEPTIONS"] = True



@app.route("/")
def base():
    """base endpoint"""

    return utils.Response(message="Welcome to the backend", status_code=200).__dict__


@app.route("/create-user", methods=["POST"])
def create_user():
    """create user endpoint"""
    print(request.content_length)
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

@app.route("/verify-password", methods=["POST"])
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

@app.route("/get-all-valid-missiles", methods=["POST"])
def get_all_valid_missiles():
    """get all valid missiles endpoint"""
    req = request.get_json(force=True)
    uow = UnitOfWork()
    validator = mdl.LaunchValidator()
    missiles_base_loc_DTOS = launch_qry.get_all_missiles_with_base_loc(uow)    
    valid_missiles = [
        each
        for each in missiles_base_loc_DTOS
        if validator.validate(
            base_location=each.base_location,
            missile=each.missile,
            target_lat=req["target_latitude"],
            target_long=req["target_longitude"]
        )
    ]
    uow.close_connection()

    return utils.Response(
        message="Valid missiles returned successfully",
        status_code=200,
        data=valid_missiles
    ).__dict__

@app.route("/create-base", methods=["POST"])
def create_base():
    """create base endpoint"""
    req = request.get_json(force=True)
    uow = UnitOfWork()
    launch_cmd.create_base(
        latitude=req["latitude"],
        longitude=req["longitude"],
        name=req["name"],
        uow=uow
    )
    uow.commit_close_connection()
    return utils.Response(message="Base Created", status_code=201).__dict__

@app.route("/create-missile", methods=["POST"])
def create_missile():
    """create missile endpoint"""
    req = request.get_json(force=True)
    uow = UnitOfWork()
    launch_cmd.create_missile(
        name=req["name"],
        base_id=req["base_id"],
        range=req["range"],
        blast_radius=req["blast_radius"],
        uow=uow
    )
    uow.commit_close_connection()
    return utils.Response(message="Missile Created", status_code=201).__dict__

@app.route("/fire-missile", methods=["POST"])
def fire_missile():
    """fire missile endpoint"""
    req = request.get_json(force=True)
    uow = UnitOfWork()
    try:
        launch_cmd.fire_missile(
            missile_id=req["missile_id"],
            uow=uow
        )
    except launch_mdl_ex.MissileAlreadyFired as e:
        uow.close_connection()
        return utils.Response(message=str(e), status_code=400).__dict__
    
    uow.commit_close_connection()
    return utils.Response(message="Missile Fired", status_code=200).__dict__