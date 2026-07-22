import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function HospitalMap({ hospitals = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg">
      <MapContainer
        center={[19.076, 72.8777]}
        zoom={10}
        style={{
          height: "700px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hospitals.map((hospital) => (
          <Marker
            key={hospital._id}
            position={[
              hospital.coordinates.lat,
              hospital.coordinates.lng,
            ]}
          >
            <Popup>
              <div className="space-y-2">
                <h2 className="font-bold">{hospital.name}</h2>

                <p>{hospital.city}</p>

                <p>⭐ {hospital.rating}</p>

                <p>ICU {hospital.beds}</p>

                <p>Oxygen {hospital.oxygen}</p>

                <Link
                  to={`/hospital/${hospital._id}`}
                  className="inline-block rounded bg-blue-600 px-3 py-2 text-white"
                >
                  View Hospital
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}