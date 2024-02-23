from dataclasses import dataclass
from core.launch.domain.model import Location, Missile
from psycopg2.extras import DictRow

@dataclass(frozen=True)
class MissileWithBaseLocation:
    base_location: Location
    missile: Missile
    base_name: str
    @classmethod
    def from_db_dict_row(cls, row: DictRow) -> "MissileWithBaseLocation":
        return cls(
            base_location=Location(
                latitude=row['latitude'],
                longitude=row['longitude']
            ),
            missile=Missile(
                id=row['id'],
                name=row['name'],
                base_id=row['base_id'],
                range=row['range'],
                blast_radius=row['blast_radius'],
                status=row['status']
            ),
            base_name=row['base_name']
        )