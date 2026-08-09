import StructuralDiagramLayer from "./components/StructuralDiagramLayer";
import EngineeringCanvas from "./components/EngineeringCanvas";
import { SoundToggle } from "./components/SoundSystem";

export default function Home() {
  return (
    <>
      {/* Fixed persistent structural diagram — always behind everything */}
      <StructuralDiagramLayer />

      {/* Sound toggle — fixed corner */}
      <SoundToggle />

      {/* Spatial frame canvas — replaces all standard scroll sections */}
      <EngineeringCanvas />
    </>
  );
}
