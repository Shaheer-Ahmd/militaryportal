from abc import ABC, abstractmethod
from typing import Dict
from psycopg2.extras import DictCursor

from core.launch.domain import model as mdl

class BaseAbstractRepository(ABC):
    """Base Abstract Repository"""

    @abstractmethod
    def add(self, base: mdl.Base):
        pass

    @abstractmethod
    def get(self, base_id: str) -> mdl.Base:
        pass

class BaseRepository(BaseAbstractRepository):
    """Base Repository"""

    def __init__(self, connection):
        self.connection = connection
        self.cursor = connection.cursor(cursor_factory=DictCursor)

    def add(self, base: mdl.Base):
        sql = """
            INSERT INTO bases (id, latitude, longitude, name)
            VALUES (%(id)s, %(latitude)s, %(longitude)s, %(name)s)
            on conflict (id) do update set
            latitude = excluded.latitude,
            longitude = excluded.longitude,
            name = excluded.name
        """

        self.cursor.execute(
            sql,
            {
                'id': base.id,
                'latitude': base.location.latitude,
                'longitude': base.location.longitude,
                'name': base.name
            } 
        )

    def get(self, base_id: str) -> mdl.Base:
        sql = """
        SELECT * FROM bases WHERE id = %(id)s
        """
        self.cursor.execute(sql, {'id': base_id})
        base = self.cursor.fetchone()
        return mdl.Base(
            id=base['id'],
            name=base['name'],
            location=mdl.Location(
                latitude=base['latitude'],
                longitude=base['longitude']
            )
        )
    
class MissileAbstractRepository(ABC):
    """Missile Abstract Repository"""

    @abstractmethod
    def add(self, missile: mdl.Missile):
        pass

    @abstractmethod
    def get(self, missile_id: str) -> mdl.Missile:
        pass

class MissileRepository(MissileAbstractRepository):
    """Missile Repository"""

    def __init__(self, connection):
        self.connection = connection
        self.cursor = connection.cursor(cursor_factory=DictCursor)

    def add(self, missile: mdl.Missile):
        sql = """
            INSERT INTO missiles (id, base_id, name, range, blast_radius)
            VALUES (%(id)s, %(base_id)s, %(name)s, %(range)s, %(blast_radius)s)
            on conflict (id) do update set
            base_id = excluded.base_id,
            name = excluded.name,
            range = excluded.range,
            blast_radius = excluded.blast_radius
        """

        self.cursor.execute(
            sql,
            {
                'id': missile.id,
                'base_id': missile.base_id,
                'name': missile.name,
                'range': missile.range,
                'blast_radius': missile.blast_radius
            } 
        )

    def get(self, missile_id: str) -> mdl.Missile:
        sql = """
        SELECT * FROM missiles WHERE id = %(id)s
        """
        self.cursor.execute(sql, {'id': missile_id})
        missile = self.cursor.fetchone()
        return mdl.Missile(
            id=missile['id'],
            name=missile['name'],
            base_id=missile['base_id'],
            range=missile['range'],
            blast_radius=missile['blast_radius']
        )