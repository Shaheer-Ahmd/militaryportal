from dataclasses import dataclass

@dataclass(frozen=True)
class Location:
    latitude: float
    longitude: float
@dataclass
class Base:
    id: str
    name: str
    location: Location


@dataclass
class Missile:
    id: str
    name: str
    base_id: str
    range: float
    blast_radius: float


class LaunchValidator:

    def _calculate_distance(
            self,
            base_location: Location,
            target_location: Location
    ) -> float:
        return ((base_location.latitude - target_location.latitude) ** 2 + (base_location.longitude - target_location.longitude) ** 2) ** 0.5
    
    def validate(
            self,
            base_location: Location,
            missile: Missile,
            target_lat: float,
            target_long: float
    ) -> bool:
        distance = self._calculate_distance(base_location, Location(latitude=target_lat, longitude=target_long))
        return distance <= missile.range