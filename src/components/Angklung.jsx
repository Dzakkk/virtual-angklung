import Tone from "./tone/Tone";

const Angklung = () => {
  return (
    <section>
      <div className="flex justify-around gap-3 p-4">
        <Tone keySound="1" soundSrc={require("./../assets/sounds/1.mp3")} size="h-72" />
        <Tone keySound="2" soundSrc={require("./../assets/sounds/2.mp3")} size="h-64" />
        <Tone keySound="3" soundSrc={require("./../assets/sounds/3.mp3")} size="h-52" />
        <Tone keySound="4" soundSrc={require("./../assets/sounds/4.mp3")} size="h-48" />
        <Tone keySound="5" soundSrc={require("./../assets/sounds/5.mp3")} size="h-40" />
      </div>
    </section>
  );
};

export default Angklung;
