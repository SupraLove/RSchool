import { Header } from "./components/header/Header";
import { SectionFive } from "./components/section/section-five/SectionFive";
import { SectionFour } from "./components/section/section-four/SectionFour";
import { SectionOne } from "./components/section/section-one/SectionOne";
import { SectionThree } from "./components/section/section-three/SectionThree";
import SectionTwo from "./components/section/section-two/SectionTwo";

export default function Home() {
  return (
    <>
      <Header />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
    </>
  );
}
