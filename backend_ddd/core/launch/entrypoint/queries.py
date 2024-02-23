from typing import List
from core.launch.domain import model as mdl
from core.entrypoint.uow import AbstractUnitOfWork
from core.launch.entrypoint import view_models as vm


def get_all_missiles_with_base_loc(uow: AbstractUnitOfWork)->List[vm.MissileWithBaseLocation]:
    sql = """
    select * from missiles
    """

    uow.dict_cursor.execute(sql)
    rows = uow.dict_cursor.fetchall()

    missiles = [
        mdl.Missile(
            id=row['id'],
            name=row['name'],
            base_id=row['base_id'],
            range=row['range'],
            blast_radius=row['blast_radius'],
            status=mdl.MissileStatus[row['status']]
        ) for row in rows
    ]

    return [
        vm.MissileWithBaseLocation(
            base_location=uow.bases.get(missile.base_id).location,
            base_name=uow.bases.get(missile.base_id).name,
            missile=missile,
        ) for missile in missiles
    ]

    