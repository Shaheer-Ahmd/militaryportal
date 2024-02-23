from typing import List
from core.launch.domain import model as mdl
from core.entrypoint.uow import AbstractUnitOfWork

def get_all_missiles(uow: AbstractUnitOfWork)->List[mdl.Missile]:
    sql = """
    SELECT * FROM missiles
    """

    uow.dict_cursor.execute(sql)
    rows = uow.dict_cursor.fetchall()

    return [mdl.Missile(
        id=row['id'],
        name=row['name'],
        base_id=row['base_id'],
        range=row['range'],
        blast_radius=row['blast_radius']
    ) for row in rows]
    