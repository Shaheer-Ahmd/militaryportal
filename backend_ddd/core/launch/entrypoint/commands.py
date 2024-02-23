from core.launch.domain import model as mdl
from core.entrypoint.uow import AbstractUnitOfWork
from uuid import uuid4 as uuid

def create_base(
    latitude: float,
    longitude: float,
    name: str,
    uow: AbstractUnitOfWork
)->None:
    """create base command"""
    base = mdl.Base(
        id = str(uuid()),
        location=mdl.Location(
            latitude=latitude,
            longitude=longitude
        ),
        name=name
    )
    uow.bases.add(base)
    

def create_missile(
    name: str,
    base_id: str,
    range: float,
    blast_radius: float,
    uow: AbstractUnitOfWork
)->None:
    """create missile command"""
    missile = mdl.Missile(
        id = str(uuid()),
        name=name,
        base_id=base_id,
        range=range,
        blast_radius=blast_radius
    )
    uow.missiles.add(missile)
    

def fire_missile(
    missile_id: str,
    uow: AbstractUnitOfWork
)->None:
    """fire missile command"""
    missile = uow.missiles.get(missile_id)
    missile.fire()
    uow.missiles.add(missile)